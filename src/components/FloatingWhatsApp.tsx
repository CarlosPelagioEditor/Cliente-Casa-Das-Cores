import React, { useState } from 'react';
import { StoreConfig } from '../types';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  config: StoreConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ config }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const cleanWhats = config.whatsapp.replace(/\D/g, '');
  const whatsUrl = `https://wa.me/${cleanWhats}?text=${encodeURIComponent(config.mensagemPadraoWhats)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip Balao */}
      {showTooltip && (
        <div className="mb-2 bg-white text-slate-900 px-4 py-2 rounded-2xl shadow-2xl border border-slate-200 text-xs font-bold flex items-center gap-2 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Orçamento Rápido via WhatsApp!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-700 ml-1"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Botao Flutuante */}
      <a
        href={whatsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 whatsapp-pulse border-2 border-white/60 group cursor-pointer"
        aria-label="Atendimento via WhatsApp"
        title="Fale no WhatsApp da Casa das Cores"
      >
        <MessageCircle size={32} className="group-hover:rotate-12 transition-transform drop-shadow" />
      </a>
    </div>
  );
};
