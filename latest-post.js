// This .js file was created using Claude AI. 
// Why? I don't like or know javascript, 
// and I don't plan to learn it anytime soon because 
// I'm not a big fan of web development.
// The files without this comment were created by me.

(function () {
    const latestPostContainer = document.getElementById('latest-post-container');

    if (!latestPostContainer) {
        console.error('Latest post container not found!');
        return;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    function createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post latest-post';

        const dateDiv = document.createElement('div');
        dateDiv.className = 'post-date';
        dateDiv.textContent = formatDate(post.date);
        postDiv.appendChild(dateDiv);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'post-content';
        contentDiv.textContent = post.content;
        postDiv.appendChild(contentDiv);

        if (post.image) {
            const img = document.createElement('img');
            img.src = post.image;
            img.className = 'post-image';
            img.alt = 'Post image';
            postDiv.appendChild(img);
        }

        if (post.link) {
            const linkDiv = document.createElement('div');
            linkDiv.className = 'post-link-container';
            const link = document.createElement('a');
            link.href = post.link;
            link.className = 'post-link';
            link.textContent = post.linkText || post.link;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            linkDiv.appendChild(link);
            postDiv.appendChild(linkDiv);
        }

        if (post.tags && post.tags.length > 0) {
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'post-tags';
            post.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'post-tag';
                tagSpan.textContent = `#${tag}`;
                tagsDiv.appendChild(tagSpan);
            });
            postDiv.appendChild(tagsDiv);
        }

        return postDiv;
    }

    function displayLatestPost() {
        latestPostContainer.innerHTML = '';

        if (!POSTS || POSTS.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'No posts yet.';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.opacity = '0.6';
            latestPostContainer.appendChild(emptyMessage);
            return;
        }

        const latestPost = POSTS[0];
        const postElement = createPostElement(latestPost);
        latestPostContainer.appendChild(postElement);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', displayLatestPost);
    } else {
        displayLatestPost();
    }
})();