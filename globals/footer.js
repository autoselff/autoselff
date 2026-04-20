function loadFooter() {
  const footer = document.createElement("div");
  footer.className = "footer";

  footer.innerHTML = `
      <a href="https://www.youtube.com/@autoselff">YOUTUBE</a> <a> | </a>
      <a href="https://discord.gg/nhW6HwreD4">DISCORD</a> <a> | </a>
      <a href="https://github.com/autoselff">GITHUB</a> <a> | </a>
      <a href="https://store.steampowered.com/dev/autoself">STEAM</a> <a> | </a>
      <a href="https://x.com/autoselff">TWITTER</a>
    `;

  const container = document.querySelector(".container");
  container.appendChild(footer);
}

loadFooter();
