import { StoreConfig, GalleryItem, ColorSwatch, PromotionItem, StoreBrand } from '../types';

export const OWNER_EMAIL = 'casadascoresjaguarunaadm@gmail.com';
export const OWNER_EMAILS = [
  'casadascoresjaguarunaadm@gmail.com',
  'rcarlinhoso13h@gmail.com'
];

export const INITIAL_BRANDS: StoreBrand[] = [
  {
    id: 'marca-suvinil',
    nome: 'Suvinil',
    slogan: 'Renovar é fácil. É só querer.',
    tagline: 'Líder em Qualidade e Cobertura',
    badge: 'Líder Nacional',
    logoUrl: '/IMG-20260930-WA0015.svg',
    ativo: true,
    tiposProdutos: ['tinta', 'textura', 'vernizes'],
  },
  {
    id: 'marca-coral',
    nome: 'Coral',
    slogan: 'Tudo de cor para você.',
    tagline: 'Tendências e Alta Lavabilidade',
    badge: 'Cores & Tendências',
    logoUrl: '/IMG-20260930-WA0017.svg',
    ativo: true,
    tiposProdutos: ['tinta', 'textura', 'impermeabilizante'],
  },
  {
    id: 'marca-anjo',
    nome: 'Anjo',
    slogan: 'Aprovada pelo tempo.',
    tagline: 'Especialista em Fachadas e Emborrachadas',
    badge: 'Alta Resistência',
    logoUrl: '/IMG-20260930-WA0013.svg',
    ativo: true,
    tiposProdutos: ['tinta', 'textura', 'impermeabilizante', 'vernizes'],
  },
  {
    id: 'marca-eucatex',
    nome: 'Eucatex',
    slogan: 'Simplesmente qualidade.',
    tagline: 'Economia e Máximo Rendimento',
    badge: 'Melhor Custo-Benefício',
    logoUrl: '/IMG-20260930-WA0014.svg',
    ativo: true,
    tiposProdutos: ['tinta', 'textura', 'argamassa'],
  },
  {
    id: 'marca-atlas',
    nome: 'Atlas',
    slogan: 'Quem usa aprova.',
    tagline: 'Pincéis, Rolos e Acessórios Profissionais',
    badge: 'Acessórios & Ferramentas',
    logoUrl: '',
    ativo: true,
    tiposProdutos: ['ferramentas', 'lixas'],
  }
];

export const INITIAL_PROMOTIONS: PromotionItem[] = [
  {
    id: 'promo-1',
    codigo: 'SUV-18L',
    titulo: 'Suvinil Clássica Acrílico Fosco 18L',
    marca: 'Suvinil',
    descricao: 'Rendimento de até 500m² por demão. Excelente cobertura, toque aveludado e sem cheiro em até 3 horas.',
    precoOriginal: 389.90,
    precoPromocional: 329.90,
    tag: 'Mais Vendida',
    mensagemWhats: 'Olá! Vi a oferta da Suvinil Clássica 18L (Cód: SUV-18L) por R$ 329,90 no site da Casa das Cores e gostaria de reservar!',
    disponivel: true,
  },
  {
    id: 'promo-2',
    codigo: 'ANJ-EMB18',
    titulo: 'Anjo Tinta Emborrachada Fachadas & Muros 18L',
    marca: 'Anjo',
    descricao: 'Membrana elástica impermeável que previne trincas, umidade, fungos e mofo no clima do litoral.',
    precoOriginal: 429.90,
    precoPromocional: 359.90,
    tag: 'Super Proteção',
    mensagemWhats: 'Olá! Vi a oferta da Tinta Emborrachada Anjo 18L (Cód: ANJ-EMB18) por R$ 359,90 no site e gostaria de garantir a minha!',
    disponivel: true,
  },
  {
    id: 'promo-3',
    codigo: 'COR-REND18',
    titulo: 'Coral Rende Muito Acrílico 18L',
    marca: 'Coral',
    descricao: 'Alta consistência que permite diluição de até 80% em água com cobertura e brancura impecáveis.',
    precoOriginal: 349.90,
    precoPromocional: 289.90,
    tag: 'Economia Real',
    mensagemWhats: 'Olá! Vi a promoção da Coral Rende Muito 18L (Cód: COR-REND18) por R$ 289,90 no site e quero comprar!',
    disponivel: true,
  },
  {
    id: 'promo-4',
    codigo: 'KIT-ATL01',
    titulo: 'Kit Pintura Profissional Atlas Completo',
    marca: 'Atlas',
    descricao: 'Rolo de Lã Antigota 23cm + Garfo com Bucha + Bandeja Reforçada + Trincha Especial + Fita Crepe.',
    precoOriginal: 89.90,
    precoPromocional: 59.90,
    tag: 'Combo Imperdível',
    mensagemWhats: 'Olá! Vi o Kit de Pintura Profissional Atlas (Cód: KIT-ATL01) por R$ 59,90 no site da Casa das Cores e gostaria de pedir o meu!',
    disponivel: true,
  }
];

export const INITIAL_STORE_CONFIG: StoreConfig = {
  nome: 'CASA DAS CORES',
  slogan: 'O MELHOR E MAIS BARATO PARA VOCE',
  ramo: 'PINTURAS E ACABAMENTOS',
  whatsapp: '554836241961',
  telefoneFixo: '(48) 3624-1961',
  instagram: 'https://www.instagram.com/casadascoress?stkn=MWFmb3FxMHlmMmgzNw==',
  facebook: 'https://www.facebook.com/share/1YC4XmL6BF/',
  endereco: 'Rodovia Municipal - Jaguaruna, Santa Catarina (Fácil Acesso com Estacionamento Próprio)',
  googleMapsUrl: 'https://maps.app.goo.gl/rMtDL4DYp4q8r3Gr8',
  descricao: 'A Casa das Cores é a sua loja completa de tintas e acabamentos em Jaguaruna - SC. Trabalhamos exclusivamente com as marcas mais conceituadas do mercado nacional como Suvinil, Coral, Anjo Tintas e Eucatex. Oferecemos linha completa imobiliária para paredes e tetos, tintas emborrachadas para fachadas, texturas, impermeabilizantes, vernizes e esmaltes para madeiras e metais, além de ferramentas e acessórios de pintura em geral. Nosso compromisso é aliar qualidade máxima ao melhor e mais barato preço da região, com amplo estacionamento próprio gratuito para seu conforto.',
  horario: 'Segunda a Sexta: 08:00 às 18:00 | Sábado: 08:00 às 12:00 (Domingo: Fechado)',
  mensagemPadraoWhats: 'Olá! Vim através do site da Casa das Cores e gostaria de tirar uma dúvida e solicitar um orçamento de tintas.',
  emailProprietario: OWNER_EMAIL,
  fotoFachada: '',
  fotoInterior1: '',
  fotoInterior2: '',
  fotoLogo: '',
  promocoes: INITIAL_PROMOTIONS,
  marcas: INITIAL_BRANDS,
  cores: undefined, // will be assigned below
};

