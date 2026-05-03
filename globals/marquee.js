const MARQUEE_TEXT = "Wishlist ANTA3 on Steam! What is ANTA3? ANTA3 is a cozy game about building houses for penguins on the island, help the island grow and work off the debt you took to buy a house.";
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
