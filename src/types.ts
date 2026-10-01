export interface StoreConfig {
  nome: string;
  slogan: string;
  ramo: string;
  whatsapp: string;
  telefoneFixo: string;
  instagram: string;
  facebook: string;
  endereco: string;
  googleMapsUrl: string;
  descricao: string;
  horario: string;
  mensagemPadraoWhats: string;
  emailProprietario: string;
  fotoFachada?: string;
  fotoInterior1?: string;
  fotoInterior2?: string;
  fotoLogo?: string;
  promocoes?: PromotionItem[];
  marcas?: StoreBrand[];
  cores?: ColorSwatch[];
  textos?: StoreTextos;
}

export interface StoreTextos {
  heroTitulo?: string;
  heroDestaque?: string;
  heroSubtitulo?: string;
  sobreTitulo?: string;
  sobreSubtitulo?: string;
  ofertasTitulo?: string;
  ofertasSubtitulo?: string;
  produtosTitulo?: string;
  produtosSubtitulo?: string;
  calculadoraTitulo?: string;
  calculadoraSubtitulo?: string;
  simuladorTitulo?: string;
  simuladorSubtitulo?: string;
  galeriaTitulo?: string;
  galeriaSubtitulo?: string;
  localizacaoTitulo?: string;
  localizacaoSubtitulo?: string;
}

export interface StoreBrand {
  id: string;
  nome: string;
  slogan: string;
  tagline?: string;
  badge?: string;
  logoUrl?: string;
  ativo?: boolean;
  tiposProdutos?: string[]; // 'tinta', 'textura', 'ferramentas', 'lixas', 'argamassa', 'impermeabilizante', 'vernizes'
}

export interface PromotionItem {
  id: string;
  codigo?: string;
  titulo: string;
  marca: string;
  descricao: string;
  precoOriginal: number;
  precoPromocional: number;
  imagemUrl?: string;
  tag?: string;
  mensagemWhats?: string;
  disponivel: boolean;
}

export interface UserSession {
  isLoggedIn: boolean;
  email: string | null;
  name: string | null;
  photoUrl: string | null;
}

export interface GalleryItem {
  id: string;
  url: string;
  titulo: string;
  categoria: 'fachada' | 'interior' | 'produtos' | 'marcas';
  descricao: string;
}

export interface ColorSwatch {
  id?: string;
  nome: string;
  codigo: string;
  hex: string;
  marca: string;
  descricao?: string;
  tipo?: 'tinta' | 'textura';
  acabamento?: string;
  texturaVisual?: 'cimento' | 'marmore' | 'grafiato' | 'liso' | 'arenoso' | 'metalizado' | 'veludo';
}