export const INITIAL_COLOR_SWATCHES: ColorSwatch[] = [
  // SUVINIL (CATÁLOGO COMPLETO)
  {
    nome: 'Branco Neve',
    codigo: 'SUV-B101',
    hex: '#F8F9FA',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Clássico absoluto, ilumina e amplia ambientes internos e externos.'
  },
  {
    nome: 'Cinza Crômio',
    codigo: 'SUV-CC303',
    hex: '#D7D8D6',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'O tom neutro mais pedido por arquitetos para salas e fachadas modernas.'
  },
  {
    nome: 'Broto de Feijão',
    codigo: 'SUV-BF112',
    hex: '#E3DAC9',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Aconchegante e luminoso, combina perfeitamente com madeiras nobres.'
  },
  {
    nome: 'Elefante',
    codigo: 'SUV-EL210',
    hex: '#9E9D97',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Cinza médio equilibrado e contemporâneo para ambientes refinados.'
  },
  {
    nome: 'Calopsita',
    codigo: 'SUV-CP330',
    hex: '#E8DEC8',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Amarelo suave pastel que traz sensação de bem-estar e luz natural.'
  },
  {
    nome: 'Ovelha',
    codigo: 'SUV-OV415',
    hex: '#D1C7BD',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Greige suave e elegante, perfeito para quartos e salas de estar.'
  },
  {
    nome: 'Toque de Luz',
    codigo: 'SUV-TL105',
    hex: '#FFFBEB',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Branco aquecido suave que valoriza a iluminação natural da casa.'
  },
  {
    nome: 'Terracota Suvinil',
    codigo: 'SUV-TC720',
    hex: '#BA5A3A',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Tom terroso aquecido e expressivo para paredes de destaque e muros.'
  },
  {
    nome: 'Azul Petróleo',
    codigo: 'SUV-AP880',
    hex: '#1A3644',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Profundidade nobre e marcante para halls, gabinetes e fachadas elegantes.'
  },
  {
    nome: 'Papel Picado',
    codigo: 'SUV-PP118',
    hex: '#DDD9D0',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Neutro suave e moderno que traz conforto visual e sofisticação atemporal.'
  },
  {
    nome: 'Calda de Chocolate',
    codigo: 'SUV-CC440',
    hex: '#594236',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Marrom profundo elegante para contrastes arquitetônicos acolhedores.'
  },
  {
    nome: 'Areia da Praia',
    codigo: 'SUV-AP215',
    hex: '#E5D9C4',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Tom praiano claro e iluminado, perfeito para residências do litoral.'
  },
  {
    nome: 'Canto da Mata',
    codigo: 'SUV-CM320',
    hex: '#3E5945',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Verde floresta profundo que convida a natureza para dentro de casa.'
  },
  {
    nome: 'Suave Limão',
    codigo: 'SUV-SL108',
    hex: '#E2E8C0',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Frescor cítrico pastel para cozinhas e lavabos contemporâneos.'
  },
  {
    nome: 'Rosa Mosqueta Suvinil',
    codigo: 'SUV-RM225',
    hex: '#CF9F95',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Rosé maduro elegante para quartos, salas íntimas e lavabos.'
  },
  {
    nome: 'Quindim Doce',
    codigo: 'SUV-QD550',
    hex: '#F4C142',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Amarelo vibrante solar para portas de entrada e detalhes com energia.'
  },
  {
    nome: 'Flor de Laranjeira',
    codigo: 'SUV-FL104',
    hex: '#F6E5D1',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Tom pêssego suave que traz calmaria e aconchego em corredores.'
  },
  {
    nome: 'Menta Fresca',
    codigo: 'SUV-MF212',
    hex: '#96C2A6',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Verde menta relaxante com toque moderno para áreas gourmet.'
  },
  {
    nome: 'Céu de Verão',
    codigo: 'SUV-CV408',
    hex: '#5B8EA8',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Azul marítimo refrescante para fachadas, varandas e tetos.'
  },
  {
    nome: 'Tamarindo Intenso',
    codigo: 'SUV-TI615',
    hex: '#933E2B',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Vinho terroso de impacto visual imponente para pilares e pórticos.'
  },
  {
    nome: 'Alfazema Suave',
    codigo: 'SUV-AS115',
    hex: '#B6B1CD',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Lilás acinzentado de tranquilidade para quartos infantis e home office.'
  },
  {
    nome: 'Grafite Intenso',
    codigo: 'SUV-GI808',
    hex: '#33373B',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Preto grafite refinado para muros, portões e acabamentos finos.'
  },
  {
    nome: 'Gelo Puro',
    codigo: 'SUV-GP100',
    hex: '#EFF2F4',
    marca: 'Suvinil',
    tipo: 'tinta',
    descricao: 'Branco gelo cristalino que amplia e moderniza salas de estar.'
  },

  // CORAL (CATÁLOGO COMPLETO)
  {
    nome: 'Algodão Egípcio',
    codigo: 'COR-AE202',
    hex: '#EDE4D4',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Sensação acolhedora e elegante com sofisticação atemporal.'
  },
  {
    nome: 'Azul Horizonte Sereno',
    codigo: 'COR-AS505',
    hex: '#7A98A8',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Transmite calma, frescor e serenidade para quartos e varandas litorâneas.'
  },
  {
    nome: 'Praça no Inverno',
    codigo: 'COR-PI104',
    hex: '#C5C6C2',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Cinza neutro urbano de extrema versatilidade e requinte.'
  },
  {
    nome: 'Creme Escocês',
    codigo: 'COR-CE208',
    hex: '#F2EBD9',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Tonalidade quente suave que amplia e ilumina qualquer cômodo.'
  },
  {
    nome: 'Canto da Floresta',
    codigo: 'COR-CF314',
    hex: '#6B8068',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Verde herbal relaxante que traz frescor biofílico ao lar.'
  },
  {
    nome: 'Rosa Mosqueta Coral',
    codigo: 'COR-RM422',
    hex: '#D9A59B',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Tom terracota rosado sofisticado para ambientes acolhedores.'
  },
  {
    nome: 'Mergulho Noturno',
    codigo: 'COR-MN602',
    hex: '#1E2C3D',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Azul marinho profundo para contrastes marcantes com molduras brancas.'
  },
  {
    nome: 'Toque de Vento',
    codigo: 'COR-TV102',
    hex: '#E6E6E1',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Branco off-white suave com toque aveludado e alta cobertura.'
  },
  {
    nome: 'Branco Puro Coral',
    codigo: 'COR-BP101',
    hex: '#FAFAFA',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Luminosidade máxima para tetos, sancas e portas.'
  },
  {
    nome: 'Tempestade Iminente',
    codigo: 'COR-TI303',
    hex: '#686C70',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Cinza chumbo marcante para paredes de TV e lareiras.'
  },
  {
    nome: 'Mostarda Colonial',
    codigo: 'COR-MC415',
    hex: '#CFA138',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Amarelo mostarda rústico de personalidade marcante.'
  },
  {
    nome: 'Amêndoa Confeitada',
    codigo: 'COR-AC210',
    hex: '#DFD0BD',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Bege suave e reconfortante para halls e corredores sociais.'
  },
  {
    nome: 'Verde Eucalipto Tropical',
    codigo: 'COR-VE312',
    hex: '#4F6D59',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Conexão natural e atmosfera equilibrada para salas e quartos.'
  },
  {
    nome: 'Terracota Colonial',
    codigo: 'COR-TC618',
    hex: '#B2593F',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Aquecimento visual e beleza para fachadas externas no litoral.'
  },
  {
    nome: 'Noite Polar',
    codigo: 'COR-NP808',
    hex: '#2C3539',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Quase preto luxuoso para decorações modernas e minimalistas.'
  },
  {
    nome: 'Pétala de Rosa',
    codigo: 'COR-PR115',
    hex: '#E8C6C0',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Rosa bebê sofisticado para quartos de descanso.'
  },
  {
    nome: 'Chá de Camomila',
    codigo: 'COR-CC106',
    hex: '#F3EAC7',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Amarelo clarinho solar para ambientes sem luz direta.'
  },
  {
    nome: 'Névoa Matinal',
    codigo: 'COR-NM110',
    hex: '#DADEDF',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Cinza claro cristalino para ambientes amplos e clean.'
  },
  {
    nome: 'Café Torrado',
    codigo: 'COR-CT520',
    hex: '#46352B',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Marrom escuro amadeirado para contrastes de móveis claros.'
  },
  {
    nome: 'Brisa do Mar',
    codigo: 'COR-BM305',
    hex: '#8EB7C7',
    marca: 'Coral',
    tipo: 'tinta',
    descricao: 'Azul piscina cristalino que remete à orla e praias de Jaguaruna.'
  },

  // ANJO TINTAS (CATÁLOGO COMPLETO)
  {
    nome: 'Terracota Artesanal',
    codigo: 'ANJ-TA606',
    hex: '#C06B4C',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Vigor, calor e personalidade para áreas externas e fachadas protegidas.'
  },
  {
    nome: 'Grafite Nobre',
    codigo: 'ANJ-GN808',
    hex: '#4A4E54',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Alta resistência e elegância para muros, portões e acabamentos.'
  },
  {
    nome: 'Palha Rústica',
    codigo: 'ANJ-PR109',
    hex: '#E4D3B8',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Textura acolhedora inspirada no litoral para alvenarias externas e internas.'
  },
  {
    nome: 'Marfim Tropical',
    codigo: 'ANJ-MT204',
    hex: '#F7E9CE',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Luminosidade pura para fachadas e corredores com excelente durabilidade.'
  },
  {
    nome: 'Verde Pantanal',
    codigo: 'ANJ-VP310',
    hex: '#4D6652',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Tom campestre natural que se harmoniza perfeitamente com jardins.'
  },
  {
    nome: 'Concreto Real',
    codigo: 'ANJ-CR412',
    hex: '#A3A5A4',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Efeito cimento moderno, perfeito para decorações em estilo industrial.'
  },
  {
    nome: 'Tijolo Aparente',
    codigo: 'ANJ-TJ508',
    hex: '#994833',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Rústico tradicional brasileiro para detalhes, pilares e garagens.'
  },
  {
    nome: 'Preto Absoluto',
    codigo: 'ANJ-PA900',
    hex: '#1F2022',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Preto fosco profundo para detalhes de marcenaria, ferros e portões.'
  },
  {
    nome: 'Branco Neve Anjo',
    codigo: 'ANJ-BN101',
    hex: '#F9F9FA',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Branco puro com resina de altíssima lavabilidade e cobertura.'
  },
  {
    nome: 'Areia Quente',
    codigo: 'ANJ-AQ215',
    hex: '#DAC7AE',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Bege médio equilibrado e resistente à maresia e poeira.'
  },
  {
    nome: 'Cinza Urbano',
    codigo: 'ANJ-CU305',
    hex: '#85878A',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Cinza médio discreto e duradouro para fachadas externas.'
  },
  {
    nome: 'Canela Rústica',
    codigo: 'ANJ-CR510',
    hex: '#7E4833',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Tom amadeirado quente para casas de campo e praia.'
  },
  {
    nome: 'Amarelo Ocre Sol',
    codigo: 'ANJ-AO420',
    hex: '#DBA337',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Ocre histórico de alto rendimento e pigmentação resistente ao sol.'
  },
  {
    nome: 'Azul Oceânico',
    codigo: 'ANJ-AO550',
    hex: '#2A4765',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Azul marítimo clássico para varandas, muros e fachadas náuticas.'
  },
  {
    nome: 'Verde Musgo Forte',
    codigo: 'ANJ-VM612',
    hex: '#384E3E',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Verde fechado que disfarça intempéries e embeleza garagens.'
  },
  {
    nome: 'Gelo Polar',
    codigo: 'ANJ-GP103',
    hex: '#E7EBEE',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Gelo brilhante com reflexo de frescor no ambiente.'
  },
  {
    nome: 'Trigo Dourado',
    codigo: 'ANJ-TD208',
    hex: '#E9D7B7',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Amarelo palha dourado aconchegante para salas de estar.'
  },
  {
    nome: 'Bege Clássico',
    codigo: 'ANJ-BC214',
    hex: '#D7C5AC',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Neutro imbatível que combina com qualquer estilo de piso.'
  },
  {
    nome: 'Carvão Vegetal',
    codigo: 'ANJ-CV850',
    hex: '#2D3033',
    marca: 'Anjo',
    tipo: 'tinta',
    descricao: 'Tom escuro elegante para portas de madeira e metais nobres.'
  },

  // EUCATEX (CATÁLOGO COMPLETO)
  {
    nome: 'Areia Molhada',
    codigo: 'EUC-AM404',
    hex: '#D5C4A1',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Tom terroso equilibrado que remete às dunas e praias de Jaguaruna.'
  },
  {
    nome: 'Verde Eucalipto',
    codigo: 'EUC-VE707',
    hex: '#5E7D6A',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Conexão direta com a natureza e atmosfera de paz interior.'
  },
  {
    nome: 'Seda Suave',
    codigo: 'EUC-SS101',
    hex: '#F3EFE6',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Sensação aveludada e clean para quartos de casal e salas de estar.'
  },
  {
    nome: 'Camurça Nobre',
    codigo: 'EUC-CN205',
    hex: '#BCA993',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Tom neutro aconchegante para ambientes sociais refinados.'
  },
  {
    nome: 'Gelo Ártico',
    codigo: 'EUC-GA303',
    hex: '#EAECEE',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Toque moderno e cristalino para cozinhas, lavabos e áreas gourmet.'
  },
  {
    nome: 'Mostarda Quente',
    codigo: 'EUC-MQ418',
    hex: '#D69E2E',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Energia solar vibrante para portas de entrada e cantos criativos.'
  },
  {
    nome: 'Rubi Clássico',
    codigo: 'EUC-RC512',
    hex: '#872337',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Vinho nobre marcante para salas de jantar e paredes de destaque.'
  },
  {
    nome: 'Branco Gelo Eucatex',
    codigo: 'EUC-BG102',
    hex: '#F2F4F5',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Branco sutilmente frio para ampliar ambientes e valorizar móveis.'
  },
  {
    nome: 'Cinza Espacial',
    codigo: 'EUC-CE308',
    hex: '#97999B',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Cinza moderno intermediário para salas integradas e quartos.'
  },
  {
    nome: 'Palha Natural',
    codigo: 'EUC-PN204',
    hex: '#E5DAC8',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Iluminação calorosa e toque rústico suave para alvenaria.'
  },
  {
    nome: 'Pêssego Tropical',
    codigo: 'EUC-PT116',
    hex: '#ECC5A8',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Tonalidade alegre e acolhedora para varandas e cozinhas.'
  },
  {
    nome: 'Azul Mar Azul',
    codigo: 'EUC-AM510',
    hex: '#295272',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Azul clássico de alta cobertura para fachadas e portões.'
  },
  {
    nome: 'Verde Oliva Suave',
    codigo: 'EUC-VO318',
    hex: '#6E8268',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Verde azeitona sofisticado para fachadas com paisagismo.'
  },
  {
    nome: 'Terracota Caipira',
    codigo: 'EUC-TC612',
    hex: '#B75538',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'O autêntico tom de cerâmica e tijolo de barro cozido.'
  },
  {
    nome: 'Milho Verde Amarelo',
    codigo: 'EUC-MV412',
    hex: '#F0C855',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Amarelo ouro luminoso para ambientes que pedem alegria.'
  },
  {
    nome: 'Grafite Escuro',
    codigo: 'EUC-GE808',
    hex: '#3B3D40',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Tom neutro escuro de proteção com alta resistência lavável.'
  },
  {
    nome: 'Flor de Algodão',
    codigo: 'EUC-FA101',
    hex: '#FAF6ED',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Branco leitoso macio que valoriza pisos de madeira e cerâmica.'
  },
  {
    nome: 'Concreto Moderno',
    codigo: 'EUC-CM402',
    hex: '#AFB2B2',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Cinza cimento com acabamento fosco suave para interiores.'
  },
  {
    nome: 'Marrom Café Colonial',
    codigo: 'EUC-MC508',
    hex: '#4A3728',
    marca: 'Eucatex',
    tipo: 'tinta',
    descricao: 'Riqueza e calor terroso para detalhes externos e fachadas.'
  }
];

