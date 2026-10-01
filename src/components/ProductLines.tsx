import React from 'react';
import { StoreConfig } from '../types';
import { Home, Shield, Sparkles, Wrench, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { BrushStroke } from './BrushStroke';

interface ProductLinesProps {
  config: StoreConfig;
}

export const ProductLines: React.FC<ProductLinesProps> = ({ config }) => {
  const cleanWhats = config.whatsapp.replace(/\D/g, '');

  const categories = [
    {
      icon: <Home className="w-6 h-6 text-amber-600" />,
      title: 'Tintas Imobiliárias',
      subtitle: 'Paredes, Tetos e Ambientes',
      items: [
        'Acrílicos Fosco, Acetinado e Semibrilho',
        'Tintas Super Laváveis anti-manchas',
        'Massas Corridas e Acrílicas',
        'Linha Gesso & Drywall direta'
      ],
      tag: 'Mais Vendidos'
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      title: 'Fachadas & Proteção',
      subtitle: 'Resistência ao Clima e Chuva',
      items: [
        'Tintas Emborrachadas elásticas',
        'Seladores e Fundos Preparadores',
        'Texturas Rústicas e Grafiatos',
        'Impermeabilizantes de Paredes e Lajes'
      ],
      tag: 'Alta Proteção'
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      title: 'Madeiras & Metais',
      subtitle: 'Beleza e Durabilidade Extrema',
      items: [
        'Vernizes Marítimos e Filtro Solar',
        'Stains Protetores impregnantes',
        'Esmaltes Sintéticos base água e solvente',
        'Fundos Zarcão e Antioxidantes'
      ],
      tag: 'Acabamento Fino'
    },
    {
      icon: <Wrench className="w-6 h-6 text-purple-600" />,
      title: 'Ferramentas & Acessórios',
      subtitle: 'Tudo da Marca Pincéis Atlas e Parceiros',
      items: [
        'Rolos de Lã, Antigotas e Espuma',
        'Trinchas, Pincéis e Broxas',
        'Fitas Crepe de Alta Performance',
        'Lixas, Bandejas, Espátulas e Desempenadeiras'
      ],
      tag: 'Essenciais'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 px-3.5 py-1 rounded-full border border-red-200">
            Linha de Produtos Completa
          </span>
          <div className="relative inline-block mt-3">
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-950 tracking-tight">
              {config.textos?.produtosTitulo || 'O Que Você Precisa para Construir, Reformar ou Proteger'}
            </h2>
            <BrushStroke
              variant="underline"
              color="#F59E0B"
              className="w-full h-3.5 -mt-1 opacity-70"
            />
          </div>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {config.textos?.produtosSubtitulo || 'Da fundação ao acabamento final, oferecemos as melhores soluções com garantia e o menor preço da região de Jaguaruna.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const whatsLink = `https://wa.me/${cleanWhats}?text=${encodeURIComponent(
              `Olá! Gostaria de consultar preços e opções para a linha de ${cat.title} na Casa das Cores.`
            )}`;

            return (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded-full">
                      {cat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-black font-heading text-slate-900 group-hover:text-amber-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mb-4">
                    {cat.subtitle}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={whatsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white group-hover:bg-amber-500 text-slate-800 group-hover:text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 border border-slate-200 group-hover:border-amber-500 shadow-2xs transition-all"
                >
                  <span>Consultar Opções</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
