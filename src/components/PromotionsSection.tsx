import React from 'react';
import { StoreConfig, PromotionItem } from '../types';
import { Tag, Sparkles, MessageCircle, ShoppingBag, ShieldCheck, Flame, Hash } from 'lucide-react';
import { BrushStroke } from './BrushStroke';

interface PromotionsSectionProps {
  config: StoreConfig;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({ config }) => {
  const cleanWhats = config.whatsapp.replace(/\D/g, '');
  const promotions: PromotionItem[] = (config.promocoes && config.promocoes.length > 0)
    ? config.promocoes.filter(p => p.disponivel !== false)
    : [];

  if (promotions.length === 0) {
    return null;
  }

  const formatPrice = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const getBrandBadgeColor = (brand: string) => {
    const b = brand.toLowerCase();
    if (b.includes('suvinil')) return 'bg-amber-100 text-amber-900 border-amber-300';
    if (b.includes('coral')) return 'bg-blue-100 text-blue-900 border-blue-300';
    if (b.includes('anjo')) return 'bg-red-100 text-red-900 border-red-300';
    if (b.includes('eucatex')) return 'bg-purple-100 text-purple-900 border-purple-300';
    if (b.includes('atlas')) return 'bg-orange-100 text-orange-900 border-orange-300';
    return 'bg-slate-100 text-slate-800 border-slate-300';
  };

  return (
    <section id="ofertas" className="py-16 sm:py-20 bg-gradient-to-b from-white via-amber-50/40 to-slate-50 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -ml-20 w-72 h-72 rounded-full bg-red-400/10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 -mr-20 w-72 h-72 rounded-full bg-amber-400/15 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-amber-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
            <Flame size={15} className="animate-bounce" />
            <span>Ofertas da Semana & Destaques</span>
          </div>

          <div className="relative inline-block mt-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-950 tracking-tight">
              {config.textos?.ofertasTitulo ? (
                config.textos.ofertasTitulo
              ) : (
                <>
                  O Menor Preço de Jaguaruna em{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">
                    Promoção
                  </span>
                </>
              )}
            </h2>
            <BrushStroke
              variant="underline"
              color="#DC2626"
              className="w-full h-3.5 -mt-1 opacity-75"
            />
          </div>

          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            {config.textos?.ofertasSubtitulo || 'Tintas originais de fábrica com descontos reais e pronta-entrega. Clique no botão de cada oferta para garantir o valor pelo WhatsApp com o código do produto!'}
          </p>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions.map((promo) => {
            const discountPct = promo.precoOriginal > promo.precoPromocional
              ? Math.round(((promo.precoOriginal - promo.precoPromocional) / promo.precoOriginal) * 100)
              : 0;

            const whatsOfferMsg = promo.mensagemWhats?.trim()
              ? promo.mensagemWhats
              : `Olá! Vi a oferta da semana do *${promo.titulo}*${promo.codigo ? ` (Cód: ${promo.codigo})` : ''} por *${formatPrice(promo.precoPromocional)}* no site da Casa das Cores e gostaria de garantir a minha compra!`;
            const whatsUrl = `https://wa.me/${cleanWhats}?text=${encodeURIComponent(whatsOfferMsg)}`;

            return (
              <div
                key={promo.id}
                className="group bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl border-2 border-amber-200/80 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Discount Badge */}
                {discountPct > 0 && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
                    <Tag size={12} />
                    <span>-{discountPct}% OFF</span>
                  </div>
                )}

                <div>
                  {/* Brand, Tag and Code header */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-lg border ${getBrandBadgeColor(promo.marca)}`}>
                      {promo.marca}
                    </span>
                    {promo.codigo && (
                      <span className="text-[10px] font-mono font-black bg-slate-900 text-amber-300 px-2 py-0.5 rounded-lg border border-slate-700 shadow-2xs flex items-center gap-0.5">
                        <Hash size={10} className="text-amber-400" />
                        <span>{promo.codigo}</span>
                      </span>
                    )}
                    {promo.tag && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-200">
                        {promo.tag}
                      </span>
                    )}
                  </div>

                  {/* Product Image or Product Card Visual */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-amber-50 to-slate-100 flex items-center justify-center p-3 border border-slate-100">
                    {promo.imagemUrl ? (
                      <img
                        src={promo.imagemUrl}
                        alt={promo.titulo}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-600 mb-2 group-hover:scale-110 transition-transform">
                          <ShoppingBag size={32} />
                        </div>
                        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                          Casa das Cores
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-extrabold text-slate-950 text-base leading-snug line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {promo.titulo}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                    {promo.descricao}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="mt-5 pt-3.5 border-t border-slate-100">
                  <div className="flex items-baseline gap-2 mb-3">
                    {promo.precoOriginal > promo.precoPromocional && (
                      <span className="text-xs font-semibold text-slate-400 line-through">
                        {formatPrice(promo.precoOriginal)}
                      </span>
                    )}
                    <span className="text-2xl font-black text-emerald-600 font-heading">
                      {formatPrice(promo.precoPromocional)}
                    </span>
                  </div>

                  <a
                    href={whatsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md hover:shadow-emerald-500/25 transition-all duration-200 cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    <span>Garantir Oferta no WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote Banner */}
        <div className="mt-10 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                Condições Válidas em Jaguaruna - SC
              </h4>
              <p className="text-[11px] text-slate-500">
                Preços especiais válidos enquanto durar o lote promocional. Retirada imediata no nosso estacionamento próprio ou sob consulta para entrega rápida.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${cleanWhats}?text=${encodeURIComponent('Olá! Gostaria de consultar outras ofertas e marcas disponíveis na Casa das Cores.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-black text-amber-700 hover:text-amber-800 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Consultar Mais Produtos →
          </a>
        </div>
      </div>
    </section>
  );
};