export const INITIAL_TEXTURE_SWATCHES: ColorSwatch[] = [
  // SUVINIL TEXTURAS E EFEITOS (CATÁLOGO COMPLETO)
  {
    nome: 'Cimento Queimado Platina',
    codigo: 'SUV-CQ01',
    hex: '#B8B9B7',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Efeito urbano contemporâneo de cimento queimado fosco para salas e quartos de casal.'
  },
  {
    nome: 'Cimento Queimado Grafite',
    codigo: 'SUV-CQ02',
    hex: '#4E5256',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Nuances rústicas de concreto escuro com alta personalidade para paredes de destaque e TV.'
  },
  {
    nome: 'Cimento Queimado Concreto Suave',
    codigo: 'SUV-CQ03',
    hex: '#D2D3D0',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Cimento suave luminoso que amplia salas e reflete iluminação natural.'
  },
  {
    nome: 'Cimento Queimado Avelã',
    codigo: 'SUV-CQ04',
    hex: '#A89886',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Nuance terrosa acolhedora que combina perfeitamente com marcenaria planejada.'
  },
  {
    nome: 'Cimento Queimado Selva de Pedra',
    codigo: 'SUV-CQ05',
    hex: '#848784',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Cinza médio industrial de acabamento sofisticado e manchamento natural.'
  },
  {
    nome: 'Cimento Queimado Rosa Mosqueta',
    codigo: 'SUV-CQ06',
    hex: '#C7A299',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Efeito cimento com toque rosado romântico contemporâneo para suítes.'
  },
  {
    nome: 'Marmorato Carrara Nobre',
    codigo: 'SUV-MM01',
    hex: '#ECEAE4',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Marmorato',
    texturaVisual: 'marmore',
    descricao: 'Efeito mármore clássico italiano com brilho vítreo e veios refinados.'
  },
  {
    nome: 'Marmorato Calacata Dourado',
    codigo: 'SUV-MM02',
    hex: '#E7E1D3',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Marmorato',
    texturaVisual: 'marmore',
    descricao: 'Veios dourados nobres polidos para lavabos, halls e salas de jantar.'
  },
  {
    nome: 'Marmorato Nero Marquina',
    codigo: 'SUV-MM03',
    hex: '#2B2D31',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Marmorato',
    texturaVisual: 'marmore',
    descricao: 'Mármore negro luxuoso com acabamento espelhado de altíssimo padrão.'
  },
  {
    nome: 'Toque de Veludo Ametista',
    codigo: 'SUV-VL01',
    hex: '#7A5868',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Aveludado',
    texturaVisual: 'veludo',
    descricao: 'Superfície aveludada sofisticada com micropartículas refletoras de luz.'
  },
  {
    nome: 'Toque de Veludo Champanhe',
    codigo: 'SUV-VL02',
    hex: '#E5D8C5',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Aveludado',
    texturaVisual: 'veludo',
    descricao: 'Brilho acetinado perolado que ilumina salas de estar e cabeceiras.'
  },
  {
    nome: 'Toque de Veludo Fendi',
    codigo: 'SUV-VL03',
    hex: '#9C9285',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Aveludado',
    texturaVisual: 'veludo',
    descricao: 'Elegância neutra com toque camurçado macio ao olhar.'
  },
  {
    nome: 'Textura Rústica Areia Duna',
    codigo: 'SUV-TR01',
    hex: '#D1BF9D',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'arenoso',
    descricao: 'Relevo rústico hidrorrepelente de grânulos minerais para fachadas e garagens.'
  },
  {
    nome: 'Textura Riscada Grafiato Suvinil',
    codigo: 'SUV-TG02',
    hex: '#C3B8A7',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Grafiato',
    texturaVisual: 'grafiato',
    descricao: 'Ranhuras decorativas tradicionais com alta resistência contra sol e chuva.'
  },
  {
    nome: 'Textura Lisa Rolada',
    codigo: 'SUV-TL03',
    hex: '#E2DCD3',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'liso',
    descricao: 'Acabamento texturizado uniforme aplicado com rolo de textura.'
  },
  {
    nome: 'Efeito Aço Corten Suvinil',
    codigo: 'SUV-AC01',
    hex: '#8C472E',
    marca: 'Suvinil',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'arenoso',
    descricao: 'Efeito oxidação avermelhada de aço corten arquitetônico para pilares e muros.'
  },

  // CORAL TEXTURAS E EFEITOS (CATÁLOGO COMPLETO)
  {
    nome: 'Decora Cimento Queimado Névoa',
    codigo: 'COR-DC01',
    hex: '#C7CACB',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Efeito cimento com estética aveludada clara e manchamento natural de luz.'
  },
  {
    nome: 'Decora Cimento Queimado Tubarão',
    codigo: 'COR-DC02',
    hex: '#7C8085',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Cinza intermediário moderno com manchas realistas de concreto.'
  },
  {
    nome: 'Decora Cimento Queimado Areia Quente',
    codigo: 'COR-DC03',
    hex: '#B9ABA0',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Cimento queimado com toque terroso suave e aconchegante.'
  },
  {
    nome: 'Decora Cimento Queimado Chumbo',
    codigo: 'COR-DC04',
    hex: '#45484D',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Concreto escuro imponente para ambientes com iluminação dirigida.'
  },
  {
    nome: 'Decora Mármore Imperial Branco',
    codigo: 'COR-DM01',
    hex: '#E1DCD3',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Marmorato',
    texturaVisual: 'marmore',
    descricao: 'Lustração polida de mármore natural com profundidade mineral estonteante.'
  },
  {
    nome: 'Decora Mármore Gris Urbano',
    codigo: 'COR-DM02',
    hex: '#A6A9AA',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Marmorato',
    texturaVisual: 'marmore',
    descricao: 'Mármore cinza com reflexo translúcido de alta classe.'
  },
  {
    nome: 'Decora Mármore Terracota',
    codigo: 'COR-DM03',
    hex: '#AD614D',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Marmorato',
    texturaVisual: 'marmore',
    descricao: 'Veios quentes avermelhados de mármore para paredes de lareira e jantar.'
  },
  {
    nome: 'Decora Nuvem Suave Perolizada',
    codigo: 'COR-NV01',
    hex: '#EDEAE3',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Acetinado',
    texturaVisual: 'veludo',
    descricao: 'Reflexos metálicos perolizados para paredes de destaque em salas sociais.'
  },
  {
    nome: 'Decora Efeito Velvet Camurça',
    codigo: 'COR-VC01',
    hex: '#AFA191',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Aveludado',
    texturaVisual: 'veludo',
    descricao: 'Sensação tátil aveludada macia para quartos e home cinemas.'
  },
  {
    nome: 'Textura Riscada Grafiato Elegance',
    codigo: 'COR-GR01',
    hex: '#D8CEBE',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Grafiato',
    texturaVisual: 'grafiato',
    descricao: 'Ranhuras decorativas clássicas que protegem alvenaria e disfarçam ondulações.'
  },
  {
    nome: 'Textura Rústica Pedras Naturais',
    codigo: 'COR-RP02',
    hex: '#B6A895',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'arenoso',
    descricao: 'Granulação mineral encorpada com proteção UV e hidro-repelência.'
  },
  {
    nome: 'Textura Acrílica Hidrorrepelente',
    codigo: 'COR-TH03',
    hex: '#DDD5C7',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'arenoso',
    descricao: 'Barreira protetora contra infiltração e batida de chuva no litoral.'
  },
  {
    nome: 'Textura Lisa Rolada Decorativa',
    codigo: 'COR-TL04',
    hex: '#E5E0D6',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'liso',
    descricao: 'Aplicação prática que uniformiza o reboco com relevo suave.'
  },
  {
    nome: 'Decora Efeito Bronze Rústico',
    codigo: 'COR-BR01',
    hex: '#754E38',
    marca: 'Coral',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'arenoso',
    descricao: 'Acabamento metálico envelhecido sofisticado para interiores modernos.'
  },

  // ANJO TEXTURAS E EFEITOS (CATÁLOGO COMPLETO)
  {
    nome: 'Textura Emborrachada Fachada Protegida',
    codigo: 'ANJ-EB01',
    hex: '#9C9D9F',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'liso',
    descricao: 'Máxima elasticidade que blinda alvenarias contra chuva, sol forte e maresia de Jaguaruna.'
  },
  {
    nome: 'Grafiato Rústico Extra Mineral',
    codigo: 'ANJ-GR01',
    hex: '#BAA893',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Grafiato',
    texturaVisual: 'grafiato',
    descricao: 'Granulometria encorpada com quartzo selecionado para longa durabilidade exterior.'
  },
  {
    nome: 'Grafiato Fino Designer',
    codigo: 'ANJ-GF02',
    hex: '#CFC4B5',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Grafiato',
    texturaVisual: 'grafiato',
    descricao: 'Ranhuras decorativas mais finas e elegantes para ambientes internos.'
  },
  {
    nome: 'Cimento Queimado Chumbo Urbano',
    codigo: 'ANJ-CQ01',
    hex: '#3D4044',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Visual moderno industrial escuro com acabamento fosco suave.'
  },
  {
    nome: 'Cimento Queimado Areia do Deserto',
    codigo: 'ANJ-CQ02',
    hex: '#C4B49C',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Nuance praiana quente de cimento com textura macia ao toque.'
  },
  {
    nome: 'Efeito Rústico Aço Corten Vulcânico',
    codigo: 'ANJ-AC01',
    hex: '#8A432A',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'arenoso',
    descricao: 'Efeito de oxidação nobre avermelhada de aço corten arquitetônico para pilares e fachadas.'
  },
  {
    nome: 'Textura Granulada Pedras Preciosas',
    codigo: 'ANJ-TG01',
    hex: '#A59887',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'arenoso',
    descricao: 'Partículas de quartzo polido que reluzem com iluminação natural.'
  },
  {
    nome: 'Textura Lisa Flexível Anti-Fissuras',
    codigo: 'ANJ-TL01',
    hex: '#E4DDD2',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'liso',
    descricao: 'Tecnologia elastomérica que acompanha a dilatação térmica da estrutura.'
  },
  {
    nome: 'Efeito Travertino Clássico',
    codigo: 'ANJ-ET01',
    hex: '#DCD1BF',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'arenoso',
    descricao: 'Inspirado no mármore travertino romano com porosidades naturais.'
  },
  {
    nome: 'Textura Rústica Marítima Bate-Chuva',
    codigo: 'ANJ-MB01',
    hex: '#8F8F91',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'liso',
    descricao: 'Formulação especial resistente à névoa salina e ventos costeiros.'
  },
  {
    nome: 'Grafiato Terracota Artesanal',
    codigo: 'ANJ-GT01',
    hex: '#B2573E',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Grafiato',
    texturaVisual: 'grafiato',
    descricao: 'Tom quente expressivo com sulcos minerais marcantes.'
  },
  {
    nome: 'Textura Cristais de Quartzo',
    codigo: 'ANJ-CQ03',
    hex: '#E8E2D8',
    marca: 'Anjo',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'arenoso',
    descricao: 'Brilho cristalino suave que valoriza jardins e áreas de piscina.'
  },

  // EUCATEX TEXTURAS E EFEITOS (CATÁLOGO COMPLETO)
  {
    nome: 'Eucatex Rolo Cimento Nobre',
    codigo: 'EUC-RC01',
    hex: '#A8ABA8',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Aplicação fácil com rolo de textura e efeito manchado elegante.'
  },
  {
    nome: 'Eucatex Rolo Cimento Industrial',
    codigo: 'EUC-RC02',
    hex: '#585C5E',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Cimento Queimado',
    texturaVisual: 'cimento',
    descricao: 'Cinza chumbo industrial de alta cobertura para lojas e residências.'
  },
  {
    nome: 'Eucatex Grafiato Rústico Areia',
    codigo: 'EUC-GR01',
    hex: '#CEBEA5',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Grafiato',
    texturaVisual: 'grafiato',
    descricao: 'Ranhuras decorativas uniformes para áreas gourmet, churrasqueiras e muros.'
  },
  {
    nome: 'Eucatex Grafiato Quartzo Branco',
    codigo: 'EUC-GR02',
    hex: '#EDE7DD',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Grafiato',
    texturaVisual: 'grafiato',
    descricao: 'Carga de quartzo branco que traz sofisticação clean a fachadas.'
  },
  {
    nome: 'Textura Lisa Efeito Camurça',
    codigo: 'EUC-CM01',
    hex: '#B59E87',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Aveludado',
    texturaVisual: 'veludo',
    descricao: 'Toque camurçado suave e aveludado que acolhe e valoriza a iluminação quente.'
  },
  {
    nome: 'Textura Acrílica Rústica Cristais',
    codigo: 'EUC-TC01',
    hex: '#D5C8B4',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'arenoso',
    descricao: 'Fórmula enriquecida com minerais hidrorrepelentes anti-mofo.'
  },
  {
    nome: 'Efeito Marmorato Perolado',
    codigo: 'EUC-MM01',
    hex: '#DFD9CE',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Marmorato',
    texturaVisual: 'marmore',
    descricao: 'Brilho acetinado de mármore polido de fácil conservação.'
  },
  {
    nome: 'Textura Riscada Travertino Nobre',
    codigo: 'EUC-TT01',
    hex: '#D6C7AE',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Grafiato',
    texturaVisual: 'grafiato',
    descricao: 'Efeito travertino riscado para colunas, halls e fachadas de condomínios.'
  },
  {
    nome: 'Textura Eucatex Rolo Terracota',
    codigo: 'EUC-TR01',
    hex: '#B96245',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'arenoso',
    descricao: 'Pigmentação mineral terracota resistente à exposição solar contínua.'
  },
  {
    nome: 'Textura Eucatex Rolo Verde Folha',
    codigo: 'EUC-VF01',
    hex: '#5B7864',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'liso',
    descricao: 'Tom orgânico natural que harmoniza com plantas, gramados e pérgolas.'
  },
  {
    nome: 'Textura Lisa Rendimento Extra',
    codigo: 'EUC-TL01',
    hex: '#ECE8DF',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Rústico',
    texturaVisual: 'liso',
    descricao: 'Cobre micro-fissuras e rende muito mais metros quadrados por lata.'
  },
  {
    nome: 'Textura Grafiato Rústico Grafite',
    codigo: 'EUC-GC01',
    hex: '#46484B',
    marca: 'Eucatex',
    tipo: 'textura',
    acabamento: 'Grafiato',
    texturaVisual: 'grafiato',
    descricao: 'Contraste escuro de alta elegância para detalhes e muros externos.'
  }
];

