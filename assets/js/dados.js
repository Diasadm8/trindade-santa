/* =========================================================
   DADOS DO SITE — edite aqui para atualizar o conteúdo.
   Nada de programação: basta copiar um bloco e alterar.
   Itens marcados com  ⚠ confirmar  vieram de pesquisa pública
   ou de memória e precisam de confirmação antes de ir ao ar.
   ========================================================= */

/* ---------- A comunidade ---------- */
const COMUNIDADE = {
  nome: 'Comunidade de Aliança Trindade Santa',
  fundacao: 2007,                       // confirmado pelo usuário (Comunidade nasce em nov/2007; o grupo começou em 2002)
  inicioGrupo: 2002,
  /* Fatos do site antigo (lojatrindadesanta.com.br/nossa-historia) */
  reconhecimento: { diocese: 2013, decreto: 2018 },   // reconhecida pela Diocese de Campos em 2013; decreto definitivo em 2018
  estados: ['Rio de Janeiro', 'Minas Gerais', 'Espírito Santo'],
  missaoExterior: 'missionários servindo até nos Estados Unidos',
  identidade: ['trinitários', 'católicos', 'carismáticos', 'adoradores', 'marianos'],
  sinais: ['Louvor', 'Adoração', 'Comunhão'],
  lema: 'Ou Santos ou Nada',
  aclamacao: 'À Trindade Santa, o nosso louvor e adoração!',
  fundador: 'Reginaldo Braz',           // confirmado: cartaz do SETA 2026 o apresenta como "Fundador da Comunidade Trindade Santa"
  cidade: 'Itaperuna – RJ',
  diocese: 'Diocese de Campos',         // aprovação formal (sem documento em mãos)
  associacao: {
    nome: 'Associação Trindade Santa',
    cnpj: '12.664.235/0001-67'          // ⚠ confirmar (dado público do CNPJ)
  },
  /* Baluartes: padroeira e santos que sustentam a comunidade */
  /* Textos dos baluartes: reescritos em 3ª pessoa a partir do documento interno da comunidade (nada da Regra de Vida) */
  baluartesIntro: 'Baluarte é um lugar seguro, uma fortaleza. A comunidade se apoia no testemunho de três santos como alicerce para caminhar na consagração ao Deus Trino. Ter baluartes é entender que um carisma, ao crescer, precisa se firmar na vida e na história de referências que sustentem a decisão de quem se entregou ao chamado de Deus.',
  baluartes: [
    { id: 'sao-jose', nome: 'São José', tipo: 'Baluarte', simbolo: 'pai', foto: 'assets/img/baluartes/sao-jose.jpg',
      citacao: 'Pai da providência', resumo: 'A comunidade nasceu numa paróquia dedicada a ele.',
      texto: 'A comunidade nasceu dentro de uma paróquia dedicada a São José e vê nisso um primeiro sinal de que ele quis adotá-la, guardá-la e educá-la. Homem de fortaleza, fé e responsabilidade, de vida interior profunda, José soube acolher com amor até as situações difíceis: sem compreender todos os desígnios de Deus, jamais julgou Maria nem lhe tirou a dignidade. Pai da providência e carpinteiro escolhido para sustentar a Sagrada Família, ele ensina a confiar nas promessas de Deus e a nunca abandonar os seus.' },
    { id: 'santa-elizabeth', nome: 'Santa Elisabete da Trindade', tipo: 'Baluarte', simbolo: 'filho', foto: 'assets/img/baluartes/santa-elisabete.jpg',
      citacao: 'A Trindade habita em mim!', resumo: 'Ser um louvor de glória à Santíssima Trindade.',
      texto: 'Jovem de uma teologia trinitária vivida, e não apenas teórica, Santa Elisabete convida ao encontro com o Deus Trino, que habita o centro do ser de cada pessoa de forma real e concreta: “A Trindade habita em mim!”. Inspirada nela, a comunidade deseja ser um louvor de glória à Santíssima Trindade e mergulhar cada vez mais fundo em seu carisma. Para os consagrados, missionários do Amor Trinitário, a história da santa é um sinal que alimenta e impulsiona o testemunho de santidade em todo lugar.' },
    { id: 'sao-joao-paulo', nome: 'São João Paulo II', tipo: 'Baluarte', simbolo: 'pai', foto: 'assets/img/baluartes/joao-paulo-ii.jpg',
      citacao: 'Os jovens são a esperança da Igreja', resumo: 'Onde estiverem os jovens, a comunidade quer estar.',
      texto: 'Olhando para a vida de São João Paulo II, a comunidade aprende a ir ao encontro dos jovens e a se gastar por eles com amor. Onde houver jovens, ela quer estar, porque, como o santo papa, acredita que eles são a esperança da Igreja. Por sua intercessão, pede firmeza e fidelidade na missão de evangelizar e de crer que “a esperança de um mundo melhor está numa juventude sadia, com valores, responsável e, acima de tudo, voltada para Deus e para o próximo” (São João Paulo II, JMJ 2008, Austrália).' }
  ],
  /* Ministérios e frentes */
  ministerios: [
    { nome: 'Aviva Jovem', simbolo: 'espirito' },
    { nome: 'Nascer Jovem', simbolo: 'filho' },
    { nome: 'Louvor e música', simbolo: 'pai' },
    { nome: 'Missões', simbolo: 'espirito' }
  ]
};

/* ---------- Nossa história (página A Comunidade, seção #historia) ----------
   Texto escrito em 3ª pessoa, o mais próximo possível do relato original (2007).
   atos   : capítulos; cada um com símbolo da Trindade (pai | filho | espirito)
   marcos : ano (texto livre), titulo, texto, citacao (frase destacada, entre aspas no original),
            presentes (nomes), foto (arquivo em assets/img/historia/) ou espaco: true (moldura vazia)
   Confirmado: os dois Leandros são padres; quem narra é o fundador, Reginaldo Braz; fundação = 2007. */
const HISTORIA = {
  abertura: 'Entre 2002 e 2007, um grupo de oração ouviu uma pergunta que ardia em seu coração: não somos chamados a viver em Comunidade?',
  atos: [
    { numero: 'I', titulo: 'Os primeiros passos', simbolo: 'pai', marcos: [
      { ano: '2002', titulo: 'O chamado', foto: 'assets/img/arquivo/seta-2007-pregacao.jpg', presentes: ['Tereza Ligiero'],
        texto: 'Em 2002, período de transição e de amadurecimento do seu chamado, o fundador, Reginaldo Braz, atendeu ao convite de Tereza Ligiero e iniciou o Grupo de Perseverança da Catequese Paroquial.' },
      { ano: 'Com o passar do tempo', titulo: '1º Seminário de Vida no Espírito', simbolo: 'espirito', foto: 'assets/img/arquivo/seta-2007-vocacao.jpg',
        texto: 'Com o passar do tempo, abriu-se para o grupo o 1º Seminário de Vida no Espírito. Foi o pontapé inicial do G.O. Nascer Jovem.' },
      { ano: 'Em apenas dois anos', titulo: 'A Coordenação Trinitária e o sinal da Trindade Santa', simbolo: 'filho',
        foto: 'assets/img/arquivo/seta-2006-estandarte.jpg',
        texto: 'Em apenas dois anos, o Senhor inspirou a Coordenação Trinitária e o sinal da Trindade Santa. O grupo passou a engatinhar rumo à imensidão da Espiritualidade Trinitária.' }
    ] },
    { numero: 'II', titulo: 'A pergunta', simbolo: 'filho', marcos: [
      { ano: 'Já em 2007', titulo: 'Os pontos marcantes', simbolo: 'pai', foto: 'assets/img/arquivo/seta-2006-louvor.jpg',
        texto: 'Eram muitos: não apenas os que serviam em 2007, mas todos os que passaram pela Formação e pela Espiritualidade. A experiência como Grupo de Oração deixou pontos marcantes: a fraternidade, o comprometimento, o desejo de viverem juntos. Era o que, de antemão, já chamavam de carisma: a Comunidade! Foi preciso se lançar, com coragem, nas mãos de Deus. Visto de hoje, tudo parece tranquilo, mas aqueles momentos foram tão ou mais conflituosos que os de agora. Tudo vai passar!' },
      { ano: '2006', titulo: 'Uma voz que falava por dentro', simbolo: 'espirito',
        foto: 'assets/img/arquivo/seta-2007-assembleia.jpg',
        texto: 'O ano de 2006 foi marcado por provações. Foi nele que os padres Leandro Diniz e Leandro Rabelo mencionaram, ou verbalizaram, uma voz que falava dentro do grupo, um desejo que ardia em seus corações. Em diferentes circunstâncias, muitas vezes se ouviu falar nisso, e a experiência já era cogitada entre eles. Mas nada foi tão inquietante quanto aquele momento.',
        citacao: 'Vocês não são chamados a viver em Comunidade?' },
      { ano: 'Dezembro de 2006', titulo: 'Eucaristia no Centro de Formação João Paulo II', simbolo: 'filho', foto: 'assets/img/arquivo/missa-2008-eucaristia.jpg',
        presentes: ['Pe. Roger Luis', 'Pe. Edmilson', 'Servos do Nascer Jovem'],
        texto: 'Em dezembro de 2006, era ordenado o querido Pe. Roger Luis. Depois de muitas conversas e partilhas, o desejo de celebrar a Eucaristia levou o grupo ao Centro de Formação João Paulo II. Ali estavam o Pe. Edmilson, o diácono Roger e todos os servos do Nascer Jovem, e o Senhor lhes falou em profecia:',
        citacao: 'O ano 2007 será o ANO DA EDIFICAÇÃO.' }
    ] },
    { numero: 'III', titulo: 'O sim', simbolo: 'espirito', marcos: [
      { ano: '2007', titulo: 'Um ano de discernimento', simbolo: 'pai',
        foto: 'assets/img/arquivo/missa-2008-louvor.jpg',
        texto: 'Dali nasceu a proposta: dedicar o ano ao discernimento e à escuta de Deus, por meio de retiros mensais pregados pelo Pe. Roger Luis, abertos apenas a quem quisesse e se sentisse chamado a essa experiência. Um ano, tão distante e tão próximo! Muitos foram os problemas, os desafios e até os empecilhos para que esse discernimento acontecesse.' },
      { ano: 'Novembro de 2007', titulo: 'Nasce a Comunidade', simbolo: 'espirito',
        foto: 'assets/img/arquivo/seta-2007-palco.jpg',
        texto: 'Em novembro de 2007, o grupo retornou a fevereiro e quis trilhar, junto, o caminho da Comunidade. Veio então o sim de Reginaldo Braz, incondicional: “Eu quero a Comunidade. Eu sou Comunidade.” E, com todos os irmãos de hoje e de amanhã, do presente e do futuro, a proclamação:',
        citacao: 'Somos Comunidade de Aliança Trindade Santa!' }
    ] }
  ],
  final: 'A Trindade Santa fecundou-nos e hoje habita em nós! Somos Trinitários!'
};

/* ---------- Fundador ---------- */
const FUNDADOR = {
  nome: 'Reginaldo Braz',
  papel: 'Fundador',
  foto: 'reginaldo.jpg',   // assets/img/fundador/
  frase: 'Ver a missão que nasceu de um punhado de jovens rezando agora vestida por tanta gente é a alegria de uma vida. Cada camisa que sai daqui carrega a mesma chama do começo.',
  sim: 'Eu quero a Comunidade. Eu sou Comunidade.',
  /* Texto fornecido pelo usuário (revisado apenas na ortografia) */
  texto: [
    'Aquele que recebeu das mãos de Deus o nosso carisma trinitário, que desde muito jovem deu o seu sim e até hoje entrega sua vida diariamente à salvação das almas por meio do carisma Trindade Santa. É o homem que nos guia e nos ensina, com muita humildade e submissão a Deus. Difícil é descrever em poucas palavras o que esse homem significa para nós e o que o seu sim gerou.'
  ]
};

/* ---------- Projetos e frentes (site antigo: "12 projetos. 10 núcleos. Uma só missão.") ----------
   desc: só o que está no site antigo ou foi informado pelo usuário; logo: arquivo em assets/img/grupos/ */
const PROJETOS_COMUNIDADE = {
  resumo: { projetos: 12, nucleos: 10 },
  lista: [
    { nome: 'Nascer Jovem', desc: 'A obra fundante da Comunidade. Toda segunda-feira, às 20h, no salão da Matriz São José do Avahy.', logo: 'nascer-jovem.png' },
    { nome: 'Bartimeu', desc: 'Acolhe quem sai das drogas.', logo: 'bartimeu-itaperuna.jpg' },
    { nome: 'Rede Santa Mônica', desc: 'Mães que intercedem pelos filhos.', logo: 'santa-monica.png' },
    { nome: 'Aviva Jovem', desc: 'Leva o Evangelho a cidades do interior.', logo: '' },
    { nome: 'Águas Profundas', desc: 'Leva o Evangelho a cidades do interior.', logo: 'aguas-profundas.jpg' },
    { nome: 'Terço em Família', desc: 'Entra nos lares.', logo: '' },
    { nome: 'Ação com Casais', desc: '', logo: '' },
    { nome: 'Tempo de Liberdade', desc: 'Grupo jovem em Bom Jesus do Itabapoana.', logo: 'tempo-de-liberdade.png' },
    { nome: 'Casa de Deus', desc: '', logo: '' },
    { nome: 'Novas Vestes', desc: 'Grupo de oração em Miradouro (MG).', logo: 'novas-vestes.jpg' },
    { nome: 'Filhos de Maria', desc: '', logo: '' },
    { nome: 'Reconstrução', desc: 'Grupo de oração em Espera Feliz (MG).', logo: 'reconstrucao.png' }
  ]
};

