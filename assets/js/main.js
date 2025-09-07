// shared helpers
(function(){
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();
})();

export function fmtDate(iso){
  try { return new Date(iso).toLocaleDateString(undefined, {year:'numeric', month:'short', day:'2-digit'}); }
  catch { return iso; }
}

export function qs(sel, root=document){ return root.querySelector(sel); }
export function qsa(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }