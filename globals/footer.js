function loadFooter() {
    const footer = document.createElement('div');
    footer.className = 'footer';

    footer.innerHTML = `
        <a href="https://store.steampowered.com/search/?developer=autoselff">STEAM</a> <a> | </a>
        <a href="https://github.com/autoselff">GITHUB</a> <a> | </a>
        <a href="https://www.youtube.com/@dazaidev">YOUTUBE</a> <a> | </a>
        <a href="https://x.com/autoselff">TWITTER</a>
      `;

    document.body.appendChild(footer);
}

loadFooter();