/* Fotos de arquivo (data tirada do próprio arquivo da câmera) — assets/img/arquivo/ */
const ARQUIVO = [
  { img: 'seta-2006-louvor.jpg' },
  { img: 'seta-2006-estandarte.jpg' },
  { img: 'seta-2007-vocacao.jpg' },
  { img: 'seta-2007-assembleia.jpg' },
  { img: 'seta-2007-palco.jpg' },
  { img: 'seta-2007-pregacao.jpg' },
  { img: 'seta-2007-palavra.jpg' },
  { img: 'missa-2008-altar.jpg' },
  { img: 'missa-2008-pregacao.jpg' },
  { img: 'missa-2008-assembleia.jpg' },
  { img: 'missa-2008-oferendas.jpg' },
  { img: 'missa-2008-calice.jpg' },
  { img: 'missa-2008-eucaristia.jpg' },
  { img: 'missa-2008-povo.jpg' },
  { img: 'missa-2008-louvor.jpg' }
];

/* ---------- Links oficiais (vieram do Linktree da comunidade) ---------- */
const LINKS = {
  instagram: 'https://www.instagram.com/ctrindadesanta',
  youtube: 'https://www.youtube.com/@comunidadetrindadesanta8024',
  canalWhatsapp: 'https://www.whatsapp.com/channel/0029VaWVUWRHrDZnl2qd7o1G',
  ouvir: 'https://onerpm.link/110216026245',
  deezer: 'https://www.deezer.com/br/artist/82809802',
  spotifyArtista: 'https://open.spotify.com/artist/3VfQ6dJsP5GbWvsCP2YP5P',
  spotifySingle: 'https://open.spotify.com/track/5uCW5FcMMOspqHk6w16FKF',   // Ser Trindade Santa (último lançamento)
  itinerarioDoMes: 'https://drive.google.com/file/d/10fAmJscs3aaX9IwmM61NhfWZ9zscJGkh/view?usp=sharing',
  loja: 'https://www.instagram.com/lojatrindadesanta/',
  lojaSite: 'https://lojatrindadesanta.com.br',
  lojaWhatsapp: 'https://wa.me/5522997674453',
  missoesWhatsapp: 'https://wa.me/5522997531648',
  formularioPix: 'https://forms.gle/B28AQGmiq1VqnTpA9',
  nucleoMuriae: 'https://www.instagram.com/ctrindadesantamuriae/'
};

/* ---------- Itinerários espirituais (um por mês) ----------
   tema    : o tema do mês
   capa    : imagem da capa  → coloque em assets/itinerarios/ (ex.: '2026-01.jpg')
   pdf     : arquivo em assets/itinerarios/ (ex.: '2026-01.pdf') OU um link completo
   simbolo : 'pai' | 'filho' | 'espirito'
   estilo  : como a página se transforma ao chegar neste mês
             cores  → [fundo escuro, cor principal, cor clara/destaque]
             motivo → 'flor' 'folha' 'estrela' 'chama' 'coracao' 'gota'
                      'sol' 'luz' 'cruz' 'espiga' 'pomba' 'onda'
   Se a capa existir e "cores" ficar vazio, as cores são tiradas da capa.
   ⚠ Estilos abaixo são PROVISÓRIOS — serão refeitos a partir das capas. */
