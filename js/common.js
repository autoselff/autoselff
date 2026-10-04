let screenshotIndex = 0;

function showScreenshot(index) {
  const screenshots = [...document.querySelectorAll('.screenshot')];
  const viewer = document.querySelector('.screenshot-viewer');
  screenshotIndex = (index + screenshots.length) % screenshots.length;
  const screenshot = screenshots[screenshotIndex];
  const image = viewer.querySelector('img');
  image.src = screenshot.src;
  image.alt = screenshot.alt;
  viewer.querySelectorAll('.screenshot-arrow').forEach((button) => {
    button.hidden = screenshots.length < 2;
  });
}

document.addEventListener('click', (event) => {
  const screenshot = event.target.closest('.screenshot');
  if (!screenshot) return;

  let viewer = document.querySelector('.screenshot-viewer');
  if (!viewer) {
    viewer = document.createElement('dialog');
    viewer.className = 'screenshot-viewer';
    viewer.setAttribute('aria-label', 'Screenshots');
    viewer.innerHTML = '<button type="button" aria-label="Close screenshot">×</button><button type="button" class="screenshot-arrow screenshot-prev" data-step="-1" aria-label="Previous screenshot">&lt;-</button><img alt=""><button type="button" class="screenshot-arrow" data-step="1" aria-label="Next screenshot">-&gt;</button>';
    viewer.addEventListener('click', (event) => {
      const arrow = event.target.closest('[data-step]');
      if (arrow) showScreenshot(screenshotIndex + Number(arrow.dataset.step));
      else viewer.close();
    });
    viewer.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      showScreenshot(screenshotIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    });
    document.body.appendChild(viewer);
  }

  showScreenshot([...document.querySelectorAll('.screenshot')].indexOf(screenshot));
  viewer.showModal();
});
