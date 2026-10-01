import React, { useState, useRef, useEffect, useMemo } from 'react';
import { StoreConfig, ColorSwatch, StoreBrand } from '../types';
import { INITIAL_COLOR_SWATCHES, INITIAL_BRANDS } from '../data/initialData';
import { 
  Palette, 
  MessageCircle, 
  Sparkles, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Search,
  CheckCircle2,
  Droplets,
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';
import { BrushStroke } from './BrushStroke';

interface ColorSimulatorProps {
  config: StoreConfig;
}

// Categorias de tonalidades para facilitar a navegação no leque
const TONE_CATEGORIES = [
  { id: 'todas', label: 'Todas as Cores' },
  { id: 'brancos', label: 'Brancos & Off-Whites' },
  { id: 'cinzas', label: 'Cinzas & Urbanos' },
  { id: 'neutros', label: 'Neutros & Beges' },
  { id: 'verdes', label: 'Verdes & Botânicos' },
  { id: 'azuis', label: 'Azuis & Marítimos' },
  { id: 'terrosos', label: 'Terrosos & Quentes' },
  { id: 'amarelos', label: 'Amarelos & Solares' },
  { id: 'vinhos', label: 'Vinhos & Rosados' },
  { id: 'escuros', label: 'Pretos & Grafites' },
];

// Função auxiliar para classificar a cor por tom
const getCategoryForHex = (hex: string, nome: string): string => {
  const n = nome.toLowerCase();
  if (n.includes('branco') || n.includes('gelo') || n.includes('neve') || n.includes('luz') || n.includes('algodão') || n.includes('vento') || n.includes('seda')) return 'brancos';
  if (n.includes('cinza') || n.includes('crômio') || n.includes('elefante') || n.includes('concreto') || n.includes('urbano') || n.includes('inverno') || n.includes('espacial') || n.includes('névoa')) return 'cinzas';
  if (n.includes('bege') || n.includes('palha') || n.includes('areia') || n.includes('marfim') || n.includes('ovelha') || n.includes('feijão') || n.includes('creme') || n.includes('amêndoa') || n.includes('camurça') || n.includes('trigo')) return 'neutros';
  if (n.includes('verde') || n.includes('mata') || n.includes('floresta') || n.includes('pantanal') || n.includes('musgo') || n.includes('oliva') || n.includes('eucalipto') || n.includes('menta') || n.includes('folha')) return 'verdes';
  if (n.includes('azul') || n.includes('mar') || n.includes('oceânico') || n.includes('petróleo') || n.includes('sereno') || n.includes('noturno') || n.includes('céu') || n.includes('brisa') || n.includes('polar')) return 'azuis';
  if (n.includes('terracota') || n.includes('chocolate') || n.includes('tamarindo') || n.includes('tijolo') || n.includes('canela') || n.includes('café') || n.includes('caipira') || n.includes('marrom') || n.includes('castanha')) return 'terrosos';
  if (n.includes('amarelo') || n.includes('calopsita') || n.includes('mostarda') || n.includes('quindim') || n.includes('ocre') || n.includes('milho') || n.includes('laranjeira') || n.includes('sol') || n.includes('camomila')) return 'amarelos';
  if (n.includes('rosa') || n.includes('pétala') || n.includes('rubi') || n.includes('alfazema') || n.includes('pêssego') || n.includes('lavanda') || n.includes('ametista')) return 'vinhos';
  if (n.includes('preto') || n.includes('grafite') || n.includes('carvão') || n.includes('tempestade') || n.includes('chumbo') || n.includes('noite')) return 'escuros';
  return 'neutros';
};

export const ColorSimulator: React.FC<ColorSimulatorProps> = ({ config }) => {
  // Todas as marcas registradas de tintas
  const allBrands: StoreBrand[] = (config.marcas && config.marcas.length > 0)
    ? config.marcas.filter((b) => b.ativo !== false)
    : INITIAL_BRANDS;

  // Filtra as marcas que oferecem tintas (ou todas exceto de ferramentas puras)
  const paintBrands = allBrands.filter((b) => 
    !b.tiposProdutos || b.tiposProdutos.includes('tinta') || ['suvinil', 'coral', 'anjo', 'eucatex'].includes(b.nome.toLowerCase())
  );

  // Marca ativa selecionada
  const [selectedBrandName, setSelectedBrandName] = useState<string>(
    paintBrands[0]?.nome || 'Suvinil'
  );

  // Termo de busca e filtro de categoria
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  // Todas as cores cadastradas (filtrando apenas tipo tinta)
  const allPaintSwatches: ColorSwatch[] = useMemo(() => {
    const swatches = (config.cores && config.cores.length > 0)
      ? config.cores
      : INITIAL_COLOR_SWATCHES;
    return swatches.filter((c) => c.tipo !== 'textura');
  }, [config.cores]);

  // Cores de todas as marcas selecionadas
  const brandColors = useMemo(() => {
    return allPaintSwatches.filter(
      (c) => c.marca.trim().toLowerCase() === selectedBrandName.trim().toLowerCase()
    );
  }, [allPaintSwatches, selectedBrandName]);

  // Cores filtradas por busca ou categoria de tom
  const filteredColors = useMemo(() => {
    return brandColors.filter((color) => {
      const matchesSearch = searchTerm === '' || 
        color.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        color.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (color.descricao && color.descricao.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCat = selectedCategory === 'todas' || 
        getCategoryForHex(color.hex, color.nome) === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [brandColors, searchTerm, selectedCategory]);

  // Cor atualmente selecionada para visualização detalhada
  const [selectedColor, setSelectedColor] = useState<ColorSwatch>(
    brandColors[0] || INITIAL_COLOR_SWATCHES[0]
  );

  // Ao trocar de marca, seleciona a primeira cor da nova marca
  useEffect(() => {
    if (brandColors.length > 0 && selectedColor.marca.toLowerCase() !== selectedBrandName.toLowerCase()) {
      setSelectedColor(brandColors[0]);
    }
  }, [selectedBrandName, brandColors]);

  // Referência para rolagem suave com as setas
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 360;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // URL para WhatsApp com a cor selecionada
  const cleanWhats = config.whatsapp.replace(/\D/g, '');
  const whatsMessage = `Olá Casa das Cores! Gostei muito da cor "${selectedColor.nome}" (${selectedColor.marca} - Cód: ${selectedColor.codigo}) que encontrei no catálogo do site. Gostaria de consultar valores nas opções Fosco, Acetinado e Semibrilho!`;
  const whatsUrl = `https://wa.me/${cleanWhats}?text=${encodeURIComponent(whatsMessage)}`;

  // Verifica se a cor é clara para texto escuro
  const isLightColor = (hex: string) => {
    const c = hex.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 185;
  };

  return (
    <section id="simulador" className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 via-white to-amber-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
            <Palette size={14} className="text-slate-950" />
            <span>Catálogo Completo de Cores</span>
          </div>

          <div className="relative inline-block mt-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-950 tracking-tight">
              {config.textos?.simuladorTitulo ? (
                config.textos.simuladorTitulo
              ) : (
                <>
                  Escolha a Marca e Explore{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-600 to-orange-600">
                    Todas as Cores
                  </span>
                </>
              )}
            </h2>
            <BrushStroke
              variant="underline"
              color="#EA580C"
              className="w-full h-3.5 -mt-1 opacity-75"
            />
          </div>

          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {config.textos?.simuladorSubtitulo || 'Navegue pelo carrossel completo de tonalidades oficiais de cada marca parceira da Casa das Cores. Selecione a sua preferida e peça o orçamento direto no WhatsApp!'}
          </p>
        </div>

        {/* 1. SELEÇÃO DE MARCAS DE TINTAS */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
          {paintBrands.map((brand) => {
            const isSelected = selectedBrandName.toLowerCase() === brand.nome.toLowerCase();
            const brandCount = allPaintSwatches.filter(
              (c) => c.marca.toLowerCase() === brand.nome.toLowerCase()
            ).length;

            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => {
                  setSelectedBrandName(brand.nome);
                  setSelectedCategory('todas');
                  setSearchTerm('');
                }}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-950 text-white shadow-xl ring-2 ring-amber-400 scale-105'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {brand.logoUrl ? (
                  <img src={brand.logoUrl} alt={brand.nome} className="w-5 h-5 object-contain rounded" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                )}
                <span>{brand.nome}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-500'
                }`}>
                  {brandCount} cores
                </span>
              </button>
            );
          })}
        </div>

        {/* BARRA DE FILTROS & BUSCA POR NOME OU CÓDIGO */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Campo de Busca Rápida */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Buscar cor na ${selectedBrandName}...`}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Contador de Cores */}
            <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5 self-start md:self-auto">
              <Sparkles size={14} className="text-amber-500" />
              <span>
                Mostrando <strong>{filteredColors.length}</strong> de {brandColors.length} cores da <strong>{selectedBrandName}</strong>
              </span>
            </div>
          </div>

          {/* Abas de Famílias de Tons */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 pt-3 mt-3 border-t border-slate-100 pb-1">
            {TONE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. O CARROSSEL COMPLETO DE CORES */}
        <div className="relative mb-10">
          
          {/* Controles de Navegação com Setas */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500">
              Deslize para ver todas as cores disponíveis:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                className="w-10 h-10 rounded-full bg-white hover:bg-amber-100 text-slate-800 hover:text-amber-950 border border-slate-300 shadow-sm flex items-center justify-center transition-all cursor-pointer"
                title="Rolar cores para a esquerda"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                className="w-10 h-10 rounded-full bg-white hover:bg-amber-100 text-slate-800 hover:text-amber-950 border border-slate-300 shadow-sm flex items-center justify-center transition-all cursor-pointer"
                title="Rolar cores para a direita"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {/* Carrossel Horizontal com TODAS as Cores da Marca */}
          {filteredColors.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
              <p className="text-sm font-bold text-slate-500">
                Nenhuma cor encontrada para o filtro selecionado.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('todas');
                  setSearchTerm('');
                }}
                className="mt-3 px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400"
              >
                Ver Todas as Cores
              </button>
            </div>
          ) : (
            <div
              ref={carouselRef}
              className="flex items-stretch gap-3.5 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-300 pb-4 scroll-smooth snap-x"
            >
              {filteredColors.map((swatch) => {
                const isSelected = selectedColor.codigo === swatch.codigo;
                const isLight = isLightColor(swatch.hex);

                return (
                  <button
                    key={swatch.codigo}
                    type="button"
                    onClick={() => setSelectedColor(swatch)}
                    className={`snap-start shrink-0 w-44 sm:w-52 p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-950 ring-2 ring-amber-400 shadow-xl scale-[1.02]'
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-400 shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Amostra Visual da Cor com efeito de luz sutil */}
                      <div
                        className="w-full aspect-[16/11] rounded-xl border border-black/10 shadow-inner mb-3 relative overflow-hidden flex items-center justify-center transition-transform hover:scale-105"
                        style={{ backgroundColor: swatch.hex }}
                      >
                        {/* Reflexo sutil de iluminação */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none" />

                        {isSelected && (
                          <div className="relative z-10 w-8 h-8 rounded-full bg-black/65 backdrop-blur-xs flex items-center justify-center shadow-lg">
                            <Check size={18} className="text-amber-400" />
                          </div>
                        )}

                        <span className={`absolute bottom-1.5 right-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded backdrop-blur-xs ${
                          isLight ? 'bg-black/70 text-white' : 'bg-white/80 text-black'
                        }`}>
                          {swatch.hex.toUpperCase()}
                        </span>
                      </div>

                      {/* Nome e Código Oficial */}
                      <span className={`block font-black text-sm truncate ${isSelected ? 'text-white' : 'text-slate-950'}`}>
                        {swatch.nome}
                      </span>
                      <span className={`block text-xs font-mono font-bold mt-0.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                        {swatch.codigo}
                      </span>
                    </div>

                    <span className={`block text-[10px] font-extrabold uppercase mt-3 pt-2 border-t ${
                      isSelected ? 'border-slate-800 text-amber-400' : 'border-slate-100 text-slate-500'
                    }`}>
                      {isSelected ? '✓ Cor Selecionada' : 'Clique para Escolher'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. CARD DE DESTAQUE & PEDIDO DIRETO NO WHATSAPP DA COR SELECIONADA */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Bloco de Cor Gigante */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div
                className="w-full aspect-square max-w-[280px] rounded-3xl border-4 border-white shadow-2xl relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: selectedColor.hex }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/25 pointer-events-none" />
                <span className={`relative z-10 text-xs font-mono font-black px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs ${
                  isLightColor(selectedColor.hex) ? 'bg-black/75 text-white' : 'bg-white/85 text-black'
                }`}>
                  {selectedColor.hex.toUpperCase()}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-400 mt-2">
                Amostra oficial {selectedColor.marca}
              </span>
            </div>

            {/* Informações Completas da Cor e Opções */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                  <CheckCircle2 size={13} className="text-amber-700" />
                  <span>Pronta para Manipular no Sistema Tintométrico</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-950">
                  {selectedColor.nome}
                </h3>
                <p className="text-xs sm:text-sm font-mono font-bold text-amber-700 mt-0.5">
                  Marca: {selectedColor.marca} • Código Oficial: {selectedColor.codigo}
                </p>

                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {selectedColor.descricao || 'Tonalidade imobiliária de alto poder de cobertura e fidelidade de cor, perfeita para transformar sua casa.'}
                </p>
              </div>

              {/* Acabamentos Disponíveis */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-xs font-black uppercase text-slate-700 block mb-2">
                  Acabamentos Disponíveis na Loja para esta Cor:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-bold">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-slate-900 font-extrabold">Fosco Aveludado</span>
                    <span className="text-[11px] text-slate-500 font-normal">Disfarça imperfeições da parede</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-slate-900 font-extrabold">Acetinado Suave</span>
                    <span className="text-[11px] text-slate-500 font-normal">Toque suave e lavável</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-slate-900 font-extrabold">Semibrilho Lavável</span>
                    <span className="text-[11px] text-slate-500 font-normal">Máxima resistência e limpeza</span>
                  </div>
                </div>
              </div>

              {/* Botão de Pedido no WhatsApp */}
              <div className="pt-2">
                <a
                  href={whatsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl hover:shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  <MessageCircle size={20} />
                  <span>Pedir Orçamento da Cor "{selectedColor.nome}" no WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