const ITINERARIOS = [
  /* Janeiro não teve itinerário. Cada mês: capa (JPG) + PDF em assets/itinerarios/ */
  { ano: 2026, mes: 2,  tema: 'Identidade', verso: '', capa: '2026-02.jpg', pdf: '2026-02.pdf', simbolo: 'filho',
    estilo: { cores: ['#fbf6f2', '#e3283e', '#ff9aa3'], motivos: ['faixas:principal', 'faixas:claro'] } },
  { ano: 2026, mes: 3,  tema: 'Governo', capa: '2026-03.jpg', pdf: '2026-03.pdf', simbolo: 'filho',
    estilo: { cores: ['#2a1405', '#c98a1d', '#f6d98f'], motivo: 'sol', padrao: 'raios' } },
  { ano: 2026, mes: 4,  tema: 'Koinonia', capa: '2026-04.jpg', pdf: '2026-04.pdf', simbolo: 'espirito',
    estilo: { cores: ['#f3eee6', '#b8764a', '#d9a574'], motivos: ['coluna:principal', 'espiga:claro'] } },
  { ano: 2026, mes: 5,  tema: 'Te quero Santa', capa: '2026-05.jpg', pdf: '2026-05.pdf', simbolo: 'espirito',
    estilo: { cores: ['#2c1a20', '#d9a0ab', '#f7dcdf'], motivo: 'flor' } },
  { ano: 2026, mes: 6,  tema: 'Ou Santos ou nada', capa: '2026-06.jpg', pdf: '2026-06.pdf', simbolo: 'espirito',
    estilo: { cores: ['#d4413f', '#ff9a86', '#ffffff'], motivo: 'bloco' } },
  { ano: 2026, mes: 7,  tema: 'Entre nós não deverá ser assim', capa: '2026-07.jpg', pdf: '2026-07.pdf', simbolo: 'pai',
    estilo: { cores: ['#0d0a08', '#8a6b4a', '#ecd9b6'], motivo: 'terco' } },
  { ano: 2026, mes: 8,  tema: 'Vem e segue-me', capa: '2026-08.jpg', pdf: '2026-08.pdf', simbolo: 'filho',
    estilo: { cores: ['#2b1410', '#b2563f', '#f3e2cb'], motivo: 'pegada' } },
  { ano: 2026, mes: 9,  tema: 'Quem Como Deus?', capa: '2026-09.jpg', pdf: '2026-09.pdf', simbolo: 'espirito',
    estilo: { cores: ['#f3e5c1', '#9c1f2e', '#d6a31f'], motivos: ['asa:principal', 'espada:claro'], padrao: 'moldura' } },
  { ano: 2026, mes: 10, tema: 'Meu céu na terra', capa: '2026-10.jpg', pdf: '2026-10.pdf', simbolo: 'pai',
    estilo: { cores: ['#17233b', '#5a78a6', '#e2bf6b'], motivo: 'triquetra:claro' } },
  { ano: 2026, mes: 11, tema: 'O que é plantado precisa ser cultivado', capa: '2026-11.jpg', pdf: '2026-11.pdf', simbolo: 'filho',
    estilo: { cores: ['#2b0f0c', '#d6382c', '#9fc254'], motivos: ['folha:claro', 'morango:principal'], padrao: 'listras' } }
];

/* ---------- Eventos da agenda ----------
   data: 'AAAA-MM-DD'  •  link: inscrição ou mais informações  */
const EVENTOS = [
  { data: '2026-11-28', titulo: 'Congresso Teológico-Espiritual: Os Sagrados Corações', categoria: 'Congresso',
    local: 'Matriz São José do Avahy – Itaperuna', hora: '14h00',
    organizacao: 'Organização: Filhas da Caridade do Preciosíssimo Sangue. A Trindade Santa estará presente.',
    link: 'https://www.sympla.com.br/evento/congresso-teologico-espiritual-os-sagrados-coracoes-dois-coracoes-um-so-amor/3607913', linkRotulo: 'Inscrição no Sympla' },
  { data: '2026-11-29', titulo: 'Congresso Confia', categoria: 'Congresso',
    local: 'Muriaé – MG', hora: '',
    organizacao: 'Evento de parceiros, divulgado pela comunidade.',
    link: 'https://www.instagram.com/p/DfMkl9VP2QS/', linkRotulo: 'Ver divulgação' }
];

/* ---------- Eventos com página própria ----------
   cores    : [fundo escuro, cor principal, destaque]  (⚠ provisórias até
              recebermos a identidade visual de cada evento)
   logo     : arquivo em assets/eventos/ (ex.: 'noite-oracional.svg')
   destaques: números/frases em destaque no topo da página
   bloco    : seção especial da página ('arcanjos')           */
