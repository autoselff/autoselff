function loadCommonIndex() {
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
    html,
    body {
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

    p {
      font-family: 'Doto', monospace;
      font-weight: 700;
      line-height: 1.4;
    }

    a {
      color: white;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    @keyframes scroll-left {
      0% {
        transform: translateX(0);
      }

      100% {
        transform: translateX(-100%);
      }
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
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
      margin-top: 50px;
      padding-bottom: 20px;
    }

    .header,
    .footer {
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
      color: white;
      text-decoration: underline;
    }

    .section {
      border-top: 1px dotted white;
      padding: 20px;
      margin: 0 10px;
    }

    .game-section {
      border-top: 1px dotted white;
      padding: 20px;
      margin: 0 10px;
      margin-bottom: 30px;
    }

    .section:first-child {
      border-top: none;
    }

    .game-section:first-child {
      border-top: none;
    }

    .game-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 15px;
    }

    .game-buttons img {
      width: 120px;
      height: auto;
      cursor: pointer;
      transition: transform 0.2s ease;
      border: 1px solid white;
    }

    .game-buttons img:hover {
      transform: scale(1.15);
    }

    img {
      max-width: 100%;
      height: auto;
    }

    center img {
      margin: 4px;
    }

    .iframe-container {
      position: relative;
      width: 100%;
      max-width: 646px;
      margin: 0 auto;
      padding-bottom: 29.41%;
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

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .skill-category {
      border: 1px solid white;
      padding: 20px;
      background-color: rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;
    }

    .skill-category:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
    }

    .skill-category h3 {
      margin: 0 0 15px 0;
      font-size: 18px;
      border-bottom: 1px dotted white;
      padding-bottom: 10px;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }

    .skill-tag {
      display: inline-block;
      padding: 6px 12px;
      border: 1px solid white;
      background-color: black;
      font-size: 12px;
      transition: all 0.2s ease;
      cursor: default;

      font-family: 'Doto', monospace;
      font-weight: 700;
      line-height: 1.4;
    }

    .skill-tag:hover {
      background-color: white;
      color: black;
    }
  `;
  head.appendChild(style);
}

loadCommonIndex();