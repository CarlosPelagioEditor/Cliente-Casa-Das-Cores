import React, { useState } from 'react';
import { StoreConfig } from '../types';
import { Calculator, MessageCircle, RefreshCw, CheckCircle, Info } from 'lucide-react';
import { BrushStroke } from './BrushStroke';

interface PaintCalculatorProps {
  config: StoreConfig;
}

export const PaintCalculator: React.FC<PaintCalculatorProps> = ({ config }) => {
  const [largura, setLargura] = useState<string>('4.0');
  const [altura, setAltura] = useState<string>('2.8');
  const [paredes, setParedes] = useState<number>(4);
  const [demaos, setDemaos] = useState<number>(2);
  const [aberturas, setAberturas] = useState<string>('3.0'); // Portas e janelas em m²
  const [tipoSuperficie, setTipoSuperficie] = useState<'lisa' | 'rustica' | 'gesso'>('lisa');

  // Rendimento médio por litro (m²/demão)
  const rendimentoMap = {
    lisa: 10,     // Parede com massa corrida ou repintura lisa
    rustica: 7,   // Reboco novo ou textura
    gesso: 8      // Drywall ou gesso
  };

  const numLargura = parseFloat(largura) || 0;
  const numAltura = parseFloat(altura) || 0;
  const numAberturas = parseFloat(aberturas) || 0;

  const areaParedeUnica = numLargura * numAltura;
  const areaBruta = areaParedeUnica * paredes;
  const areaLiquida = Math.max(0, areaBruta - numAberturas);

  const rendimento = rendimentoMap[tipoSuperficie];
  const litrosNecessarios = areaLiquida > 0 ? (areaLiquida * demaos) / rendimento : 0;
  const litrosArredondados = Math.ceil(litrosNecessarios * 10) / 10;

  // Sugestão de embalagens
  const latas18L = Math.floor(litrosArredondados / 18);
  const restanteApos18 = litrosArredondados % 18;
  const galoes3_6L = Math.ceil(restanteApos18 / 3.6);

  const cleanWhats = config.whatsapp.replace(/\D/g, '');
  const mensagemWhats = `Olá Casa das Cores! Fiz uma simulação de tinta no site:%0A- Área a ser pintada: ${areaLiquida.toFixed(1)} m²%0A- Número de demãos: ${demaos}%0A- Superfície: ${tipoSuperficie}%0A- Estimativa: ~${litrosArredondados} Litros de tinta%0APoderiam me passar um orçamento das opções disponíveis da Suvinil, Coral, Anjo ou Eucatex?`;
  const whatsUrl = `https://wa.me/${cleanWhats}?text=${mensagemWhats}`;

  return (
    <section id="calculadora" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 px-3.5 py-1 rounded-full border border-amber-400/20">
            Ferramenta Gratuita
          </span>
          <div className="relative inline-block mt-3">
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white">
              {config.textos?.calculadoraTitulo || 'Calculadora Inteligente de Tinta'}
            </h2>
            <BrushStroke
              variant="underline"
              color="#F59E0B"
              className="w-full h-3.5 -mt-1 opacity-80"
            />
          </div>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            {config.textos?.calculadoraSubtitulo || 'Descubra a quantidade ideal de tinta para a sua reforma e envie o cálculo direto para nosso WhatsApp com 1 clique para receber o melhor orçamento!'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Formulário de Entradas */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl backdrop-blur-sm">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2 mb-6">
              <Calculator size={20} />
              <span>Dimensões do Ambiente</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Largura da Parede (metros):
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  value={largura}
                  onChange={(e) => setLargura(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-base focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Altura / Pé Direito (metros):
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-base focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Quantidade de Paredes Iguais:
                </label>
                <select
                  value={paredes}
                  onChange={(e) => setParedes(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value={1}>1 Parede (Destaque)</option>
                  <option value={2}>2 Paredes</option>
                  <option value={3}>3 Paredes</option>
                  <option value={4}>4 Paredes (Cômodo Completo)</option>
                  <option value={6}>6 Paredes</option>
                  <option value={8}>8 Paredes (Casa Inteira)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Número de Demãos Recomendadas:
                </label>
                <select
                  value={demaos}
                  onChange={(e) => setDemaos(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value={1}>1 Demão (Pequeno retoque)</option>
                  <option value={2}>2 Demãos (Padrão recomendado)</option>
                  <option value={3}>3 Demãos (Mudança drástica de cor)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Descontar Janelas e Portas (m² aproximados):
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={aberturas}
                  onChange={(e) => setAberturas(e.target.value)}
                  placeholder="Ex: 3.0 m²"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-base focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Tipo de Superfície:
                </label>
                <select
                  value={tipoSuperficie}
                  onChange={(e) => setTipoSuperficie(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value="lisa">Parede Lisa / Repintura (Mais Rendimento)</option>
                  <option value="rustica">Reboco Novo / Textura (Maior Absorção)</option>
                  <option value="gesso">Gesso / Drywall</option>
                </select>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Info size={14} className="text-amber-400" />
                <span>Cálculo com base no rendimento técnico padrão.</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setLargura('4.0');
                  setAltura('2.8');
                  setParedes(4);
                  setDemaos(2);
                  setAberturas('3.0');
                  setTipoSuperficie('lisa');
                }}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw size={13} />
                <span>Redefinir</span>
              </button>
            </div>
          </div>

          {/* Resultado & Ação Direta WhatsApp */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-500 to-yellow-500 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-950/20 pb-4 mb-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                  Resultado Estimado
                </span>
                <h4 className="text-xl font-black font-heading">Você vai precisar de:</h4>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black">
                <CheckCircle size={26} />
              </div>
            </div>

            {/* Número Principal */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-6 text-center border border-white/60 shadow-inner">
              <div className="text-4xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight">
                ~ {litrosArredondados} <span className="text-2xl font-bold">Litros</span>
              </div>
              <div className="text-xs font-extrabold text-slate-700 mt-1">
                Para cobrir {areaLiquida.toFixed(1)} m² de área líquida com {demaos} demãos
              </div>
            </div>

            {/* Sugestão de Latas */}
            <div className="space-y-2 mb-6 text-xs font-bold text-slate-900 bg-amber-400/50 p-3.5 rounded-xl border border-amber-600/30">
              <div className="font-extrabold text-sm mb-1 text-slate-950">
                📦 Sugestão de Compra na Loja:
              </div>
              {latas18L > 0 && (
                <div className="flex justify-between">
                  <span>Latas Grandes (18L):</span>
                  <span className="font-black font-mono text-sm">{latas18L}x un</span>
                </div>
              )}
              {galoes3_6L > 0 && (
                <div className="flex justify-between">
                  <span>Galões Padrão (3,6L):</span>
                  <span className="font-black font-mono text-sm">{galoes3_6L}x un</span>
                </div>
              )}
              <p className="text-[11px] font-normal text-slate-800 pt-1 border-t border-slate-950/10">
                Temos todas as embalagens a pronta entrega em Suvinil, Coral, Anjo e Eucatex.
              </p>
            </div>

            {/* Botão de Enviar ao WhatsApp */}
            <a
              href={whatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all group"
            >
              <MessageCircle size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Receber Cotação no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