const EVENTOS_ESPECIAIS = {
  'noite-oracional': {
    nome: 'Noite Oracional Como Deus',
    pagina: 'noite-oracional.html',
    cores: ['#0d1033', '#3b3f9e', '#f3c969'],
    subtitulo: 'Uma noite de oração com os três arcanjos',
    destaques: [
      { n: 'Todo ano', t: 'acontece anualmente' },
      { n: '3', t: 'arcanjos: Miguel, Gabriel e Rafael' },
      { n: 'Missionários', t: 'católicos conhecidos' }
    ],
    bloco: 'arcanjos',
    sobreTitulo: 'Uma noite de <em>oração</em>',
    sobre: [
      'A Noite Oracional Como Deus acontece todo ano: uma noite inteira de oração com os três arcanjos, Miguel, Gabriel e Rafael, e com missionários católicos conhecidos.',
      'O nome ecoa o de São Miguel, que quer dizer “Quem como Deus?”, a mesma pergunta que está no selo do evento.'
    ],
    cenas: ['noite2025/04','noite2025/13','noite2025/01','noite2025/10','noite2025/07','noite2025/16','noite2025/11','noite2025/05','noite2025/17','noite2025/18','noite2025/12','noite2025/09','noite2025/02','noite2025/15'],
    foto: 'assets/eventos/noite-oracional-banner.jpg', fotoLegenda: 'Arte de divulgação da Noite Oracional',
    logo: 'noite-oracional.png', banner: 'noite-oracional-banner.jpg',
    data: '', local: '', inscricao: ''
  },
  'congresso-seta': {
    nome: 'Congresso SETA',
    pagina: 'congresso-seta.html',
    cores: ['#061f2e', '#0f8b8d', '#ffb238'],
    subtitulo: 'Seguir a Trilha do Amor',
    edicao: '20ª',                       // ⚠ confirmar (edição de 2027)
    destaques: [
      { n: '20ª', t: 'edição em 2027' },
      { n: 'Maior', t: 'congresso católico da região' }
    ],
    logo: 'seta-branco.png', logoCores: 'seta-cores.png',
    sobreTitulo: 'Seguir a <em>Trilha do Amor</em>',
    sobre: [
      'O Congresso SETA, “Seguir a Trilha do Amor”, é o maior congresso católico da região. Acontece em Itaperuna, no Centro de Formação São João Paulo II, com pregações, louvor e adoração.',
      'Os cartazes das primeiras edições já traziam a marca do Nascer Jovem, o grupo de oração de onde nasceu a Comunidade. A 3ª edição foi em 2005; a mais recente, em junho de 2026.'
    ],
    foto: 'assets/img/arquivo/seta-2007-pregacao.jpg', fotoLegenda: '5º SETA, 2 de setembro de 2007',
    data: '', local: 'Centro de Formação João Paulo II – Itaperuna', inscricao: '',
    /* Edição mais recente (cartaz enviado pela comunidade) */
    ultima: {
      titulo: 'SETA 2026', quando: '19, 20 e 21 de junho de 2026', local: 'C.F. São João Paulo II · Itaperuna – RJ',
      cartaz: 'cartaz-seta-2026.jpg',
      realizacao: 'Realização: Itanet, UniRedentor (Afya) e Comunidade Trindade Santa',
      ingressos: 'Sexta grátis · 1 dia R$ 35 · 2 dias R$ 60 (1º lote; almoço não incluso)',
      presencas: [
        { nome: 'Padre Edmilson Cunha', sub: 'Canção Nova' },
        { nome: 'Padre Roger Luis', sub: 'Canção Nova' },
        { nome: 'Emanuel Duarte', sub: 'Cristo Alegria' },
        { nome: 'Jota Dantas', sub: 'Canção Nova' },
        { nome: 'Reginaldo Braz', sub: 'Fundador da Comunidade Trindade Santa' },
        { nome: 'Hudson Pontes', sub: 'Trindade Santa' },
        { nome: 'DJ Rapha', sub: 'Trindade Santa' }
      ]
    },
    cenas: ['louvor/03','louvor/06','louvor/10','louvor/09','louvor/04','louvor/11','louvor/07','louvor/01','louvor/02','louvor/05'],
    fotos: 'seta-',   // fotos de arquivo (ARQUIVO) cujo arquivo começa com "seta-"
    /* Edições anteriores (cartazes). Ano deduzido do dia da semana de cada data ⚠ confirmar */
    galeria: [
      { img: 'seta-12.jpg', rotulo: '12º SETA · 28 de setembro de 2014' },
      { img: 'seta-10.jpg', rotulo: '10º SETA · 2 e 3 de junho de 2012' },
      { img: 'seta-09.jpg', rotulo: '9º SETA · 5 de junho de 2011 · Santidade' },
      { img: 'seta-07.jpg', rotulo: '7º SETA · 28 de junho de 2009 · Sou mais que um vencedor' },
      { img: 'seta-06.jpg', rotulo: '6º SETA · 8 de junho de 2008' },
      /* 4º SETA: 11 de junho de 2006 (data das fotos de arquivo) — sem cartaz */
      { img: 'seta-05.jpg', rotulo: '5º SETA · 2 de setembro de 2007' },
      { img: 'seta-03.jpg', rotulo: '3º SETA · 5 de junho de 2005' }
    ]
  }
};

/* ---------- Social e doações ---------- */
const DOACAO = {
  chavePix: '',            // ex.: 'contato@comunidade.org' ou CNPJ
  favorecido: 'Associação Trindade Santa',
  qrCode: '',              // imagem do QR Code do PIX em assets/img/ (a definir)
  qrRotulo: '',            // deixe vazio para PIX
  qrLink: ''
};
/* Serviços sociais prestados pela Associação Trindade Santa */
const PROJETOS = [
  { nome: 'Serviço social 1', simbolo: 'pai' },
  { nome: 'Serviço social 2', simbolo: 'filho' },
  { nome: 'Serviço social 3', simbolo: 'espirito' }
];

