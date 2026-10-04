// Shared by the homepage header and every project footer.
const SOCIAL_LINKS = [
  ['YOUTUBE', 'https://www.youtube.com/@autoselff'],
  ['DISCORD', 'https://discord.gg/nhW6HwreD4'],
  ['GITHUB', 'https://github.com/autoselff'],
  ['STEAM', 'https://store.steampowered.com/developer/autoself'],
  ['TWITTER', 'https://x.com/autoselff'],
];

function renderSocialLinks(container) {
  SOCIAL_LINKS.forEach(([name, url], index) => {
    if (index) {
      const separator = document.createElement('span');
      separator.className = 'social-separator';
      separator.textContent = ' | ';
      container.append(separator);
    }
    const link = document.createElement('a');
    link.href = url;
    link.textContent = name;
    container.append(link);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.social-links').forEach(renderSocialLinks);
});
