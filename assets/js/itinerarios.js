/* =========================================================
   ITINERÁRIOS — linha do tempo imersiva
   Ao rolar (para baixo ou para cima), a página assume as cores
   e os elementos da capa de cada mês: o fundo muda de cor e
   novos elementos (flores, estrelas, chamas…) surgem e flutuam.
   ========================================================= */
(function () {
  const raiz = document.body; // as cores do tema vivem no <body>, que faz a transição
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pasta = 'assets/itinerarios/';
  const itens = [...ITINERARIOS].sort((a, b) => (a.ano - b.ano) || (a.mes - b.mes));
  if (!itens.length) return;

  /* ---------- Biblioteca de elementos decorativos (viewBox 100) ---------- */
  const MOTIVOS = {
    flor: '<g>' + [0, 72, 144, 216, 288].map(r => `<ellipse cx="50" cy="27" rx="14" ry="25" transform="rotate(${r} 50 50)"/>`).join('') + '<circle cx="50" cy="50" r="11" opacity=".55"/></g>',
    folha: '<path d="M50 4C82 24 86 70 50 96 14 70 18 24 50 4Z"/><path d="M50 14V92" stroke="rgba(255,255,255,.45)" stroke-width="2.5" fill="none"/>',
    estrela: '<path d="M50 0C54 38 62 46 100 50 62 54 54 62 50 100 46 62 38 54 0 50 38 46 46 38 50 0Z"/>',
    chama: '<path d="M52 4c-4 18-28 32-28 58 0 20 12 34 26 34 15 0 26-13 24-31-1.6-17-17-26-22-61z"/>',
    coracao: '<path d="M50 88C20 66 6 48 6 32 6 18 17 8 30 8c10 0 16 6 20 14 4-8 10-14 20-14 13 0 24 10 24 24 0 16-14 34-44 56Z"/>',
    gota: '<path d="M50 4C65 34 80 50 80 68c0 17-14 28-30 28S20 85 20 68C20 50 35 34 50 4Z"/>',
    sol: '<circle cx="50" cy="50" r="17"/>' + Array.from({ length: 12 }, (_, i) => `<rect x="48" y="4" width="4" height="20" rx="2" transform="rotate(${i * 30} 50 50)"/>`).join(''),
    luz: '<circle cx="50" cy="50" r="46"/>',
    cruz: '<path d="M43 6h14v26h26v14H57v48H43V46H17V32h26z"/>',
    espiga: '<path d="M50 98V30" stroke="currentColor" stroke-width="3" fill="none"/>' + [30, 44, 58, 72].map(y => `<ellipse cx="41" cy="${y}" rx="7" ry="12" transform="rotate(-28 41 ${y})"/><ellipse cx="59" cy="${y}" rx="7" ry="12" transform="rotate(28 59 ${y})"/>`).join('') + '<ellipse cx="50" cy="18" rx="6" ry="12"/>',
    pomba: '<path d="M8 58c18-3 30-14 42-24 6-12 16-18 27-14l13-2-9 9c3 13-4 26-19 32 5 7 14 10 24 11-19 9-41 6-52-6-10 1-19-1-26-6z"/>',
    onda: '<path d="M0 50q12.5-22 25 0t25 0 25 0 25 0" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>',

    /* — inspirados nas capas de 2026 — */
    /* Fevereiro · Identidade: tiras da colagem de rostos */
    faixas: '<rect x="4" y="14" width="74" height="15" rx="2"/><rect x="22" y="38" width="74" height="15" rx="2"/><rect x="10" y="62" width="62" height="15" rx="2"/><rect x="30" y="84" width="50" height="9" rx="2"/>',
    /* Abril · Koinonia: coluna clássica */
    coluna: '<rect x="20" y="6" width="60" height="9" rx="2"/><rect x="28" y="15" width="44" height="6"/><path d="M33 21h34l-2 58H35z"/><path d="M42 24v52M50 24v52M58 24v52" stroke="rgba(255,255,255,.35)" stroke-width="2" fill="none"/><rect x="26" y="79" width="48" height="7"/><rect x="18" y="86" width="64" height="8" rx="2"/>',
    /* Junho · Ou Santos ou nada: blocos de letras */
    bloco: '<rect x="8" y="8" width="84" height="84" rx="20"/><rect x="26" y="26" width="48" height="48" rx="10" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3"/>',
    /* Julho · Entre nós não deverá ser assim: terço */
    terco: Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (0.18 + i * 0.064 * 4.4 / 4.4) + Math.PI * 0.0; const t = (i / 10) * Math.PI * 1.5 + Math.PI * 0.75; return `<circle cx="${(50 + Math.cos(t) * 34).toFixed(1)}" cy="${(44 + Math.sin(t) * 34).toFixed(1)}" r="${i % 5 === 0 ? 5.2 : 3.6}"/>`; }).join('') + '<path d="M50 80v8M44 84h12" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/>',
    /* Agosto · Vem e segue-me: pegadas */
    pegada: '<ellipse cx="50" cy="64" rx="19" ry="28"/><circle cx="30" cy="24" r="7"/><circle cx="44" cy="15" r="6.5"/><circle cx="58" cy="15" r="6"/><circle cx="71" cy="23" r="5.5"/>',
    /* Setembro · Quem como Deus?: asa e espada de São Miguel */
    asa: '<path d="M6 76C12 46 34 18 82 8c-9 8-11 14-11 21 9-4 16-4 22-2-9 6-13 13-15 22 7-2 11-2 16 0-9 9-22 15-39 19-11 3-27 4-49 4z"/>',
    espada: '<path d="M50 4l7 11v46H43V15z"/><rect x="27" y="61" width="46" height="7" rx="3"/><rect x="46" y="68" width="8" height="19" rx="3"/><circle cx="50" cy="92" r="4"/>',
    /* Outubro · Meu céu na terra: nó da Trindade (Santa Elisabeth) */
    triquetra: '<g fill="none" stroke="currentColor" stroke-width="5">' + [0, 120, 240].map(r => `<ellipse cx="50" cy="32" rx="17" ry="30" transform="rotate(${r} 50 50)"/>`).join('') + '<circle cx="50" cy="50" r="30" stroke-width="2.5" opacity=".6"/></g>',
    /* Novembro · O que é plantado precisa ser cultivado: morango */
    morango: '<path d="M50 94C24 77 12 56 17 40c4-12 17-15 33-9 16-6 29-3 33 9 5 16-7 37-33 54z"/><path d="M50 30l-14-12 14 5 14-5z" fill="rgba(60,110,40,.9)"/><g fill="rgba(255,255,255,.55)"><circle cx="38" cy="52" r="2.2"/><circle cx="55" cy="48" r="2.2"/><circle cx="46" cy="66" r="2.2"/><circle cx="62" cy="64" r="2.2"/><circle cx="52" cy="80" r="2.2"/><circle cx="32" cy="68" r="2.2"/></g>'
  };

  /* ---------- Cores ---------- */
  const hexParaRgb = h => { const n = parseInt(h.replace('#', ''), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const rgbParaHex = c => '#' + c.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const luminancia = h => { const [r, g, b] = hexParaRgb(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * r + .7152 * g + .0722 * b; };

  /* Extrai uma paleta da própria capa (quando "cores" não foi informado) */
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
        const escuro = media(px.slice(0, q)).map(v => v * .75);
        const claro = media(px.slice(-q));
        const vivos = [...px].sort((a, b) => b.s - a.s).slice(0, q);
        res([rgbParaHex(escuro), rgbParaHex(media(vivos)), rgbParaHex(claro)]);
      };
      img.onerror = () => res(null);
      img.src = src;
    });
  }

  /* ---------- Gerador pseudo-aleatório estável (cada mês sempre igual) ---------- */
  const semente = s => () => (s = (s * 16807) % 2147483647) / 2147483647;

  /* "motivo" aceita um nome ('flor'), ou "motivos" uma lista: ['folha:claro', 'morango:principal'] */
  function listaMotivos(it) {
    const bruto = it.estilo?.motivos || [it.estilo?.motivo || 'luz'];
    return bruto.map(s => { const [nome, cor] = String(s).split(':'); return { nome: MOTIVOS[nome] ? nome : 'luz', cor }; });
  }

  /* ---------- Monta a linha do tempo ---------- */
  const lista = document.querySelector('[data-itinerarios]');
  const navMeses = document.querySelector('[data-meses]');
  document.querySelector('[data-ano-atual]').textContent =
    [...new Set(itens.map(i => i.ano))].join(' · ');

  itens.forEach((it, k) => {
    const id = `m-${it.ano}-${String(it.mes).padStart(2, '0')}`;
    const nome = MESES[it.mes - 1];
    const lado = k % 2 ? 'direita' : 'esquerda';
    const motivo = MOTIVOS[listaMotivos(it)[0].nome] ? listaMotivos(it)[0].nome : 'luz';
    const capa = it.capa
      ? `<img src="${pasta}${it.capa}" alt="Capa do itinerário de ${nome} de ${it.ano}: ${it.tema}" width="900" height="1273" loading="lazy">`
      : `<div class="capa-provisoria">
           <svg class="capa-provisoria__motivo" viewBox="0 0 100 100">${MOTIVOS[motivo]}</svg>
           ${selo(it.simbolo, 'selo--branco')}
           <span class="capa-provisoria__mes">${nome}</span>
           <span class="capa-provisoria__ano">${it.ano}</span>
           <span class="capa-provisoria__aviso">capa provisória</span>
         </div>`;
    const urlPdf = it.pdf && (/^https?:/.test(it.pdf) ? it.pdf : pasta + it.pdf);
    const pdf = it.pdf
      ? `<a class="btn btn--claro" href="${urlPdf}" target="_blank" rel="noopener"${/^https?:/.test(it.pdf) ? '' : ' download'}>${icone('baixar')} Baixar PDF</a>`
      : `<span class="btn btn--desativado" aria-disabled="true">${icone('baixar')} PDF em breve</span>`;

    lista.insertAdjacentHTML('beforeend', `
      <article class="itin itin--${lado}" id="${id}" data-idx="${k}">
        <div class="itin__no" aria-hidden="true"><span>${MESES_CURTOS[it.mes - 1]}</span></div>
        <div class="itin__capa">${capa}</div>
        <div class="itin__info">
          <span class="itin__num" aria-hidden="true">${String(it.mes).padStart(2, '0')}</span>
          <span class="sobretitulo sobretitulo--claro">${nome} · ${it.ano}</span>
          <h2>${it.tema}</h2>
          <div class="ph-lines" data-ph="3"></div>
          <div class="itin__acoes">${pdf}</div>
        </div>
      </article>`);

    navMeses.insertAdjacentHTML('beforeend',
      `<a href="#${id}" data-idx="${k}" aria-label="${nome} ${it.ano}"><span>${MESES_CURTOS[it.mes - 1]}</span></a>`);
  });
  preencherMarcadores(lista);

  const artigos = [...lista.querySelectorAll('.itin')];
  const linksMeses = [...navMeses.querySelectorAll('a')];

  /* Paletas: informadas ou extraídas da capa */
  const paletas = itens.map(it => it.estilo?.cores?.length === 3 ? it.estilo.cores : null);
  itens.forEach((it, k) => {
    if (!paletas[k] && it.capa) paletaDaCapa(pasta + it.capa).then(p => { paletas[k] = p; if (k === atual) aplicarTema(k, true); });
  });
  const PADRAO = ['#0b3a75', '#1b95d8', '#e3f4fb'];

  /* ---------- Tema (cores) ---------- */
  function aplicarCores(k) {
    const [escuro, principal, claro] = paletas[k] || PADRAO;
    raiz.style.setProperty('--t-escuro', escuro);
    raiz.style.setProperty('--t-principal', principal);
    raiz.style.setProperty('--t-claro', claro);
    const fundoClaro = luminancia(escuro) > .35;
    document.body.classList.toggle('tema-claro', fundoClaro);
    document.querySelector('meta[name="theme-color"]').content = escuro;
  }

  /* ---------- Elementos decorativos ---------- */
  const camada = document.querySelector('.motivos');
  function trocarMotivos(k) {
    camada.querySelectorAll('.motivo:not(.is-saindo)').forEach(el => {
      el.classList.add('is-saindo');
      setTimeout(() => el.remove(), 1200);
    });
    const it = itens[k];
    const opcoes = listaMotivos(it);
    const rnd = semente(it.ano * 100 + it.mes);
    const qtd = innerWidth < 700 ? 9 : 16;
    for (let i = 0; i < qtd; i++) {
      const { nome, cor } = opcoes[i % opcoes.length];
      const prof = .25 + rnd() * .75;              // 0.25 (longe) … 1 (perto)
      const tam = 26 + prof * (nome === 'luz' ? 180 : 110);
      const el = document.createElement('span');
      el.className = `motivo motivo--${nome}`;
      el.style.cssText = `
        left:${(rnd() * 100).toFixed(1)}%; top:${(rnd() * 100).toFixed(1)}%;
        width:${tam.toFixed(0)}px; height:${tam.toFixed(0)}px;
        --prof:${prof.toFixed(2)}; --giro:${(rnd() * 360).toFixed(0)}deg;
        --flutua:${(7 + rnd() * 9).toFixed(1)}s; --atraso:${(i * 0.06).toFixed(2)}s;
        color: var(${(cor ? '--t-' + cor : (rnd() > .45 ? '--t-claro' : '--t-principal'))});
        opacity:${(.18 + prof * .5).toFixed(2)};`;
      el.innerHTML = `<svg viewBox="0 0 100 100">${MOTIVOS[nome]}</svg>`;
      camada.appendChild(el);
    }
  }

  let atual = -1;
  function aplicarTema(k, forcar) {
    if (k === atual && !forcar) return;
    const mudouMes = k !== atual;
    atual = k;
    aplicarCores(k);
    document.querySelector('.tema-padrao').dataset.padrao = itens[k].estilo?.padrao || '';
    if (mudouMes) trocarMotivos(k);
    artigos.forEach((a, i) => a.classList.toggle('is-ativo', i === k));
    linksMeses.forEach((a, i) => a.classList.toggle('is-ativo', i === k));
  }

  /* Abertura usa as cores do primeiro mês, de leve */
  aplicarTema(0);

  /* ---------- Rolagem: mês ativo + progresso + parallax ---------- */
  const trilho = document.querySelector('.itin-linha__trilho i');
  const secLinha = document.querySelector('.itin-linha');
  let pedido = false;

  function quadro() {
    pedido = false;
    const vh = innerHeight, meio = vh / 2;

    // mês cujo centro está mais perto do meio da tela
    let melhor = 0, dist = Infinity;
    artigos.forEach((a, i) => {
      const r = a.getBoundingClientRect();
      const centro = r.top + r.height / 2;
      const d = Math.abs(centro - meio);
      if (d < dist) { dist = d; melhor = i; }
      // progresso de entrada/saída: -1 (abaixo) … 0 (centro) … 1 (acima)
      const p = Math.max(-1, Math.min(1, (meio - centro) / (vh * .75)));
      a.style.setProperty('--p', p.toFixed(3));
      a.style.setProperty('--pa', Math.abs(p).toFixed(3));
    });
    aplicarTema(melhor);

    // trilho (linha central) preenche conforme o avanço
    const rl = secLinha.getBoundingClientRect();
    const prog = Math.max(0, Math.min(1, (meio - rl.top) / rl.height));
    trilho.style.transform = `scaleY(${prog.toFixed(4)})`;

    // parallax dos elementos decorativos
    camada.style.setProperty('--rolagem', `${(-scrollY * .25).toFixed(1)}px`);
  }
  const agendar = () => { if (!pedido) { pedido = true; requestAnimationFrame(quadro); } };
  addEventListener('scroll', agendar, { passive: true });
  addEventListener('resize', agendar);
  quadro();

  /* Links para um mês específico: itinerarios.html#m-2026-05 */
  if (location.hash && document.querySelector(location.hash)) {
    setTimeout(() => document.querySelector(location.hash).scrollIntoView({ behavior: reduzido ? 'auto' : 'smooth', block: 'center' }), 300);
  }
})();