// Garante que todas as cores de tinta tenham tipo = 'tinta'
INITIAL_COLOR_SWATCHES.forEach(c => {
  if (!c.tipo) c.tipo = 'tinta';
});

INITIAL_STORE_CONFIG.cores = [...INITIAL_COLOR_SWATCHES, ...INITIAL_TEXTURE_SWATCHES];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'wa0016',
    url: 'IMG-20260930-WA0016.svg',
    titulo: 'Logomarca Oficial Casa das Cores',
    categoria: 'marcas',
    descricao: 'Identidade visual oficial da Casa das Cores: O melhor e mais barato para você em pinturas e acabamentos. Fone: (48) 3624-1961.'
  },
  {
    id: 'wa0015',
    url: 'IMG-20260930-WA0015.svg',
    titulo: 'Suvinil Tintas',
    categoria: 'marcas',
    descricao: 'Renovar é fácil. É só querer. Parceira oficial da Casa das Cores.'
  },
  {
    id: 'wa0017',
    url: 'IMG-20260930-WA0017.svg',
    titulo: 'Coral Tintas',
    categoria: 'marcas',
    descricao: 'Tudo de cor para você. Linha completa imobiliária e de proteção para alvenaria.'
  },
  {
    id: 'wa0013',
    url: 'IMG-20260930-WA0013.svg',
    titulo: 'Anjo Tintas',
    categoria: 'marcas',
    descricao: 'Aprovada pelo tempo. Qualidade máxima em tintas, vernizes e esmaltes sintéticos.'
  },
  {
    id: 'wa0014',
    url: 'IMG-20260930-WA0014.svg',
    titulo: 'Eucatex Tintas',
    categoria: 'marcas',
    descricao: 'Simplesmente qualidade. O melhor custo-benefício e alto rendimento para sua obra.'
  }
];
