function loadWebButtons() {
  const webButtons = document.createElement('div');
  webButtons.className = 'section';

  webButtons.innerHTML = `
    <center>
      <a href="https://mikeklubnika.com/">
        <img src="../res/web-buttons/mikeklubnika.gif" alt=""> 
      </a>
      <a href="https://www.blender.org/">
        <img src="../res/web-buttons/blender.gif" alt=""> 
      </a>
      <a href="https://www.linuxmint.com/">
        <img src="../res/web-buttons/visitmini.gif" alt=""> 
      </a>
      <a href="https://myanimelist.net/profile/autoself">
        <img src="../res/web-buttons/blink.gif" alt=""> 
      </a>
      <a>
        <img src="../res/web-buttons/maja.gif" alt=""> 
      </a>
      <a href="https://ericalfaro.dev/">
        <img src="../res/web-buttons/eric.gif" alt="">
      </a>
    </center>
  `;

  const container = document.querySelector('.container');
  container.appendChild(webButtons);
}

loadWebButtons();