/* ---------- Música ---------- */
const MUSICA = {
  /* Logo do ministério de música (Musicalidade TS): cor | branco | preto em assets/img/musica/ */
  logoMinisterio: 'musts',
  artistas: [
    { nome: 'Octávia de Assis', papel: 'Cantora', simbolo: 'espirito', foto: 'octavia.jpg', whatsapp: 'https://wa.me/5522998547232' },
    { nome: 'DJ Rapha TS', papel: 'DJ', simbolo: 'filho', foto: 'dj-rapha.jpg', whatsapp: 'https://wa.me/5522997208378' }
  ],
  /* Lançamentos (fonte: Deezer). grupo: 'Aviva Jovem' = enredos de Carnaval */
  lancamentos: [
    { data: '2026-02-17', titulo: 'Ser Trindade Santa' },
    { data: '2026-02-05', titulo: 'Aviva Folia – Meu Imperador (Samba 2026)', grupo: 'Aviva Jovem' },
    { data: '2025-01-17', titulo: 'Aviva Folia – Samba-Enredo 2025', grupo: 'Aviva Jovem' },
    { data: '2024-05-31', titulo: 'Vou Anunciar (Remix)', artista: 'DJ Rapha TS' },
    { data: '2024-05-31', titulo: 'Eu Te Louvarei (Remix)', artista: 'DJ Rapha TS' },
    { data: '2024-05-31', titulo: 'O Clamor (Remix)', artista: 'DJ Rapha TS' },
    { data: '2024-02-02', titulo: 'Aviva Folia – Samba-Enredo 2024', grupo: 'Aviva Jovem' },
    { data: '2023-08-25', titulo: 'Salmo 1' },
    { data: '2023-06-02', titulo: 'Tudo Eu Tenho em Ti', artista: 'Octávia de Assis' },
    { data: '2023-03-10', titulo: 'Escolhida', artista: 'Octávia de Assis' },
    { data: '2022-06-24', titulo: 'O Clamor', artista: 'Octávia de Assis', capa: 'capa-o-clamor.jpg' },
    { data: '2021-02-12', titulo: 'Vou Anunciar' },
    { data: '2020-11-13', titulo: 'Jesus É o Senhor (Remix)' },
    { data: '2020-10-30', titulo: 'Jesus É o Senhor' },
    { data: '2020-10-16', titulo: 'Quem Como Deus?' }
  ]
};

/* ---------- Grupos (mapa) ----------
   Basta escrever a cidade e o estado (RJ ou MG) — o ponto no mapa
   é colocado automaticamente no município.
   Vários grupos na mesma cidade? Repita a cidade em outra linha.   */
