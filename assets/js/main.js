// /assets/js/main.js — dark/light toggle + helpers

(function () {
  // ===== Footer year =====
  const yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  // ===== THEME: init from storage or OS preference =====
  const root = document.documentElement; // <html>
  const stored = localStorage.getItem('theme'); // 'light' | 'dark' | null
  const prefersLight =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = stored || (prefersLight ? 'light' : 'dark');
  applyTheme(initial);

  // ===== Toggle button =====
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const next =
        root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  // ===== React to OS changes (only if user hasn't chosen) =====
  if (window.matchMedia) {
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          applyTheme(e.matches ? 'light' : 'dark');
        }
      });
  }

  function applyTheme(mode) {
    if (mode === 'light') {
      root.setAttribute('data-theme', 'light');
      setToggleIcon('light');
    } else {
      root.removeAttribute('data-theme'); // default = dark tokens
      setToggleIcon('dark');
    }
  }

  function setToggleIcon(mode) {
    const b = document.getElementById('theme-toggle');
    if (!b) return;
    if (mode === 'light') {
      b.textContent = '☀️';
      b.title = 'Switch to dark mode';
      b.setAttribute('aria-label', 'Switch to dark mode');
    } else {
      b.textContent = '🌙';
      b.title = 'Switch to light mode';
      b.setAttribute('aria-label', 'Switch to light mode');
    }
  }
})();

// ===== Helper functions (attached to window for global use) =====
window.fmtDate = function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return iso;
  }
};

window.qs = function qs(sel, root = document) {
  return root.querySelector(sel);
};

window.qsa = function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
};
