# DESIGN.md — Comunidade de Aliança Trindade Santa

Guia do sistema visual do site. Serve para quem for criar uma página nova, mexer em
uma seção ou pedir ajuda a uma IA: siga o que está aqui para o site continuar com a
mesma cara.

> Fonte da verdade no código: `src/site.css` (tokens do Tailwind), `assets/css/style.css`
> (base e componentes), `src/repagina.css` (repaginação jovem 2026-11) e
> `src/escuro.css` (acessibilidade e modo escuro). Depois de editar `src/`, rode
> `npm run css` para gerar `assets/css/site.css`.

---

## 1. Princípios

1. **A Trindade é o centro.** Três anéis, três Pessoas, três cores (Pai, Filho, Espírito).
   Quando precisar de um ritmo, use grupos de três.
2. **Jovem, mas reverente.** Letra condensada grande e cores vivas convivem com fotos
   reais de oração, louvor e adoração. Nada de caricatura ou emoji.
3. **Foto real, sem filtro.** As fotos da comunidade aparecem em tela cheia, com as
   cores originais. Véu azul por cima só quando o texto precisa de contraste.
4. **Menos texto, menos caixas.** Frases curtas, listas no lugar de cartões, muito respiro.
5. **Para todos.** Contraste AA, navegação por teclado, modo escuro, texto maior e
   menos movimento são parte do design, não um extra.

## 2. Cores

### Identidade (do logo)

| Token | Hex | Uso |
|---|---|---|
| `--azul-profundo` | `#0b4ea2` | “TRINDADE SANTA”, botões primários, **Pai** |
| `--azul-celeste` | `#1b95d8` | anéis do logo, **Filho** (não usar como texto pequeno) |
| `celeste-texto` | `#0a6aa6` | celeste quando vira texto (≥ 4,5:1 sobre branco) |
| `--azul-mar` | `#2489ae` | fim do degradê, **Espírito Santo** |
| `--turquesa` | `#4fa6c0` | meio do degradê |
| `--bruma` | `#bcdde3` | início do degradê |
| `--nevoa` | `#eef6f8` | fundos claros de seção |
| `--tinta` | `#0a2a4a` | texto principal |
| `--tinta-suave` | `#4a6580` | texto secundário |
| `--linha` | `#d6e6ee` | bordas e divisores |

Degradês: `--degrade` (bruma → turquesa → mar, 35°) e `--degrade-profundo`
(profundo → mar, 135°).

### Repaginação jovem (banner “Vocacional TS”)

| Token | Hex | Uso |
|---|---|---|
| `--ts-azul` | `#2a6fc9` | fundo das telas azuis |
| `--ts-azul-fundo` | `#1d5bb3` | variação mais escura |
| `--ts-noite` | `#071937` | fundo escuro, texto sobre amarelo, `theme-color` do modo escuro |
| `--ts-amarelo` | `#ffd83a` | botão de destaque, seleção de texto, anel de foco |
| `--ts-laranja` | `#f2672a` | acento |
| `--ts-rosa` | `#e07bc9` | acento |
| `--ts-roxo` | `#7c55c7` | acento |
| `--ts-verde` | `#7cc143` | acento |
| `--ts-lilas` | `#b9a3ea` | acento |
| `--ts-papel` | `#f6f3ee` | fundo “papel” |

Regra: **azul domina, amarelo chama, os demais acentuam.** Use no máximo dois acentos
vivos por seção.

### Páginas com identidade própria

Eventos (`noite-oracional.html`, `congresso-seta.html`) e itinerários usam três cores
definidas em `assets/js/dados.js` — `[fundo escuro, cor principal, destaque]` — que viram
variáveis `--e-escuro`, `--e-destaque`, `--t-escuro`, `--t-texto`. Não codifique essas
cores no CSS; troque no `dados.js`.

## 3. Tipografia

Carregadas do Google Fonts (`display=swap`).

| Papel | Família | Onde |
|---|---|---|
| Display | **Anton** (`--display`) | `h1`, `h2`, `.display`, `h3`, botões — sempre MAIÚSCULAS |
| Destaque | **Fraunces** itálica (`--serifa`) | palavra em `<em>` dentro de títulos |
| Institucional | **Marcellus** / **Marcellus SC** | nome da comunidade, versaletes, logo |
| Texto | **Mulish** 400/600/700/800 (`--fonte-texto`) | parágrafos, listas, formulários |

Escala:

- `h2`: `clamp(2.6rem, 6.4vw, 5.4rem)`, `line-height: .9`, `text-wrap: balance`.
- `h3`: Anton, `line-height: 1.2`.
- Parágrafo: Mulish, `text-wrap: pretty`.
- Um só `h1` por página (já é assim em todas).

Padrão de título com ênfase: `Seguir a <em>Trilha do Amor</em>` — o `<em>` sai em Fraunces itálica.

## 4. Marca e símbolos

- Arquivos em `assets/img/marca/`: logo completo e reduzido (cores, branco, preto) e a
  cruz TS para fundo claro/escuro.
- Símbolos vetoriais (`pai`, `filho`, `espirito`, triquetra, divisor de três anéis) vivem em
  `assets/js/marca.js` (`SIMBOLOS`, `ICONES`) e são usados com `simbolo('nome')` /
  `icone('nome')`. Não exporte esses SVGs em arquivos soltos; reaproveite as funções.
- Logo sobre foto: versão branca. Sobre branco/névoa: versão em cores.
- Área de respiro do logo: no mínimo a altura de um anel em volta.

