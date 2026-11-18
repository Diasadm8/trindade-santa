/* =========================================================
   NOSSA HISTÓRIA — linha do tempo imersiva
   Dados: HISTORIA (dados.js).  Estilos: src/sistema/historia.css.
   - o fio de ouro (a aliança) é desenhado conforme a rolagem
   - cada marco acende ao ser alcançado
   - o ano ao fundo muda; símbolos e luz se movem em paralaxe
   ========================================================= */
(function () {
  const raiz = document.getElementById('historia');
  if (!raiz || typeof HISTORIA === 'undefined') return;

  const corpo = raiz.querySelector('[data-hist-corpo]');
  const svg = corpo.querySelector('.hist__fio');
  const base = svg.querySelector('.hist__fio-base');
  const ouro = svg.querySelector('.hist__fio-ouro');
  const anoFundo = raiz.querySelector('[data-hist-ano]');
  const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  raiz.querySelector('[data-hist-abertura]').textContent = HISTORIA.abertura;

  /* ---------- Símbolos grandes ao fundo (paralaxe) ---------- */
  raiz.querySelectorAll('.hist__fantasma').forEach(el => {
    const pessoa = ['pai', 'filho', 'espirito'].find(p => el.classList.contains('hist__fantasma--' + p));
    el.innerHTML = simbolo(pessoa);
  });

  /* ---------- Montagem ---------- */
  const GIROS = [-.9, .7, -.5, .8, -.7, .5, -.4, .9];
  let n = 0;

  const moldura = (m, sim) => `
    <figure class="hist__foto">
      <div class="hist__foto-img">${m.foto
        ? `<img src="${m.foto.includes('/') ? esc(m.foto) : 'assets/img/historia/' + esc(m.foto)}" alt="${esc(m.legenda || m.titulo)}" loading="lazy">`
        : `<span class="hist__foto-vazia">${simbolo(sim)}</span>`}</div>
    </figure>`;

  const marco = (m, ato) => {
    const i = n++;
    const lado = i % 2 ? 'dir' : 'esq';
    const sim = m.simbolo || ato.simbolo;
    const longo = String(m.ano).length > 6;
    return `
      <article class="hist__marco hist__marco--${lado} revelar" data-ano="${esc(m.ano)}" style="--giro:${GIROS[i % GIROS.length]}deg">
        <span class="hist__no" aria-hidden="true">${simbolo(sim)}</span>
        <div class="hist__papel">
          <span class="hist__ano${longo ? ' hist__ano--txt' : ''}">${esc(m.ano)}</span>
          <h3>${esc(m.titulo)}</h3>
          <p>${esc(m.texto)}</p>
          ${m.presentes ? `<ul class="hist__presentes" aria-label="Pessoas citadas">${m.presentes.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
          ${m.foto || m.espaco ? moldura(m, sim) : ''}
        </div>
      </article>`;
  };

  const destaque = m => `
    <blockquote class="hist__destaque revelar">
      <p>${esc(m.citacao)}</p>
      <footer>${esc(m.ano)}</footer>
    </blockquote>`;

  const partes = [];
  HISTORIA.atos.forEach(ato => {
    partes.push(`
      <div class="hist__ato revelar">
        <span class="hist__ato-selo">${selo(ato.simbolo, 'selo--branco')}</span>
        <span class="hist__ato-n">Ato ${esc(ato.numero)}</span>
        <h3>${esc(ato.titulo)}</h3>
      </div>`);
    ato.marcos.forEach(m => { partes.push(marco(m, ato)); if (m.citacao) partes.push(destaque(m)); });
  });
  corpo.insertAdjacentHTML('beforeend', partes.join(''));

  /* ---------- Final: a Trindade que habita ---------- */
  const cidades = new Set(GRUPOS.map(g => g.cidade + '|' + g.uf)).size;
  raiz.querySelector('[data-hist-final]').innerHTML = `
    <div class="hist__trio revelar">${trio('selo--branco')}</div>
    <p class="hist__final-frase revelar" data-atraso="1">${esc(HISTORIA.final)}</p>
    <p class="hist__hoje revelar" data-atraso="2">Hoje, a caminhada continua em Itaperuna e em ${cidades - 1} outras cidades do Rio de Janeiro e de Minas Gerais.</p>
    <a class="btn btn--claro revelar" data-atraso="3" href="grupos">Ver onde estamos ${icone('seta')}</a>`;

  ativarRevelar(raiz);

  /* ---------- O fio de ouro ---------- */
  let nos = [], altura = 0, comprimento = 0, topoCorpo = 0;

  function medir() {
    const c = corpo.getBoundingClientRect();
    altura = corpo.offsetHeight;
    topoCorpo = c.top + scrollY;
    const mobile = innerWidth < 820;
    /* offsetTop/Left ignoram as transformações da animação de entrada (getBoundingClientRect não) */
    nos = [...corpo.querySelectorAll('.hist__marco')].map(m => {
      const no = m.querySelector('.hist__no');
      return { el: m, no, x: m.offsetLeft + no.offsetLeft + no.offsetWidth / 2, y: m.offsetTop + no.offsetTop + no.offsetHeight / 2, ano: m.dataset.ano };
    });
    svg.setAttribute('viewBox', `0 0 ${corpo.offsetWidth} ${altura}`);
    svg.style.height = altura + 'px';
    if (!nos.length) return;
    const sway = mobile ? 7 : 30;
    /* um único traço contínuo, para o fio "crescer" sem quebras */
    let d = `M ${nos[0].x} 0 L ${nos[0].x} ${nos[0].y} `;
    nos.forEach((p, i) => {
      const q = nos[i + 1] || { x: p.x, y: altura };
      const s = (i % 2 ? -1 : 1) * sway;
      const dy = q.y - p.y;
      d += `C ${p.x + s} ${p.y + dy * .35}, ${q.x - s} ${p.y + dy * .65}, ${q.x} ${q.y} `;
    });
    base.setAttribute('d', d);
    ouro.setAttribute('d', d);
    comprimento = ouro.getTotalLength();
    ouro.style.strokeDasharray = comprimento;
    atualizar();
  }

  let ultimoAno = '';
  function atualizar() {
    const vh = innerHeight;
    const cabeca = Math.max(0, Math.min(altura, scrollY + vh * .62 - topoCorpo));
    const frac = reduzir ? 1 : cabeca / altura;
    ouro.style.strokeDashoffset = comprimento * (1 - frac);

    let ativo = null;
    nos.forEach(p => {
      const aceso = reduzir || p.y <= cabeca;
      p.no.classList.toggle('is-aceso', aceso);
      p.el.classList.toggle('is-aceso', aceso);
      if (aceso) ativo = p;
    });
    nos.forEach(p => p.el.classList.toggle('is-atual', p === ativo));

    const m = ativo && /\d{4}/.exec(ativo.ano);
    const ano = m ? m[0] : (ativo ? ultimoAno : '');
    if (ano !== ultimoAno && ano) {
      ultimoAno = ano;
      anoFundo.classList.remove('is-troca'); void anoFundo.offsetWidth;
      anoFundo.textContent = ano; anoFundo.classList.add('is-troca');
    }

    if (!reduzir) {
      const r = raiz.getBoundingClientRect();
      const meio = r.top + r.height / 2 - vh / 2;
      raiz.querySelectorAll('.hist__fantasma').forEach(el => {
        el.style.transform = `translate3d(0, ${(meio * (+el.dataset.v || 0)).toFixed(1)}px, 0)`;
      });
      raiz.querySelector('.hist__raios').style.transform = `translateX(-50%) rotate(${(scrollY * .02).toFixed(2)}deg)`;
    }
  }

  let pendente = false;
  const aoRolar = () => { if (pendente) return; pendente = true; requestAnimationFrame(() => { pendente = false; atualizar(); }); };
  addEventListener('scroll', aoRolar, { passive: true });
  addEventListener('resize', () => { medir(); });
  addEventListener('load', medir);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(medir);
  /* o conteúdo muda de altura quando as imagens e as fontes chegam */
  if ('ResizeObserver' in window) new ResizeObserver(() => medir()).observe(corpo);
  medir();
})();
