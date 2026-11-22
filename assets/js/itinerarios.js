/* =========================================================
   ITINERÁRIOS — um mês por tela, do mais novo para o mais antigo
   A capa de cada mês é o visual principal; ao rolar, o fundo da
   página assume as cores daquele mês (informadas em dados.js ou
   tiradas da própria capa). Os anos vêm de ITINERARIOS (dados.js):
   ao acrescentar itinerários de outro ano, o seletor de ano aparece sozinho.
   ========================================================= */
(function () {
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pasta = 'assets/itinerarios/';
  const TODOS = [...ITINERARIOS].sort((a, b) => (b.ano - a.ano) || (b.mes - a.mes));   // mais novo primeiro
  if (!TODOS.length) return;
  const anos = [...new Set(TODOS.map(i => i.ano))];                                    // também do mais novo ao mais antigo

  /* ---------- Cores ---------- */
  const hexParaRgb = h => { const n = parseInt(h.replace('#', ''), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const rgbParaHex = c => '#' + c.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const luminancia = h => { const [r, g, b] = hexParaRgb(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };

  /* Paleta tirada da capa quando "cores" não foi informado */
  function paletaDaCapa(src) {
    return new Promise(res => {
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas'); c.width = c.height = 48;
        const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0, 48, 48);
        const d = ctx.getImageData(0, 0, 48, 48).data, px = [];
        for (let i = 0; i < d.length; i += 4) {
          const [r, g, b] = [d[i], d[i + 1], d[i + 2]];
          const max = Math.max(r, g, b), min = Math.min(r, g, b);
          px.push({ c: [r, g, b], l: (r * 299 + g * 587 + b * 114) / 1000, s: max ? (max - min) / max : 0 });
        }
        const media = arr => arr.reduce((a, p) => a.map((v, k) => v + p.c[k] / arr.length), [0, 0, 0]);
        px.sort((a, b) => a.l - b.l);
        const q = Math.floor(px.length * .2);
        res([rgbParaHex(media(px.slice(0, q)).map(v => v * .75)), rgbParaHex(media([...px].sort((a, b) => b.s - a.s).slice(0, q))), rgbParaHex(media(px.slice(-q)))]);
      };
      img.onerror = () => res(null);
      img.src = src;
    });
  }

  /* ---------- Elementos da página e estado ---------- */
  const parede = document.querySelector('[data-parede]');
  const subtitulo = document.querySelector('[data-ano-atual]');
  const lista = document.querySelector('[data-itinerarios]');
  const nav = document.querySelector('[data-meses]');
  const PADRAO = ['#071937', '#2a6fc9', '#ffd83a'];

  let anoAtual = anos[0];
  let itens = [], artigos = [], links = [], paletas = [];
  let atual = -1;

  const fileira = (capas, volta, tempo) => `
    <div class="corre${volta ? ' corre--volta' : ''}" style="--tempo:${tempo}s"><div class="corre__trilho">
      ${capas.map(i => `<img src="${pasta}${i.capa}" alt="" loading="eager" decoding="async">`).join('')}
    </div></div>`;

  /* ---------- Um ano inteiro: parede de capas, um mês por tela e lista de meses ---------- */
  function montar(ano) {
    anoAtual = ano;
    itens = TODOS.filter(i => i.ano === ano);

    const capas = itens.filter(i => i.capa);
    parede.innerHTML = capas.length ? fileira(capas, false, 90) + fileira([...capas].reverse(), true, 80) : '';
    subtitulo.textContent = ano + '.' + (ano === anos[0] ? ' O próximo chega em breve.' : '');

    lista.innerHTML = '';
    nav.innerHTML = '';
    itens.forEach((it, k) => {
      const id = `m-${it.ano}-${String(it.mes).padStart(2, '0')}`;
      const nome = MESES[it.mes - 1];
      const urlPdf = it.pdf && (/^https?:/.test(it.pdf) ? it.pdf : pasta + it.pdf);
      lista.insertAdjacentHTML('beforeend', `
        <article class="itn${k % 2 ? ' itn--inv' : ''}" id="${id}" data-idx="${k}">
          <div class="container itn__grade">
            <div class="itn__capa">${it.capa
              ? `<img src="${pasta}${it.capa}" alt="Capa do itinerário de ${nome} de ${it.ano}: ${it.tema}" width="900" height="1273" loading="lazy">`
              : `<div class="itn__sem-capa">${selo(it.simbolo, 'selo--branco')}</div>`}</div>
            <div class="itn__texto">
              <p class="itn__mes">${nome} <span>${it.ano}</span></p>
              <h2>${it.tema}</h2>
              ${urlPdf
                ? `<a class="btn itn__btn" href="${urlPdf}" target="_blank" rel="noopener"${/^https?:/.test(it.pdf) ? '' : ' download'}>${icone('baixar')} Baixar o PDF</a>`
                : `<span class="btn itn__btn is-desativado" aria-disabled="true">PDF em breve</span>`}
            </div>
          </div>
        </article>`);
      nav.insertAdjacentHTML('beforeend', `<a href="#${id}" data-idx="${k}" aria-label="${nome} ${it.ano}">${MESES_CURTOS[it.mes - 1]}</a>`);
    });
    preencherMarcadores(lista);

    artigos = [...lista.querySelectorAll('.itn')];
    links = [...nav.querySelectorAll('a')];
    paletas = itens.map(it => it.estilo?.cores?.length === 3 ? it.estilo.cores : null);
    itens.forEach((it, k) => {
      if (!paletas[k] && it.capa) paletaDaCapa(pasta + it.capa).then(p => {
        if (itens[k] !== it) return;                       // o ano mudou enquanto a capa carregava
        paletas[k] = p; if (k === atual) { atual = -2; aplicar(k); }
      });
    });
    atual = -2;                                            // força reaplicar as cores do mês em foco
    quadro();
  }

  /* ---------- Fundo e cores do mês em foco ---------- */
  function aplicar(k) {
    if (k === atual) return;
    atual = k;
    if (k < 0) {
      document.body.style.removeProperty('--t-escuro');
      document.body.classList.remove('tema-claro');
      links.forEach(a => a.classList.remove('is-ativo'));
      return;
    }
    const [escuro, principal, claro] = paletas[k] || PADRAO;
    const b = document.body.style;
    b.setProperty('--t-escuro', escuro); b.setProperty('--t-principal', principal); b.setProperty('--t-claro', claro);
    document.body.classList.toggle('tema-claro', luminancia(escuro) > .35);
    document.querySelector('meta[name="theme-color"]').content = escuro;
    artigos.forEach((a, i) => a.classList.toggle('is-ativo', i === k));
    links.forEach((a, i) => a.classList.toggle('is-ativo', i === k));
  }

  /* Mês ativo = o que está no meio da tela */
  let pedido = false;
  function quadro() {
    pedido = false;
    const meio = innerHeight / 2;
    let ativo = -1;
    artigos.forEach((a, i) => { const r = a.getBoundingClientRect(); if (r.top < meio && r.bottom > meio) ativo = i; });
    aplicar(ativo);
    nav.classList.toggle('is-visivel', ativo >= 0);
  }
  addEventListener('scroll', () => { if (!pedido) { pedido = true; requestAnimationFrame(quadro); } }, { passive: true });
  addEventListener('resize', quadro);

  /* ---------- Seletor de ano (no topo e no fim da página) ---------- */
  function desenharAnos() {
    document.querySelectorAll('[data-anos]').forEach(caixa => {
      const fimDaPagina = caixa.dataset.anos === 'fim';
      if (fimDaPagina && anos.length < 2) { caixa.hidden = true; return; }
      caixa.innerHTML = anos.map(a =>
        `<button type="button" class="itn-ano" data-ano="${a}" aria-pressed="${a === anoAtual}">${a}</button>`).join('')
        + (!fimDaPagina && anos.length < 2 ? '<span class="itn-anos__breve">Anos anteriores em breve</span>' : '');
    });
  }
  function trocarAno(ano) {
    if (ano !== anoAtual) {
      montar(ano);
      desenharAnos();
      history.replaceState(null, '', ano === anos[0] ? location.pathname : location.pathname + '?ano=' + ano);
      if (!reduzido && lista.animate) lista.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: 'cubic-bezier(.16, 1, .3, 1)' });
    }
    if (artigos[0]) artigos[0].scrollIntoView({ behavior: reduzido ? 'auto' : 'smooth', block: 'start' });
  }
  document.addEventListener('click', e => {
    const botao = e.target.closest('.itn-ano');
    if (botao) trocarAno(+botao.dataset.ano);
  });

  /* ---------- Começa pelo ano pedido: ?ano=2025, ou o ano do mês em #m-2025-05; senão o mais novo ---------- */
  const doMes = location.hash.match(/^#m-(\d{4})-\d{2}$/);
  const pedidoAno = +(doMes ? doMes[1] : new URLSearchParams(location.search).get('ano'));
  montar(anos.includes(pedidoAno) ? pedidoAno : anos[0]);
  desenharAnos();

  const titulo = document.querySelector('[data-fim-titulo]');
  if (titulo) titulo.textContent = anos.length > 1 ? 'Veja os outros anos' : 'Os anos anteriores chegam em breve';

  /* Link direto para um mês: itinerarios#m-2026-05 */
  if (location.hash && document.querySelector(location.hash)) {
    setTimeout(() => document.querySelector(location.hash).scrollIntoView({ behavior: reduzido ? 'auto' : 'smooth', block: 'center' }), 300);
  }
})();
