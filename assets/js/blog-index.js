// Build list of all posts (newest first)
(async function(){
  const ul = document.getElementById('blog-list');
  if(!ul) return;
  try{
    const res = await fetch('/posts/posts.json', {cache:'no-store'});
    const posts = await res.json();
    ul.innerHTML = posts.map(p => li(p)).join('');
  }catch(e){
    ul.innerHTML = '<li class="muted">No posts yet.</li>';
  }

  function li(p){
    const date = new Date(p.date).toLocaleDateString(undefined, {year:'numeric', month:'short', day:'2-digit'});
    return `
      <li>
        <a href="/blog/post.html?slug=${encodeURIComponent(p.slug)}">${p.title}</a>
        <span class="muted">${date}</span>
      </li>`;
  }
})();