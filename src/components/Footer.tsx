import React from 'react';
import { StoreConfig } from '../types';
import { CasaDasCoresLogo } from './CasaDasCoresLogo';
import { MessageCircle, Instagram, Facebook, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  config: StoreConfig;
  onOpenAuth: () => void;
  onScrollTo: (id: string) => void;
  isOwner: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenAuth,
  onScrollTo,
  isOwner
}) => {
  const cleanWhats = config.whatsapp.replace(/\D/g, '');
  const whatsUrl = `https://wa.me/${cleanWhats}?text=${encodeURIComponent(config.mensagemPadraoWhats)}`;

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t-4 border-amber-500 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Coluna 1: Logo & Apresentação */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 shadow-md bg-amber-300 shrink-0">
                <img
                  src={config.fotoLogo || '/IMG-20260930-WA0016.svg'}
                  alt="Logo Casa das Cores"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (!e.currentTarget.src.endsWith('.svg')) {
                      e.currentTarget.src = '/IMG-20260930-WA0016.svg';
                    }
                  }}
                />
              </div>
              <div>
                <span className="font-heading font-black text-2xl tracking-tight text-white block">
                  {config.nome}
                </span>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Tintas & Acabamentos
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              O melhor e mais barato para você em Jaguaruna e toda a região. As marcas Suvinil, Coral, Anjo Tintas e Eucatex com consultoria especializada e entrega rápida.
            </p>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={whatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all hover:scale-110 shadow"
                title="Conversar no WhatsApp"
              >
                <MessageCircle size={20} />
              </a>

              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-pink-600 to-purple-600 hover:opacity-90 text-white flex items-center justify-center transition-all hover:scale-110 shadow"
                title="Siga no Instagram"
              >
                <Instagram size={20} />
              </a>

              <a
                href={config.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all hover:scale-110 shadow"
                title="Acompanhe no Facebook"
              >
                <Facebook size={20} />
              </a>

              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all hover:scale-110 shadow"
                title="Ver no Google Maps"
              >
                <MapPin size={20} />
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-amber-400">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onScrollTo('hero')} className="hover:text-amber-400 transition-colors">
                  • Início / Apresentação
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('sobre')} className="hover:text-amber-400 transition-colors">
                  • Sobre a Loja & Diferenciais
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('marcas')} className="hover:text-amber-400 transition-colors">
                  • Marcas Parceiras
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('calculadora')} className="hover:text-amber-400 transition-colors">
                  • Calculadora de Tintas
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('simulador')} className="hover:text-amber-400 transition-colors">
                  • Simulador de Cores
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('galeria')} className="hover:text-amber-400 transition-colors">
                  • Galeria de Fotos da Loja
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('localizacao')} className="hover:text-amber-400 transition-colors">
                  • Localização & Horários
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Marcas Atendidas */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-amber-400">
              Marcas Oficiais
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                Suvinil Tintas
              </li>
              <li className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Coral Tintas
              </li>
              <li className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                Anjo Tintas
              </li>
              <li className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                Eucatex Tintas
              </li>
              <li className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Pincéis Atlas
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contato & Acesso Administrativo */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-amber-400">
              Canais Oficiais
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-amber-400 shrink-0" />
                <span>Loja: {config.telefoneFixo}</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle size={14} className="text-emerald-400 shrink-0" />
                <span>WhatsApp: +{config.whatsapp}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-red-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{config.endereco}</span>
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-colors"
              >
                <ShieldCheck size={14} className={isOwner ? 'text-emerald-400' : 'text-slate-400'} />
                <span>{isOwner ? 'Painel de Edição Liberado' : 'Área do Proprietário'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Casa das Cores. Todos os direitos reservados. Jaguaruna - SC.</p>
          <p className="flex items-center gap-1">
            <span>Desenvolvido com excelência para</span>
            <span className="text-amber-400 font-bold">Casa das Cores</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
