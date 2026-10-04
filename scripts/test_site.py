from html.parser import HTMLParser
from pathlib import Path
import shutil
import subprocess
from tempfile import TemporaryDirectory
from unittest.mock import patch

from new_project import ROOT, create_project, parser


class PageCheck(HTMLParser):
    def __init__(self):
        super().__init__()
        self.charset = 0
        self.viewport = 0
        self.stylesheets = []
        self.scripts = []
        self.links = []
        self.in_link = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta':
            self.charset += 'charset' in attrs
            self.viewport += attrs.get('name') == 'viewport'
        if tag == 'link' and attrs.get('rel') == 'stylesheet':
            self.stylesheets.append(attrs['href'])
        if tag == 'script' and 'src' in attrs:
            self.scripts.append(attrs['src'])
        if tag == 'a':
            self.in_link = True
            self.links.append(attrs.get('href'))
        assert not (tag == 'button' and self.in_link), 'Button nested in a link'
        for attribute in ('src', 'href'):
            value = attrs.get(attribute, '')
            if value and not value.startswith(('https:', 'http:', '#', 'mailto:')):
                assert (ROOT / value).exists(), f'Missing local file: {value}'

    def handle_endtag(self, tag):
        if tag == 'a':
            self.in_link = False


for path in ROOT.glob('*.html'):
    check = PageCheck()
    check.feed(path.read_text(encoding='utf-8'))
    assert check.charset == check.viewport == 1, path.name
    assert check.stylesheets == ['styles.css'], path.name
    assert 'js/social-links.js' in check.scripts, path.name
    if 'js/footer.js' in check.scripts:
        assert check.scripts.index('js/social-links.js') < check.scripts.index('js/footer.js')
    if path.name in ('kinnie.html', 'owen.html'):
        assert check.scripts.index('js/posts-render.js') < check.scripts.index('js/ai-note.js') < check.scripts.index('js/footer.js')

for path in (ROOT / 'js').glob('*.js'):
    subprocess.run(['node', '--check', str(path)], check=True)

subprocess.run(['node', '-e', '''
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const element = () => ({children: [], append(...nodes) { this.children.push(...nodes); }, appendChild(node) { this.append(node); }});
const header = element(), container = element();
const listeners = {};
const document = {
  createElement: element,
  createTextNode: text => ({textContent: text}),
  addEventListener: (name, callback) => { listeners[name] = callback; },
  querySelectorAll: () => [header],
  querySelector: () => container,
};
const context = vm.createContext({document});
for (const file of ['social-links', 'footer', 'ai-note']) {
  vm.runInContext(fs.readFileSync('js/' + file + '.js', 'utf8'), context);
}
listeners.DOMContentLoaded();
const footer = container.children[0];
assert.equal(footer.className, 'footer');
assert.equal(header.children.filter(node => node.href).length, 5);
assert.deepEqual(header.children.map(node => node.href), footer.children.map(node => node.href));
assert.match(container.children[1].innerHTML, /AI assistance/);
'''], cwd=ROOT, check=True)

with TemporaryDirectory() as directory:
    root = Path(directory)
    shutil.copytree(ROOT / 'templates', root / 'templates')
    (root / 'res').mkdir()
    (root / 'res/tile.png').write_bytes(b'test asset')
    (root / 'index.html').write_text('<!-- NEW MAIN PROJECTS -->\n<!-- NEW SIDE PROJECTS -->', encoding='utf-8')
    cli = parser()
    args = cli.parse_args([
        'test-game', '--title', 'Game <&>', '--description', '<script>unsafe</script>',
        '--thumbnail', 'res/tile.png', '--group', 'side', '--ai-note',
        '--screenshot', 'res/tile.png', '--youtube-id', 'MYbSW3f48Uw',
        '--link', 'https://example.com/?a=1&b=2',
    ])
    page = create_project(args, root)
    html = page.read_text(encoding='utf-8')
    assert 'Game &lt;&amp;&gt;' in html
    assert '&lt;script&gt;unsafe&lt;/script&gt;' in html
    assert 'class="screenshot"' in html and 'js/ai-note.js' in html
    assert 'https://example.com/?a=1&amp;b=2' in html
    assert 'test-game.html' in (root / 'index.html').read_text()
    before = (root / 'index.html').read_text()
    for invalid in [args, cli.parse_args(['../escape']), cli.parse_args(['missing', '--group', 'main']),
                    cli.parse_args(['unsafe', '--link', 'javascript:alert(1)']),
                    cli.parse_args(['asset', '--screenshot', '../index.html'])]:
        try:
            create_project(invalid, root)
        except (ValueError, FileExistsError):
            pass
        else:
            raise AssertionError('Invalid input was accepted')
        assert (root / 'index.html').read_text() == before
    assert {p.name for p in root.glob('*.html')} == {'index.html', 'test-game.html'}
    plain = create_project(cli.parse_args(['plain']), root)
    assert 'js/ai-note.js' not in plain.read_text()
    assert (root / 'index.html').read_text() == before
    (root / 'index.html').write_text('no marker', encoding='utf-8')
    try:
        create_project(cli.parse_args(['no-marker', '--group', 'main', '--thumbnail', 'res/tile.png']), root)
    except ValueError:
        pass
    else:
        raise AssertionError('Missing index marker was accepted')
    assert not (root / 'no-marker.html').exists()
    (root / 'index.html').write_text(before, encoding='utf-8')
    with patch.object(Path, 'replace', side_effect=OSError('Simulated write failure')):
        try:
            create_project(cli.parse_args(['failed', '--group', 'main', '--thumbnail', 'res/tile.png']), root)
        except OSError:
            pass
        else:
            raise AssertionError('Write failure was ignored')
    assert not (root / 'failed.html').exists()
    assert (root / 'index.html').read_text() == before
    assert {p.name for p in root.iterdir()} == {'index.html', 'test-game.html', 'plain.html', 'res', 'templates'}

print('OK: site references, shared components, JavaScript syntax and project generator')
