const MARQUEE_TEXT = "How long have you been asleep? When was the last time you felt something new, something fresh? Don't be a chameleon. It's high time to Wake up my friend.";
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
