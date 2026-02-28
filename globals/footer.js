// This .js file was created using Claude AI.
// Why? I don't like or know javascript,
// and I don't plan to learn it anytime soon because
// I'm not a big fan of web development.
// The files without this comment were created by me.

function loadFooter() {
  const footer = document.createElement("div");
  footer.className = "footer";

  footer.innerHTML = `
      <a href="https://www.youtube.com/@autoselff">YOUTUBE</a> <a> | </a>
      <a href="https://discord.gg/nhW6HwreD4">DISCORD</a> <a> | </a>
      <a href="https://github.com/autoselff">GITHUB</a> <a> | </a>
      <a href="https://store.steampowered.com/dev/autoselff">STEAM</a> <a> | </a>
      <a href="https://x.com/autoselff">TWITTER</a>
    `;

  const container = document.querySelector(".container");
  container.appendChild(footer);
}

loadFooter();
