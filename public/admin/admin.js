/* Panoul de administrare Cuibul Viselor.
 * Formularele se construiesc singure din fișierele src/continut/*.json:
 * orice câmp nou adăugat într-un fișier apare automat aici.
 */
(function () {
  'use strict';

  var API = '/api/admin';

  /* ---------- iconuri (SVG inline) ---------- */
  var SVG = {
    dashboard: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>',
    bed: '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 16h20M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2V2M6 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="M19 3v4M21 5h-4"/>',
    map: '<path d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3Z"/><path d="M9 3v15M15 6v15"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
    film: '<rect x="2" y="2" width="20" height="20" rx="2.2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    up: '<path d="m18 15-6-6-6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    chev: '<path d="m9 18 6-6-6-6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    swap: '<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
  };
  function ico(name, size) {
    var s = size || 18;
    return '<svg class="ico" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (SVG[name] || '') + '</svg>';
  }

  /* ---------- ce se poate edita ---------- */
  var PAGINI = [
    { id: 'general', titlu: 'Setări generale', desc: 'Nume, telefon, WhatsApp, email, adresă, meniu, subsol, SEO și Google', ico: 'settings' },
    { id: 'acasa', titlu: 'Pagina principală', desc: 'Video, oferta de sub titlu, texte, cifre și poze', ico: 'home' },
    { id: 'camere', titlu: 'Camere & tarife', desc: 'Adăugați, ștergeți camere, schimbați prețuri și dotări', ico: 'bed' },
    { id: 'restaurant', titlu: 'Restaurant', desc: 'Mese, preparate cu poze, specialități', ico: 'utensils' },
    { id: 'facilitati', titlu: 'Facilități', desc: 'Lista de facilități, spa, grădină, râu', ico: 'sparkles' },
    { id: 'imprejurimi', titlu: 'Împrejurimi', desc: 'Distanțe, excursii, istorie, tratament', ico: 'map' },
    { id: 'recenzii', titlu: 'Recenzii', desc: 'Scor, categorii și părerile oaspeților', ico: 'star' },
    { id: 'rezervare', titlu: 'Rezervare & întrebări', desc: 'Pași, condiții, reguli și întrebări frecvente', ico: 'calendar' },
    { id: 'galerie', titlu: 'Galerie', desc: 'Categoriile din galeria foto', ico: 'grid' },
  ];

  var ICONS = ['Utensils', 'UtensilsCrossed', 'Coffee', 'Soup', 'Wine', 'Beer', 'Presentation', 'Sparkles', 'Flower2', 'Trees', 'WavesHorizontal', 'Waves', 'Fish', 'HeartPulse', 'Baby', 'Flame', 'SquareParking', 'Car', 'ConciergeBell', 'Wifi', 'CigaretteOff', 'PawPrint', 'Bath', 'BedDouble', 'Tv', 'Snowflake', 'Mountain', 'Sun', 'Bike', 'Dumbbell', 'Gamepad2', 'Music', 'Shirt', 'Key', 'ShieldCheck', 'Accessibility', 'Plane', 'MapPin', 'Star', 'Heart', 'Check'];

  var HINT_ITALIC = 'Puneți între steluțe partea scrisă cursiv și colorat, ex.: Cuibul *Viselor*';

  /* Etichete și explicații pentru câmpuri. Ce nu e aici primește o etichetă generată din nume. */
  var L = {
    nume: ['Nume'], numeScurt: ['Nume scurt', 'Apare în logo și în titlul paginilor.'], alias: ['Al doilea nume'], stele: ['Număr de stele'],
    descriere: ['Descriere'], telefon: ['Telefon', 'Așa cum vreți să apară pe site, ex. 0756 06 33 77'],
    whatsapp: ['Număr WhatsApp', 'Toate butoanele „Rezervă pe WhatsApp” deschid o conversație cu acest număr.'],
    email: ['Email', 'Cererile de rezervare pe email ajung aici.'], adresa: ['Adresă'], strada: ['Stradă și număr'], oras: ['Oraș'], judet: ['Județ'],
    codPostal: ['Cod poștal'], tara: ['Țară'], cautareHarta: ['Căutare pe hartă', 'Textul după care Google Maps găsește pensiunea.'],
    limbi: ['Limbi vorbite'], checkIn: ['Check-in'], checkOut: ['Check-out'], subtitluLogo: ['Textul mic de sub logo'],
    meniu: ['Meniul de sus'], link: ['Adresa paginii', 'Ex. /camere'], eticheta: ['Etichetă'], subsol: ['Subsolul paginii'],
    text: ['Text'], tichete: ['Text despre tichete'], benzaTichete: ['Banda galbenă cu tichete de vacanță'], afiseaza: ['Afișează pe site'],
    titlu: ['Titlu', HINT_ITALIC], subtitlu: ['Subtitlu'], chemareFinala: ['Secțiunea „Rezervări” de la finalul paginilor'], buton: ['Textul butonului'],
    poza: ['Poză'], pagina404: ['Pagina „nu există” (404)'], seo: ['SEO și Google'],
    adresaSite: ['Adresa site-ului', 'Domeniul pe care e publicat site-ul, ex. https://www.cuibulviselor.ro. Se folosește în sitemap pentru Google.'],
    pozaDistribuire: ['Poza de distribuire', 'Apare când cineva trimite linkul site-ului pe WhatsApp sau Facebook.'],
    codVerificareGoogle: ['Cod de verificare Google Search Console', 'Lipiți aici codul din Search Console (metoda „Etichetă HTML”). Puteți lipi toată eticheta <meta …>, se ia singur codul.'],
    hero: ['Partea de sus (video)'], oferta: ['Oferta de sub titlu'],
    video: ['Videoul de fundal', 'Calea videoului, ex. /video/cuibul-viselor.mp4. Videouri noi se încarcă din „Video”.'],
    posterVideo: ['Imaginea afișată până pornește videoul'], textPret: ['Textul de sub preț'],
    despre: ['Secțiunea „Bine ați venit”'], citat: ['Citat mare'], text1: ['Primul paragraf'], text2: ['Al doilea paragraf'],
    pozaMare: ['Poza mare'], pozaMica: ['Poza mică'], cifre: ['Cifre'], valoare: ['Valoare'], sufix: ['După cifră', 'Ex. „ km” sau „/7”'],
    film: ['Videoul de prezentare (după Camere)'], fisierVideo: ['Fișierul video', 'Calea videoului, ex. /video/prezentare.mp4. Se vede întreg, cu sonor la apăsare.'],
    copertaVideo: ['Imaginea afișată înainte de pornire'],
    cuvinteBanda: ['Cuvintele care defilează'], camere: ['Camere'], gradina: ['Grădina'], textMare: ['Textul mare'],
    poza1: ['Poza 1'], poza2: ['Poza 2'], poza3: ['Poza 3'], facilitati: ['Facilități'], restaurant: ['Restaurant'],
    preparate: ['Preparate'], imprejurimi: ['Împrejurimi'], pagina: ['Textele paginii'],
    titluSeo: ['Titlul în Google', 'Apare în rezultatele Google și în tabul browserului.'], descriereSeo: ['Descrierea în Google', 'Ideal 140–160 de caractere.'],
    titluTarife: ['Titlul secțiunii de tarife', HINT_ITALIC], notaTarife: ['Nota de sub tarife'], notaCamera: ['Nota de sub preț, pe pagina camerei'],
    pozaFinal: ['Poza de la final'], slug: ['Adresa paginii', 'Lăsați gol la o cameră nouă: se face singură din nume. Nu o schimbați la camere deja publicate.'],
    pret: ['Preț / noapte (RON)'], persoane: ['Număr maxim de persoane'], suprafata: ['Suprafață (m²)'], paturi: ['Paturi'],
    evidentiere: ['Eticheta evidențiată', 'Ex. „Jacuzzi în cameră”'], intro: ['Introducere scurtă'], vedere: ['Vedere'], dotari: ['Dotări'],
    nota: ['Notă (opțional)'], folderPoze: ['Folderul de poze', 'Folderul din „Poze” cu pozele camerei, ex. camere/royal. Prima poză devine coperta.'],
    dotariComune: ['Dotări prezente în toate camerele'], serviciu: ['Tipul de serviciu'], serviciuDetaliat: ['Explicația serviciului'],
    mese: ['Mesele zilei'], specialitati: ['Specialități'], extra: ['Bar, conferințe, grătar'], icon: ['Iconiță'],
    spa: ['Spa'], unitate: ['Unitate'], detaliu: ['Detaliu'], rau: ['Râul Cerna'], puncte: ['Puncte'],
    practic: ['Secțiunea „Practic”'], lista: ['Listă'], istorie: ['Istorie'], momente: ['Momente'], an: ['An'], tratament: ['Tratament'],
    tipuriApe: ['Tipuri de ape'], tratamente: ['Tratamente'], excursii: ['Excursii'], distante: ['Distanțe'], loc: ['Loc'], km: ['Km'],
    descrieriPoze: ['Descrierile pozelor din galerie', 'În ordinea pozelor din folderul imprejurimi.'],
    scor: ['Scor general (ex. 9.0)'], calificativ: ['Calificativ'], numarEvaluari: ['Număr de evaluări'], sursa: ['Sursa evaluărilor'],
    categorii: ['Categorii'], recenzii: ['Recenzii'], formular: ['Formularul de rezervare'], mesajSucces: ['Mesajul după trimitere'],
    procedura: ['Procedura de rezervare'], pasi: ['Pași'], reguli: ['Condiții de rezervare'], politici: ['Regulile casei'],
    intrebari: ['Întrebări frecvente'], intrebare: ['Întrebare'], raspuns: ['Răspuns'], id: ['Cod intern', 'Nu îl schimbați.'],
    foldere: ['Foldere de poze'], etichetaMese: ['Eticheta secțiunii „Mese”'], titluMese: ['Titlul secțiunii „Mese”', HINT_ITALIC],
    textMese: ['Textul secțiunii „Mese”'], autorCitat: ['Autorul citatului'], pozaLata: ['Poza lată'], etichetaBucatarie: ['Eticheta secțiunii „Bucătărie”'],
    titluBucatarie: ['Titlul secțiunii „Bucătărie”', HINT_ITALIC], textBucatarie: ['Textul secțiunii „Bucătărie”'], notaBucatarie: ['Nota de sub preparate'],
    titluExtra: ['Titlul secțiunii „Și mai mult”', HINT_ITALIC], titluGalerie: ['Titlul galeriei', HINT_ITALIC], titluFinal: ['Titlul de la final', HINT_ITALIC],
    textFinal: ['Textul de la final'], titluLista: ['Titlul listei', HINT_ITALIC],
  };
  var LONG = /^(text|descriere|textMare|raspuns|citat|text1|text2|intro|subtitlu|notaTarife|serviciuDetaliat|textMese|textBucatarie|notaBucatarie|textFinal|tratamente|descriereSeo|mesajSucces)$/;
  var SUMMARY_KEYS = ['nume', 'titlu', 'intrebare', 'loc', 'eticheta', 'text', 'an', 'valoare', 'poza'];

  function label(key) {
    if (L[key]) return L[key][0];
    var s = String(key).replace(/([A-Z])/g, ' $1').replace(/(\d+)/g, ' $1').toLowerCase().trim();
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  function hint(key) {
    if (L[key] && L[key][1]) return L[key][1];
    if (/^titlu/.test(key) && key !== 'titluSeo') return HINT_ITALIC;
    return '';
  }

  /* ---------- stare ---------- */
  var S = {
    stare: null,
    view: 'panou',
    fisier: null, // { id, data, sha, original }
    poze: null, // [{cale, sha, marime}]
    video: [],
    raw: '',
    folder: null,
    dirty: false,
  };

  /* ---------- utilitare DOM ---------- */
  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'html') el.innerHTML = v;
        else if (k === 'text') el.textContent = v;
        else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
        else if (k === 'class') el.className = v;
        else el.setAttribute(k, v === true ? '' : v);
      });
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) continue;
      if (Array.isArray(c)) c.forEach(function (x) { if (x) el.appendChild(typeof x === 'string' ? document.createTextNode(x) : x); });
      else el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return el;
  }
  function btn(cls, inner, onclick, title) {
    return h('button', { type: 'button', class: 'btn ' + (cls || ''), html: inner, onclick: onclick, title: title, 'aria-label': title });
  }
  var toastTimer;
  function toast(msg, err) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast' + (err ? ' err' : '');
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, err ? 6000 : 3500);
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function fmtData(iso) {
    try {
      return new Date(iso).toLocaleString('ro-RO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return iso; }
  }

  /* ---------- API ---------- */
  function api(actiune, body) {
    var opt = { method: body ? 'POST' : 'GET', credentials: 'same-origin', headers: {} };
    if (body) {
      opt.headers['Content-Type'] = 'application/json';
      opt.body = JSON.stringify(body);
    }
    return fetch(API + '?actiune=' + actiune, opt).then(function (r) {
      var ct = r.headers.get('content-type') || '';
      if (ct.indexOf('application/json') === -1) {
        var e = new Error('Panoul funcționează doar pe site-ul publicat pe Vercel.');
        e.status = r.status;
        throw e;
      }
      return r.json().then(function (d) {
        if (!r.ok) {
          var err = new Error(d.eroare || 'Eroare ' + r.status);
          err.status = r.status;
          throw err;
        }
        return d;
      });
    }).catch(function (e) {
      if (e.status === 401 && actiune !== 'intra') {
        S.stare && (S.stare.autentificat = false);
        renderLogin('Sesiunea a expirat. Intrați din nou.');
      }
      throw e;
    });
  }

  /* ---------- pornire ---------- */
  var app = document.getElementById('app');

  function start() {
    api('stare')
      .then(function (st) {
        S.stare = st;
        if (!st.autentificat) renderLogin();
        else renderShell();
      })
      .catch(function (e) {
        app.innerHTML = '';
        app.appendChild(
          h('div', { class: 'login' },
            h('div', { class: 'login-card' },
              h('div', { class: 'logo-mark', text: 'C' }),
              h('h1', { html: 'Panoul <em>Cuibul Viselor</em>' }),
              h('p', { text: e.message }),
              h('p', { class: 'muted', text: 'Dacă site-ul e publicat pe Vercel, verificați că funcția api/admin.js a fost publicată.' }))));
      });
  }

  function renderLogin(msg) {
    app.innerHTML = '';
    var err = h('p', { class: 'notice err', hidden: !msg, text: msg || '' });
    var pass = h('input', { type: 'password', id: 'parola', autocomplete: 'current-password', required: true, placeholder: 'Parola' });
    var go = h('button', { type: 'submit', class: 'btn brass block', text: 'Intră în panou' });
    var notConf = S.stare && !S.stare.configurat
      ? h('div', { class: 'notice err' }, h('span', { html: 'Panoul nu este configurat încă. Lipsesc în Vercel: <code>' + S.stare.lipsesc.join('</code>, <code>') + '</code>. Pașii sunt în fișierul <code>ADMIN.md</code> din repo.' }))
      : null;
    var form = h('form', {
      onsubmit: function (e) {
        e.preventDefault();
        go.disabled = true;
        go.textContent = 'Se verifică…';
        api('intra', { parola: pass.value })
          .then(function () { return api('stare'); })
          .then(function (st) { S.stare = st; renderShell(); })
          .catch(function (e2) {
            err.textContent = e2.message;
            err.hidden = false;
            go.disabled = false;
            go.textContent = 'Intră în panou';
            pass.select();
          });
      },
    },
      notConf,
      err,
      h('label', { class: 'f', for: 'parola' }, h('span', { class: 'f-label', text: 'Parola' }), pass),
      h('div', { class: 'mt' }, go));
    app.appendChild(
      h('div', { class: 'login' },
        h('div', { class: 'login-card' },
          h('div', { class: 'logo-mark', text: 'C' }),
          h('h1', { html: 'Cuibul <em>Viselor</em>' }),
          h('p', { text: 'Panoul de administrare. Scrieți parola ca să schimbați textele, prețurile, pozele și videoul site-ului.' }),
          form)));
    setTimeout(function () { pass.focus(); }, 50);
  }

  /* ---------- schelet ---------- */
  var side, main, topTitle, topSub, topActions, content, savebar;

  function navBtn(id, text, icon) {
    return h('button', {
      type: 'button', class: 'nav' + (S.view === id ? ' active' : ''), 'data-view': id, html: ico(icon) + '<span>' + text + '</span>',
      onclick: function () { go(id); },
    });
  }

  function renderShell() {
    app.innerHTML = '';
    side = h('aside', { class: 'side' },
      h('div', { class: 'brand' }, h('div', { class: 'logo-mark', text: 'C' }), h('div', null, h('b', { text: 'Cuibul Viselor' }), h('small', { text: 'Panou de administrare' }))),
      navBtn('panou', 'Tablou de bord', 'dashboard'),
      h('div', { class: 'nav-group', text: 'Conținut' }),
      PAGINI.map(function (p) { return navBtn(p.id, p.titlu, p.ico); }),
      h('div', { class: 'nav-group', text: 'Media' }),
      navBtn('poze', 'Poze', 'image'),
      navBtn('video', 'Video', 'film'),
      h('div', { class: 'spacer' }),
      h('div', { class: 'foot' },
        h('a', { href: '../', target: '_blank', rel: 'noopener', html: ico('external', 16) + ' Vezi site-ul' }),
        h('button', {
          type: 'button', html: ico('logout', 16) + ' Ieșire',
          onclick: function () {
            if (S.dirty && !confirm('Aveți modificări nesalvate. Ieșiți oricum?')) return;
            api('iesi', {}).finally(function () { S.dirty = false; S.stare.autentificat = false; renderLogin(); });
          },
        })));
    topTitle = h('h2');
    topSub = h('div', { class: 'sub' });
    topActions = h('div', { class: 'actions' });
    content = h('div', { class: 'content' });
    var menu = btn('ghost icon menu-btn', ico('menu'), function () { side.classList.toggle('open'); }, 'Meniu');
    main = h('main', { class: 'main' },
      h('div', { class: 'topbar' }, h('div', { class: 'row' }, menu, h('div', null, topTitle, topSub)), topActions),
      content);
    savebar = h('div', { class: 'savebar' },
      h('span', { text: 'Aveți modificări nesalvate.' }),
      h('div', { class: 'row' },
        btn('ghost small', 'Renunță', function () { if (confirm('Renunțați la modificări?')) openFile(S.fisier.id, true); }),
        h('button', { type: 'button', class: 'btn brass', html: ico('check', 16) + ' Salvează și publică', onclick: save, 'data-save': true })));
    savebar.querySelector('.btn.ghost').style.color = '#fff';
    app.appendChild(h('div', { class: 'shell' }, side, main));
    app.appendChild(savebar);
    go(S.view || 'panou', true);
  }

  function setDirty(v) {
    S.dirty = v;
    if (savebar) savebar.classList.toggle('show', !!v);
  }
  window.addEventListener('beforeunload', function (e) {
    if (S.dirty) { e.preventDefault(); e.returnValue = ''; }
  });

  function go(view, force) {
    if (!force && S.dirty && view !== S.view && !confirm('Aveți modificări nesalvate. Plecați fără să salvați?')) return;
    setDirty(false);
    S.view = view;
    side.classList.remove('open');
    side.querySelectorAll('button.nav').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-view') === view); });
    topActions.innerHTML = '';
    content.innerHTML = '<div class="splash" style="min-height:40vh"><span class="spinner"></span></div>';
    window.scrollTo(0, 0);
    if (view === 'panou') return renderPanou();
    if (view === 'poze') return renderPoze();
    if (view === 'video') return renderVideo();
    openFile(view);
  }

  /* ---------- tablou de bord ---------- */
  function renderPanou() {
    topTitle.textContent = 'Tablou de bord';
    topSub.textContent = S.stare.repo + ' · ' + S.stare.branch;
    content.innerHTML = '';
    var stats = h('div', { class: 'stats' });
    var commits = h('ul', { class: 'commits' }, h('li', { class: 'muted', text: 'Se încarcă…' }));

    content.appendChild(h('p', { class: 'hello', html: 'Bine ați venit în <em>Cuibul Viselor</em>' }));
    content.appendChild(h('p', { class: 'lead', text: 'Alegeți ce vreți să schimbați. După ce apăsați „Salvează și publică”, site-ul se actualizează singur în 1–2 minute.' }));
    if (!S.stare.configurat) {
      content.appendChild(h('div', { class: 'notice err', html: 'Lipsesc variabile în Vercel: <code>' + S.stare.lipsesc.join('</code>, <code>') + '</code>. Salvarea nu va funcționa până nu sunt puse (vezi <code>ADMIN.md</code>).' }));
    }
    content.appendChild(stats);
    content.appendChild(h('div', { class: 'tiles' },
      PAGINI.concat([
        { id: 'poze', titlu: 'Poze', desc: 'Încărcați, înlocuiți sau ștergeți poze', ico: 'image' },
        { id: 'video', titlu: 'Video', desc: 'Videoul din partea de sus a site-ului', ico: 'film' },
      ]).map(function (p) {
        return h('button', { type: 'button', class: 'tile', onclick: function () { go(p.id); } },
          h('span', { class: 'ti', html: ico(p.ico, 20) }), h('b', { text: p.titlu }), h('span', { text: p.desc }));
      })));
    content.appendChild(h('div', { class: 'card mt' }, h('h3', { text: 'Ultimele modificări publicate' }), commits));

    loadPoze().then(function () {
      var folders = {};
      S.poze.forEach(function (p) { folders[p.cale.slice(0, p.cale.lastIndexOf('/'))] = 1; });
      stats.innerHTML = '';
      stats.appendChild(h('div', { class: 'stat' }, h('b', { text: String(S.poze.length) }), h('span', { text: 'poze pe site' })));
      stats.appendChild(h('div', { class: 'stat' }, h('b', { text: String(Object.keys(folders).length) }), h('span', { text: 'foldere de poze' })));
    }).catch(function () {});
    api('publicari').then(function (d) {
      commits.innerHTML = '';
      d.commits.forEach(function (c, i) {
        commits.appendChild(h('li', null, h('span', { text: c.mesaj }), h('time', { text: fmtData(c.data) })));
        if (i === 0) stats.appendChild(h('div', { class: 'stat' }, h('b', { text: fmtData(c.data).split(',')[0] }), h('span', { text: 'ultima publicare' })));
      });
    }).catch(function (e) { commits.innerHTML = ''; commits.appendChild(h('li', { class: 'muted', text: e.message })); });
  }

  /* ---------- editorul de conținut ---------- */
  function openFile(id, reload) {
    var meta = PAGINI.filter(function (p) { return p.id === id; })[0];
    topTitle.textContent = meta ? meta.titlu : id;
    topSub.textContent = meta ? meta.desc : '';
    Promise.all([api('citeste', { fisier: id }), loadPoze().catch(function () {})])
      .then(function (res) {
        var d = res[0];
        S.fisier = { id: id, data: d.continut, sha: d.sha };
        setDirty(false);
        renderEditor();
        if (reload) toast('Modificările au fost anulate.');
      })
      .catch(function (e) { content.innerHTML = ''; content.appendChild(h('div', { class: 'notice err', text: e.message })); });
    topActions.innerHTML = '';
    topActions.appendChild(h('a', { class: 'btn ghost small', href: '../', target: '_blank', rel: 'noopener', html: ico('external', 15) + ' Vezi site-ul' }));
  }

  function renderEditor() {
    content.innerHTML = '';
    var data = S.fisier.data;
    var simple = [];
    var blocks = [];
    Object.keys(data).forEach(function (k) {
      var v = data[k];
      if (v && typeof v === 'object') blocks.push(k);
      else simple.push(k);
    });
    if (simple.length) {
      var c = h('div', { class: 'card' }, h('h3', { text: 'Principal' }), h('div', { class: 'fields two' }, simple.map(function (k) { return field(data, k, k); })));
      content.appendChild(c);
    }
    blocks.forEach(function (k) {
      var v = data[k];
      var body = Array.isArray(v) ? arrayField(data, k) : objectFields(v, k);
      content.appendChild(h('div', { class: 'card' }, h('h3', { text: label(k) }), hint(k) ? h('p', { class: 'f-hint', style: 'margin-top:-8px;margin-bottom:14px', text: hint(k) }) : null, body));
    });
  }

  function objectFields(obj, parentKey) {
    var wrap = h('div', { class: 'fields two' });
    Object.keys(obj).forEach(function (k) {
      var v = obj[k];
      if (v && typeof v === 'object') {
        var inner = Array.isArray(v) ? arrayField(obj, k) : objectFields(v, k);
        wrap.appendChild(h('div', { class: 'group', style: 'grid-column:1/-1' }, h('div', { class: 'group-title', text: label(k) }), hint(k) ? h('p', { class: 'f-hint', style: 'margin:-10px 0 12px', text: hint(k) }) : null, inner));
      } else {
        wrap.appendChild(field(obj, k, k, parentKey));
      }
    });
    return wrap;
  }

  function isPhoto(key, parentKey, value) {
    return typeof value === 'string' && (key === 'poza' || /^poza/.test(key) || parentKey === 'preparate');
  }

  function field(obj, key, displayKey, parentKey) {
    var v = obj[key];
    var lab = label(displayKey);
    var hn = hint(displayKey);
    var wide = typeof v === 'string' && (LONG.test(displayKey) || v.length > 70);
    var wrapper = h('label', { class: 'f', style: wide ? 'grid-column:1/-1' : null });
    var set = function (val) { obj[key] = val; setDirty(true); };

    if (typeof v === 'boolean') {
      var cb = h('input', { type: 'checkbox', onchange: function () { set(cb.checked); } });
      cb.checked = v;
      return h('div', { class: 'f' }, h('label', { class: 'toggle' }, cb, h('span', { text: lab })), hn ? h('p', { class: 'f-hint', text: hn }) : null);
    }

    var input;
    if (typeof v === 'number') {
      input = h('input', { type: 'number', step: 'any', value: String(v), oninput: function () { set(input.value === '' ? 0 : Number(input.value)); } });
    } else if (isPhoto(displayKey, parentKey, v)) {
      return h('div', { class: 'f', style: 'grid-column:1/-1' }, h('span', { class: 'f-label', text: lab }), photoField(v, set), hn ? h('p', { class: 'f-hint', text: hn }) : null);
    } else if (displayKey === 'icon') {
      input = h('select', { onchange: function () { set(input.value); } }, ICONS.map(function (n) { return h('option', { value: n, text: n, selected: n === v }); }));
    } else if (displayKey === 'folderPoze' || parentKey === 'foldere') {
      input = h('input', { type: 'text', value: v, list: 'dl-foldere', oninput: function () { set(input.value.trim()); } });
      ensureFolderList();
    } else if (wide) {
      input = h('textarea', { rows: Math.min(10, Math.max(3, Math.ceil(v.length / 90))), oninput: function () { set(input.value); } });
      input.value = v;
    } else {
      input = h('input', { type: 'text', value: v == null ? '' : String(v), oninput: function () { set(input.value); } });
    }
    wrapper.appendChild(h('span', { class: 'f-label', text: lab }));
    wrapper.appendChild(input);
    if (hn) wrapper.appendChild(h('p', { class: 'f-hint', text: hn }));
    return wrapper;
  }

  function blank(tpl) {
    if (Array.isArray(tpl)) return [];
    if (tpl && typeof tpl === 'object') {
      var o = {};
      Object.keys(tpl).forEach(function (k) { o[k] = blank(tpl[k]); });
      return o;
    }
    if (typeof tpl === 'number') return 0;
    if (typeof tpl === 'boolean') return false;
    return '';
  }

  function summary(item, i) {
    if (item && typeof item === 'object') {
      for (var j = 0; j < SUMMARY_KEYS.length; j++) {
        var v = item[SUMMARY_KEYS[j]];
        if (typeof v === 'string' && v.trim()) return v.replace(/\*/g, '');
      }
    }
    return 'Element ' + (i + 1);
  }

  function arrayField(parent, key) {
    var arr = parent[key];
    var box = h('div');
    var objects = arr.length ? typeof arr[0] === 'object' : false;
    var tpl = arr.length ? clone(arr[0]) : '';
    var openIdx = -1;

    function move(i, d) {
      var j = i + d;
      if (j < 0 || j >= arr.length) return;
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
      openIdx = objects ? j : -1;
      setDirty(true); draw();
    }
    function remove(i) {
      if (objects && !confirm('Ștergeți „' + summary(arr[i], i) + '”?')) return;
      arr.splice(i, 1); setDirty(true); draw();
    }
    function add() {
      arr.push(objects ? blank(tpl) : (key === 'preparate' && arr.length ? arr[arr.length - 1] : ''));
      openIdx = arr.length - 1;
      setDirty(true); draw();
      var last = box.querySelector('.list > :last-child input, .list > :last-child textarea');
      if (last) last.focus();
    }
    function tools(i) {
      return h('div', { class: 'list-tools' },
        btn('ghost icon', ico('up', 16), function (e) { e.preventDefault(); move(i, -1); }, 'Mută mai sus'),
        btn('ghost icon', ico('down', 16), function (e) { e.preventDefault(); move(i, 1); }, 'Mută mai jos'),
        btn('danger icon', ico('trash', 16), function (e) { e.preventDefault(); remove(i); }, 'Șterge'));
    }
    function draw() {
      box.innerHTML = '';
      var list = h('div', { class: 'list' });
      arr.forEach(function (item, i) {
        if (objects) {
          var title = h('span', { class: 't', text: summary(item, i) });
          var det = h('details', { class: 'item', open: i === openIdx },
            h('summary', null, h('span', { class: 'num', text: String(i + 1) }), title, tools(i), h('span', { class: 'chev', html: ico('chev', 16) })),
            h('div', { class: 'body' }, objectFields(item, key)));
          det.addEventListener('input', function () { title.textContent = summary(item, i); });
          list.appendChild(det);
        } else {
          var holder = {};
          holder.v = item;
          var f = field(holder, 'v', key === 'preparate' ? 'poza' : key + '_item', key);
          var sync = function () { arr[i] = holder.v; };
          f.addEventListener('input', sync);
          f.addEventListener('change', sync);
          f.addEventListener('pick', sync);
          var lbl = f.querySelector('.f-label');
          if (lbl) lbl.remove();
          list.appendChild(h('div', { class: 'list-row' }, f, tools(i)));
        }
      });
      box.appendChild(list);
      if (!arr.length) box.appendChild(h('p', { class: 'muted', text: 'Nimic încă.' }));
      box.appendChild(h('div', { class: 'add-row' }, btn('ghost small', ico('plus', 15) + ' Adaugă', function (e) { e.preventDefault(); add(); })));
    }
    draw();
    return box;
  }

  /* ---------- poze ---------- */
  function loadPoze(force) {
    if (S.poze && !force) return Promise.resolve(S.poze);
    return api('poze').then(function (d) {
      S.poze = d.poze.sort(function (a, b) { return a.cale.localeCompare(b.cale); });
      S.video = d.video;
      S.raw = d.raw;
      return S.poze;
    });
  }
  function photoUrl(cale) { return S.raw + 'src/assets/photos/' + cale + '?v=' + (findPoza(cale.replace(/\.(jpe?g)$/i, '')) || {}).sha; }
  function findPoza(key) {
    if (!S.poze) return null;
    return S.poze.filter(function (p) { return p.cale.replace(/\.(jpe?g)$/i, '') === key; })[0] || null;
  }
  function folders() {
    var f = {};
    (S.poze || []).forEach(function (p) {
      var d = p.cale.slice(0, p.cale.lastIndexOf('/'));
      f[d] = (f[d] || 0) + 1;
    });
    return f;
  }
  function ensureFolderList() {
    var dl = document.getElementById('dl-foldere');
    if (!dl) { dl = h('datalist', { id: 'dl-foldere' }); document.body.appendChild(dl); }
    dl.innerHTML = '';
    Object.keys(folders()).sort().forEach(function (f) { dl.appendChild(h('option', { value: f })); });
  }

  function photoField(value, set) {
    var wrap = h('div', { class: 'photo-field' });
    function draw() {
      wrap.innerHTML = '';
      var p = findPoza(value);
      wrap.appendChild(h('div', { class: 'thumb' }, p ? h('img', { src: photoUrl(p.cale), alt: '', loading: 'lazy' }) : null));
      wrap.appendChild(h('div', { class: 'meta', text: value ? value + (p ? '' : ' (nu există – se folosește altă poză)') : 'Nicio poză aleasă' }));
      wrap.appendChild(btn('ghost small', ico('image', 15) + ' Alege', function (e) {
        e.preventDefault();
        pickPhoto(value, function (v) { value = v; set(v); draw(); wrap.dispatchEvent(new Event('pick', { bubbles: true })); });
      }));
    }
    draw();
    return wrap;
  }

  function pickPhoto(current, done) {
    loadPoze().then(function () {
      var f = folders();
      var names = Object.keys(f).sort();
      var cur = current && current.indexOf('/') > -1 ? current.slice(0, current.lastIndexOf('/')) : names[0];
      var grid = h('div', { class: 'grid' });
      var chips = h('div', { class: 'folders' });
      function draw() {
        chips.innerHTML = '';
        names.forEach(function (n) {
          chips.appendChild(h('button', { type: 'button', class: 'chip' + (n === cur ? ' active' : ''), html: n + '<small>' + f[n] + '</small>', onclick: function () { cur = n; draw(); } }));
        });
        grid.innerHTML = '';
        S.poze.filter(function (p) { return p.cale.slice(0, p.cale.lastIndexOf('/')) === cur; }).forEach(function (p) {
          var key = p.cale.replace(/\.(jpe?g)$/i, '');
          grid.appendChild(h('div', {
            class: 'ph pick' + (key === current ? ' sel' : ''), tabindex: '0', role: 'button', 'aria-label': key,
            onclick: function () { close(); done(key); },
            onkeydown: function (e) { if (e.key === 'Enter') { close(); done(key); } },
          }, h('img', { src: photoUrl(p.cale), alt: '', loading: 'lazy' }), h('div', { class: 'cap' }, h('span', { text: key.split('/').pop() }))));
        });
      }
      var m = modal('Alegeți o poză', h('div', null,
        h('p', { class: 'muted', style: 'margin-top:0', html: 'Pentru o poză nouă, încărcați-o întâi din <b>Poze</b>.' }), chips, grid));
      function close() { m.remove(); }
      draw();
    }).catch(function (e) { toast(e.message, true); });
  }

  function modal(title, body) {
    var m = h('div', { class: 'modal', onclick: function (e) { if (e.target === m) m.remove(); } },
      h('div', { class: 'modal-box', role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
        h('div', { class: 'modal-head' }, h('h3', { text: title }), btn('ghost icon', ico('x'), function () { m.remove(); }, 'Închide')),
        h('div', { class: 'modal-body' }, body)));
    document.body.appendChild(m);
    var esc = function (e) { if (e.key === 'Escape') { m.remove(); document.removeEventListener('keydown', esc); } };
    document.addEventListener('keydown', esc);
    return m;
  }

  /** Micșorează poza în browser (max 2000 px, JPEG), ca să încapă în limita serverului. */
  function prepara(file, max) {
    max = max || 2000;
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        var w = img.naturalWidth, hh = img.naturalHeight;
        var k = Math.min(1, max / Math.max(w, hh));
        var c = document.createElement('canvas');
        c.width = Math.round(w * k); c.height = Math.round(hh * k);
        var ctx = c.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        var q = 0.85;
        (function tryQ() {
          var data = c.toDataURL('image/jpeg', q);
          var b64 = data.slice(data.indexOf(',') + 1);
          if (b64.length > 3.8e6 && q > 0.5) { q -= 0.1; return tryQ(); }
          resolve(b64);
        })();
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('Fișierul ' + file.name + ' nu este o imagine.')); };
      img.src = url;
    });
  }

  function nextName(folder) {
    var max = 0;
    (S.poze || []).forEach(function (p) {
      if (p.cale.slice(0, p.cale.lastIndexOf('/')) !== folder) return;
      var n = parseInt(p.cale.split('/').pop(), 10);
      if (n > max) max = n;
    });
    var s = String(max + 1);
    return s.length < 2 ? '0' + s : s;
  }

  function cleanFolder(v) {
    return String(v || '')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase().replace(/[^a-z0-9/-]+/g, '-').replace(/\/+/g, '/').replace(/^[-/]+|[-/]+$/g, '')
      .split('/').slice(0, 2).join('/');
  }

  function renderPoze() {
    topTitle.textContent = 'Poze';
    topSub.textContent = 'Încărcați, înlocuiți sau ștergeți pozele site-ului';
    loadPoze(true).then(function () {
      content.innerHTML = '';
      var f = folders();
      var names = Object.keys(f).sort();
      if (!S.folder || (!f[S.folder] && names.indexOf(S.folder) === -1 && !S.folderNou)) S.folder = names[0];

      var chips = h('div', { class: 'folders' });
      names.concat(S.folderNou && names.indexOf(S.folderNou) === -1 ? [S.folderNou] : []).forEach(function (n) {
        chips.appendChild(h('button', { type: 'button', class: 'chip' + (n === S.folder ? ' active' : ''), html: n + '<small>' + (f[n] || 0) + '</small>', onclick: function () { S.folder = n; renderPoze(); } }));
      });
      chips.appendChild(h('button', {
        type: 'button', class: 'chip', html: '+ Folder nou',
        onclick: function () {
          var n = cleanFolder(prompt('Numele folderului nou (ex. camere/camera-noua sau terasa):', 'camere/'));
          if (!n) return;
          S.folderNou = n; S.folder = n; renderPoze();
        },
      }));

      var input = h('input', { type: 'file', accept: 'image/*', multiple: true, hidden: true, onchange: function () { upload(Array.from(input.files)); input.value = ''; } });
      var bar = h('div', { class: 'progress', hidden: true }, h('i'));
      var status = h('p', { class: 'muted', style: 'margin:10px 0 0' });
      var drop = h('div', { class: 'drop' },
        h('p', { style: 'margin:0 0 12px', html: 'Trageți pozele aici sau' }),
        btn('brass', ico('upload', 16) + ' Alege poze pentru „' + S.folder + '”', function () { input.click(); }),
        h('p', { class: 'f-hint', text: 'Pozele se micșorează singure la 2000 px și se adaugă la finalul folderului. Ordinea pe site e dată de nume (01, 02, 03…).' }),
        bar, status, input);
      ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); }); });
      ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); }); });
      drop.addEventListener('drop', function (e) { upload(Array.from(e.dataTransfer.files).filter(function (x) { return /^image\//.test(x.type); })); });

      function upload(files, replace) {
        if (!files.length) return;
        bar.hidden = false;
        var i = 0;
        (function next() {
          if (i >= files.length) {
            status.textContent = 'Gata. Site-ul se actualizează în 1–2 minute.';
            toast(files.length === 1 ? 'Poza a fost publicată.' : files.length + ' poze au fost publicate.');
            S.folderNou = null;
            return loadPoze(true).then(renderPoze);
          }
          var file = files[i];
          var cale = replace ? replace.cale : S.folder + '/' + nextName(S.folder) + '.jpg';
          status.textContent = 'Se încarcă ' + (i + 1) + ' din ' + files.length + ': ' + file.name + '…';
          bar.firstChild.style.width = Math.round((i / files.length) * 100) + '%';
          prepara(file)
            .then(function (b64) { return api('incarca', { cale: cale, base64: b64, sha: replace ? replace.sha : undefined }); })
            .then(function (r) {
              if (!replace) S.poze.push({ cale: cale, sha: r.sha, marime: 0 });
              i++; next();
            })
            .catch(function (e) { toast(e.message, true); status.textContent = e.message; });
        })();
      }

      var grid = h('div', { class: 'grid' });
      S.poze.filter(function (p) { return p.cale.slice(0, p.cale.lastIndexOf('/')) === S.folder; }).forEach(function (p, idx) {
        var key = p.cale.replace(/\.(jpe?g)$/i, '');
        var rep = h('input', { type: 'file', accept: 'image/*', hidden: true, onchange: function () { if (rep.files[0]) upload([rep.files[0]], p); } });
        grid.appendChild(h('div', { class: 'ph' },
          h('img', { src: photoUrl(p.cale), alt: key, loading: 'lazy' }),
          h('div', { class: 'tools' },
            h('button', { type: 'button', title: 'Copiază numele', 'aria-label': 'Copiază numele', html: ico('copy', 15), onclick: function () { navigator.clipboard && navigator.clipboard.writeText(key); toast('Copiat: ' + key); } }),
            h('button', { type: 'button', title: 'Înlocuiește', 'aria-label': 'Înlocuiește', html: ico('swap', 15), onclick: function () { rep.click(); } }),
            h('button', {
              type: 'button', title: 'Șterge', 'aria-label': 'Șterge', html: ico('trash', 15),
              onclick: function () {
                if (!confirm('Ștergeți poza ' + key + '? Nu se poate anula.')) return;
                api('sterge', { cale: p.cale, sha: p.sha }).then(function () { toast('Poza a fost ștearsă.'); return loadPoze(true); }).then(renderPoze).catch(function (e) { toast(e.message, true); });
              },
            })),
          h('div', { class: 'cap' }, h('span', { text: key.split('/').pop() }), h('span', { text: idx === 0 ? 'copertă' : '' })),
          rep));
      });

      content.appendChild(chips);
      content.appendChild(drop);
      content.appendChild(grid);
      if (!grid.children.length) content.appendChild(h('p', { class: 'muted', text: 'Folderul e gol. Încărcați prima poză.' }));
    }).catch(function (e) { content.innerHTML = ''; content.appendChild(h('div', { class: 'notice err', text: e.message })); });
  }

  /* ---------- video ---------- */
  function renderVideo() {
    topTitle.textContent = 'Video';
    topSub.textContent = 'Videoul de fundal din partea de sus a paginii principale';
    Promise.all([loadPoze(true), api('citeste', { fisier: 'acasa' })]).then(function (res) {
      var acasa = res[1];
      var curent = acasa.continut.hero.video;
      content.innerHTML = '';
      var list = h('div', { class: 'list' });
      S.video.filter(function (v) { return /\.mp4$/.test(v.cale); }).forEach(function (v) {
        var path = '/video/' + v.cale;
        list.appendChild(h('div', { class: 'item', style: 'padding:14px' },
          h('div', { class: 'row between' },
            h('div', null, h('b', { text: v.cale }), h('div', { class: 'muted', text: (v.marime / 1048576).toFixed(1) + ' MB' + (path === curent ? ' · folosit acum' : '') })),
            h('div', { class: 'row' },
              h('a', { class: 'btn ghost small', href: '..' + path, target: '_blank', rel: 'noopener', html: ico('external', 14) + ' Vezi' }),
              path === curent ? null : btn('brass small', 'Folosește pe site', function () {
                acasa.continut.hero.video = path;
                api('salveaza', { fisier: 'acasa', continut: acasa.continut, sha: acasa.sha }).then(function () { toast('Videoul a fost schimbat. Site-ul se actualizează în 1–2 minute.'); renderVideo(); }).catch(function (e) { toast(e.message, true); });
              })))));
      });
      var input = h('input', { type: 'file', accept: 'video/mp4', hidden: true, onchange: function () {
        var file = input.files[0];
        input.value = '';
        if (!file) return;
        if (file.size > 3 * 1048576) {
          toast('Videoul are ' + (file.size / 1048576).toFixed(1) + ' MB. Prin panou se pot încărca videouri de maximum 3 MB; pentru unul mai mare, trimiteți-l administratorului site-ului.', true);
          return;
        }
        var name = cleanFolder(file.name.replace(/\.mp4$/i, '')).replace(/\//g, '-') || 'video';
        var reader = new FileReader();
        reader.onload = function () {
          var b64 = String(reader.result).split(',')[1];
          toast('Se încarcă videoul…');
          api('incarca', { tip: 'video', cale: name + '.mp4', base64: b64 }).then(function () { toast('Videoul a fost încărcat.'); renderVideo(); }).catch(function (e) { toast(e.message, true); });
        };
        reader.readAsDataURL(file);
      } });
      content.appendChild(h('div', { class: 'card' },
        h('h3', { text: 'Videoul folosit acum' }),
        h('p', { class: 'muted', style: 'margin-top:0', text: curent }),
        h('video', { src: '..' + curent, controls: true, muted: true, playsinline: true, style: 'width:100%;max-height:360px;border-radius:12px;background:#000' })));
      content.appendChild(h('div', { class: 'card' },
        h('div', { class: 'row between' }, h('h3', { text: 'Videouri disponibile', style: 'margin:0' }), btn('brass small', ico('upload', 15) + ' Încarcă video (max. 3 MB)', function () { input.click(); })),
        h('div', { class: 'mt' }, list), input,
        h('p', { class: 'f-hint', text: 'Videoul pornește fără sunet și se repetă. Cel mai bine arată un video orizontal, scurt (15–40 secunde).' })));
    }).catch(function (e) { content.innerHTML = ''; content.appendChild(h('div', { class: 'notice err', text: e.message })); });
  }

  /* ---------- salvare ---------- */
  function save() {
    var b = savebar.querySelector('[data-save]');
    b.disabled = true;
    b.innerHTML = '<span class="spinner" style="width:16px;height:16px;border-width:2px"></span> Se publică…';
    api('salveaza', { fisier: S.fisier.id, continut: S.fisier.data, sha: S.fisier.sha })
      .then(function (r) {
        S.fisier.sha = r.sha;
        setDirty(false);
        toast('Salvat. Site-ul se actualizează în 1–2 minute.');
      })
      .catch(function (e) { toast(e.message, true); })
      .finally(function () { b.disabled = false; b.innerHTML = ico('check', 16) + ' Salvează și publică'; });
  }
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 's' && S.dirty) { e.preventDefault(); save(); }
  });

  start();
})();
