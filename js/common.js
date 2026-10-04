function loadCommon() {
  const head = document.head;

  const metaCharset = document.createElement('meta');
  metaCharset.setAttribute('charset', 'UTF-8');
  head.appendChild(metaCharset);

  const metaViewport = document.createElement('meta');
  metaViewport.setAttribute('name', 'viewport');
  metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
  head.appendChild(metaViewport);

  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Doto&display=swap';
  fontLink.rel = 'stylesheet';
  head.appendChild(fontLink);

  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.href = 'res/icon.png';
  head.appendChild(favicon);

  const style = document.createElement('style');
  style.textContent = `
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      font-family: 'Doto', monospace;
      background-image: url('res/bg.gif');
      background-size: cover;
      background-repeat: repeat;
      background-position: center;
      background-attachment: fixed;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    .marquee {
      position: fixed;
      top: 0;
      width: 100%;
      background: black;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      z-index: 9999;
    }

    .marquee-text {
      font-family: 'Doto', monospace;
      font-weight: 900;
      line-height: 1.6;
      display: inline-block;
      padding-left: 100%;
      animation: scroll-left 30s linear infinite;
    }

    @keyframes scroll-left {
      0% { transform: translateX(0); }
      100% { transform: translateX(-100%); }
    }

    .container {
      width: 95vw;
      max-width: 800px;
      background-color: black;
      color: white;
      border: 2px solid white;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 95vh;
      box-shadow: 0 0 20px rgba(0,0,0,0.8);
      margin-top: 50px;
      padding-bottom: 20px;
    }

    .header, .footer {
      padding: 20px;
      text-align: center;
    }

    .footer {
      margin-top: auto;
      border-top: 1px solid white;
    }

    .logo {
      font-size: 32px;
      font-weight: bold;
    }

    .nav {
      margin-top: 10px;
    }

    .nav a,
    .footer a {
      color: white;
      text-decoration: none;
      margin: 0 10px;
    }

    .nav a:hover,
    .footer a:hover {
      text-decoration: underline;
    }

    .footer a[href] {
      display: inline-block;
      padding: 8px 2px;
      font-size: 18px;
      font-weight: 900;
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .footer a[href]:hover,
    .footer a[href]:focus-visible {
      outline: 2px solid white;
      outline-offset: 3px;
    }

    .nav a.home-link {
      position: fixed;
      top: 42px;
      left: 12px;
      z-index: 10000;
      display: inline-block;
      border: 1px solid white;
      padding: 5px 10px;
      background: black;
      text-decoration: none;
    }

    .nav a.home-link:hover {
      color: white;
      background: black;
      outline: 1px solid white;
      outline-offset: 3px;
    }

    .section {
      border-top: 1px solid white;
      padding: 20px;
      margin: 0 10px;
    }

    .section p a {
      color: white;
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .section p a:hover {
      text-decoration-style: solid;
    }

    .section:first-child {
      border-top: none;
    }

    p {
      font-family: 'Doto', monospace;
      font-weight: 700;
      line-height: 1.4;
    }

    /* GIF container - zachowuje proporcje, nie wychodzi poza obszar */
    .gif-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin: 15px 0;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }

    .gif-container img {
      max-width: 100%;
      width: auto;
      height: auto;
      max-height: 400px;
      object-fit: contain;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: block;
    }

    /* Modyfikatory układu - opcjonalne klasy */
    .gif-container.single img {
      max-width: 100%;
      max-height: 500px;
    }

    .gif-container.two-col img {
      max-width: calc(50% - 5px);
    }

    .gif-container.three-col img {
      max-width: calc(33.333% - 7px);
    }

    .game-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 15px;
    }

    .game-buttons img {
      width: 300px;
      height: auto;
      display: block;
    }

    .game-buttons a {
      cursor: pointer;
    }

    .game-buttons img:not(.screenshot):hover {
      filter: brightness(0.8);
      outline: 1px solid white;
      outline-offset: 3px;
    }

    .screenshot {
      cursor: zoom-in;
    }

    .screenshot-viewer {
      max-width: 100vw;
      max-height: 100vh;
      padding: 0;
      border: 0;
      background: transparent;
    }

    .screenshot-viewer::backdrop {
      background: rgba(0, 0, 0, 0.9);
    }

    .screenshot-viewer img {
      display: block;
      max-width: 95vw;
      max-height: 95vh;
      object-fit: contain;
      cursor: zoom-out;
    }

    .screenshot-viewer button:not([hidden]) {
      display: grid;
    }

    .screenshot-viewer button {
      place-items: center;
      width: 44px;
      height: 44px;
      padding: 0;
      position: fixed;
      top: 12px;
      right: 16px;
      border: 1px solid white;
      background: black;
      color: white;
      font: 24px/1 Arial, sans-serif;
      cursor: pointer;
    }

    .screenshot-viewer .screenshot-arrow {
      top: 50%;
      transform: translateY(-50%);
    }

    .screenshot-viewer .screenshot-prev {
      left: 16px;
      right: auto;
    }

    .download-button {
      background-color: white;
      color: black;
      font-family: 'Doto', monospace;
      font-weight: bold;
      border: 2px solid white;
      padding: 10px 20px;
      cursor: pointer;
      margin: 10px auto;
      display: inline-block;
    }

    .download-button:hover {
      outline: 1px solid white;
      outline-offset: 3px;
    }

    a button {
      all: unset;
      display: inline-block;
    }

    .iframe-container {
      position: relative;
      width: 100%;
      margin: 0 auto;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
    }

    .iframe-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    .project-details table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    .project-details th,
    .project-details td {
      padding: 8px 12px;
      border-bottom: 1px solid white;
    }

    .project-details tr:last-child th,
    .project-details tr:last-child td {
      border-bottom: 0;
    }

    .project-details th {
      width: 30%;
      font-weight: 700;
    }

    .post {
      border: 1px solid white;
      padding: 20px;
      margin-bottom: 20px;
    }

    .post:hover {
      outline: 1px solid white;
      outline-offset: 3px;
    }

    .post-date {
      font-size: 0.85em;
      opacity: 0.6;
      margin-bottom: 10px;
      font-family: 'Doto', monospace;
      text-transform: uppercase;
    }

    .post-content {
      margin-bottom: 10px;
      white-space: pre-wrap;
      font-family: 'Doto', monospace;
      font-weight: 700;
      line-height: 1.4;
    }

    .post-image {
      max-width: 100%;
      height: auto;
      margin-top: 15px;
      margin-bottom: 10px;
      border: 1px solid white;
    }

    .post-link {
      display: inline-block;
      padding: 8px 16px;
      border: 1px solid white;
      background: rgba(255, 255, 255, 0.1);
      color: #fff !important;
      font-family: 'Doto', monospace;
      font-size: 1em;
      font-weight: 700;
      text-decoration: none;
    }

    .post-link:hover {
      color: #fff !important;
      text-decoration: none;
      outline: 1px solid white;
      outline-offset: 3px;
    }

    .post-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 15px;
    }

    .post-tag {
      font-size: 0.8em;
      padding: 4px 10px;
      border: 1px solid white;
      opacity: 0.8;
      font-family: monospace;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .post {
        padding: 15px;
      }

      .post-content {
        font-size: 0.95em;
      }

      .gif-container.two-col img,
      .gif-container.three-col img {
        max-width: 100%;
      }
    }

    /* Latest post on homepage */
    .latest-post {
      margin-bottom: 0;
    }

    /* Posts button */
    .posts-button {
      display: inline-block;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid white;
      background: black;
      color: white;
      text-decoration: none;
      font-weight: bold;
      font-size: 1em;
      cursor: pointer;
    }

    .posts-button:hover {
      text-decoration: none;
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      outline: 1px solid white;
      outline-offset: 3px;
    }

  `;
  head.appendChild(style);
}

