function createPost(post, latest = false) {
  const element = document.createElement('article');
  element.className = `post${latest ? ' latest-post' : ''}`;

  const date = document.createElement('div');
  date.className = 'post-date';
  date.textContent = new Date(`${post.date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  element.append(date);

  const content = document.createElement('div');
  content.className = 'post-content';
  content.textContent = post.content;
  element.append(content);

  if (post.image) {
    const image = document.createElement('img');
    image.src = post.image;
    image.className = 'post-image';
    image.alt = 'Post image';
    element.append(image);
  }

  if (post.link) {
    const link = document.createElement('a');
    link.href = post.link;
    link.className = 'post-link';
    link.textContent = post.linkText || post.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    element.append(link);
  }

  if (post.tags?.length) {
    const tags = document.createElement('div');
    tags.className = 'post-tags';
    for (const tag of post.tags) {
      const item = document.createElement('span');
      item.className = 'post-tag';
      item.textContent = `#${tag}`;
      tags.append(item);
    }
    element.append(tags);
  }

  return element;
}

const posts = typeof POSTS === 'undefined' ? [] : POSTS;
const list = document.getElementById('posts-container');
if (list) {
  list.replaceChildren(...posts.map(post => createPost(post)));
  if (!posts.length) list.textContent = 'No posts yet. Check back later!';
}

let latest = document.getElementById('latest-post-container');
if (!latest && !list) {
  const section = document.createElement('div');
  section.className = 'section';
  section.innerHTML = '<h2>Latest Post</h2><div id="latest-post-container"></div>';
  document.querySelector('.container')?.append(section);
  latest = section.querySelector('#latest-post-container');
}
if (latest) {
  latest.replaceChildren(posts[0] ? createPost(posts[0], true) : document.createTextNode('No posts yet.'));
}
