# python3 scripts/new_project.py nowy-projekt --title "Nowy projekt"
import argparse
from html import escape
from pathlib import Path
import re
from string import Template
from tempfile import NamedTemporaryFile
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]


def create_project(args, root=ROOT):
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", args.slug):
        raise ValueError("Use a lowercase slug containing letters, numbers and hyphens.")
    page = root / f"{args.slug}.html"
    if page.exists():
        raise FileExistsError(f"Refusing to overwrite {page.name}.")
    if args.group and not args.thumbnail:
        raise ValueError("--group requires --thumbnail.")
    for asset in [args.thumbnail, *args.screenshot]:
        if asset:
            path = root / asset
            if Path(asset).is_absolute() or not asset.startswith('res/') or not path.resolve().is_relative_to((root / 'res').resolve()) or not path.is_file():
                raise ValueError(f"Asset must be an existing file inside res/: {asset}")
    if args.link:
        url = urlsplit(args.link)
        if url.scheme not in ('http', 'https') or not url.netloc:
            raise ValueError("--link must be an http(s) URL.")
    if args.youtube_id and not re.fullmatch(r"[A-Za-z0-9_-]{11}", args.youtube_id):
        raise ValueError("--youtube-id must be an 11-character YouTube video ID.")

    title = escape(args.title or args.slug.replace('-', ' ').title())
    library = []
    if args.youtube_id:
        library.append(f'''      <div class="iframe-container">
        <iframe src="https://www.youtube.com/embed/{args.youtube_id}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>''')
    if args.screenshot:
        images = '\n'.join(
            f'        <img class="screenshot" src="{escape(src)}" alt="{title} — screenshot {i}" />'
            for i, src in enumerate(args.screenshot, 1)
        )
        library.append(f'      <div class="game-buttons">\n{images}\n      </div>')
    project_link = ''
    if args.link:
        project_link = f'''
    <div class="section" style="text-align: center;">
      <a class="download-button" href="{escape(args.link)}">{escape(args.link_text)}</a>
    </div>
'''
    content = Template((root / 'templates/project.html').read_text(encoding='utf-8')).substitute(
        title=title, description=escape(args.description), status=escape(args.status),
        platforms=escape(args.platforms), genre=escape(args.genre), engine=escape(args.engine),
        library='\n'.join(library),
        project_link=project_link,
        ai_note='    <script src="js/ai-note.js"></script>\n' if args.ai_note else '',
    )
    index = root / 'index.html'
    updated_index = None
    if args.group:
        marker = f'<!-- NEW {args.group.upper()} PROJECTS -->'
        original = index.read_text(encoding='utf-8')
        if original.count(marker) != 1:
            raise ValueError(f"Expected exactly one {marker} in index.html.")
        tile = f'''<a href="{page.name}">
                        <img src="{escape(args.thumbnail)}" alt="{title}" title="{title}" />
                    </a>
                    {marker}'''
        updated_index = original.replace(marker, tile)

    with page.open('x', encoding='utf-8') as output:
        output.write(content)
    if updated_index is not None:
        temp = None
        try:
            with NamedTemporaryFile(mode='w', encoding='utf-8', dir=root, delete=False) as output:
                temp = Path(output.name)
                output.write(updated_index)
            temp.chmod(index.stat().st_mode)
            temp.replace(index)
        except OSError:
            page.unlink()
            raise
        finally:
            if temp is not None:
                temp.unlink(missing_ok=True)
    return page


def parser():
    cli = argparse.ArgumentParser(description='Create a project page, optionally adding its tile to the homepage.')
    cli.add_argument('slug')
    cli.add_argument('--title')
    cli.add_argument('--description', default='Project description.')
    cli.add_argument('--status', default='In development')
    cli.add_argument('--platforms', default='Not specified')
    cli.add_argument('--genre', default='Not specified')
    cli.add_argument('--engine', default='Not specified')
    cli.add_argument('--screenshot', action='append', default=[])
    cli.add_argument('--youtube-id')
    cli.add_argument('--link')
    cli.add_argument('--link-text', default='View project')
    cli.add_argument('--ai-note', action='store_true')
    cli.add_argument('--thumbnail')
    cli.add_argument('--group', choices=['main', 'side'])
    return cli


if __name__ == '__main__':
    cli = parser()
    try:
        page = create_project(cli.parse_args())
    except (ValueError, OSError) as error:
        cli.error(str(error))
    print(f'Created {page.name}')
