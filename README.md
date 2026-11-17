# Comunidade de Aliança Trindade Santa — site

**No ar:** https://diasadm8.github.io/trindade-santa/

Site estático (HTML + CSS + JavaScript puro) publicado pelo GitHub Pages. Não há etapa de build para publicar; o único passo de compilação é o CSS do Tailwind (veja **CSS** abaixo), e o arquivo gerado já fica no repositório.

## Estrutura

```
index.html             Início (órbita animada da Santíssima Trindade)
comunidade.html        Quem somos, carisma, história, símbolos, fundador
espiritualidade.html   Sinal da Trindade, Nossa Senhora Mãe do Infinito Amor, baluartes
musica.html            Ministério de música: plataformas, vídeos e contato dos músicos
grupos.html            Mapa (RJ e MG, malhas do IBGE) e lista de grupos por cidade
itinerarios.html       Linha do tempo imersiva (cores mudam a cada mês) + PDFs
eventos.html           Agenda + os dois grandes eventos
noite-oracional.html   Página do evento (identidade própria)
congresso-seta.html    Página do evento (identidade própria, linha do tempo dos cartazes)
social.html            Associação Trindade Santa: ação social e doações (PIX)
faca-parte.html        Vocacional TS: o caminho vocacional em três passos
contato.html           Canais da comunidade
privacidade.html, termos.html, acessibilidade.html   Páginas legais
404.html               Página não encontrada (GitHub Pages usa automaticamente)

assets/js/dados.js     CONTEÚDO EDITÁVEL: itinerários, eventos, grupos, PIX, músicos…
assets/js/marca.js     Símbolos do logo, ícones, MENU, cabeçalho e rodapé
assets/js/tema.js      Painel de acessibilidade e modo escuro
assets/js/*.js         Scripts de cada página (inicio, grupos, itinerarios, historia…)
assets/css/style.css   Base e componentes do sistema visual
assets/css/site.css    CSS FINAL usado pelas páginas (gerado: não edite à mão)
src/                   Fontes do CSS: site.css (Tailwind), repagina.css, escuro.css, ajustes.css
assets/data/           Contornos dos estados e dos municípios de RJ e MG (IBGE)
assets/itinerarios/    Capas e PDFs dos itinerários
assets/img/            Marca (logos SVG), fotos, baluartes, grupos, músicos…
assets/eventos/        Logos, banners e cartazes dos eventos

DESIGN.md              Guia visual: cores, fontes, componentes, regras
sitemap.xml, robots.txt   Para o Google
google8971b883790d4f62.html   Verificação do Google Search Console (não apague)
.editorconfig          Padrão de formatação dos arquivos (UTF-8, LF, 2 espaços)
```

## Atualizar conteúdo

Quase tudo que muda com frequência fica em `assets/js/dados.js`: itinerários, eventos da agenda, grupos, músicos, dados do PIX. Para adicionar um item, copie um bloco e altere os valores. Itens marcados com `⚠ confirmar` precisam de confirmação antes de ir ao ar.

- **Evento novo:** acrescente em `EVENTOS` com `data: 'AAAA-MM-DD'`. Ele some sozinho da agenda depois da data e também vai para o Google como evento (dados estruturados).
- **Itinerário do mês:** coloque `AAAA-MM.jpg` e `AAAA-MM.pdf` em `assets/itinerarios/` e acrescente a linha em `ITINERARIOS`.
- **Menu:** edite a lista `PAGINAS` em `assets/js/marca.js` (vale para todas as páginas).
- **Fotos:** coloque `width` e `height` reais e `loading="lazy"` nas que ficam abaixo da primeira tela (evita a página “pular” enquanto carrega).

## Endereços sem `.html`

Os links internos usam `comunidade`, `eventos` etc., sem `.html` — o GitHub Pages entrega `comunidade.html` quando alguém acessa `/comunidade`, e os links antigos com `.html` continuam funcionando. Em links novos, escreva sem `.html`; para o Início use `./`.

## Rodar localmente

```bash
npx http-server -p 5500 -c-1
```

Abra http://localhost:5500. A `404.html` só aparece completa no GitHub Pages (por causa da `<base href="/trindade-santa/">`).

## CSS

As páginas carregam `assets/css/site.css`, gerado pelo Tailwind a partir de `src/site.css` (que importa `assets/css/style.css` e os arquivos de `src/`). Depois de editar qualquer um deles:

```bash
npm install
```

```bash
npm run css
```

Durante o trabalho, `npm run css:watch` recompila a cada alteração.

## Publicar

O GitHub Pages publica a branch `main` (pasta raiz). Basta fazer commit e enviar; o site atualiza em 1–2 minutos.

```bash
git push origin main
```

Depois de criar ou remover páginas, atualize o `sitemap.xml` e, no Google Search Console, envie o sitemap de novo.

## Ao trocar para o domínio próprio (.org)

1. Crie um arquivo `CNAME` com o domínio e configure o DNS; em **Settings → Pages**, informe o domínio e marque *Enforce HTTPS*.
2. Troque `https://diasadm8.github.io/trindade-santa/` pelo novo endereço em:
   - `<link rel="canonical">`, `og:url` e `og:image` no topo de cada página
   - dados estruturados (JSON-LD) em `index.html` e no script de `eventos.html`
   - `sitemap.xml` e `robots.txt`
3. Em `404.html`, a linha `<base href="/trindade-santa/">` vira `<base href="/">`.
4. No Search Console: crie a propriedade **Domínio** (registro TXT no DNS), envie o sitemap novo e use **Mudança de endereço** na propriedade antiga.

## Itens legais e de privacidade

- `privacidade.html`: política de privacidade e cookies (LGPD). O site não usa cookies nem rastreamento; só guarda no navegador as escolhas de acessibilidade.
- `termos.html`: termos de uso (conteúdo, imagens, doações, links externos).
- `acessibilidade.html`: recursos de acessibilidade e como pedir correções.
- Se um dia o site ganhar formulário próprio, Google Analytics, Meta Pixel ou vídeos incorporados, atualize a política e avalie um aviso de cookies.
- Material interno (Regra de Vida, anotações, pastas `imagens/`, `conteudo/`, `privado/`) fica fora do repositório pelo `.gitignore`: tudo que é enviado ao GitHub fica público.
