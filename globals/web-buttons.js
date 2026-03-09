// This .js code was created using Claude AI.
// Why? I don't like or know javascript, 
// and I don't plan to learn it anytime soon because 
// I'm not a big fan of web development.
// The files without this comment were created by me.

function loadWebButtons() {
  const webButtons = document.createElement('div');
  webButtons.className = 'section';

  webButtons.innerHTML = `
    <center>
      <a href="https://cachyos.org/">
        <img src="res/web-buttons/visitmini.gif" alt=""> 
      </a>
      <a href="https://myanimelist.net/profile/autoselff">
        <img src="res/web-buttons/blink.gif" alt=""> 
      </a>
      <a href="https://godotengine.org/">
        <img src="res/web-buttons/eric.gif" alt="">
      </a>
      <a href="https://www.blender.org/">
        <img src="res/web-buttons/blender.gif" alt=""> 
      </a>
      <a href="https://mikeklubnika.com/">
        <img src="res/web-buttons/mikeklubnika.gif" alt=""> 
      </a>
      <a>
        <img src="res/web-buttons/maja.gif" alt=""> 
      </a>
    </center>
  `;

  const container = document.querySelector('.container');
  container.appendChild(webButtons);
}

loadWebButtons();
