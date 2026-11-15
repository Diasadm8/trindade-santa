/* =========================================================
   PÁGINA INICIAL — Órbita da Santíssima Trindade
   Os três selos giram num carrossel 3D: sempre um no centro,
   maior e luminoso; os outros dois menores, ao lado.
   ========================================================= */
(function orbitaTrindade() {
  const hero = document.querySelector('.hero');
  const orbita = document.querySelector('.orbita');
  if (!orbita) return;

  const pessoas = [
    { id: 'pai',      nome: 'Deus Pai',            sub: 'Criador de todas as coisas' },
    { id: 'filho',    nome: 'Deus Filho',          sub: 'Redentor do mundo' },
    { id: 'espirito', nome: 'Deus Espírito Santo', sub: 'Santificador e Consolador' }
  ];

  /* Monta os itens, legendas e pontos */
  const legendas = document.querySelector('.hero__pessoa');
  const pontos = document.querySelector('.orbita__pontos');
  const itens = pessoas.map((p, i) => {
    const b = document.createElement('button');
    b.className = 'orbita__item';
    b.type = 'button';
    b.setAttribute('aria-label', p.nome);
    b.innerHTML = selo(p.id);
    b.addEventListener('click', () => irPara(i));
    orbita.appendChild(b);

    legendas.insertAdjacentHTML('beforeend', `<span>${p.nome}<small>${p.sub}</small></span>`);
    pontos.insertAdjacentHTML('beforeend', `<button type="button" aria-label="Mostrar ${p.nome}"></button>`);
    return b;
  });
  const spans = [...legendas.children];
  const botoesPonto = [...pontos.children];
  botoesPonto.forEach((b, i) => b.addEventListener('click', () => irPara(i)));

  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PASSO = (2 * Math.PI) / 3;   // 120°
  const INTERVALO = 4800;            // tempo em cada Pessoa
  const DURACAO = 1500;              // duração do giro

  let angulo = 0;          // ângulo atual da órbita
  let alvo = 0;            // ângulo para onde está indo
  let inicio = 0, de = 0;  // controle da interpolação
  let abertura = reduzido ? 1 : 0; // 0 = selos juntos (como no logo) → 1 = órbita aberta
  let ativo = 0;
  let timer;

  const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function raio() { return Math.min(orbita.clientWidth * .36, 330); }

  function desenhar() {
    const R = raio() * abertura;
    itens.forEach((el, i) => {
      const th = angulo + i * PASSO;
      const x = Math.sin(th) * R;
      const z = Math.cos(th);              // 1 = frente, -1 = fundo
      const prof = (z + 1) / 2;            // 0..1
      const escala = (0.48 + 0.52 * prof) * (0.62 + 0.38 * abertura);
      const y = (1 - prof) * -18 * abertura;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${escala})`;
      el.style.opacity = (0.28 + 0.72 * prof).toFixed(3);
      el.style.zIndex = Math.round(prof * 100);
      el.style.filter = `blur(${((1 - prof) * 2.2 * abertura).toFixed(2)}px)`;
    });
  }

  function marcarAtivo(i) {
    ativo = i;
    itens.forEach((el, k) => el.classList.toggle('is-centro', k === i));
    spans.forEach((s, k) => s.classList.toggle('is-ativo', k === i));
    botoesPonto.forEach((b, k) => b.classList.toggle('is-ativo', k === i));
  }

  /* Gira para que a Pessoa i fique no centro, pelo caminho mais curto */
  function irPara(i) {
    let destino = -i * PASSO;
    // normaliza para o giro mais curto a partir do ângulo atual
    while (destino - alvo > Math.PI) destino -= 2 * Math.PI;
    while (destino - alvo < -Math.PI) destino += 2 * Math.PI;
    de = angulo; alvo = destino; inicio = performance.now();
    marcarAtivo(i);
    reiniciarTimer();
    if (reduzido) { angulo = alvo; desenhar(); }
  }

  function proximo() { irPara((ativo + 1) % 3); }

  function reiniciarTimer() {
    clearInterval(timer);
    if (!reduzido) timer = setInterval(proximo, INTERVALO);
  }

  function quadro(agora) {
    if (inicio) {
      const t = Math.min((agora - inicio) / DURACAO, 1);
      angulo = de + (alvo - de) * easeInOut(t);
      if (t === 1) inicio = 0;
    }
    desenhar();
    requestAnimationFrame(quadro);
  }

  /* Abertura: os três selos começam unidos (como no logotipo) e se abrem em órbita */
  function abrir(t0) {
    const t = Math.min((performance.now() - t0) / 1800, 1);
    abertura = easeInOut(t);
    if (t < 1) requestAnimationFrame(() => abrir(t0));
  }

  marcarAtivo(0);
  desenhar();
  requestAnimationFrame(quadro);
  setTimeout(() => {
    hero.classList.add('is-pronto');
    if (!reduzido) abrir(performance.now());
    reiniciarTimer();
  }, 350);

  // pausa quando a aba não está visível
  document.addEventListener('visibilitychange', () => document.hidden ? clearInterval(timer) : reiniciarTimer());
  window.addEventListener('resize', desenhar);
})();

/* ---------- Partículas de luz subindo suavemente ---------- */
(function particulas() {
  const canvas = document.querySelector('.hero__particulas');
  if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr, pts = [];

  function ajustar() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(70, w / 18));
    pts = Array.from({ length: n }, () => novo(true));
  }
  function novo(qualquerAltura) {
    return {
      x: Math.random() * w,
      y: qualquerAltura ? Math.random() * h : h + 10,
      r: Math.random() * 2 + .6,
      v: Math.random() * .35 + .12,
      a: Math.random() * .5 + .15,
      f: Math.random() * Math.PI * 2
    };
  }
  function quadro() {
    ctx.clearRect(0, 0, w, h);
    pts.forEach((p, i) => {
      p.y -= p.v; p.f += .01;
      const x = p.x + Math.sin(p.f) * 8;
      if (p.y < -10) pts[i] = novo(false);
      ctx.beginPath();
      ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(quadro);
  }
  ajustar();
  window.addEventListener('resize', ajustar);
  requestAnimationFrame(quadro);
})();

/* =========================================================
   PÁGINA INICIAL — itinerário do mês, próximas datas e cidades
   ========================================================= */
(function conteudoInicio() {
  const hoje = new Date();

  /* Itinerário do mês */
  const doMes = ITINERARIOS.find(i => i.ano === hoje.getFullYear() && i.mes === hoje.getMonth() + 1)
    || [...ITINERARIOS].sort((a, b) => (b.ano - a.ano) || (b.mes - a.mes))[0];
  const destaque = document.querySelector('[data-itinerario-mes]');
  if (destaque && doMes) {
    const ancora = `itinerarios.html#m-${doMes.ano}-${String(doMes.mes).padStart(2, '0')}`;
    const pdf = doMes.pdf && (/^https?:/.test(doMes.pdf) ? doMes.pdf : 'assets/itinerarios/' + doMes.pdf);
    destaque.innerHTML = `
      <div class="mes-faixa">
        ${doMes.capa ? `<a href="${ancora}" class="revelar"><img class="mes-faixa__capa" src="assets/itinerarios/${doMes.capa}" alt="Capa do itinerário de ${MESES[doMes.mes - 1]}: ${doMes.tema}" width="900" height="1273" loading="lazy" decoding="async"></a>` : ''}
        <div>
          <p class="mes-faixa__mes revelar">Itinerário de ${MESES[doMes.mes - 1].toLowerCase()} de ${doMes.ano}</p>
          <h2 data-palavras>${doMes.tema}</h2>
          <div class="mes-faixa__acoes revelar">
            ${pdf ? `<a class="btn btn--primario" href="${pdf}" target="_blank" rel="noopener">${icone('baixar')} Baixar o PDF</a>` : ''}
            <a class="btn btn--contorno" href="itinerarios.html">Todos os itinerários</a>
          </div>
        </div>
      </div>`;
  }

  /* Próximas datas (linhas, sem cartões) */
  const lista = document.querySelector('[data-proximos-eventos]');
  if (lista) {
    const proximos = EVENTOS
      .filter(e => new Date(e.data + 'T23:59') >= hoje)
      .sort((a, b) => a.data.localeCompare(b.data))
      .slice(0, 4);
    lista.innerHTML = proximos.length ? proximos.map(e => {
      const [, m, d] = e.data.split('-');
      return `
        <div class="data-linha revelar">
          <div class="data-linha__dia">${d}<small>${MESES[+m - 1]}</small></div>
          <div><h3>${e.titulo}</h3><p>${[e.hora, e.local].filter(Boolean).join(' · ')}</p></div>
          ${e.link ? `<a class="link-mais" href="${e.link}" target="_blank" rel="noopener">${e.linkRotulo || 'Saiba mais'} ${icone('seta')}</a>` : '<span></span>'}
        </div>`;
    }).join('') : '<p class="data-linha">Novas datas em breve.</p>';
  }

  /* Cidades onde a comunidade está */
  const cidades = document.querySelector('[data-cidades]');
  if (cidades && typeof GRUPOS !== 'undefined') {
    const unicas = [...new Map(GRUPOS.map(g => [g.cidade + g.uf, `${g.cidade} (${g.uf})`])).values()];
    cidades.textContent = unicas.join(' · ');
  }

  preencherMarcadores();
  ativarRevelar();
})();