loadCommon();

let screenshotIndex = 0;

function showScreenshot(index) {
  const screenshots = [...document.querySelectorAll('.screenshot')];
  const viewer = document.querySelector('.screenshot-viewer');
  screenshotIndex = (index + screenshots.length) % screenshots.length;
  const screenshot = screenshots[screenshotIndex];
  const image = viewer.querySelector('img');
  image.src = screenshot.src;
  image.alt = screenshot.alt;
  viewer.querySelectorAll('.screenshot-arrow').forEach((button) => {
    button.hidden = screenshots.length < 2;
  });
}

document.addEventListener('click', (event) => {
  const screenshot = event.target.closest('.screenshot');
  if (!screenshot) return;

  let viewer = document.querySelector('.screenshot-viewer');
  if (!viewer) {
    viewer = document.createElement('dialog');
    viewer.className = 'screenshot-viewer';
    viewer.setAttribute('aria-label', 'Screenshots');
    viewer.innerHTML = '<button type="button" aria-label="Close screenshot">×</button><button type="button" class="screenshot-arrow screenshot-prev" data-step="-1" aria-label="Previous screenshot">&lt;-</button><img alt=""><button type="button" class="screenshot-arrow" data-step="1" aria-label="Next screenshot">-&gt;</button>';
    viewer.addEventListener('click', (event) => {
      const arrow = event.target.closest('[data-step]');
      if (arrow) showScreenshot(screenshotIndex + Number(arrow.dataset.step));
      else viewer.close();
    });
    viewer.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      showScreenshot(screenshotIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    });
    document.body.appendChild(viewer);
  }

  showScreenshot([...document.querySelectorAll('.screenshot')].indexOf(screenshot));
  viewer.showModal();
});