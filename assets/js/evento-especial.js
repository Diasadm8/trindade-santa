/* =========================================================
   PÁGINA DE EVENTO ESPECIAL
   Mesma estrutura para todos os eventos; cada um tem suas cores
   (identidade visual própria) definidas em EVENTOS_ESPECIAIS.
   Uso: <main data-evento="noite-oracional"></main>
   ========================================================= */
(function () {
  const alvo = document.querySelector('[data-evento]');
  const ev = EVENTOS_ESPECIAIS[alvo?.dataset.evento];
  if (!ev) return;

  const [escuro, principal, destaque] = ev.cores;
  const b = document.body.style;
  b.setProperty('--e-escuro', escuro);
  b.setProperty('--e-principal', principal);
  b.setProperty('--e-destaque', destaque);
  document.querySelector('meta[name="theme-color"]').content = escuro;
  document.title = `${ev.nome} · Trindade Santa`;

  const logo = ev.logo
    ? `<img class="ev-hero__logo-img" src="assets/eventos/${ev.logo}" alt="${ev.nome}">`
    : `<div class="ev-hero__logo" aria-label="${ev.nome}">
         <span class="ev-hero__logo-aviso">logo do evento</span>
         <strong>${ev.nome}</strong>
       </div>`;

  const dado = (ic, valor, vazio) => `<span class="ev-dado">${icone(ic)} ${valor || `<i>${vazio}</i>`}</span>`;
  const inscricao = ev.inscricao
    ? `<a class="btn ev-btn" href="${ev.inscricao}" target="_blank" rel="noopener">Inscreva-se ${icone('seta')}</a>`
    : `<span class="btn ev-btn ev-btn--off">Inscrições em breve</span>`;

  /* ---------- Os três arcanjos (Noite Oracional) ---------- */
  const ARCANJOS = [
    { nome: 'São Miguel', sig: 'Quem como Deus?', icone: '<path d="M32 4l5 8v28H27V12z"/><path d="M19 40h26M32 40v13"/><circle cx="32" cy="57" r="3"/>' },
    { nome: 'São Gabriel', sig: 'Força de Deus', icone: '<path d="M32 58V30"/><path d="M32 30C22 28 18 18 20 8c8 4 12 12 12 22z"/><path d="M32 30c10-2 14-12 12-22-8 4-12 12-12 22z"/><path d="M32 30c-3-8-3-16 0-24 3 8 3 16 0 24z"/><path d="M32 48c-8 0-12-4-14-8 8 0 12 2 14 8zM32 48c8 0 12-4 14-8-8 0-12 2-14 8z"/>' },
    { nome: 'São Rafael', sig: 'Deus cura', icone: '<path d="M8 34c9-13 25-13 36 0-11 13-27 13-36 0z"/><path d="M44 34l11-9v18z"/><circle cx="19" cy="32" r="1.6" fill="currentColor"/><path d="M26 28c3 4 3 8 0 12M33 27c3 5 3 9 0 14"/>' }
  ];
  const blocoArcanjos = () => `
    <div class="secao__topo secao__topo--centro revelar"><span class="sobretitulo ev-sobre">Sob a proteção</span><h2>Os três arcanjos</h2><div class="ph-lines" data-ph="2"></div></div>
    <div class="arcanjos">
      ${ARCANJOS.map((a, i) => `
        <article class="arcanjo revelar" data-atraso="${i + 1}">
          <svg class="arcanjo__icone" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${a.icone}</svg>
          <small>Arcanjo</small>
          <h3>${a.nome}</h3>
          <p class="arcanjo__sig">${a.sig}</p>
          <div class="ph-lines" data-ph="2"></div>
        </article>`).join('')}
    </div>`;

  /* ---------- Seções (alternam claro/escuro automaticamente) ---------- */
  const secoes = [
    `<div class="dividido">
       <div class="revelar"><span class="sobretitulo ev-sobre">O evento</span><h2>Sobre</h2><div class="ph-lines" data-ph="6"></div></div>
       <div class="revelar" data-atraso="1"><div class="ph-img ev-img" data-img="espirito" style="--proporcao: 4/3"></div></div>
     </div>`,
    ev.bloco === 'arcanjos' ? blocoArcanjos() : '',
    `<div class="secao__topo secao__topo--centro revelar"><span class="sobretitulo ev-sobre">Programação</span><h2>Programação</h2></div>
     <div class="ev-programacao">
       ${[1, 2, 3, 4].map(i => `
         <div class="ev-item revelar" data-atraso="${i % 3 + 1}">
           <span class="ev-item__hora">00h00</span>
           <div><h3>Momento ${i}</h3><div class="ph-lines" data-ph="2"></div></div>
         </div>`).join('')}
     </div>`,
    ev.ultima ? `
     <div class="secao__topo secao__topo--centro revelar"><span class="sobretitulo ev-sobre">Última edição</span><h2>${ev.ultima.titulo}</h2></div>
     <div class="ev-ultima revelar">
       <img class="ev-ultima__cartaz" src="assets/eventos/${ev.ultima.cartaz}" alt="Cartaz do ${ev.ultima.titulo}" loading="lazy">
       <div class="ev-ultima__info">
         <p><strong>${ev.ultima.quando}</strong><br>${ev.ultima.local}</p>
         ${ev.ultima.realizacao ? `<p>${ev.ultima.realizacao}</p>` : ''}
         ${ev.ultima.ingressos ? `<p class="ev-ultima__ing">${ev.ultima.ingressos}</p>` : ''}
       </div>
     </div>` : '',
    ev.ultima?.presencas ? `
     <div class="secao__topo secao__topo--centro revelar"><span class="sobretitulo ev-sobre">Presenças em ${ev.ultima.titulo}</span><h2>Pregadores e ministérios</h2></div>
     <div class="grade grade--4">
       ${ev.ultima.presencas.map((p, i) => `<div class="pessoa revelar" data-atraso="${i % 3 + 1}"><div class="ph-img ev-img" data-img="${ORDEM_PESSOAS[i % 3]}"></div><h3>${p.nome}</h3><p class="pessoa__sub">${p.sub}</p></div>`).join('')}
     </div>` : `
     <div class="secao__topo secao__topo--centro revelar"><span class="sobretitulo ev-sobre">Presenças</span><h2>Pregadores e ministérios</h2></div>
     <div class="grade grade--4">
       ${[1, 2, 3, 4].map(i => `<div class="pessoa revelar" data-atraso="${i % 3 + 1}"><div class="ph-img ev-img" data-img="${ORDEM_PESSOAS[i % 3]}"></div><h3>Nome</h3><div class="ph-lines" data-ph="1"></div></div>`).join('')}
     </div>`,
    ev.cenas ? `
     <div class="secao__topo secao__topo--centro revelar"><span class="sobretitulo ev-sobre">Momentos</span><h2>Vivido em oração</h2></div>
     <div class="cenas">
       ${ev.cenas.map((c, i) => `<img class="revelar" data-atraso="${i % 3 + 1}" src="assets/img/fotos/${c}.jpg" alt="Momento do evento" loading="lazy">`).join('')}
     </div>` : '',
    ev.fotos && typeof ARQUIVO !== 'undefined' ? `
     <div class="secao__topo secao__topo--centro revelar"><span class="sobretitulo ev-sobre">Arquivo</span><h2>Fotos de outras edições</h2></div>
     <div class="arquivo">
       ${ARQUIVO.filter(a => a.img.startsWith(ev.fotos)).map((a, i) => `<img class="revelar" data-atraso="${i % 3 + 1}" src="assets/img/arquivo/${a.img}" alt="Foto de arquivo do Congresso SETA" loading="lazy">`).join('')}
     </div>` : '',
    ev.galeria ? `
     <div class="secao__topo secao__topo--centro revelar"><span class="sobretitulo ev-sobre">Memória</span><h2>Edições anteriores</h2></div>
     <div class="ev-cartazes">
       ${ev.galeria.map((g, i) => `<figure class="ev-cartaz revelar" data-atraso="${i % 3 + 1}"><img src="assets/eventos/${g.img}" alt="${g.rotulo}" loading="lazy"></figure>`).join('')}
     </div>` : `
     <div class="secao__topo secao__topo--centro revelar"><span class="sobretitulo ev-sobre">Memória</span><h2>Edições anteriores</h2></div>
     <div class="ev-galeria">
       ${[1, 2, 3, 4, 5].map(i => `<div class="ph-img ev-img revelar" data-img="${ORDEM_PESSOAS[i % 3]}" data-atraso="${i % 3 + 1}"></div>`).join('')}
     </div>`
  ].filter(Boolean);

  alvo.innerHTML = `
    <section class="ev-hero${ev.banner ? ' ev-hero--banner' : ''}"${ev.banner ? ` style="--banner:url('${new URL('assets/eventos/' + ev.banner, location.href).href}')"` : ''}>
      <div class="ev-hero__raios" aria-hidden="true"></div>
      <div class="ev-hero__aneis" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="container ev-hero__conteudo">
        <nav class="migalhas" aria-label="Você está em"><a href="index.html">Início</a><span aria-hidden="true">/</span><a href="eventos.html">Eventos</a><span aria-hidden="true">/</span><span>${ev.nome}</span></nav>
        ${logo}
        ${ev.subtitulo ? `<p class="ev-subtitulo">${ev.subtitulo}</p>` : ''}
        ${ev.destaques ? `<div class="ev-destaques">${ev.destaques.map(d => `<div class="ev-destaque"><strong>${d.n}</strong><span>${d.t}</span></div>`).join('')}</div>` : ''}
        <div class="ev-hero__dados">
          ${dado('calendario', ev.data && !isNaN(new Date(ev.data))
            ? new Date(ev.data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
            : ev.data, 'data a definir')}
          ${dado('pino', ev.local, 'local a definir')}
        </div>
        <div class="ev-contagem" data-contagem>
          ${['dias', 'horas', 'min', 'seg'].map(u => `<div><strong>00</strong><span>${u}</span></div>`).join('')}
        </div>
        ${inscricao}
      </div>
    </section>

    ${secoes.map((h, i) => `
      <section class="secao ev-secao${i % 2 ? ' ev-secao--escura' : ''}"><div class="container">${h}</div></section>`).join('')}

    <section class="secao ev-secao">
      <div class="container">
        <div class="chamada ev-chamada revelar">
          <div><span class="sobretitulo sobretitulo--claro">Participe</span><h2>Garanta sua presença</h2><div class="ph-lines" data-ph="2"></div></div>
          ${inscricao}
        </div>
      </div>
    </section>`;

  /* Contagem regressiva (quando houver data no formato AAAA-MM-DDTHH:MM) */
  const caixa = alvo.querySelector('[data-contagem]');
  const alvoData = ev.data && !isNaN(new Date(ev.data)) ? new Date(ev.data) : null;
  if (alvoData) {
    const nums = caixa.querySelectorAll('strong');
    const tique = () => {
      let s = Math.max(0, Math.floor((alvoData - Date.now()) / 1000));
      [86400, 3600, 60, 1].forEach((u, i) => { nums[i].textContent = String(Math.floor(s / u)).padStart(2, '0'); s %= u; });
    };
    tique(); setInterval(tique, 1000);
  }
  preencherMarcadores(alvo);
  ativarRevelar(alvo);
})();
