# AUTOSELFF — portfolio

Statyczna strona HTML/CSS/JS. Bez frameworka, zależności npm i obowiązkowego buildu; gotowe pliki można publikować bezpośrednio na GitHub Pages.

## Podgląd lokalny

```bash
python3 -m http.server 8000
```

Otwórz `http://localhost:8000`.

## Wspólne elementy

- `styles.css` — wspólny wygląd; różnice strony głównej są ograniczone klasą `.homepage`.
- `js/common.js` — przeglądarka zrzutów ekranu (również strzałki i klawiatura).
- `js/social-links.js` — adresy społecznościowe nagłówka i stopek. Przy ujednolicaniu zachowano adresy z dotychczasowego `index.html`.
- `js/footer.js` — stopka podstron.
- `js/ai-note.js` — opcjonalna notka o pomocy AI, umieszczana po wpisach i przed stopką.
- `js/posts-data.js` — treści wpisów; `js/posts-render.js` — ich wyświetlanie.
- `.post.panel` i `.panel-button` — wspólne panele informacyjne i przyciski z białym obrysem 2 px.
- `.download-button` — link wyglądający jak dotychczasowy przycisk pobierania.

## Nowa podstrona

Wymagany Python 3.10+. Uruchomienie działa także spoza katalogu repozytorium.

```bash
python3 scripts/new_project.py nowy-projekt \
  --title "Nowy projekt" \
  --description "Short English description of the project." \
  --platforms "Linux, Windows" \
  --genre "Sandbox" \
  --engine "Godot 4"
```

Powstanie `nowy-projekt.html`, który można dalej edytować ręcznie. Istniejące pliki nie są nadpisywane. Wspólny szablon znajduje się w `templates/project.html`; zmiana szablonu dotyczy tylko przyszłych podstron, nie nadpisuje istniejącej treści ani dokumentacji Kinnie.

Dodatkowe opcje:

- `--status "Released"` — domyślnie `In development`.
- `--screenshot res/ow/ss1.png` — można powtarzać, aby dodać galerię.
- `--youtube-id MYbSW3f48Uw` — osadzony film.
- `--link https://example.com --link-text "View project"` — link do projektu/pobierania.
- `--ai-note` — dodaje wspólną informację o pomocy AI; nie jest dodawana domyślnie.
- `--thumbnail res/ow.png --group side` — dopisuje kafelek do Side Projects; `--group main` dodaje do Main Projects. Grafika musi już istnieć w `res/`.

Bez `--group` strona główna pozostaje bez zmian. Nie usuwaj znaczników `NEW MAIN PROJECTS` i `NEW SIDE PROJECTS` z `index.html`: wskazują generatorowi miejsce nowych kafelków.

## Sprawdzenie zmian

Wymagane Python 3.10+ i Node.js (tylko do testów, nie do działania strony).

```bash
python3 scripts/test_site.py
```

Test sprawdza lokalne odwołania, metadane, współdzielone komponenty, składnię JS, tworzenie podstron i kafelków, escapowanie HTML oraz odmowę nadpisania pliku i nieprawidłowych danych. Nie zastępuje wizualnego sprawdzenia strony w przeglądarce.
