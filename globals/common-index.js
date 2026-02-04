// This .js file was created using Claude AI. 
// Why? I don't like or know javascript, 
// and I don't plan to learn it anytime soon because 
// I'm not a big fan of web development.
// The files without this comment were created by me.

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

    .post {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      padding: 20px;
      margin-bottom: 20px;
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    .post:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .post-date {
      font-size: 0.85em;
      opacity: 0.6;
      margin-bottom: 10px;
      font-family: monospace;
    }

    .post-content {
      line-height: 1.6;
      margin-bottom: 10px;
      white-space: pre-wrap;
    }

    .post-image {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      margin-top: 15px;
      margin-bottom: 10px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .post-link-container {
      margin-top: 15px;
    }

    .post-link {
      display: inline-block;
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      text-decoration: none;
      color: inherit;
      transition: background 0.3s ease, border-color 0.3s ease;
      font-size: 0.9em;
    }

    .post-link:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
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
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      opacity: 0.7;
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
    }

    /* Alternative: Minimal style (uncomment if you prefer this) */
    /*
    .post {
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding: 20px 0;
      margin-bottom: 0;
    }

    .post:last-child {
      border-bottom: none;
    }
    */

    /* Latest post on homepage */
    .latest-post {
      margin-bottom: 0;
    }

    /* Posts button */
    .posts-button {
      display: inline-block;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      text-decoration: none;
      color: inherit;
      font-weight: bold;
      font-size: 1em;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .posts-button:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .posts-button:active {
      transform: translateY(0);
    }
  `;
  head.appendChild(style);
}

loadCommonIndex();