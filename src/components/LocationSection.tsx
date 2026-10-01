import React from 'react';
import { StoreConfig } from '../types';
import { MapPin, Navigation, Clock, Phone, MessageCircle, ExternalLink, Car, ShieldCheck } from 'lucide-react';
import { BrushStroke } from './BrushStroke';

interface LocationSectionProps {
  config: StoreConfig;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ config }) => {
  const cleanWhats = config.whatsapp.replace(/\D/g, '');
  const whatsUrl = `https://wa.me/${cleanWhats}?text=${encodeURIComponent(
    'Olá! Gostaria de saber como chegar na Casa das Cores e confirmar o horário de atendimento hoje.'
  )}`;

  // Google Maps Embed Query
  const mapsEmbedSrc = "https://maps.google.com/maps?q=Jaguaruna+SC+Casa+das+Cores+Tintas&t=&z=15&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="localizacao" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-200">
            <MapPin size={14} className="text-emerald-600" />
            <span>Localização Privilegiada</span>
          </div>
          <div className="relative inline-block mt-3">
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-950 tracking-tight">
              {config.textos?.localizacaoTitulo || 'Venha nos Visitar em Jaguaruna - SC'}
            </h2>
            <BrushStroke
              variant="underline"
              color="#059669"
              className="w-full h-3.5 -mt-1 opacity-75"
            />
          </div>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            {config.textos?.localizacaoSubtitulo || 'Loja ampla com amplo pátio de estacionamento, atendimento no balcão e facilidade de carga e descarga para o seu veículo.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card de Informações e Contatos */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="space-y-6">
              {/* Endereço */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200 shadow-2xs">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                    Endereço da Loja:
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 mt-1 leading-snug">
                    {config.endereco}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Jaguaruna • Santa Catarina • Brasil
                  </p>
                </div>
              </div>

              {/* Horário */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200 shadow-2xs">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                    Horário de Funcionamento:
                  </h4>
                  <p className="text-xs font-semibold text-slate-800 mt-1 leading-relaxed">
                    {config.horario}
                  </p>
                </div>
              </div>

              {/* Estacionamento */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 border border-blue-200 shadow-2xs">
                  <Car size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                    Estacionamento Exclusivo:
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Pátio próprio amplo com vagas gratuitas para clientes e veículos de grande porte.
                  </p>
                </div>
              </div>

              {/* Telefones */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600 flex items-center gap-1.5">
                    <Phone size={14} className="text-slate-400" />
                    Telefone Fixo da Loja:
                  </span>
                  <a href={`tel:${config.whatsapp}`} className="font-mono font-black text-slate-900 hover:text-red-600">
                    {config.telefoneFixo}
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-600 flex items-center gap-1.5">
                    <MessageCircle size={14} className="text-emerald-500" />
                    WhatsApp Oficial:
                  </span>
                  <a href={whatsUrl} target="_blank" rel="noopener noreferrer" className="font-mono font-black text-emerald-700 hover:underline">
                    +{config.whatsapp}
                  </a>
                </div>
              </div>
            </div>

            {/* Ações de Navegação */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <a
                href={config.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-md transition-colors"
              >
                <Navigation size={18} className="text-amber-400" />
                <span>Abrir Rota no Google Maps</span>
                <ExternalLink size={14} className="opacity-70 ml-1" />
              </a>

              <a
                href={whatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow transition-colors"
              >
                <MessageCircle size={16} />
                <span>Tirar Dúvida de Localização no WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Iframe do Mapa Incorporado */}
          <div className="lg:col-span-7 bg-slate-100 rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 relative min-h-[380px] lg:min-h-full flex flex-col">
            <iframe
              title="Mapa de Localização - Casa das Cores Jaguaruna"
              src={mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px', flexGrow: 1 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>

            {/* Floating Top Banner over Map */}
            <div className="absolute top-3 left-3 right-3 sm:right-auto bg-slate-950/90 backdrop-blur-md text-white px-4 py-2 rounded-xl border border-white/20 shadow-lg flex items-center gap-2 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold">Casa das Cores • Jaguaruna - SC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
