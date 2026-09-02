  // ---------------- data ----------------
  const GENRE_STYLES = {
    "Ficção Científica": "linear-gradient(160deg, #0a1a3f, #0e3b66 55%, #00c2ff33)",
    "Romance": "linear-gradient(160deg, #3f0a1f, #6a1235 55%, #ff5d8f33)",
    "Suspense": "linear-gradient(160deg, #071414, #0f2b28 55%, #1fae8e33)",
    "Drama": "linear-gradient(160deg, #2a1a0a, #4a2f12 55%, #d98a3d33)",
    "Ação": "linear-gradient(160deg, #3f0a0a, #6e1414 55%, #ff6a0033)",
    "Animação": "linear-gradient(160deg, #2a0a3f, #4d1470 55%, #ffd83d33)",
    "Terror": "linear-gradient(160deg, #050505, #1a0505 55%, #7a0d0d55)",
    "Comédia": "linear-gradient(160deg, #3f2a0a, #6e4a12 55%, #ffd23d33)"
  };

  const MOVIES = [
    {id:'m1', title:'Edificio Master', genre:'Documentario', year:2002, director:'Eduardo Coutinho', duration:150, rating:8.3, price:24.90, Image:'https://br.web.img3.acsta.net/pictures/210/527/21052705_20131024171507228.jpg'},
    {id:'m2', title:'Questão de Tempo', genre:'Romance', year:2013, director:'Richard Curtis', duration:200, rating:8.2, price:19.90, Image: 'https://br.web.img3.acsta.net/pictures/210/530/21053062_20131025204305591.jpg'},
    {id:'m3', title:'Os Suspeitos', genre:'Suspense', year:2013, director:'Denis Villeneuve', duration:153, rating:7.9, price:22.90, Image: 'https://static.wikia.nocookie.net/dublagem/images/2/28/OS_%282013%29.jpg/revision/latest?cb=20221019210303&path-prefix=pt-br'},
    {id:'m4', title:'Sociedade dos Poetas Mortos', genre:'Drama', year:1989, director:'Peter Weir', duration:128, rating:8.9, price:17.90, Image: 'https://upload.wikimedia.org/wikipedia/pt/0/04/Dead_Poets_Society.jpg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original'},
    {id:'m5', title:'Karatê Kid', genre:'Ação', year:1984, director:'John G. Avildsen', duration:126, rating:7.5, price:26.90, Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQidvc46b2fZ4pqT4IViMVSTR1vn3g0eugyYU4JH9wik0C1xqQUQhNB0eVY&s=10'},
    {id:'m6', title:'Tumulo dos Vagalumes', genre:'Animação', year:1988, director:'Isao Takahata', duration:89, rating:9.1, price:21.90, Image: 'https://ingresso-a.akamaihd.net/prd/img/movie/tumulo-dos-vagalumes/848f5e23-7e88-4878-9977-3a2cb7be4bee.webp'},
    {id:'m7', title:'Obsessão', genre:'Terror', year:2026, director:'Curry Barker', duration:109, rating:7.8, price:23.90, Image: 'https://m.media-amazon.com/images/S/pv-target-images/63888f0c71ca2cdea1e6ec72623ea724c16d23d74545113e25a330db5b181fa5.jpg'},
    {id:'m8', title:'Trem Bala', genre:'Comédia', year:2022, director:' David Leitch', duration:126, rating:8.0, price:18.90, Image: 'https://www.sonypictures.com.br/sites/brazil/files/2022-09/TREM%20BALA%20HE.JPG'},
    {id:'m9', title:'2001: Uma Odisseia no Espaço', genre:'Ficção Científica', year:1968, director:'Stanley Kubrick', duration:149, rating:8.4, price:20.90, Image: 'https://br.web.img3.acsta.net/pictures/210/108/21010802_20130606193222789.jpg'},
    {id:'m10', title:'Drama', genre:'Drama', year:20, director:'Matias Lira', duration:80, rating:8.6, price:25.90, Image: 'https://m.media-amazon.com/images/M/MV5BNDM2Zjg2NmEtMWI5Ni00YzA1LTk0ZmQtZmM1YTAwMWNmMmNlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'},
    {id:'m11', title:'Anaconda', genre:'Ação', year:2025, director:'Tom Gormican', duration:99, rating:7.7, price:24.90, Image: 'https://upload.wikimedia.org/wikipedia/pt/9/99/Anaconda_2025.jpg?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original'},
    {id:'m12', title:'Agentes muito Especiais', genre:'Comédia', year:2026, director:'Pedro Antonio', duration:100, rating:7.6, price:19.90, Image: 'https://br.web.img2.acsta.net/img/93/6c/936cb4c919fe4a3120152d0a30b34259.png'},
  ];

  const GENRES = ['Todos', ...new Set(MOVIES.map(m => m.genre))];

  // ---------------- state (in-memory only, no storage APIs) ----------------
  let activeGenre = 'Todos';
  let searchTerm = '';
  let cart = []; // {id, qty}

  const fmt = v => 'R$ ' + v.toFixed(2).replace('.', ',');

  // ---------------- render: marquee bulbs ----------------
  function buildBulbs(el, count, delayStep){
    let html = '';
    for(let i=0;i<count;i++){
      html += `<span class="bulb" style="animation-delay:${(i*delayStep).toFixed(2)}s"></span>`;
    }
    el.innerHTML = html;
  }
  buildBulbs(document.getElementById('bulbTop'), 22, 0.08);
  buildBulbs(document.getElementById('bulbBottom'), 22, 0.08);
  buildBulbs(document.getElementById('bulbLeft'), 10, 0.12);
  buildBulbs(document.getElementById('bulbRight'), 10, 0.12);

  // ---------------- render: filter pills ----------------
  const filterRow = document.getElementById('filterRow');
  filterRow.innerHTML = GENRES.map(g =>
    `<button class="pill ${g===activeGenre?'active':''}" data-genre="${g}">${g}</button>`
  ).join('');
  filterRow.addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if(!btn) return;
    activeGenre = btn.dataset.genre;
    [...filterRow.children].forEach(c => c.classList.toggle('active', c === btn));
    renderGrid();
  });

  // ---------------- render: grid ----------------
  const grid = document.getElementById('grid');
  const resultCount = document.getElementById('resultCount');

  function renderGrid(){
    const term = searchTerm.trim().toLowerCase();
    const filtered = MOVIES.filter(m => {
      const matchesGenre = activeGenre === 'Todos' || m.genre === activeGenre;
      const matchesTerm = !term || m.title.toLowerCase().includes(term) || m.director.toLowerCase().includes(term);
      return matchesGenre && matchesTerm;
    });

    resultCount.textContent = `${filtered.length} título${filtered.length===1?'':'s'}`;

    if(filtered.length === 0){
      grid.innerHTML = `<div class="empty-state">Nenhum filme encontrado.<br>Tente outro termo ou categoria.</div>`;
      return;
    }

    grid.innerHTML = filtered.map(m => `
      <article class="ticket">
        <div class="ticket-poster" style="background:${GENRE_STYLES[m.genre]}">
          <img src="${m.Image}" alt="${m.title}">
          <span class="rating-badge">⭐ ${m.rating}</span>
          <span class="genre-tag">${m.genre}</span>
        </div>
        <div class="perforation"></div>
        <div class="ticket-body">
          <div class="ticket-title">${m.title}</div>
          <div class="ticket-sub"><span>${m.director}</span><span>${m.year} · ${m.duration}min</span></div>
          <div class="ticket-footer">
            <span class="ticket-price">${fmt(m.price)}</span>
            <button class="add-btn" data-id="${m.id}" onclick="addToCart('${m.id}', this)">
              + Carrinho
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }
  renderGrid();

  document.getElementById('searchInput').addEventListener('input', e => {
    searchTerm = e.target.value;
    renderGrid();
  });

  function scrollToCatalog(){
    document.getElementById('catalogo').scrollIntoView({behavior:'smooth'});
  }

  // ---------------- cart logic ----------------
  const drawer = document.getElementById('drawer');
  const overlay = document.getElementById('overlay');
  const drawerItems = document.getElementById('drawerItems');
  const drawerFoot = document.getElementById('drawerFoot');
  const cartBadge = document.getElementById('cartBadge');
  const subtotalVal = document.getElementById('subtotalVal');

  function addToCart(id, btnEl){
    const existing = cart.find(c => c.id === id);
    if(existing){ existing.qty += 1; }
    else{ cart.push({id, qty:1}); }
    renderCart();
    openDrawer();
    if(btnEl){
      btnEl.classList.add('added');
      btnEl.textContent = '✓ Adicionado';
      setTimeout(() => { btnEl.classList.remove('added'); btnEl.textContent = '+ Carrinho'; }, 1100);
    }
  }

  function changeQty(id, delta){
    const line = cart.find(c => c.id === id);
    if(!line) return;
    line.qty += delta;
    if(line.qty <= 0){ cart = cart.filter(c => c.id !== id); }
    renderCart();
  }

  function removeLine(id){
    cart = cart.filter(c => c.id !== id);
    renderCart();
  }

  function cartTotal(){
    return cart.reduce((sum, c) => {
      const movie = MOVIES.find(m => m.id === c.id);
      return sum + (movie ? movie.price * c.qty : 0);
    }, 0);
  }

  function renderCart(){
    const totalQty = cart.reduce((s,c) => s + c.qty, 0);
    cartBadge.textContent = totalQty;

    if(cart.length === 0){
      drawerItems.innerHTML = `<div class="drawer-empty">Seu carrinho está vazio.<br>Adicione um filme para começar.</div>`;
      drawerFoot.style.display = 'none';
      return;
    }

    drawerFoot.style.display = 'flex';
    drawerItems.innerHTML = cart.map(c => {
      const m = MOVIES.find(mv => mv.id === c.id);
      return `
        <div class="cart-line">
          <div class="chip" style="background:${GENRE_STYLES[m.genre]}">${m.title.charAt(0)}</div>
          <div class="cart-line-info">
            <div class="t">${m.title}</div>
            <div class="g">${m.genre}</div>
            <div class="qty-row">
              <button class="qty-btn" onclick="changeQty('${m.id}', -1)">−</button>
              <span class="qty-val">${c.qty}</span>
              <button class="qty-btn" onclick="changeQty('${m.id}', 1)">+</button>
              <button class="remove-link" onclick="removeLine('${m.id}')">remover</button>
            </div>
          </div>
          <div class="line-price">${fmt(m.price * c.qty)}</div>
        </div>
      `;
    }).join('');

    subtotalVal.textContent = fmt(cartTotal());
  }
  renderCart();

  function openDrawer(){ drawer.classList.add('open'); overlay.classList.add('open'); }
  function closeDrawer(){ drawer.classList.remove('open'); overlay.classList.remove('open'); }

  document.getElementById('cartBtn').addEventListener('click', openDrawer);
  document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
  overlay.addEventListener('click', () => { closeDrawer(); closeModal(); });

  // ---------------- checkout ----------------
  const modalOverlay = document.getElementById('modalOverlay');
  const orderCode = document.getElementById('orderCode');
  const qrFake = document.getElementById('qrFake');

  function buildFakeQr(){
    let html = '';
    for(let i=0;i<36;i++){
      html += Math.random() > 0.5 ? '<div></div>' : '<div class="off"></div>';
    }
    qrFake.innerHTML = html;
  }

  function checkout(){
    if(cart.length === 0) return;
    const code = Math.floor(100000 + Math.random()*900000);
    orderCode.textContent = '#CM-' + code;
    buildFakeQr();
    closeDrawer();
    modalOverlay.classList.add('open');
    cart = [];
    renderCart();
  }

  function closeModal(){
    modalOverlay.classList.remove('open');
  }