## 5. Layout

| Token | Valor |
|---|---|
| `--largura` | `1200px` (largura máxima do conteúdo) |
| `--gutter` | `clamp(16px, 4vw, 40px)` |
| `--header-h` | `84px` (72px no celular) |
| `--raio` / `--raio-sm` | `18px` / `10px` |
| `--sombra` | `0 10px 30px -12px rgba(11,78,162,.25)` |
| `--sombra-forte` | `0 24px 60px -20px rgba(11,78,162,.45)` |

Pontos de quebra usados: **1180px** (cabeçalho compacto), **980px** (grades de 4 → 2),
**860px** (colunas viram uma), **760px** (celular). Desenhe primeiro no celular
(375px) e confira no iPhone: o site usa `svh`, `overflow-x: clip` e
`-webkit-backdrop-filter` por compatibilidade.

Estruturas recorrentes:

- **Topo com foto** em todas as páginas (foto de fundo + véu azul + título Anton).
- **Telas azuis** cheias (`--ts-azul`) para chamadas fortes.
- **Lista de datas** (dia grande + título + local) em vez de cartões de evento.
- **Faixa de palavras correndo** e **fita de fotos arrastável** como respiro entre seções.
- **Chamada final com foto** antes do rodapé.

## 6. Componentes

### Botões (`.btn`)

Anton, maiúsculas, `letter-spacing: .03em`, `border-radius: 6px`, `padding: 15px 26px`.
Ao passar o mouse sobe 2px e a seta anda 3px.

| Classe | Quando |
|---|---|
| `.btn--amarelo` | ação principal sobre fundo azul ou foto |
| `.btn--primario` | ação principal sobre fundo claro |
| `.btn--vazado` / `.btn--contorno-claro` | ação secundária sobre foto/azul |
| `.btn--contorno` | ação secundária sobre fundo claro |
| `.btn--desativado` | item ainda sem link (ex.: PDF do mês que não saiu) |

Um botão principal por tela. Rótulos com verbo: “Quero participar”, “Baixar o PDF”.

### Outros

- `.link-mais` — link de texto com seta, para “Saiba mais”.
- `.data-linha` — linha de agenda.
- `.grade--3`, `.grade--4`, `.dividido`, `.leitura` — grades de layout.
- `.mosaico`, `.ev-galeria` — galerias de foto.
- `.pix` — bloco de doação com QR Code.
- Cabeçalho e rodapé são montados por `marca.js` nos marcadores `data-cabecalho` /
  `data-rodape`. Para mudar o menu, edite `marca.js`, não cada página.

## 7. Movimento

- Entrada ao rolar: `.revelar` → `.is-visivel` (sobe 18px, 0,8s, `--ease-saida`
  `cubic-bezier(.16,1,.3,1)`).
- Palavras que sobem de máscara: `[data-palavras]`, 60ms entre palavras.
- A órbita animada da Trindade na página inicial é a assinatura do site; não copie para
  outras páginas.
- Tudo respeita `prefers-reduced-motion` e a opção “menos movimento” (`.ac-calmo`).
  Animação nova **precisa** ter versão parada.

## 8. Imagens

- Fotos em `assets/img/fotos/<tema>/NN.jpg`; arquivo histórico em `assets/img/arquivo/`.
- Sempre com `alt` descritivo em português (“Assembleia em adoração no SETA 2007”),
  `width`/`height` e `loading="lazy"` fora da primeira dobra.
- Exporte JPG com no máximo ~1600px no lado maior e ~300 KB. Prefira nomes de arquivo
  descritivos para fotos novas (`seta-2026-louvor.jpg`), isso ajuda no Google Imagens.
- Imagem de compartilhamento: `assets/img/og.jpg` (1200 × 630).

## 9. Acessibilidade e modo escuro

- Painel no cabeçalho (`tema.js`): tema claro/escuro/automático, texto 100/112,5/125%,
  alto contraste, links sublinhados, fonte de leitura fácil, menos movimento. As escolhas
  ficam no `localStorage` (`ts-acess`).
- O tema é aplicado antes de a página aparecer (sem piscar) via `data-tema` no `<html>`.
- Foco visível: contorno amarelo `#ffd83a` 3px + sombra `#0a2a4a`.
- Alvos de toque com no mínimo 42–44px.
- Contraste mínimo AA (4,5:1 texto, 3:1 elementos grandes). Celeste `#1b95d8` não passa
  como texto pequeno sobre branco; use `#0a6aa6`.

## 10. Voz e texto

- Português do Brasil, segunda pessoa (“você”), frases curtas.
- Termos da casa: Santíssima Trindade, Deus Trino, carisma, aliança, consagrados,
  baluartes, itinerário, “Ou Santos ou Nada”, “À Trindade Santa, o nosso louvor e adoração!”.
- Nunca publicar trechos da Regra de Vida. Dados marcados com `⚠ confirmar` no
  `dados.js` só vão ao ar depois de confirmados.

## 11. Checklist para uma página nova

1. Copie o `<head>` de uma página existente e troque `title`, `description`,
   `canonical`, `og:title`, `og:description`, `og:url`.
2. Um `h1` com a palavra-chave principal da página.
3. Inclua `data-cabecalho` / `data-rodape` e os scripts `dados.js`, `marca.js`, `movimento.js`.
4. Adicione a URL ao `sitemap.xml` e ao menu em `marca.js`.
5. Teste em 375px, modo escuro, teclado e “menos movimento”.
6. Rode `npm run css` se usou classes novas do Tailwind.
