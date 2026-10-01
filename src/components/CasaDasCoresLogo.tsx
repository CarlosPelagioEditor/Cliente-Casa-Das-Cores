import React from 'react';

interface CasaDasCoresLogoProps {
  className?: string;
  size?: number | string;
  showTextBelow?: boolean;
  customLogoUrl?: string;
}

export const CasaDasCoresLogo: React.FC<CasaDasCoresLogoProps> = ({
  className = '',
  size = 64,
  showTextBelow = false,
  customLogoUrl,
}) => {
  if (customLogoUrl) {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <img
          src={customLogoUrl}
          alt="Logomarca Oficial Casa das Cores"
          style={{ width: size, height: size, objectFit: 'contain' }}
          className="drop-shadow-md hover:scale-105 transition-transform duration-300 rounded-full"
        />
        {showTextBelow && (
          <span className="text-xs font-black text-slate-900 uppercase tracking-wider mt-1.5 font-heading">
            CASA DAS CORES
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md hover:scale-105 transition-transform duration-300"
      >
        <defs>
          {/* Fundo Amarelo Vibrante */}
          <radialGradient id="yellowBg" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFF23B" />
            <stop offset="65%" stopColor="#FFCE00" />
            <stop offset="100%" stopColor="#F5A800" />
          </radialGradient>

          {/* Sombra suave interna */}
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.25" />
          </filter>

          {/* Sombra para o texto */}
          <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#8B0000" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Círculo Principal com Borda Dourada */}
        <circle cx="150" cy="150" r="142" fill="url(#yellowBg)" stroke="#E69500" strokeWidth="6" />

        {/* Grupo da Casinha e Paleta de Cores */}
        <g id="house-and-palette" transform="translate(0, -8)">
          {/* Telhado Cinza Chumbo com Chaminé */}
          <path
            d="M87 114 L71 114 L71 85 L90 85 L90 102 Z"
            fill="#32373D"
          />
          {/* Viga do Telhado */}
          <path
            d="M150 28 L232 98 L217 114 L150 56 L83 114 L68 98 Z"
            fill="#454B52"
            filter="url(#softShadow)"
          />
          <path
            d="M150 36 L224 99 L217 106 L150 49 L83 106 L76 99 Z"
            fill="#2B2F35"
          />

          {/* Segmento Azul (Canto Superior Direito) */}
          <path
            d="M166 65 Q228 65 238 126 L184 172 Z"
            fill="#0288D1"
            filter="url(#softShadow)"
          />

          {/* Segmento Vermelho (Lado Direito) */}
          <path
            d="M184 172 L233 131 Q235 174 196 200 Z"
            fill="#D32F2F"
            filter="url(#softShadow)"
          />

          {/* Segmento Laranja / Âmbar (Fundo Direito) */}
          <path
            d="M184 172 L196 200 Q150 236 116 230 L166 172 Z"
            fill="#F57C00"
            filter="url(#softShadow)"
          />

          {/* Segmento Verde Folha (Fundo Esquerdo) */}
          <path
            d="M74 122 L166 122 L166 172 L116 230 Q70 200 74 122 Z"
            fill="#388E3C"
            filter="url(#softShadow)"
          />

          {/* Janela Central com 4 Painéis */}
          <g id="window">
            {/* Moldura da janela */}
            <rect x="122" y="78" width="22" height="22" rx="3" fill="#2E3338" />
            <rect x="148" y="78" width="22" height="22" rx="3" fill="#2E3338" />
            <rect x="122" y="104" width="22" height="22" rx="3" fill="#2E3338" />
            <rect x="148" y="104" width="22" height="22" rx="3" fill="#2E3338" />

            {/* Vidro com brilho */}
            <rect x="124" y="80" width="18" height="18" rx="2" fill="#54606E" />
            <rect x="150" y="80" width="18" height="18" rx="2" fill="#4B5663" />
            <rect x="124" y="106" width="18" height="18" rx="2" fill="#3D4550" />
            <rect x="150" y="106" width="18" height="18" rx="2" fill="#363E48" />
          </g>
        </g>

        {/* Texto em Arco: CASA DAS CORES */}
        <g id="brand-text">
          <text
            x="150"
            y="204"
            textAnchor="middle"
            fontFamily="'Outfit', 'Impact', 'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="32"
            letterSpacing="-0.5"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinejoin="round"
            fill="#CC141D"
            filter="url(#textShadow)"
          >
            CASA DAS CORES
          </text>
          <text
            x="150"
            y="204"
            textAnchor="middle"
            fontFamily="'Outfit', 'Impact', 'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="32"
            letterSpacing="-0.5"
            fill="#CC141D"
          >
            CASA DAS CORES
          </text>

          {/* Linha curva de destaque vermelha */}
          <path
            d="M48 224 Q150 216 252 224 Q150 220 48 224 Z"
            fill="#CC141D"
          />

          {/* Slogan */}
          <text
            x="150"
            y="238"
            textAnchor="middle"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            fontSize="12.5"
            fill="#1E2022"
            letterSpacing="0.2"
          >
            O melhor e mais barato para você.
          </text>

          {/* Telefone */}
          <text
            x="150"
            y="262"
            textAnchor="middle"
            fontFamily="'Outfit', sans-serif"
            fontWeight="900"
            fontSize="18"
            letterSpacing="0.5"
            fill="#C4131B"
          >
            Fone: 3624 - 1961
          </text>
        </g>
      </svg>

      {showTextBelow && (
        <div className="text-center mt-1">
          <span className="block font-black text-slate-900 text-lg leading-tight tracking-tight">
            CASA DAS CORES
          </span>
          <span className="block text-xs font-semibold text-amber-700">
            Jaguaruna • SC
          </span>
        </div>
      )}
    </div>
  );
};
