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
