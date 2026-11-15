/* =========================================================
   MOVIMENTO — animações do site (todas as páginas)
   [data-palavras]  título cujas palavras sobem de dentro de uma máscara
   .abre-foto       foto que se abre de baixo para cima ao aparecer
   [data-paralaxe]  imagem que se desloca devagar ao rolar (valor = intensidade)
   .corre           faixa de palavras que corre na horizontal (o conteúdo é duplicado)
   Respeita "reduzir movimento" do sistema.
   ========================================================= */
(function () {
  const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Palavras com máscara */
  document.querySelectorAll('[data-palavras]').forEach(el => {
    let i = 0;
    const embrulhar = no => {
      [...no.childNodes].forEach(filho => {
        if (filho.nodeType === 3) {
          const partes = filho.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          partes.forEach(p => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
            const fora = document.createElement('span'); fora.className = 'pw';
            const dentro = document.createElement('span'); dentro.textContent = p; dentro.style.setProperty('--i', i++);
            fora.appendChild(dentro); frag.appendChild(fora);
          });
          filho.replaceWith(frag);
        } else if (filho.nodeType === 1 && !filho.classList.contains('pw')) embrulhar(filho);
      });
    };
    embrulhar(el);
  });

  /* Faixas que correm: duplica o conteúdo para o laço não ter emenda */
  document.querySelectorAll('.corre__trilho').forEach(t => {
    t.insertAdjacentHTML('beforeend', t.innerHTML.replace(/<(img|span|a)\b/g, '<$1 aria-hidden="true"'));
  });

  /* Entrada ao aparecer */
  const alvos = document.querySelectorAll('[data-palavras], .abre-foto');
  if (reduzir || !('IntersectionObserver' in window)) {
    alvos.forEach(a => a.classList.add('is-dentro'));
  } else {
    /* A foto recortada (clip-path) não "aparece" para o observador: observa-se o pai */
    const mapa = new Map();
    alvos.forEach(a => {
      const vigia = a.classList.contains('abre-foto') ? a.parentElement : a;
      if (!mapa.has(vigia)) mapa.set(vigia, []);
      mapa.get(vigia).push(a);
    });
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { mapa.get(e.target).forEach(a => a.classList.add('is-dentro')); obs.unobserve(e.target); }
    }), { threshold: .15 });
    mapa.forEach((_, vigia) => obs.observe(vigia));
  }

  /* Fitas de fotos: arrastar com o mouse */
  document.querySelectorAll('[data-fita]').forEach(f => {
    let x0 = 0, s0 = 0, ativo = false, moveu = false;
    f.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; ativo = true; moveu = false; x0 = e.clientX; s0 = f.scrollLeft; f.classList.add('is-arrastando'); });
    addEventListener('pointermove', e => { if (!ativo) return; const dx = e.clientX - x0; if (Math.abs(dx) > 3) moveu = true; f.scrollLeft = s0 - dx; });
    addEventListener('pointerup', () => { if (!ativo) return; ativo = false; f.classList.remove('is-arrastando'); });
    f.addEventListener('click', e => { if (moveu) e.preventDefault(); }, true);
  });

  /* Faixas que se acendem ao passar pelo meio da tela (ex.: qcd-arcanjos no celular) */
  const acender = document.querySelectorAll('.qcd-arcanjo');
  if (acender.length && 'IntersectionObserver' in window && matchMedia('(hover: none)').matches) {
    const o = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('is-aceso', e.isIntersecting)), { rootMargin: '-40% 0px -40% 0px' });
    acender.forEach(a => o.observe(a));
  }

  /* Paralaxe leve */
  const par = [...document.querySelectorAll('[data-paralaxe]')];
  if (reduzir || !par.length) return;
  let pendente = false;
  const mover = () => {
    pendente = false;
    const vh = innerHeight;
    par.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const meio = (r.top + r.height / 2 - vh / 2) / vh;   // -1..1
      el.style.transform = `translate3d(0, ${(meio * -(+el.dataset.paralaxe || 8)).toFixed(2)}%, 0)`;
    });
  };
  addEventListener('scroll', () => { if (!pendente) { pendente = true; requestAnimationFrame(mover); } }, { passive: true });
  addEventListener('resize', mover);
  mover();
})();
