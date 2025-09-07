// Load latest 9 posts into the grid
(async function(){
  const grid = document.getElementById('posts-grid');
  if(!grid) return;
  try{
    const res = await fetch('/posts/posts.json', {cache:'no-store'});
    const posts = await res.json();
    const latest = posts.slice(0,9);
    grid.innerHTML = latest.map(p => card(p)).join('');
  }catch(e){
    grid.innerHTML = '<p class="muted">No posts yet.</p>';
  }

  function card(p){
    const date = new Date(p.date).toLocaleDateString(undefined, {year:'numeric', month:'short', day:'2-digit'});
    return `
      <article class="card">
        <h3>${p.title}</h3>
        <p class="muted">${date}</p>
        <p>${p.summary || ''}</p>
        <a href="/blog/post.html?slug=${encodeURIComponent(p.slug)}">Read →</a>
      </article>
    `;
  }
})();