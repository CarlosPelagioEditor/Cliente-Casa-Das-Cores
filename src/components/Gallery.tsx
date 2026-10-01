import React, { useState } from 'react';
import { GalleryItem, StoreConfig } from '../types';
import { INITIAL_GALLERY_ITEMS } from '../data/initialData';
import { Image, X, ZoomIn, Sparkles, UploadCloud } from 'lucide-react';
import { BrushStroke } from './BrushStroke';

interface GalleryProps {
  config: StoreConfig;
  onUpdateConfig?: (newConfig: StoreConfig) => void;
  isOwner?: boolean;
}

export const Gallery: React.FC<GalleryProps> = ({ config, onUpdateConfig, isOwner = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  // Combina fotos enviadas pelo usuário com a logomarca e marcas oficiais
  const allItems: GalleryItem[] = [];

  if (config.fotoFachada) {
    allItems.push({
      id: 'foto-fachada-real',
      url: config.fotoFachada,
      titulo: 'Fachada Real da Casa das Cores',
      categoria: 'fachada',
      descricao: 'Fachada oficial da loja com amplo pátio e estacionamento próprio em Jaguaruna - SC.'
    });
  }

  if (config.fotoInterior1) {
    allItems.push({
      id: 'foto-interior-1-real',
      url: config.fotoInterior1,
      titulo: 'Interior da Loja e Corredores',
      categoria: 'interior',
      descricao: 'Prateleiras abastecidas com estoque completo de tintas e acabamentos.'
    });
  }

  if (config.fotoInterior2) {
    allItems.push({
      id: 'foto-interior-2-real',
      url: config.fotoInterior2,
      titulo: 'Expositores e Acessórios',
      categoria: 'interior',
      descricao: 'Linha completa de ferramentas, silicones, impermeabilizantes e acessórios para pintura.'
    });
  }

  // Logomarca oficial da loja (sempre exibe a imagem enviada pelo proprietário se existir)
  const officialLogoItem: GalleryItem = {
    id: 'wa0016',
    url: config.fotoLogo ? config.fotoLogo : '/IMG-20260930-WA0016.svg',
    titulo: 'Logomarca Oficial Casa das Cores',
    categoria: 'marcas',
    descricao: 'Identidade visual oficial da Casa das Cores: O melhor e mais barato para você em pinturas e acabamentos. Fone: (48) 3624-1961.'
  };

  const otherBrandLogos = INITIAL_GALLERY_ITEMS.filter((i) => i.id !== 'wa0016');
  allItems.push(officialLogoItem, ...otherBrandLogos);

  const filteredItems = selectedCategory === 'todos'
    ? allItems
    : allItems.filter((item) => item.categoria === selectedCategory);

  const handleUploadPhoto = (field: 'fotoFachada' | 'fotoInterior1' | 'fotoInterior2') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateConfig) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (dataUrl) {
          onUpdateConfig({
            ...config,
            [field]: dataUrl
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const titulo = config.textos?.galeriaTitulo || 'Conheça Nossa Estrutura em Jaguaruna';
  const subtitulo = config.textos?.galeriaSubtitulo || 'Amplo estacionamento, pátio privativo, corredores organizados e o maior estoque a pronta entrega da região.';

  return (
    <section id="galeria" className="py-16 sm:py-20 bg-slate-100/70 relative overflow-hidden">
      {/* Pincelada decorativa de fundo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
            <Image size={14} className="text-slate-950" />
            <span>Fotos & Estrutura da Loja</span>
          </div>

          <div className="relative inline-block mt-3">
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-950 tracking-tight relative z-10">
              {titulo}
            </h2>
            <BrushStroke
              variant="underline"
              color="#F59E0B"
              className="w-full h-3 -mt-1 opacity-70"
            />
          </div>

          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {subtitulo}
          </p>
        </div>

        {/* Filtros da Galeria */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'todos', label: 'Todas as Fotos' },
            { id: 'fachada', label: 'Fachada & Pátio' },
            { id: 'interior', label: 'Interior da Loja' },
            { id: 'produtos', label: 'Expositores & Produtos' },
            { id: 'marcas', label: 'Logomarca & Parceiros' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-950 text-amber-300 shadow-md ring-2 ring-amber-400'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grade de Imagens - Dimensões reais sem preenchimento nas bordas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Contêiner da Imagem */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900/5 flex items-center justify-center">
                <img
                  src={item.url}
                  alt={item.titulo}
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                    item.categoria === 'marcas'
                      ? 'object-contain p-4'
                      : 'object-cover'
                  }`}
                  loading="lazy"
                  onError={(e) => {
                    const fallbackSvg = item.url.replace(/\.jpg$/i, '.svg');
                    if (e.currentTarget.src !== fallbackSvg && !e.currentTarget.src.endsWith(fallbackSvg)) {
                      e.currentTarget.src = '/' + fallbackSvg;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/95 text-slate-900 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn size={20} />
                  </div>
                </div>
              </div>

              {/* Informações da Foto */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-600 block mb-1">
                    {item.categoria === 'fachada' ? 'Fachada Oficial' : item.categoria === 'interior' ? 'Interior da Loja' : item.categoria === 'produtos' ? 'Produtos' : 'Identidade Visual'}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
                    {item.titulo}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase">
                  <span>Casa das Cores</span>
                  <span className="text-amber-600 font-bold">Ver em Tamanho Real →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Card de Ação Rápida para Carregar Fotos Reais (Apenas Proprietário) */}
        {isOwner && (
          <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                  Gerenciamento da Loja
                </span>
                <h3 className="text-xl font-black text-slate-950 mt-2 font-heading">
                  Fotos Reais da Loja Física
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  Selecione as fotos da fachada e do interior para que sejam exibidas na galeria e no topo do site.
                </p>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
                <label className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-4 py-3 rounded-xl shadow cursor-pointer transition-colors border border-amber-400">
                  <UploadCloud size={16} />
                  <span>Foto Fachada</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadPhoto('fotoFachada')}
                  />
                </label>

                <label className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs px-4 py-3 rounded-xl shadow cursor-pointer transition-colors">
                  <UploadCloud size={16} />
                  <span>Foto Interior 1</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadPhoto('fotoInterior1')}
                  />
                </label>

                <label className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs px-4 py-3 rounded-xl shadow cursor-pointer transition-colors">
                  <UploadCloud size={16} />
                  <span>Foto Interior 2</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadPhoto('fotoInterior2')}
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal com Dimensões Reais da Foto */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer"
              title="Fechar"
            >
              <X size={20} />
            </button>

            {/* Imagem em dimensões reais */}
            <div className="max-h-[75vh] flex items-center justify-center bg-black/90 p-2 overflow-hidden">
              <img
                src={activeLightbox.url}
                alt={activeLightbox.titulo}
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>

            <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">
                  Foto da Casa das Cores • Jaguaruna - SC
                </span>
                <h3 className="text-lg sm:text-xl font-black font-heading text-slate-900">
                  {activeLightbox.titulo}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  {activeLightbox.descricao}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveLightbox(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
              >
                Voltar à Loja
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
