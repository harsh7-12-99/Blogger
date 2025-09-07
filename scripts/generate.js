// Build /posts/posts.json from markdown files with YAML front matter.
// Minimal dependency approach (no external libs).

import fs from 'fs';
import path from 'path';

const postsDir = path.resolve('posts');
const outPath = path.join(postsDir, 'posts.json');

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

function parseFrontMatter(md){
  if(!md.startsWith('---')) return {};
  const end = md.indexOf('\n---', 3);
  if(end === -1) return {};
  const raw = md.slice(3, end).trim();
  const lines = raw.split(/\r?\n/);
  const obj = {};
  for(const line of lines){
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if(m){
      const key = m[1].trim();
      let val = m[2].trim();
      // remove surrounding quotes if present
      if((val.startsWith('"') && val.endsWith('"')) || (val.startsWith('\'') && val.endsWith('\''))){
        val = val.slice(1,-1);
      }
      obj[key] = val;
    }
  }
  return obj;
}

const posts = files.map(filename => {
  const slug = filename.replace(/\.md$/,'');
  const md = fs.readFileSync(path.join(postsDir, filename), 'utf8');
  const fm = parseFrontMatter(md);
  return {
    slug,
    title: fm.title || slug,
    date: fm.date || '1970-01-01',
    summary: fm.summary || ''
  };
}).sort((a,b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(outPath, JSON.stringify(posts, null, 2));
console.log(`Wrote ${posts.length} posts → posts/posts.json`);