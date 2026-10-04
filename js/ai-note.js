const aiNote = document.createElement('div');
aiNote.className = 'section';
aiNote.innerHTML = `
  <aside class="post" aria-labelledby="ai-note-title">
    <h2 id="ai-note-title">AI assistance</h2>
    <p>The concept, design, and development of this project are my own. AI (LLM) tools served only as assistance with selected parts. I disclose AI use in every project where it contributes.</p>
  </aside>
`;
document.querySelector('.container').append(aiNote);
