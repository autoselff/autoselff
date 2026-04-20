const MARQUEE_TEXT = "someday something cool will be written here.";
function loadMarquee(text = MARQUEE_TEXT) {
    const marqueeDiv = document.createElement('div');
    marqueeDiv.className = 'marquee';

    const marqueeTextDiv = document.createElement('div');
    marqueeTextDiv.className = 'marquee-text';
    marqueeTextDiv.textContent = text;

    marqueeDiv.appendChild(marqueeTextDiv);

    document.body.insertBefore(marqueeDiv, document.body.firstChild);
}

(function () {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => loadMarquee());
    } else {
        loadMarquee();
    }
})();
