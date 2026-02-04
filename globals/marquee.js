// This .js file was created using Claude AI. 
// Why? I don't like or know javascript, 
// and I don't plan to learn it anytime soon because 
// I'm not a big fan of web development.
// The files without this comment were created by me.

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