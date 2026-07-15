(function() {
  const base = '/EmoSite/';

  fetch(base + 'pages/nav.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('nav-placeholder').innerHTML = html;

      const current = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('#nav-placeholder .nav-links a, #nav-placeholder .dropdown a').forEach(a => {
        const href = a.getAttribute('href') || '';
        if (current !== 'index.html' && href.endsWith(current)) {
          a.classList.add('active');
        }
      });

      document.querySelectorAll('.lang-btn').forEach(b => {
        b.addEventListener('click', () => {
          document.querySelectorAll('.lang-btn').forEach(x => x.classList.remove('active'));
          b.classList.add('active');
        });
      });
    });
})();
