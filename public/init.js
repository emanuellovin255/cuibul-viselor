// Rulează înainte de randare: activează animațiile și intro-ul (o dată pe sesiune).
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');
  try {
    if (sessionStorage.getItem('cv-intro')) root.classList.add('no-intro');
    else sessionStorage.setItem('cv-intro', '1');
  } catch (e) {
    root.classList.add('no-intro');
  }
  setTimeout(function () {
    if (!window.__motionReady) root.classList.add('motion-fallback');
  }, 3000);
})();
