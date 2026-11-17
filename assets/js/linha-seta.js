/* Linha do tempo do Congresso SETA — artes de divulgação, da esquerda para a direita.
   Dados lidos direto dos cartazes enviados pela comunidade.
   ano: quando o cartaz não traz o ano impresso, foi deduzido (marcado com inferido: true).
   k: escala da altura (cartazes de baixa resolução ficam menores para não estourar). */
const LINHA_SETA = [
  { ano: 2003, ed: '1º SETA',  det: 'O primeiro SETA',                                  img: '2003.jpg', k: .56, inferido: true },
  { ano: 2004, ed: '2º SETA',  det: '27 de junho · Centro de Formação João Paulo II',   img: '2004.jpg' },
  { ano: 2005, ed: '3º SETA',  det: '5 de junho · “Eu vou seguir os passos do Senhor!”', img: '2005.jpg', k: .86 },
  { ano: 2006, ed: '4º SETA',  det: '11 de junho · C. E. 10 de Maio',                   img: '2006.jpg' },
  { ano: 2007, ed: '5º SETA',  det: '2 de setembro · Pe. Edmilson e Pe. Roger Luis',    img: '2007.jpg' },
  { ano: 2008, ed: '6º SETA',  det: '8 de junho · Pe. Roger Luis',                      img: '2008.jpg' },
  { ano: 2009, ed: '7º SETA',  det: '28 de junho · “Sou mais que um vencedor”',         img: '2009.jpg', inferido: true },
  { ano: 2010, ed: '8º SETA',  det: '5 de setembro · “Um clamor pelo Brasil”',          img: '2010.jpg', k: .84, inferido: true },
  { ano: 2011, ed: '9º SETA',  det: '5 de junho · “Santidade”',                         img: '2011.jpg', inferido: true },
  { ano: 2012, ed: '',         det: '2 e 3 de junho · Seguir a Trilha do Amor',         img: '2012.jpg', k: .92 },
  { ano: 2013, ed: '',         det: '23 de junho · Rumo à JMJ Rio 2013',                img: '2013.jpg' },
  { ano: 2014, ed: '',         det: '28 de setembro · “Quem como Deus?”',               img: '2014.jpg', k: .82, inferido: true },
  { ano: 2015, ed: '',         det: '13 e 14 de junho · Is 54,2',                       img: '2015.jpg' },
  { ano: 2016, ed: '',         det: '25 e 26 de junho · “Siga-me!”',                    img: '2016.jpg' },
  { ano: 2020, ed: '',         det: '“Salva o meu povo, eis o meu desejo”',             img: '2020.jpg' },
  { ano: 2022, ed: '20 anos',  det: '25 e 26 de junho · C.F. São João Paulo II',        img: '2022.webp' },
  { ano: 2023, ed: '',         det: '10 e 11 de junho · Uma história de louvor e adoração', img: '2023.jpg' },
  { ano: 2024, ed: '',         det: '8 e 9 de junho · C.F. São João Paulo II',          img: '2024.jpg', k: .88, inferido: true },
  { ano: 2025, ed: '',         det: '13 a 15 de junho · Guardiões da Esperança',        img: '2025.jpg' },
  { ano: 2026, ed: 'Agora',    det: '19, 20 e 21 de junho · C.F. São João Paulo II',    img: '../cartaz-seta-2026.jpg', atual: true }
];

