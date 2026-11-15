/* Páginas legais: preenche dados da Associação e links oficiais a partir de dados.js */
(function () {
  const dados = {
    razao: COMUNIDADE.associacao.nome,
    cnpj: COMUNIDADE.associacao.cnpj,
    cidade: COMUNIDADE.cidade
  };
  document.querySelectorAll('[data-dado]').forEach(el => { el.textContent = dados[el.dataset.dado] || ''; });
  document.querySelectorAll('[data-link]').forEach(a => { if (LINKS[a.dataset.link]) a.href = LINKS[a.dataset.link]; });
  /* botão que abre o painel de acessibilidade do cabeçalho */
  document.querySelectorAll('[data-abrir-acess]').forEach(b => b.addEventListener('click', () => {
    const alvo = document.querySelector('.ac-abrir');
    if (alvo) { window.scrollTo({ top: 0 }); alvo.click(); }
  }));
})();
