(function () {
  // load main site script
  const addScript = src => {
    const s = document.createElement('script');
    s.src = src;
    s.defer = true;
    document.head.appendChild(s);
  };
  addScript('assets/js/main.js');

  // fetch and inject header/footer HTML into elements with ids "header" and "footer"
  ['header', 'footer'].forEach(id => {
    fetch(`includes/${id}.html`)
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.text(); })
      .then(html => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      })
      .catch(e => console.error('Include load error:', e));
  });
})();