(function () {
  const secao = document.getElementById('linha-do-tempo');
  if (!secao) return;
  const pista = secao.querySelector('[data-lt-pista]');
  const lista = secao.querySelector('[data-lt-lista]');
  const anoEl = secao.querySelector('[data-lt-ano]');
  const edEl = secao.querySelector('[data-lt-ed]');
  const btnAnt = secao.querySelector('[data-lt-ant]');
  const btnProx = secao.querySelector('[data-lt-prox]');
  const calmo = () => document.documentElement.classList.contains('ac-calmo') || matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- monta os cartazes ---- */
  const inclinacoes = [-2.2, 1.6, -1.2, 2.4, -1.8, 1.2];
  lista.innerHTML = LINHA_SETA.map((e, i) => `
    <li class="lt__item${e.atual ? ' lt__item--atual' : ''}" style="--r:${inclinacoes[i % inclinacoes.length]}deg;--k:${e.k || 1};--i:${i % 4}">
      <button class="lt__arte" type="button" data-ampliar="${i}" aria-label="Ampliar a arte do SETA ${e.ano}">
        <img src="assets/eventos/seta/${e.img}" alt="Arte de divulgação do Congresso SETA ${e.ano}" loading="lazy" draggable="false">
      </button>
      <div class="lt__via"><span class="lt__no"></span></div>
      <div class="lt__info">
        <span class="lt__a">${e.ano}</span>
      </div>
    </li>`).join('') + `
    <li class="lt__fim" aria-hidden="true">
      <span class="lt__seta"><svg viewBox="0 0 120 90" focusable="false"><path d="M6 36 L74 36 L74 8 L116 45 L74 82 L74 54 L6 54 Z"/></svg></span>
    </li>`;
  const itens = [...lista.querySelectorAll('.lt__item')];

  /* ---- aparecer ao entrar na vista (conta pela posição, sem depender de observer) ---- */
  function revelar() {
    const limite = pista.scrollLeft + pista.clientWidth * .96;
    itens.forEach(it => { if (!it.classList.contains('is-vista') && it.offsetLeft < limite) it.classList.add('is-vista'); });
  }

  /* ---- item em foco: ano grande, trilha acesa, setas ---- */
  let atual = -1;
  function foco() {
    revelar();
    const max = pista.scrollWidth - pista.clientWidth;
    const x = pista.scrollLeft;
    let alvo = 0;
    if (x >= max - 4) alvo = itens.length - 1;
    else if (x > 4) {
      const linha = x + pista.clientWidth * .34;
      let melhor = 1e9;
      itens.forEach((it, i) => {
        const centro = it.offsetLeft + it.offsetWidth * .5;
        const d = Math.abs(centro - linha);
        if (d < melhor) { melhor = d; alvo = i; }
      });
    }
    if (alvo !== atual) {
      const subindo = alvo > atual; atual = alvo;
      itens.forEach((it, i) => {
        it.classList.toggle('is-ativo', i === alvo);
        it.classList.toggle('is-passado', i < alvo);
      });
      const e = LINHA_SETA[alvo];
      anoEl.textContent = e.ano;
      edEl.textContent = e.ed || 'Congresso SETA';
      if (!calmo() && anoEl.animate) {
        const mov = matchMedia('(max-width: 760px)').matches ? 0 : (subindo ? 28 : -28);
        anoEl.animate([{ transform: `translateY(${mov}%)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 480, easing: 'cubic-bezier(.2,.8,.2,1)' });
        edEl.animate([{ opacity: 0, transform: 'translateX(-10px)' }, { opacity: 1, transform: 'none' }], { duration: 480, easing: 'ease-out' });
      }
    }
    btnAnt.disabled = x <= 4;
    btnProx.disabled = x >= max - 4;
  }
  pista.addEventListener('scroll', foco, { passive: true });
  addEventListener('resize', foco);
  foco();

  /* ---- botões e teclado ---- */
  const passo = () => Math.max(260, pista.clientWidth * .62);
  const ir = dir => pista.scrollBy({ left: dir * passo(), behavior: calmo() ? 'auto' : 'smooth' });
  btnAnt.addEventListener('click', () => ir(-1));
  btnProx.addEventListener('click', () => ir(1));
  pista.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); ir(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); ir(-1); }
  });

  /* ---- roda do mouse anda para o lado enquanto houver caminho ---- */
  pista.addEventListener('wheel', e => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    const max = pista.scrollWidth - pista.clientWidth;
    const indo = e.deltaY > 0;
    if ((indo && pista.scrollLeft >= max - 2) || (!indo && pista.scrollLeft <= 2)) return;
    e.preventDefault();
    pista.scrollLeft += e.deltaY;
  }, { passive: false });

  /* ---- arrastar com o mouse ---- */
  let arrasto = null, moveu = false;
  pista.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    arrasto = { x: e.clientX, l: pista.scrollLeft }; moveu = false;
  });
  addEventListener('pointermove', e => {
    if (!arrasto) return;
    const dx = e.clientX - arrasto.x;
    if (Math.abs(dx) > 5 && !moveu) { moveu = true; pista.classList.add('is-arrastando'); }
    if (moveu) pista.scrollLeft = arrasto.l - dx;
  });
  addEventListener('pointerup', () => { arrasto = null; pista.classList.remove('is-arrastando'); });
  pista.addEventListener('click', e => { if (moveu) { e.preventDefault(); e.stopPropagation(); moveu = false; } }, true);

  /* ---- ampliar a arte ---- */
  let caixa = null, indiceAberto = 0;
  function abrir(i) {
    indiceAberto = i;
    if (!caixa) {
      caixa = document.createElement('dialog');
      caixa.className = 'lt-caixa';
      caixa.setAttribute('aria-label', 'Arte ampliada');
      caixa.innerHTML = `
        <button type="button" class="lt-caixa__x" aria-label="Fechar">×</button>
        <button type="button" class="lt-caixa__nav lt-caixa__nav--ant" aria-label="Anterior">‹</button>
        <figure><img alt=""><figcaption></figcaption></figure>
        <button type="button" class="lt-caixa__nav lt-caixa__nav--prox" aria-label="Próxima">›</button>`;
      document.body.appendChild(caixa);
      caixa.addEventListener('click', e => { if (e.target === caixa || e.target.closest('.lt-caixa__x')) caixa.close(); });
      caixa.querySelector('.lt-caixa__nav--ant').addEventListener('click', () => mostrar(indiceAberto - 1));
      caixa.querySelector('.lt-caixa__nav--prox').addEventListener('click', () => mostrar(indiceAberto + 1));
      caixa.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') mostrar(indiceAberto - 1);
        if (e.key === 'ArrowRight') mostrar(indiceAberto + 1);
      });
    }
    mostrar(i);
    if (!caixa.open) (caixa.showModal ? caixa.showModal() : caixa.setAttribute('open', ''));
  }
  function mostrar(i) {
    i = (i + LINHA_SETA.length) % LINHA_SETA.length; indiceAberto = i;
    const e = LINHA_SETA[i];
    const img = caixa.querySelector('img');
    img.src = `assets/eventos/seta/${e.img}`;
    img.alt = `Arte de divulgação do Congresso SETA ${e.ano}`;
    caixa.querySelector('figcaption').innerHTML = `<strong>${e.ano}</strong>${e.ed ? ` · ${e.ed}` : ''}<span>${e.det}</span>`;
  }
  lista.addEventListener('click', e => {
    const b = e.target.closest('[data-ampliar]');
    if (b) abrir(+b.dataset.ampliar);
  });
})();
