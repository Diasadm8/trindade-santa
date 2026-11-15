/* =========================================================
   GRUPOS — mapa ilustrado do Brasil (sem imagem de satélite)
   • Abre mostrando o Brasil e voa até RJ e MG
   • Arrasta (mouse ou dedo), zoom por roda, pinça e botões
   • Ao aproximar, os municípios e os pontos dos grupos surgem
   • Passar o mouse numa cidade mostra os grupos dela
   Contornos: malhas oficiais do IBGE (assets/data).
   ========================================================= */
(async function () {
  if (typeof L === 'undefined') return;

  const ESTADOS_ATIVOS = ['RJ', 'MG'];
  const ZOOM_MUNICIPIOS = 7;
  const normalizar = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const COR = { profundo: css('--azul-profundo'), celeste: css('--azul-celeste'), bruma: css('--bruma'), mar: css('--azul-mar') };

  const [estados, municipios] = await Promise.all([
    fetch('assets/data/brasil-estados.json').then(r => r.json()),
    fetch('assets/data/municipios-rj-mg.json').then(r => r.json())
  ]);

  /* ---------- Agrupa os grupos por município ---------- */
  const porChave = new Map(municipios.features.map(f => [`${normalizar(f.properties.nome)}|${f.properties.uf}`, f]));
  const cidades = new Map(); // cod → { feature, grupos[] }
  const naoEncontrados = [];
  GRUPOS.forEach(g => {
    const f = porChave.get(`${normalizar(g.cidade)}|${g.uf.toUpperCase()}`);
    if (!f) { naoEncontrados.push(g); return; }
    const c = cidades.get(f.properties.cod) || { feature: f, grupos: [] };
    c.grupos.push(g);
    cidades.set(f.properties.cod, c);
  });
  if (naoEncontrados.length) console.warn('Cidades não encontradas no mapa:', naoEncontrados.map(g => `${g.cidade}/${g.uf}`));

  /* ---------- Fichas dos grupos ---------- */
  const escapar = s => String(s ?? '').replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  /* logo do grupo; sem logo, usa o símbolo da Trindade */
  const logoHtml = (g, tam = 44) => g.logo
    ? `<img class="grupo-logo" src="assets/img/grupos/${escapar(g.logo)}" alt="Logo de ${escapar(g.nome)}" width="${tam}" height="${tam}" loading="lazy" style="--l:${tam}px">`
    : `<span class="grupo-logo grupo-logo--selo" style="--l:${tam}px" aria-hidden="true">${simbolo('filho')}</span>`;
  const fichaGrupo = g => `
    <article class="ficha-grupo">
      ${logoHtml(g, 52)}
      <div>
        <span class="ficha-grupo__tipo">${escapar(g.tipo)}</span>
        <strong>${escapar(g.nome)}</strong>
        ${g.frase ? `<p class="ficha-grupo__frase">“${escapar(g.frase)}”</p>` : ''}
        ${g.encontro ? `<span class="ficha-grupo__linha">${icone('relogio')} ${escapar(g.encontro)}</span>` : ''}
        ${g.local ? `<span class="ficha-grupo__linha">${icone('pino')} ${escapar(g.local)}</span>` : ''}
        ${g.ig ? `<a class="ficha-grupo__ig" href="https://www.instagram.com/${escapar(g.ig)}/" target="_blank" rel="noopener">${icone('instagram')} @${escapar(g.ig)}</a>` : ''}
      </div>
    </article>`;
  const fichaCidade = (p, c) => `
    <div class="ficha-cidade">
      <span class="dica-cidade__uf">${p.uf}</span>
      <h3>${p.nome}</h3>
      <span class="dica-cidade__qtd">${c.grupos.length} ${c.grupos.length === 1 ? 'grupo' : 'grupos'}</span>
      ${c.grupos.map(fichaGrupo).join('')}
    </div>`;

  /* ---------- Mapa ---------- */
  const limitesBrasil = L.geoJSON(estados).getBounds();
  /* Celular/tablet: um dedo rola a página, dois dedos movem e aproximam o mapa */
  const toque = matchMedia('(pointer: coarse)').matches;
  const mapa = L.map('mapa', {
    zoomControl: false,
    attributionControl: false,
    dragging: !toque,         // computador: arrasta com o mouse; celular: dois dedos
    inertia: true,
    keyboard: true,
    boxZoom: false,
    zoomSnap: 0.25,
    zoomDelta: 0.75,
    wheelPxPerZoomLevel: 90,
    maxBounds: limitesBrasil.pad(0.05),
    maxBoundsViscosity: .85,
    maxZoom: 11
  });
  mapa.fitBounds(limitesBrasil, { padding: [20, 20], animate: false });
  mapa.setMinZoom(mapa.getZoom());

  if (toque) {
    const palcoMapa = document.querySelector('.mapa-palco');
    const el = mapa.getContainer();
    const aviso = document.createElement('div');
    aviso.className = 'mapa-aviso-toque';
    aviso.setAttribute('aria-hidden', 'true');
    aviso.textContent = 'Use dois dedos para mover o mapa';
    el.appendChild(aviso);          // dentro do mapa, para não cobrir a lista de cidades
    let tempo;
    el.addEventListener('touchstart', e => {
      clearTimeout(tempo);
      if (e.touches.length === 1) { palcoMapa.classList.add('mostra-aviso'); tempo = setTimeout(() => palcoMapa.classList.remove('mostra-aviso'), 1400); }
      else palcoMapa.classList.remove('mostra-aviso');
    }, { passive: true });
  }

  /* Celular: a ficha da cidade abre numa gaveta na base do mapa (o balão do Leaflet ficava cortado) */
  const estreito = () => matchMedia('(max-width: 860px)').matches;
  const folha = document.createElement('div');
  folha.className = 'mapa-folha';
  folha.hidden = true;
  folha.setAttribute('role', 'dialog');
  folha.setAttribute('aria-label', 'Grupos da cidade');
  mapa.getContainer().appendChild(folha);
  L.DomEvent.disableClickPropagation(folha);
  L.DomEvent.disableScrollPropagation(folha);
  const fecharFolha = () => { folha.hidden = true; };
  folha.addEventListener('click', e => { if (e.target.closest('.mapa-folha__x')) fecharFolha(); });
  mapa.on('click', fecharFolha);
  let interagiu = false;           // se a pessoa já escolheu uma cidade, a animação de abertura não a desfaz
  function abrirFicha(c) {
    interagiu = true;
    folha.innerHTML = `<button type="button" class="mapa-folha__x" aria-label="Fechar">×</button>${fichaCidade(c.feature.properties, c)}`;
    folha.hidden = false;
    folha.scrollTop = 0;
    // centraliza a cidade na metade de cima do mapa, acima da gaveta
    const alvo = mapa.unproject(mapa.project(c.feature.properties.centro, 9).add([0, mapa.getSize().y * .22]), 9);
    mapa.flyTo(alvo, 9, { duration: .9 });
  }

  /* Estados */
  const estiloEstado = f => ESTADOS_ATIVOS.includes(f.properties.sigla)
    ? { fillColor: COR.celeste, fillOpacity: .9, color: '#fff', weight: 2, className: 'estado estado--ativo' }
    : { fillColor: '#ffffff', fillOpacity: .85, color: '#cfe2eb', weight: 1, className: 'estado' };

  const camadaEstados = L.geoJSON(estados, {
    style: estiloEstado,
    onEachFeature: (f, layer) => {
      if (!ESTADOS_ATIVOS.includes(f.properties.sigla)) { layer.options.interactive = false; return; }
      layer.on('click', () => mapa.flyToBounds(layer.getBounds(), { padding: [30, 30], duration: 1.4 }));
      layer.on('mouseover', () => mapa.getZoom() < ZOOM_MUNICIPIOS && layer.setStyle({ fillColor: COR.profundo }));
      layer.on('mouseout', () => layer.setStyle({ fillColor: COR.celeste }));
    }
  }).addTo(mapa);

  /* Municípios de RJ e MG (aparecem ao aproximar) */
  mapa.createPane('municipios').style.zIndex = 410;
  const camadaMunicipios = L.geoJSON(municipios, {
    pane: 'municipios',
    style: f => cidades.has(f.properties.cod)
      ? { fillColor: COR.profundo, fillOpacity: 1, color: '#fff', weight: 1.2, className: 'municipio municipio--grupo' }
      : { fillColor: '#eaf5f9', fillOpacity: 1, color: '#ffffff', weight: .8, className: 'municipio' },
    onEachFeature: (f, layer) => {
      const c = cidades.get(f.properties.cod);
      const qtd = c ? `${c.grupos.length} ${c.grupos.length === 1 ? 'grupo' : 'grupos'}` : '';
      /* Ao passar o mouse: lista curta (logo, nome e tipo) */
      const conteudo = c
        ? `<div class="dica-cidade">
             <span class="dica-cidade__uf">${f.properties.uf}</span>
             <strong>${f.properties.nome}</strong>
             <span class="dica-cidade__qtd">${qtd} · clique para ver</span>
             <ul class="dica-mini">${c.grupos.map(g => `<li>${logoHtml(g, 30)}<span><b>${g.nome}</b><small>${g.tipo}</small></span></li>`).join('')}</ul>
           </div>`
        : `<div class="dica-cidade dica-cidade--simples"><strong>${f.properties.nome}</strong><small>Ainda sem grupo</small></div>`;
      layer.bindTooltip(conteudo, { sticky: !c, direction: 'top', className: 'dica', offset: c ? [0, -52] : [0, -6], opacity: 1 });
      /* Ao clicar: fichas completas (frase, encontro, local e Instagram) */
      if (c) layer.bindPopup(() => fichaCidade(f.properties, c), { className: 'ficha-popup', maxWidth: 360, minWidth: 280, offset: [0, -40], autoPanPadding: [30, 30] });
      layer.on('mouseover', () => {
        layer.setStyle(c ? { fillColor: COR.celeste } : { fillColor: COR.bruma });
        layer.bringToFront();
      });
      layer.on('mouseout', () => layer.setStyle(c ? { fillColor: COR.profundo } : { fillColor: '#eaf5f9' }));
      if (c) {
        layer.on('click', () => {
          layer.closeTooltip();
          if (estreito()) { abrirFicha(c); return; }
          layer.openPopup(c.feature.properties.centro);
          if (mapa.getZoom() < 8.5) mapa.flyTo(c.feature.properties.centro, 9, { duration: 1.2 });
        });
        layer.on('popupopen', () => layer.closeTooltip());
      }
    }
  });

  /* Pontos dos grupos (surgem ao aproximar) */
  const iconePino = qtd => L.divIcon({
    className: 'ponto-grupo',
    html: `<span class="ponto-grupo__pulso"></span><span class="ponto-grupo__pino">${simbolo('filho')}</span>${qtd > 1 ? `<span class="ponto-grupo__qtd">${qtd}</span>` : ''}`,
    iconSize: [40, 48], iconAnchor: [20, 46]
  });
  const camadaPontos = L.layerGroup([...cidades.values()].map(c =>
    L.marker(c.feature.properties.centro, { icon: iconePino(c.grupos.length), interactive: false, pane: 'markerPane' })));

  /* Bolhas com contagem por estado (visão afastada) */
  const contagemUF = ESTADOS_ATIVOS.map(uf => {
    const total = GRUPOS.filter(g => g.uf.toUpperCase() === uf).length;
    const layer = camadaEstados.getLayers().find(l => l.feature.properties.sigla === uf);
    return L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({ className: 'bolha-uf', html: `<strong>${uf}</strong><span>${total ? `${total} ${total === 1 ? 'grupo' : 'grupos'}` : 'em breve'}</span>`, iconSize: [84, 52], iconAnchor: [42, 26] })
    }).on('click', () => mapa.flyToBounds(layer.getBounds(), { padding: [30, 30], duration: 1.4 }));
  });
  const camadaBolhas = L.layerGroup(contagemUF).addTo(mapa);

  /* Troca de camadas conforme o zoom, com transição */
  const palco = document.querySelector('.mapa-palco');
  function atualizarCamadas() {
    const perto = mapa.getZoom() >= ZOOM_MUNICIPIOS;
    palco.classList.toggle('is-perto', perto);
    if (perto) {
      if (!mapa.hasLayer(camadaMunicipios)) camadaMunicipios.addTo(mapa);
      if (!mapa.hasLayer(camadaPontos)) camadaPontos.addTo(mapa);
      mapa.removeLayer(camadaBolhas);
    } else {
      mapa.removeLayer(camadaPontos);
      if (!mapa.hasLayer(camadaBolhas)) camadaBolhas.addTo(mapa);
      // municípios saem depois do fade
      setTimeout(() => mapa.getZoom() < ZOOM_MUNICIPIOS && mapa.removeLayer(camadaMunicipios), 500);
    }
  }
  mapa.on('zoomend', atualizarCamadas);

  /* Controles */
  const regiao = camadaEstados.getLayers().filter(l => ESTADOS_ATIVOS.includes(l.feature.properties.sigla))
    .reduce((b, l) => b.extend(l.getBounds()), L.latLngBounds([]));
  document.querySelector('.mapa-controles').addEventListener('click', e => {
    const b = e.target.closest('[data-zoom]');
    if (!b) return;
    if (b.dataset.zoom === 'in') mapa.zoomIn();
    if (b.dataset.zoom === 'out') mapa.zoomOut();
    if (b.dataset.zoom === 'reset') mapa.flyToBounds(limitesBrasil, { padding: [20, 20], duration: 1.4 });
  });

  /* Painel lateral */
  const totalCidades = cidades.size;
  document.querySelector('[data-resumo]').innerHTML = `
    <div><strong>${GRUPOS.length}</strong><span>${GRUPOS.length === 1 ? 'grupo' : 'grupos'}</span></div>
    <div><strong>${totalCidades}</strong><span>${totalCidades === 1 ? 'cidade' : 'cidades'}</span></div>
    <div><strong>${ESTADOS_ATIVOS.length}</strong><span>estados</span></div>`;
  const lista = document.querySelector('[data-cidades]');
  [...cidades.values()]
    .sort((a, b) => a.feature.properties.nome.localeCompare(b.feature.properties.nome))
    .forEach(c => {
      const li = document.createElement('li');
      li.innerHTML = `<button type="button">${c.grupos.find(g => g.logo) ? logoHtml(c.grupos.find(g => g.logo), 38) : selo('filho')}<span><strong>${c.feature.properties.nome}</strong><small>${c.feature.properties.uf} · ${c.grupos.length} ${c.grupos.length === 1 ? 'grupo' : 'grupos'}</small></span></button>`;
      li.querySelector('button').addEventListener('click', () => {
        if (estreito()) {
          mapa.getContainer().scrollIntoView({ block: 'start', behavior: 'smooth' });
          abrirFicha(c);
          return;
        }
        mapa.flyTo(c.feature.properties.centro, 9, { duration: 1.6 });
        mapa.once('moveend', () => {
          const layer = camadaMunicipios.getLayers().find(l => l.feature.properties.cod === c.feature.properties.cod);
          layer && layer.openPopup(c.feature.properties.centro);
        });
      });
      lista.appendChild(li);
    });

  /* Abertura: mostra o Brasil e voa até RJ + MG */
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const margemPainel = () => innerWidth > 860 ? 330 : 20; // espaço do painel flutuante
  const voar = () => !interagiu && mapa.flyToBounds(regiao, {
    paddingTopLeft: [margemPainel(), 40], paddingBottomRight: [80, 40], duration: reduzido ? 0 : 2.4
  });
  /* Link direto para uma cidade: grupos.html?cidade=Itaperuna */
  const pedida = new URLSearchParams(location.search).get('cidade');
  const cidadePedida = pedida && [...cidades.values()].find(c => normalizar(c.feature.properties.nome) === normalizar(pedida));
  if (cidadePedida) {
    setTimeout(() => lista.querySelectorAll('button')[[...cidades.values()]
      .sort((a, b) => a.feature.properties.nome.localeCompare(b.feature.properties.nome)).indexOf(cidadePedida)].click(), 600);
  } else if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(voar, 700); obs.disconnect(); }
    }, { threshold: .4 });
    obs.observe(palco);
  } else voar();
  palco.classList.add('is-carregado');
})();
