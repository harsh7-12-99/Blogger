// Render a single post from markdown using ?slug=
(async function(){
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const titleEl = document.getElementById('post-title');
  const metaEl = document.getElementById('post-meta');
  const contentEl = document.getElementById('post-content');
  const pageTitle = document.getElementById('page-title');

  if(!slug){
    titleEl.textContent = 'Post not found';
    return;
  }
  try{
    // read manifest to get title/date
    const manifest = await (await fetch('/posts/posts.json', {cache:'no-store'})).json();
    const post = manifest.find(p => p.slug === slug);
    if(post){
      titleEl.textContent = post.title;
      metaEl.textContent = new Date(post.date).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'2-digit'});
      pageTitle.textContent = post.title + ' – Harsh Jiladiya';
    }
    const md = await (await fetch(`/posts/${slug}.md`, {cache:'no-store'})).text();
    contentEl.innerHTML = marked.parse(stripFrontMatter(md));
  }catch(e){
    titleEl.textContent = 'Error loading post';
  }

  function stripFrontMatter(md){
    // remove leading YAML front matter between --- lines
    if(md.startsWith('---')){
      const end = md.indexOf('\n---', 3);
      if(end !== -1) return md.slice(end+4).trimStart();
    }
    return md;
  }
})();