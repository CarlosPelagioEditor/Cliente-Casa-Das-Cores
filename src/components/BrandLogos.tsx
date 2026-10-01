import React from 'react';
import { StoreConfig, StoreBrand } from '../types';
import { INITIAL_BRANDS } from '../data/initialData';

interface BrandLogosProps {
  config: StoreConfig;
}

export const BrandLogos: React.FC<BrandLogosProps> = ({ config }) => {
  const brands: StoreBrand[] = (config.marcas && config.marcas.length > 0)
    ? config.marcas.filter((b) => b.ativo !== false)
    : INITIAL_BRANDS;

  return (
    <section className="bg-white py-12 border-y border-slate-200 shadow-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Parcerias de Confiança
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-heading">
            As Marcas Mais Renomadas do Brasil em um Só Lugar
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto mt-1">
            Garantia de procedência de fábrica, cobertura impecável e durabilidade comprovada para sua obra ou reforma em Jaguaruna.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group relative bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between items-center text-center"
            >
              <div className="w-full flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-amber-600 transition-colors">
                  {brand.badge || 'Linha Completa'}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <div className="py-4 my-auto transform group-hover:scale-105 transition-transform flex flex-col items-center justify-center">
                {brand.logoUrl ? (
                  <img
                    src={brand.logoUrl}
                    alt={`Logomarca Oficial ${brand.nome}`}
                    className="max-h-12 w-auto max-w-[170px] object-contain mb-2"
                  />
                ) : (
                  <span className="text-2xl font-black tracking-tight text-slate-900 font-heading">
                    {brand.nome}
                  </span>
                )}
                <span className="text-[11px] text-slate-500 font-semibold tracking-wide mt-1">
                  {brand.slogan}
                </span>
              </div>

              <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-center">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  Disponível a pronta entrega
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
