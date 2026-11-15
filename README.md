# Comunidade de Aliança Trindade Santa — site
# link do site: https://diasadm8.github.io/trindade-santa/index.html
Site estático (HTML + CSS + JavaScript puro), sem etapa de build. Pronto para o GitHub Pages e, depois, para o domínio `.org` da comunidade.

## Estrutura

```
index.html          Início (órbita animada da Santíssima Trindade)
comunidade.html     Quem somos, carisma, história, símbolos, fundadores…
itinerarios.html    Linha do tempo imersiva (cores/elementos mudam a cada mês) + PDFs
eventos.html        Agenda + cartões dos grandes eventos
noite-oracional.html, congresso-seta.html   Páginas dos eventos (identidade própria)
grupos.html         Mapa ilustrado do Brasil com RJ e MG (malhas do IBGE)
doacao.html         PIX, mensagem e projetos
faca-parte.html     Formas de pertença, caminho vocacional, formulário
contato.html        Contato e pedido de oração
assets/css/style.css   Todo o sistema visual (cores, fontes, componentes)
assets/js/marca.js     Símbolos (vetorizados do logo), ícones, cabeçalho e rodapé
assets/js/dados.js     CONTEÚDO EDITÁVEL: itinerários, eventos, grupos, PIX, projetos
assets/data/           Contornos dos estados e dos municípios de RJ e MG (IBGE)
assets/itinerarios/    Capas e PDFs dos itinerários
```

## Atualizar conteúdo

Itinerários, eventos e grupos ficam em `assets/js/dados.js`. Para adicionar um, copie uma linha e altere os valores.

## Rodar localmente

```bash
npx http-server -p 5500
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie estes arquivos.
2. Em **Settings → Pages**, escolha *Deploy from a branch* → `main` / `(root)`.
3. Quando migrar para o domínio `.org`, crie um arquivo `CNAME` com o domínio e configure o DNS.
