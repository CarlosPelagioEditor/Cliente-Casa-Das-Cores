import React from 'react';
import { StoreConfig } from '../types';
import { MessageCircle, MapPin, Calculator, ShieldCheck, Car, Sparkles, CheckCircle2 } from 'lucide-react';
import { CasaDasCoresLogo } from './CasaDasCoresLogo';
import { BrushStroke } from './BrushStroke';

interface HeroProps {
  config: StoreConfig;
  onScrollTo: (id: string) => void;
  onUpdateConfig?: (newConfig: StoreConfig) => void;
  isOwner?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ config, onScrollTo, onUpdateConfig, isOwner = false }) => {
  const cleanWhats = config.whatsapp.replace(/\D/g, '');
  const whatsUrl = `https://wa.me/${cleanWhats}?text=${encodeURIComponent(config.mensagemPadraoWhats)}`;

  const handleFachadaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateConfig) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (dataUrl) {
          onUpdateConfig({
            ...config,
            fotoFachada: dataUrl
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-100/30 to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 -ml-20 w-80 h-80 rounded-full bg-red-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-yellow-300/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill de Destaque */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-4 py-1.5 rounded-full font-black text-xs tracking-wide shadow-sm border border-amber-300">
              <Sparkles size={14} className="text-slate-900 animate-spin" />
              <span>{config.slogan}</span>
            </div>

            {/* Título Principal de Alto Impacto com Efeito de Pincelada */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-slate-950 tracking-tight leading-[1.1]">
              {config.textos?.heroTitulo ? (
                <span>{config.textos.heroTitulo} </span>
              ) : (
                <>A Sua Casa Merece as </>
              )}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-600 to-orange-600">
                {config.textos?.heroDestaque || 'Melhores Cores'}
                <BrushStroke
                  variant="underline"
                  color="#E11D48"
                  className="absolute -bottom-3 left-0 w-full h-4 opacity-80"
                />
              </span>{' '}
              {!config.textos?.heroTitulo && 'e o Menor Preço.'}
            </h1>

            {/* Descrição Comercial */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {config.textos?.heroSubtitulo || (
                <>
                  Sua loja completa de tintas e acabamentos em <strong className="text-slate-950 font-bold">Jaguaruna e região</strong>. Tintas imobiliárias, tintas emborrachadas, texturas, impermeabilizantes, vernizes e esmaltes com atendimento técnico especializado, amplo estacionamento próprio e o menor preço garantido.
                </>
              )}
            </p>

            {/* Botões de Ação Chamativos */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              {/* Botão Principal WhatsApp */}
              <a
                href={whatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-base px-7 py-4 rounded-2xl shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 border border-emerald-400 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <MessageCircle size={22} className="text-white fill-white/20" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-100 leading-none">
                    Atendimento Imediato
                  </div>
                  <div className="text-base font-extrabold leading-tight">
                    Pedir Orçamento no WhatsApp
                  </div>
                </div>
              </a>

              {/* Botão Secundário: Calculadora */}
              <button
                onClick={() => onScrollTo('calculadora')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm px-6 py-4 rounded-2xl border-2 border-slate-300 hover:border-amber-500 shadow-sm transition-all"
              >
                <Calculator size={18} className="text-amber-600" />
                <span>Calcular Quantidade de Tinta</span>
              </button>
            </div>

            {/* Diferenciais em Pílulas */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-slate-200 shadow-2xs">
                <Car className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Estacionamento Próprio Amplo</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-slate-200 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Marcas Originais de Fábrica</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Orçamento Rápido em Minutos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-red-500 rounded-3xl transform rotate-2 scale-105 opacity-20 filter blur-xl"></div>

              {/* Main Card */}
              <div className="relative bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200 overflow-hidden group">
                {config.fotoFachada ? (
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                    <img
                      src={config.fotoFachada}
                      alt="Foto Real da Fachada Casa das Cores em Jaguaruna SC"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Badge da Loja Física */}
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white/20">
                      <MapPin size={13} className="text-red-400" />
                      <span>Loja Física em Jaguaruna</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
                          Fachada Oficial
                        </span>
                        <h3 className="text-base font-extrabold text-white leading-tight">
                          Casa das Cores - Jaguaruna
                        </h3>
                      </div>

                      {isOwner && (
                        <label className="bg-white/90 hover:bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl shadow cursor-pointer transition-colors flex items-center gap-1">
                          <span>Trocar Foto</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFachadaUpload}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-amber-400/20 via-yellow-100/50 to-amber-50 border-2 border-amber-300 text-center flex flex-col items-center justify-center">
                    <div className="mb-4 transform hover:scale-105 transition-transform">
                      <CasaDasCoresLogo size={110} customLogoUrl={config.fotoLogo} />
                    </div>

                    <div className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm mb-2">
                      <MapPin size={13} />
                      <span>Jaguaruna - Santa Catarina</span>
                    </div>

                    <h3 className="text-2xl font-black font-heading text-slate-950 leading-tight">
                      {config.nome}
                    </h3>

                    <p className="text-xs font-bold text-amber-900 uppercase tracking-wide mt-1">
                      {config.slogan}
                    </p>

                    <div className="w-full my-4 py-2.5 px-3 rounded-xl bg-white/90 border border-amber-200 shadow-2xs text-left">
                      <div className="text-[11px] font-bold text-slate-500 uppercase">Horário de Funcionamento:</div>
                      <div className="text-xs font-black text-slate-900">
                        {config.horario}
                      </div>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row items-center gap-2 mt-1">
                      <button
                        onClick={() => onScrollTo('localizacao')}
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black py-2.5 px-4 rounded-xl shadow transition-colors"
                      >
                        <MapPin size={14} className="text-amber-400" />
                        <span>Ver no Mapa</span>
                      </button>

                      {isOwner ? (
                        <label className="w-full flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black py-2.5 px-4 rounded-xl shadow cursor-pointer transition-colors border border-amber-400">
                          <Sparkles size={14} />
                          <span>Carregar Foto da Fachada</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFachadaUpload}
                          />
                        </label>
                      ) : (
                        <button
                          onClick={() => onScrollTo('ofertas')}
                          className="w-full flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black py-2.5 px-4 rounded-xl shadow transition-colors border border-amber-400 cursor-pointer"
                        >
                          <Sparkles size={14} />
                          <span>Ver Ofertas da Loja</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Card Sub-Banner with Quick Stats */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100">
                  <div className="p-2 rounded-xl bg-amber-50/60">
                    <span className="block text-base font-black text-amber-700 font-heading">100%</span>
                    <span className="text-[10px] font-bold text-slate-600">Qualidade Garantida</span>
                  </div>
                  <div className="p-2 rounded-xl bg-red-50/60">
                    <span className="block text-base font-black text-red-600 font-heading">Melhor</span>
                    <span className="text-[10px] font-bold text-slate-600">Preço da Região</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-50/60">
                    <span className="block text-base font-black text-emerald-700 font-heading">+4 Marcas</span>
                    <span className="text-[10px] font-bold text-slate-600">Líderes Nacionais</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-slate-950 text-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-3 hidden sm:flex">
                <CasaDasCoresLogo size={46} customLogoUrl={config.fotoLogo} />
                <div>
                  <div className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    {config.nome}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-300">
                    Tel: {config.telefoneFixo}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
