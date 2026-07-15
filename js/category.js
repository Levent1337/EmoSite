function loadCategory(category) {
  fetch('/data/collections.json')
    .then(r => r.json())
    .then(collections => {
      return Promise.all(
        collections.map(col =>
          fetch('/data/' + col.id + '.json')
            .then(r => r.ok ? r.json() : null)
            .catch(() => null)
        )
      );
    })
    .then(allCollections => {
      const grid = document.getElementById('product-grid');
      grid.innerHTML = '';
      let found = false;
      allCollections
        .filter(col => col !== null)
        .forEach(col => {
        col.products
          .filter(p => p.category === category)
          .forEach(p => {
            found = true;
            grid.innerHTML +=
              '<a href="/pages/produs.html?collection=' + col.id + '&id=' + p.id + '" class="item-card">' +
              '<div class="item-img"><img src="/images/colectii/' + p.img + '.png" alt="' + p.title + '" class="shown"></div>' +
              '<div class="item-info"><h3>' + p.title + '</h3><span>' + p.label + '</span></div>' +
              '</a>';
          });
      });
      if (!found) {
        grid.innerHTML = '<p style="color:var(--text-mid);font-size:0.9rem">Nu există produse în această categorie momentan.</p>';
      }
    });
}

// Auto-trigger — script loads after DOM so just call directly
const grid = document.getElementById('product-grid');
if (grid && grid.dataset.category) {
  loadCategory(grid.dataset.category);
}