const GRUPOS = [
  /* campos: cidade, uf, nome, tipo, ig (@ do Instagram, sem @), frase, encontro, local, logo (arquivo em assets/img/grupos/)
     Sem logo? Aparece o símbolo da Trindade. Deixe em branco o que não souber. */
  { cidade: 'Itaperuna', uf: 'RJ', nome: 'Comunidade Trindade Santa (sede)', tipo: 'Sede', ig: 'ctrindadesanta',
    frase: 'À Trindade Santa, o nosso louvor e adoração!', encontro: '', local: 'Matriz São José do Avahy', logo: 'sede.png' },
  { cidade: 'Itaperuna', uf: 'RJ', nome: 'Nascer Jovem', tipo: 'Grupo de oração (jovens)', ig: 'nascerjovem',
    frase: 'Lugar de todos', encontro: 'Segundas, 20h', local: 'Matriz São José do Avahy', logo: 'nascer-jovem.png' },
  { cidade: 'Itaperuna', uf: 'RJ', nome: 'Projeto Bartimeu TS', tipo: 'Projeto Bartimeu', ig: 'projetobartimeuts',
    frase: 'Coragem, levanta-te! Cristo te chama!', encontro: 'Terças, 20h', local: 'Matriz São José do Avahy', logo: 'bartimeu-itaperuna.jpg' },
  { cidade: 'Itaperuna', uf: 'RJ', nome: 'Rede de Intercessão Santa Mônica', tipo: 'Grupo de mães', ig: 'redesantamonica',
    frase: 'Adoração, oração e ação pelos filhos', encontro: 'Quintas, 20h (a confirmar)', local: 'Capela da Mãe do Infinito Amor', logo: 'santa-monica.png' },
  { cidade: 'Itaperuna', uf: 'RJ', nome: 'Confia', tipo: 'Movimento (jovens adultos)', ig: 'confia.mov',
    frase: 'Movimento para jovens adultos de 18 a 35 anos', encontro: 'Sextas, 20h (a confirmar)', local: 'Matriz São José do Avahy', logo: 'confia.jpg' },
  { cidade: 'Porciúncula', uf: 'RJ', nome: 'Bartimeu Porciúncula', tipo: 'Projeto Bartimeu', ig: 'bartimeuporciuncula',
    frase: 'Coragem, levanta-te! Cristo te chama!', encontro: 'Quartas, 20h', local: 'Igreja Sagrada Família', logo: 'bartimeu-itaperuna.jpg' },
  { cidade: 'Bom Jesus do Itabapoana', uf: 'RJ', nome: 'Grupo Jovem Tempo de Liberdade', tipo: 'Grupo jovem', ig: 'tempodeliberdade',
    frase: '', encontro: '', local: '', logo: 'tempo-de-liberdade.png' },
  { cidade: 'Miracema', uf: 'RJ', nome: 'Bartimeu Miracema', tipo: 'Projeto Bartimeu', ig: 'bartimeumiracema',
    frase: 'Coragem, levanta-te! Cristo te chama!', encontro: 'Quartas, 20h', local: 'Paróquia N. S. Aparecida', logo: 'bartimeu-miracema.jpg' },
  /* Muriaé: logo do Bartimeu Muriaé mantido (foto do Instagram) */
  { cidade: 'Muriaé', uf: 'MG', nome: 'Bartimeu Muriaé', tipo: 'Projeto Bartimeu', ig: 'bartimeumuriae',
    frase: 'Bartimeu, lugar de possibilidades', encontro: '', local: '', logo: 'bartimeu-muriae.jpg' },
  { cidade: 'Muriaé', uf: 'MG', nome: 'Núcleo Trindade Santa Muriaé', tipo: 'Núcleo', ig: 'ctrindadesantamuriae',
    frase: 'À Trindade Santa nosso louvor', encontro: 'Quartas, 20h (datas no Instagram)', local: 'Igreja do Cristo', logo: 'nucleo-muriae.png' },
  { cidade: 'Macaé', uf: 'RJ', nome: 'Núcleo Trindade Santa Macaé', tipo: 'Núcleo', ig: 'ctrindadesantamacae',
    frase: 'À Trindade Santa, o nosso louvor e adoração!', encontro: '', local: 'Paróquia N. S. da Glória', logo: 'nucleo-macae.jpg' },
  { cidade: 'Rio das Ostras', uf: 'RJ', nome: 'Núcleo Trindade Santa Rio das Ostras', tipo: 'Núcleo', ig: 'ctrindadesantaro',
    frase: 'À Trindade Santa, o nosso louvor e adoração', encontro: '', local: '', logo: 'nucleo-rio-das-ostras.png' },
  { cidade: 'Casimiro de Abreu', uf: 'RJ', nome: 'Núcleo Casimiro de Abreu', tipo: 'Núcleo (Consagrados)', ig: 'ctrindadesantacasimiro',
    frase: 'À Trindade Santa, nosso louvor e adoração!', encontro: '', local: '', logo: 'nucleo-casimiro-de-abreu.jpg' },
  { cidade: 'Miradouro', uf: 'MG', nome: 'G.O. Novas Vestes', tipo: 'Grupo de oração', ig: 'gruponovasvestes',
    frase: 'Lucas 15,22', encontro: '', local: 'Paróquia Santa Rita de Cássia', logo: 'novas-vestes.jpg' },
  { cidade: 'Santa Maria Madalena', uf: 'RJ', nome: 'Grupo Jovem Águas Profundas', tipo: 'Grupo jovem', ig: 'aguasprofundas.smm',
    frase: 'Temos sede do amor de Deus', encontro: '', local: 'Paróquia de Santa Maria Madalena', logo: 'aguas-profundas.jpg' },
  { cidade: 'Macuco', uf: 'RJ', nome: 'Aviva Jovem Macuco', tipo: 'Grupo jovem (Aviva Jovem)', ig: 'avivajovemmacuco',
    frase: '', encontro: '', local: '', logo: '' }   // Logo do Aviva Jovem pendente (macuco.png é o logo "Macuco, te quero Santa")
  ,
  { cidade: 'Espera Feliz', uf: 'MG', nome: 'G.O. Reconstrução', tipo: 'Grupo de oração', ig: 'goreconstrucao',
    frase: 'Vem, a casa é nossa!', encontro: 'Quartas, 19h30', local: 'Salão da Matriz São Sebastião', logo: 'reconstrucao.png' }
];
