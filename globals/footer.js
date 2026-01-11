function loadFooter() {
    const footer = document.createElement('div');
    footer.className = 'footer';

    footer.innerHTML = `
        <a href="https://discord.gg/nhW6HwreD4">DISCORD</a> <a> | </a>
        <a href="https://store.steampowered.com/search/?developer=autoselff">STEAM</a> <a> | </a>
        <a href="https://www.youtube.com/@autoselff-dev">YOUTUBE</a> <a> | </a>
        <a href="https://x.com/autoselff">TWITTER</a> <a> | </a>
        <a href="https://github.com/autoselff">GITHUB</a> 
    `;

    const container = document.querySelector('.container');
    container.appendChild(footer);
}

loadFooter();