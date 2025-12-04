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

    .section {
      border-top: 1px dotted white;
      padding: 20px;
      margin: 0 10px;
    }

    .section:first-child {
      border-top: none;
    }

    p {
      font-family: 'Doto', monospace;
      font-weight: 700;
      line-height: 1.4;
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
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .game-buttons img:hover {
      transform: scale(1.15);
    }

    .download-button {
      background-color: white;
      color: black;
      font-family: 'Doto', monospace;
      font-weight: bold;
      border: 2px solid white;
      padding: 10px 20px;
      cursor: pointer;
      transition: transform 0.2s ease, background-color 0.2s ease;
      margin: 10px auto;
      display: inline-block;
    }

    .download-button:hover {
      transform: scale(1.1);
      background-color: #ccc;
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
  `;
  head.appendChild(style);
}

loadCommon();