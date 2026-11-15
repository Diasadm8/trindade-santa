/* =========================================================
   ACESSIBILIDADE E MODO ESCURO
   • Aplica as preferências antes de a página aparecer (sem "piscar")
   • Painel no cabeçalho: tema, tamanho do texto, contraste,
     realce de links, fonte de leitura fácil e menos movimento
   • As escolhas ficam salvas no navegador
   ========================================================= */
(function () {
  var CHAVE = 'ts-acess';
  var PADRAO = { tema: 'auto', texto: 0, contraste: false, links: false, leitura: false, calmo: false };
  var raiz = document.documentElement;
  var prefs = Object.assign({}, PADRAO);
  try { Object.assign(prefs, JSON.parse(localStorage.getItem(CHAVE) || '{}')); } catch (e) {}
  /* ?tema=escuro na URL (útil para testar) */
  try {
    var q = new URLSearchParams(location.search).get('tema');
    if (q === 'escuro' || q === 'claro') prefs.tema = q;
    if (new URLSearchParams(location.search).get('calmo') === '1') prefs.calmo = true;
  } catch (e) {}

  var escuroSistema = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  var calmoSistema = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

  function aplicar() {
    var escuro = prefs.tema === 'escuro' || (prefs.tema === 'auto' && escuroSistema.matches);
    raiz.setAttribute('data-tema', escuro ? 'escuro' : 'claro');
    raiz.setAttribute('data-texto', String(prefs.texto));
    raiz.classList.toggle('ac-contraste', !!prefs.contraste);
    raiz.classList.toggle('ac-links', !!prefs.links);
    raiz.classList.toggle('ac-leitura', !!prefs.leitura);
    raiz.classList.toggle('ac-calmo', !!prefs.calmo || calmoSistema.matches);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) { if (!m.dataset.orig) m.dataset.orig = m.content; m.content = escuro ? '#071937' : m.dataset.orig; }
  }
  function salvar() { try { localStorage.setItem(CHAVE, JSON.stringify(prefs)); } catch (e) {} aplicar(); atualizarPainel(); }
  aplicar();
  if (escuroSistema.addEventListener) escuroSistema.addEventListener('change', aplicar);

  /* ---------- Painel ---------- */
  var painel, botao;
  var ICONE = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4.6" r="1.9"/><path d="M4.5 8.4c2.4.9 5 1.3 7.5 1.3s5.1-.4 7.5-1.3"/><path d="M12 9.8v4.4"/><path d="m8.2 20 3.8-5.8 3.8 5.8"/></svg>';
  var SOL = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var LUA = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/></svg>';

  function opcao(grupo, valor, rotulo, extra) {
    return '<button type="button" class="ac-op" data-g="' + grupo + '" data-v="' + valor + '"' + (extra || '') + '>' + rotulo + '</button>';
  }
  function interruptor(chave, rotulo, desc) {
    return '<button type="button" class="ac-int" role="switch" aria-checked="false" data-i="' + chave + '"><span class="ac-int__txt"><b>' + rotulo + '</b><small>' + desc + '</small></span><span class="ac-int__chave" aria-hidden="true"></span></button>';
  }

  function atualizarPainel() {
    if (!painel) return;
    var escuro = raiz.getAttribute('data-tema') === 'escuro';
    botao.setAttribute('aria-label', 'Acessibilidade e modo escuro');
    var tb = document.querySelector('.ac-rapido');
    if (tb) {
      tb.innerHTML = escuro ? SOL : LUA;
      tb.setAttribute('aria-label', escuro ? 'Mudar para o modo claro' : 'Mudar para o modo escuro');
      tb.setAttribute('aria-pressed', escuro ? 'true' : 'false');
    }
    painel.querySelectorAll('[data-g="tema"]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.v === prefs.tema)); });
    painel.querySelectorAll('[data-g="texto"]').forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.v) === prefs.texto)); });
    painel.querySelectorAll('[data-i]').forEach(function (b) { b.setAttribute('aria-checked', String(!!prefs[b.dataset.i])); });
  }

  function abrir(sim) {
    painel.hidden = !sim;
    botao.setAttribute('aria-expanded', String(sim));
    if (sim) { var p = painel.querySelector('button'); p && p.focus(); }
  }

  window.montarAcessibilidade = function (header) {
    if (!header || header.querySelector('.ac-botoes')) return;
    var cont = header.querySelector('.container');
    var wrap = document.createElement('div');
    wrap.className = 'ac-botoes';
    wrap.innerHTML =
      '<button type="button" class="ac-rapido" aria-pressed="false"></button>' +
      '<button type="button" class="ac-abrir" aria-expanded="false" aria-controls="ac-painel" aria-haspopup="dialog">' + ICONE + '<span class="ac-abrir__txt">Acessibilidade</span></button>';
    painel = document.createElement('div');
    painel.className = 'ac-painel'; painel.id = 'ac-painel'; painel.hidden = true;
    painel.setAttribute('role', 'dialog'); painel.setAttribute('aria-label', 'Acessibilidade');
    painel.innerHTML =
      '<div class="ac-painel__topo"><strong>Acessibilidade</strong><button type="button" class="ac-fechar" aria-label="Fechar">×</button></div>' +
      '<div class="ac-bloco"><span class="ac-rot" id="ac-r1">Aparência</span><div class="ac-grupo" role="group" aria-labelledby="ac-r1">' +
        opcao('tema', 'claro', SOL + ' Claro') + opcao('tema', 'escuro', LUA + ' Escuro') + opcao('tema', 'auto', 'Automático') + '</div></div>' +
      '<div class="ac-bloco"><span class="ac-rot" id="ac-r2">Tamanho do texto</span><div class="ac-grupo" role="group" aria-labelledby="ac-r2">' +
        opcao('texto', '0', '<span style="font-size:.9em">A</span> Normal') + opcao('texto', '1', '<span style="font-size:1.1em">A</span> Grande') + opcao('texto', '2', '<span style="font-size:1.3em">A</span> Maior') + '</div></div>' +
      interruptor('contraste', 'Alto contraste', 'Cores fortes, fáceis de distinguir') +
      interruptor('links', 'Destacar links', 'Sublinha todos os links') +
      interruptor('leitura', 'Letra de leitura fácil', 'Fonte simples e mais espaçada') +
      interruptor('calmo', 'Reduzir movimento', 'Sem animações nem efeitos de rolagem') +
      '<button type="button" class="ac-zerar">Restaurar o padrão</button>';
    cont.appendChild(wrap);
    document.body.appendChild(painel);
    botao = wrap.querySelector('.ac-abrir');

    botao.addEventListener('click', function () { abrir(painel.hidden); });
    painel.querySelector('.ac-fechar').addEventListener('click', function () { abrir(false); botao.focus(); });
    wrap.querySelector('.ac-rapido').addEventListener('click', function () {
      prefs.tema = raiz.getAttribute('data-tema') === 'escuro' ? 'claro' : 'escuro'; salvar();
    });
    painel.addEventListener('click', function (e) {
      var o = e.target.closest('.ac-op'), i = e.target.closest('.ac-int');
      if (o) { prefs[o.dataset.g] = o.dataset.g === 'texto' ? Number(o.dataset.v) : o.dataset.v; salvar(); }
      if (i) { prefs[i.dataset.i] = !prefs[i.dataset.i]; salvar(); }
      if (e.target.closest('.ac-zerar')) { prefs = Object.assign({}, PADRAO); salvar(); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !painel.hidden) { abrir(false); botao.focus(); } });
    document.addEventListener('click', function (e) {
      if (!painel.hidden && !painel.contains(e.target) && !wrap.contains(e.target)) abrir(false);
    });
    atualizarPainel();
  };
})();
