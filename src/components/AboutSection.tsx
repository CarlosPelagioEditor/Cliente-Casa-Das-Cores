import React from 'react';
import { StoreConfig } from '../types';
import { Award, DollarSign, Car, Truck, Users, Sparkles, CheckCircle2, Camera } from 'lucide-react';
import { CasaDasCoresLogo } from './CasaDasCoresLogo';
import { BrushStroke } from './BrushStroke';

interface AboutSectionProps {
  config: StoreConfig;
  onUpdateConfig?: (newConfig: StoreConfig) => void;
  isOwner?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config, onUpdateConfig, isOwner = false }) => {
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

  const highlights = [
    {
      icon: <DollarSign className="w-6 h-6 text-amber-600" />,
      title: 'O Melhor e Mais Barato',
      description: 'Negociação direta com as maiores indústrias para garantir o menor preço de Jaguaruna e região.'
    },
    {
      icon: <Car className="w-6 h-6 text-blue-600" />,
      title: 'Estacionamento Próprio',
      description: 'Pátio espaçoso e seguro bem em frente à loja para carregar seu material com total conforto e tranquilidade.'
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: 'Consultoria Especializada',
      description: 'Orientação técnica profissional para escolha de tipos de tinta, cálculo de rendimento, diluição e combinações de cores.'
    },
    {
      icon: <Truck className="w-6 h-6 text-red-600" />,
      title: 'Entrega Rápida e Facilitada',
      description: 'Atendimento ágil em Jaguaruna, praias vizinhas e municípios adjacentes para sua obra não parar.'
    }
  ];

  return (
    <section id="sobre" className="py-16 sm:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Coluna da Imagem da Fachada Oficial */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/30 bg-slate-100 relative group">
                {config.fotoFachada ? (
                  <>
                    <img
                      src={config.fotoFachada}
                      alt={`Fachada da loja ${config.nome} em Jaguaruna`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-amber-400 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-amber-400/40 shadow-sm">
                      Fachada Oficial da Loja
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full p-6 sm:p-8 bg-gradient-to-br from-amber-100/70 via-yellow-50 to-white flex flex-col items-center justify-center text-center">
                    <div className="mb-3 transform group-hover:scale-105 transition-transform">
                      <CasaDasCoresLogo size={84} customLogoUrl={config.fotoLogo} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full mb-1">
                      Jaguaruna - SC
                    </span>
                    <h4 className="text-xl font-black text-slate-950 font-heading">
                      {config.nome}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-xs leading-relaxed">
                      Fachada com amplo estacionamento próprio para sua conveniência e facilidade de carga.
                    </p>
                    {isOwner && onUpdateConfig && (
                      <label className="mt-4 inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black py-2 px-3.5 rounded-xl shadow cursor-pointer transition-colors">
                        <Camera size={14} className="text-amber-400" />
                        <span>Carregar Foto da Fachada</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFachadaUpload}
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>

              {/* Card Flutuante de Credibilidade */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-slate-900 text-white p-5 rounded-2xl shadow-xl max-w-xs border border-slate-800 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                    <Award size={22} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">Tradição & Confiança</h4>
                    <p className="text-xs text-slate-300">Pinturas e acabamentos de primeira linha</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna do Conteúdo Institucional */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-red-200">
              <Sparkles size={14} />
              <span>Conheça Nossa História</span>
            </div>

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-950 tracking-tight leading-tight">
                {config.textos?.sobreTitulo || 'Excelência, Economia e Variedade para a Sua Pintura'}
              </h2>
              <BrushStroke
                variant="underline"
                color="#F59E0B"
                className="w-56 h-3.5 -mt-1 opacity-80"
              />
            </div>

            <div className="prose text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                {config.textos?.sobreSubtitulo || config.descricao}
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-amber-50/50 hover:border-amber-300 transition-all flex flex-col gap-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center border border-slate-200">
                    {item.icon}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-normal">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
