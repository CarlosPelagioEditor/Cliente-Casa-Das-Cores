import React, { useState } from 'react';
import { StoreConfig, PromotionItem, StoreBrand, StoreTextos } from '../types';
import { OWNER_EMAIL, INITIAL_STORE_CONFIG, INITIAL_BRANDS } from '../data/initialData';
import { 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  CheckCircle, 
  Database, 
  ExternalLink, 
  Code, 
  Copy, 
  Download,
  AlertTriangle,
  Sparkles,
  Phone,
  Instagram,
  Facebook,
  MapPin,
  FileText,
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  Plus,
  Flame,
  Tag,
  DollarSign,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminPanelProps {
  config: StoreConfig;
  onSave: (newConfig: StoreConfig) => void;
  isOwner: boolean;
  onGenerateSingleHtml?: () => string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  config,
  onSave,
  isOwner,
  onGenerateSingleHtml
}) => {
  // Se o usuário não for rigorosamente o proprietário, o componente NÃO É RENDERIZADO.
  if (!isOwner) {
    return null;
  }

  const [formData, setFormData] = useState<StoreConfig>({ ...config });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);
  const [showHtmlExportModal, setShowHtmlExportModal] = useState(false);
  const [copyCodeSuccess, setCopyCodeSuccess] = useState(false);

  const handleChange = (field: keyof StoreConfig, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTextoChange = (field: keyof StoreTextos, value: string) => {
    setFormData((prev) => ({
      ...prev,
      textos: {
        ...(prev.textos || {}),
        [field]: value
      }
    }));
  };

  const handlePhotoUpload = (field: 'fotoFachada' | 'fotoInterior1' | 'fotoInterior2' | 'fotoLogo') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (dataUrl) {
          handleChange(field, dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = (field: 'fotoFachada' | 'fotoInterior1' | 'fotoInterior2' | 'fotoLogo') => {
    handleChange(field, '');
  };

  const handleAddPromotion = () => {
    const count = (formData.promocoes || []).length + 1;
    const defaultCode = `COD-${String(count).padStart(2, '0')}`;
    const newPromo: PromotionItem = {
      id: 'promo-' + Date.now(),
      codigo: defaultCode,
      titulo: 'Novo Produto em Promoção',
      marca: 'Suvinil',
      descricao: 'Descreva aqui o rendimento e qualidade deste produto.',
      precoOriginal: 349.90,
      precoPromocional: 299.90,
      tag: 'Oferta da Semana',
      mensagemWhats: `Olá! Vi a oferta do produto (Cód: ${defaultCode}) no site da Casa das Cores e gostaria de garantir a compra!`,
      disponivel: true,
    };
    setFormData((prev) => ({
      ...prev,
      promocoes: [...(prev.promocoes || []), newPromo]
    }));
  };

  const handleUpdatePromotion = (id: string, field: keyof PromotionItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      promocoes: (prev.promocoes || []).map((p) => (p.id === id ? { ...p, [field]: value } : p))
    }));
  };

  const handleRemovePromotion = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      promocoes: (prev.promocoes || []).filter((p) => p.id !== id)
    }));
  };

  const handlePromoImageUpload = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (dataUrl) {
          handleUpdatePromotion(id, 'imagemUrl', dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBrand = () => {
    const newBrand: StoreBrand = {
      id: 'marca-' + Date.now(),
      nome: 'Nova Marca',
      slogan: 'Tradição e qualidade comprovada em tintas.',
      tagline: 'Linha Completa',
      badge: 'Parceiro Oficial',
      logoUrl: '',
      ativo: true,
      tiposProdutos: ['tinta', 'textura'],
    };
    setFormData((prev) => ({
      ...prev,
      marcas: [...(prev.marcas || INITIAL_BRANDS), newBrand]
    }));
  };

  const handleUpdateBrand = (id: string, field: keyof StoreBrand, value: any) => {
    setFormData((prev) => ({
      ...prev,
      marcas: (prev.marcas || INITIAL_BRANDS).map((b) => (b.id === id ? { ...b, [field]: value } : b))
    }));
  };

  const handleRemoveBrand = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      marcas: (prev.marcas || INITIAL_BRANDS).filter((b) => b.id !== id)
    }));
  };

  const handleBrandLogoUpload = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (dataUrl) {
          handleUpdateBrand(id, 'logoUrl', dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* ========================================================================= */
    /* FIREBASE FIRESTORE SYNC HOOK - ONDE SALVAREMOS OS DADOS NO BANCO DA NUVEM */
    /* ========================================================================= */
    // Quando você conectar o projeto ao Firebase Firestore, descomente o bloco abaixo:
    /*
      try {
        const db = getFirestore();
        await setDoc(doc(db, "lojas", "casa_das_cores"), {
          ...formData,
          atualizadoEm: serverTimestamp()
        }, { merge: true });
        console.log("Configurações da loja sincronizadas no Firestore com sucesso!");
      } catch (error) {
        console.error("Erro ao sincronizar com Firebase Firestore:", error);
      }
    */
    /* ========================================================================= */

    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Deseja restaurar as informações padrão originais da Casa das Cores?')) {
      setFormData({ ...INITIAL_STORE_CONFIG });
      onSave({ ...INITIAL_STORE_CONFIG });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <section id="painel-admin" className="py-12 bg-gradient-to-b from-amber-500/15 via-amber-50/50 to-white border-b-4 border-amber-500 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Painel Header Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400 relative overflow-hidden mb-8">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
                <ShieldCheck size={32} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                    Acesso Exclusivo do Proprietário
                  </span>
                  <span className="text-amber-400 text-xs font-mono font-bold">
                    {OWNER_EMAIL}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white mt-1">
                  Painel de Edição da Loja
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Altere os contatos, links de redes sociais, endereço e textos do site em tempo real.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFirebaseModal(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Ver integração com Firebase"
              >
                <Database size={15} />
                <span>Instruções Firebase</span>
              </button>

              {onGenerateSingleHtml && (
                <button
                  type="button"
                  onClick={() => setShowHtmlExportModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow transition-colors"
                  title="Exportar em Arquivo Único HTML"
                >
                  <Code size={15} />
                  <span>Exportar HTML Único</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
          {saveSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 animate-fadeIn">
              <CheckCircle size={22} className="text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">Alterações salvas com sucesso!</p>
                <p className="text-xs text-emerald-700">
                  As informações foram atualizadas instantaneamente em toda a página e gravadas no armazenamento seguro.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seção 1: Identificação Básica */}
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <Sparkles size={18} className="text-amber-500" />
                <span>1. Identidade & Apresentação da Loja</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome da Loja:
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Slogan Principal:
                  </label>
                  <input
                    type="text"
                    value={formData.slogan}
                    onChange={(e) => handleChange('slogan', e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ramo de Atuação / Subtítulo:
                  </label>
                  <input
                    type="text"
                    value={formData.ramo}
                    onChange={(e) => handleChange('ramo', e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Seção 2: Contatos & Redes Sociais */}
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <Phone size={18} className="text-emerald-500" />
                <span>2. WhatsApp, Telefone e Redes Sociais</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp (com DDI e DDD, apenas números):
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.whatsapp}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      required
                      placeholder="554836241961"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-mono"
                    />
                    <span className="absolute left-3 top-3 text-emerald-600 font-bold text-xs">WA</span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Atual: +55 (48) 3624-1961
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Telefone Fixo / Exibição:
                  </label>
                  <input
                    type="text"
                    value={formData.telefoneFixo}
                    onChange={(e) => handleChange('telefoneFixo', e.target.value)}
                    required
                    placeholder="(48) 3624-1961"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Instagram size={14} className="text-pink-600" />
                    <span>Link do Instagram:</span>
                  </label>
                  <input
                    type="url"
                    value={formData.instagram}
                    onChange={(e) => handleChange('instagram', e.target.value)}
                    required
                    placeholder="https://www.instagram.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Facebook size={14} className="text-blue-600" />
                    <span>Link do Facebook:</span>
                  </label>
                  <input
                    type="url"
                    value={formData.facebook}
                    onChange={(e) => handleChange('facebook', e.target.value)}
                    required
                    placeholder="https://www.facebook.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Seção 3: Endereço & Localização */}
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <MapPin size={18} className="text-red-500" />
                <span>3. Endereço e Google Maps</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Endereço Completo & Descrição Local:
                  </label>
                  <input
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => handleChange('endereco', e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Link do Google Maps:
                  </label>
                  <input
                    type="url"
                    value={formData.googleMapsUrl}
                    onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                    required
                    placeholder="https://maps.app.goo.gl/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Horário de Funcionamento:
                  </label>
                  <input
                    type="text"
                    value={formData.horario}
                    onChange={(e) => handleChange('horario', e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Seção 4: Texto Descritivo da Loja */}
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <FileText size={18} className="text-amber-600" />
                <span>4. Texto Descritivo e Mensagem do WhatsApp</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Texto Descritivo do Negócio (Exibido na seção "Sobre Nós"):
                  </label>
                  <textarea
                    rows={4}
                    value={formData.descricao}
                    onChange={(e) => handleChange('descricao', e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mensagem Padrão ao Iniciar Conversa no WhatsApp:
                  </label>
                  <input
                    type="text"
                    value={formData.mensagemPadraoWhats}
                    onChange={(e) => handleChange('mensagemPadraoWhats', e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Seção 5: Fotos e Identidade da Loja */}
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                <ImageIcon size={18} className="text-blue-500" />
                <span>5. Fotos e Identidade da Loja (Logomarca, Fachada e Interior)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Logomarca da Loja */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-900 block mb-1">Logomarca Oficial</span>
                    <p className="text-[11px] text-slate-500 mb-3">Exibida no topo, cabeçalho e rodapé.</p>
                    {formData.fotoLogo ? (
                      <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3 bg-white p-2 border border-slate-200 flex items-center justify-center">
                        <img src={formData.fotoLogo} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="rounded-xl aspect-[4/3] mb-3 bg-amber-100/70 border-2 border-amber-300 flex flex-col items-center justify-center p-3 text-center">
                        <img src="/IMG-20260930-WA0016.svg" alt="Logo Padrão" className="w-16 h-16 object-contain mb-1" />
                        <span className="text-[10px] font-bold text-amber-900">Logo Oficial SVG Ativa</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl shadow cursor-pointer transition-colors">
                      <UploadCloud size={14} />
                      <span>{formData.fotoLogo ? 'Trocar Logo' : 'Enviar Logo'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload('fotoLogo')} />
                    </label>
                    {formData.fotoLogo && (
                      <button
                        type="button"
                        onClick={() => handlePhotoRemove('fotoLogo')}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                        title="Restaurar logo padrão oficial"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Foto Fachada */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-900 block mb-1">Foto da Fachada</span>
                    <p className="text-[11px] text-slate-500 mb-3">Exibida no topo e na galeria.</p>
                    {formData.fotoFachada ? (
                      <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3 bg-slate-200">
                        <img src={formData.fotoFachada} alt="Fachada" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="rounded-xl aspect-[4/3] mb-3 bg-slate-200/80 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-3 text-center text-slate-400">
                        <ImageIcon size={28} />
                        <span className="text-[11px] font-semibold mt-1">Nenhuma foto carregada</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl shadow cursor-pointer transition-colors">
                      <UploadCloud size={14} />
                      <span>{formData.fotoFachada ? 'Trocar' : 'Selecionar'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload('fotoFachada')} />
                    </label>
                    {formData.fotoFachada && (
                      <button
                        type="button"
                        onClick={() => handlePhotoRemove('fotoFachada')}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                        title="Remover foto"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Foto Interior 1 */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-900 block mb-1">Foto Interior (Estoque)</span>
                    <p className="text-[11px] text-slate-500 mb-3">Corredores e latas de tinta.</p>
                    {formData.fotoInterior1 ? (
                      <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3 bg-slate-200">
                        <img src={formData.fotoInterior1} alt="Interior 1" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="rounded-xl aspect-[4/3] mb-3 bg-slate-200/80 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-3 text-center text-slate-400">
                        <ImageIcon size={28} />
                        <span className="text-[11px] font-semibold mt-1">Nenhuma foto carregada</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl shadow cursor-pointer transition-colors">
                      <UploadCloud size={14} />
                      <span>{formData.fotoInterior1 ? 'Trocar' : 'Selecionar'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload('fotoInterior1')} />
                    </label>
                    {formData.fotoInterior1 && (
                      <button
                        type="button"
                        onClick={() => handlePhotoRemove('fotoInterior1')}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                        title="Remover foto"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Foto Interior 2 */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-black text-slate-900 block mb-1">Foto Interior (Acessórios)</span>
                    <p className="text-[11px] text-slate-500 mb-3">Expositores de silicones e rolos.</p>
                    {formData.fotoInterior2 ? (
                      <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3 bg-slate-200">
                        <img src={formData.fotoInterior2} alt="Interior 2" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="rounded-xl aspect-[4/3] mb-3 bg-slate-200/80 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-3 text-center text-slate-400">
                        <ImageIcon size={28} />
                        <span className="text-[11px] font-semibold mt-1">Nenhuma foto carregada</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-3 rounded-xl shadow cursor-pointer transition-colors">
                      <UploadCloud size={14} />
                      <span>{formData.fotoInterior2 ? 'Trocar' : 'Selecionar'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload('fotoInterior2')} />
                    </label>
                    {formData.fotoInterior2 && (
                      <button
                        type="button"
                        onClick={() => handlePhotoRemove('fotoInterior2')}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                        title="Remover foto"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Seção 6: Gerenciamento de Ofertas da Semana & Destaques */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Flame size={18} className="text-red-500" />
                  <span>6. Ofertas da Semana & Produtos em Destaque</span>
                </h3>

                <button
                  type="button"
                  onClick={handleAddPromotion}
                  className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black py-2 px-3.5 rounded-xl shadow transition-colors cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Adicionar Nova Oferta</span>
                </button>
              </div>

              <div className="space-y-4">
                {(formData.promocoes || []).map((promo, idx) => (
                  <div
                    key={promo.id}
                    className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 text-xs font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-extrabold text-sm text-slate-900">
                          {promo.titulo || 'Nova Oferta'}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">
                          ({promo.marca})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleUpdatePromotion(promo.id, 'disponivel', !promo.disponivel)}
                          className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                            promo.disponivel
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-slate-100 text-slate-500 border-slate-300'
                          }`}
                          title="Alternar visibilidade no site"
                        >
                          {promo.disponivel ? <Eye size={13} /> : <EyeOff size={13} />}
                          <span>{promo.disponivel ? 'Ativo' : 'Oculto'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemovePromotion(promo.id)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                          title="Excluir esta oferta"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-5">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Título do Produto:</label>
                        <input
                          type="text"
                          value={promo.titulo}
                          onChange={(e) => handleUpdatePromotion(promo.id, 'titulo', e.target.value)}
                          required
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Código / Ref:</label>
                        <input
                          type="text"
                          value={promo.codigo || ''}
                          onChange={(e) => handleUpdatePromotion(promo.id, 'codigo', e.target.value.toUpperCase())}
                          placeholder="SUV-18L"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-amber-500 bg-slate-50 uppercase"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Marca:</label>
                        <input
                          type="text"
                          value={promo.marca}
                          onChange={(e) => handleUpdatePromotion(promo.id, 'marca', e.target.value)}
                          placeholder="Suvinil, Coral..."
                          required
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Tag Promocional:</label>
                        <input
                          type="text"
                          value={promo.tag || ''}
                          onChange={(e) => handleUpdatePromotion(promo.id, 'tag', e.target.value)}
                          placeholder="Ex: Mais Vendida"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Preço Original De (R$):</label>
                        <input
                          type="number"
                          step="0.01"
                          value={promo.precoOriginal}
                          onChange={(e) => handleUpdatePromotion(promo.id, 'precoOriginal', parseFloat(e.target.value) || 0)}
                          required
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Preço Promocional Por (R$):</label>
                        <input
                          type="number"
                          step="0.01"
                          value={promo.precoPromocional}
                          onChange={(e) => handleUpdatePromotion(promo.id, 'precoPromocional', parseFloat(e.target.value) || 0)}
                          required
                          className="w-full px-3 py-2 rounded-xl border border-emerald-400 bg-emerald-50/30 text-xs font-black text-emerald-800 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Descrição / Benefício da Oferta:</label>
                      <textarea
                        rows={2}
                        value={promo.descricao}
                        onChange={(e) => handleUpdatePromotion(promo.id, 'descricao', e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs leading-relaxed focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    {/* Mensagem enviada para o WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
                          <Phone size={13} className="text-emerald-600" />
                          <span>Mensagem enviada ao WhatsApp (botão de compra):</span>
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {promo.codigo ? `Código incluso: ${promo.codigo}` : 'Dica: use o código para fácil conferência'}
                        </span>
                      </label>
                      <input
                        type="text"
                        value={promo.mensagemWhats || ''}
                        onChange={(e) => handleUpdatePromotion(promo.id, 'mensagemWhats', e.target.value)}
                        placeholder={`Ex: Olá! Vi a oferta da ${promo.titulo}${promo.codigo ? ` (Cód: ${promo.codigo})` : ''} por R$ ${promo.precoPromocional} no site da Casa das Cores e quero reservar!`}
                        className="w-full px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50/20 text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Foto da Oferta */}
                    <div className="flex items-center gap-3 pt-2">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                        {promo.imagemUrl ? (
                          <img src={promo.imagemUrl} alt={promo.titulo} className="w-full h-full object-contain" />
                        ) : (
                          <Tag size={18} className="text-slate-400" />
                        )}
                      </div>

                      <div className="flex-1 flex items-center gap-2">
                        <label className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-1.5 px-3 rounded-lg cursor-pointer transition-colors border border-slate-300 flex items-center gap-1.5">
                          <UploadCloud size={14} />
                          <span>{promo.imagemUrl ? 'Trocar Foto do Produto' : 'Adicionar Foto do Produto'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePromoImageUpload(promo.id)}
                          />
                        </label>

                        {promo.imagemUrl && (
                          <button
                            type="button"
                            onClick={() => handleUpdatePromotion(promo.id, 'imagemUrl', '')}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remover Foto
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção 7: Gerenciamento de Marcas Parceiras & Logomarcas */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-500" />
                    <span>7. Marcas Parceiras & Logomarcas</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Cadastre, edite ou exclua marcas e suas logos para aparecer no topo, rodapé e no simulador de cores.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddBrand}
                  className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-amber-300 text-xs font-black py-2 px-3.5 rounded-xl shadow transition-colors cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Cadastrar Nova Marca</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.marcas || INITIAL_BRANDS).map((brand, idx) => (
                  <div
                    key={brand.id}
                    className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-3.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-black flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-extrabold text-sm text-slate-900">
                            {brand.nome || 'Marca sem Nome'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleUpdateBrand(brand.id, 'ativo', brand.ativo === false ? true : false)}
                            className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg border transition-colors ${
                              brand.ativo !== false
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-slate-100 text-slate-500 border-slate-300'
                            }`}
                          >
                            {brand.ativo !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                            <span>{brand.ativo !== false ? 'Ativa' : 'Oculta'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveBrand(brand.id)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                            title="Excluir esta marca"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome da Marca:</label>
                          <input
                            type="text"
                            value={brand.nome}
                            onChange={(e) => handleUpdateBrand(brand.id, 'nome', e.target.value)}
                            required
                            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">Selo / Destaque:</label>
                          <input
                            type="text"
                            value={brand.badge || ''}
                            onChange={(e) => handleUpdateBrand(brand.id, 'badge', e.target.value)}
                            placeholder="Ex: Líder em Qualidade"
                            className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      <div className="mt-2.5">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Slogan da Marca:</label>
                        <input
                          type="text"
                          value={brand.slogan}
                          onChange={(e) => handleUpdateBrand(brand.id, 'slogan', e.target.value)}
                          placeholder="Ex: Renovar é fácil. É só querer."
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      {/* Produtos e linhas que a marca oferece */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                          O que esta marca oferece (selecione os produtos):
                        </label>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                          {[
                            { id: 'tinta', label: '🎨 Tintas Imobiliárias' },
                            { id: 'textura', label: '🏛️ Texturas & Efeitos' },
                            { id: 'ferramentas', label: '🛠️ Ferramentas & Pincéis' },
                            { id: 'lixas', label: '📄 Lixas & Abrasivos' },
                            { id: 'argamassa', label: '🧱 Argamassas & Revest.' },
                            { id: 'impermeabilizante', label: '🛡️ Impermeabilizantes' },
                            { id: 'vernizes', label: '🪵 Vernizes & Stains' }
                          ].map((prod) => {
                            const currentTipos = brand.tiposProdutos || ['tinta'];
                            const isChecked = currentTipos.includes(prod.id);
                            return (
                              <label
                                key={prod.id}
                                className={`flex items-center gap-1.5 p-1.5 rounded-lg border cursor-pointer transition-colors ${
                                  isChecked
                                    ? 'bg-amber-50 border-amber-300 text-amber-950 font-bold'
                                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    const nextTipos = e.target.checked
                                      ? [...currentTipos, prod.id]
                                      : currentTipos.filter((t) => t !== prod.id);
                                    handleUpdateBrand(brand.id, 'tiposProdutos', nextTipos);
                                  }}
                                  className="w-3.5 h-3.5 accent-amber-500 rounded"
                                />
                                <span className="truncate">{prod.label}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Logo da Marca */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center gap-3">
                      <div className="w-14 h-12 rounded-xl bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center p-1 overflow-hidden">
                        {brand.logoUrl ? (
                          <img src={brand.logoUrl} alt={brand.nome} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-[10px] font-black text-slate-400 uppercase text-center">
                            Sem Logo
                          </span>
                        )}
                      </div>

                      <div className="flex-1 flex items-center gap-2">
                        <label className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-1.5 px-3 rounded-lg cursor-pointer transition-colors border border-slate-300 flex items-center gap-1.5">
                          <UploadCloud size={13} />
                          <span>{brand.logoUrl ? 'Trocar Logo' : 'Enviar Logo da Marca'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleBrandLogoUpload(brand.id)}
                          />
                        </label>

                        {brand.logoUrl && (
                          <button
                            type="button"
                            onClick={() => handleUpdateBrand(brand.id, 'logoUrl', '')}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Remover
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção 8: Editor de Textos & Títulos das Seções */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <FileText size={18} className="text-amber-500" />
                    <span>8. Editor de Textos & Títulos do Site</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Personalize os títulos e mensagens das seções da página como desejar.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Topo / Hero */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <span className="text-xs font-black uppercase text-amber-700 block border-b border-slate-100 pb-1.5">
                    Topo Principal (Hero)
                  </span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Título do Topo:</label>
                    <input
                      type="text"
                      value={formData.textos?.heroTitulo || ''}
                      onChange={(e) => handleTextoChange('heroTitulo', e.target.value)}
                      placeholder="Ex: A Sua Casa Merece as"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Palavra de Destaque (com efeito de pincelada):</label>
                    <input
                      type="text"
                      value={formData.textos?.heroDestaque || ''}
                      onChange={(e) => handleTextoChange('heroDestaque', e.target.value)}
                      placeholder="Ex: Melhores Cores"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Subtítulo / Descrição do Topo:</label>
                    <textarea
                      rows={2}
                      value={formData.textos?.heroSubtitulo || ''}
                      onChange={(e) => handleTextoChange('heroSubtitulo', e.target.value)}
                      placeholder="Ex: Sua loja completa de tintas e acabamentos em Jaguaruna e região..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Sobre Nós / História */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <span className="text-xs font-black uppercase text-red-700 block border-b border-slate-100 pb-1.5">
                    Seção "Conheça Nossa História"
                  </span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Título da Seção Sobre:</label>
                    <input
                      type="text"
                      value={formData.textos?.sobreTitulo || ''}
                      onChange={(e) => handleTextoChange('sobreTitulo', e.target.value)}
                      placeholder="Ex: Excelência, Economia e Variedade para a Sua Pintura"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Texto da História:</label>
                    <textarea
                      rows={3}
                      value={formData.textos?.sobreSubtitulo || ''}
                      onChange={(e) => handleTextoChange('sobreSubtitulo', e.target.value)}
                      placeholder="Deixe em branco para usar a descrição geral da loja cadastrada na Seção 4."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Ofertas da Semana */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <span className="text-xs font-black uppercase text-emerald-700 block border-b border-slate-100 pb-1.5">
                    Seção de Ofertas da Semana
                  </span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Título das Ofertas:</label>
                    <input
                      type="text"
                      value={formData.textos?.ofertasTitulo || ''}
                      onChange={(e) => handleTextoChange('ofertasTitulo', e.target.value)}
                      placeholder="Ex: O Menor Preço de Jaguaruna em Promoção"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Subtítulo das Ofertas:</label>
                    <input
                      type="text"
                      value={formData.textos?.ofertasSubtitulo || ''}
                      onChange={(e) => handleTextoChange('ofertasSubtitulo', e.target.value)}
                      placeholder="Ex: Tintas originais de fábrica com descontos reais e pronta-entrega..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Linha de Produtos */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <span className="text-xs font-black uppercase text-blue-700 block border-b border-slate-100 pb-1.5">
                    Seção de Linhas de Produtos
                  </span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Título dos Produtos:</label>
                    <input
                      type="text"
                      value={formData.textos?.produtosTitulo || ''}
                      onChange={(e) => handleTextoChange('produtosTitulo', e.target.value)}
                      placeholder="Ex: O Que Você Precisa para Construir, Reformar ou Proteger"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Subtítulo dos Produtos:</label>
                    <input
                      type="text"
                      value={formData.textos?.produtosSubtitulo || ''}
                      onChange={(e) => handleTextoChange('produtosSubtitulo', e.target.value)}
                      placeholder="Ex: Da fundação ao acabamento final, oferecemos as melhores soluções..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Calculadora de Tinta */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <span className="text-xs font-black uppercase text-purple-700 block border-b border-slate-100 pb-1.5">
                    Seção da Calculadora de Tinta
                  </span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Título da Calculadora:</label>
                    <input
                      type="text"
                      value={formData.textos?.calculadoraTitulo || ''}
                      onChange={(e) => handleTextoChange('calculadoraTitulo', e.target.value)}
                      placeholder="Ex: Calculadora Inteligente de Tinta"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Subtítulo da Calculadora:</label>
                    <input
                      type="text"
                      value={formData.textos?.calculadoraSubtitulo || ''}
                      onChange={(e) => handleTextoChange('calculadoraSubtitulo', e.target.value)}
                      placeholder="Ex: Descubra a quantidade ideal de tinta para a sua reforma..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Simulador de Cores */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <span className="text-xs font-black uppercase text-amber-600 block border-b border-slate-100 pb-1.5">
                    Seção do Simulador de Cores
                  </span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Título do Simulador:</label>
                    <input
                      type="text"
                      value={formData.textos?.simuladorTitulo || ''}
                      onChange={(e) => handleTextoChange('simuladorTitulo', e.target.value)}
                      placeholder="Ex: Escolha a Marca e Teste as Cores na Parede"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Subtítulo do Simulador:</label>
                    <input
                      type="text"
                      value={formData.textos?.simuladorSubtitulo || ''}
                      onChange={(e) => handleTextoChange('simuladorSubtitulo', e.target.value)}
                      placeholder="Ex: Clique na sua marca preferida para abrir o carrossel exclusivo de cores..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Galeria de Fotos */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <span className="text-xs font-black uppercase text-slate-800 block border-b border-slate-100 pb-1.5">
                    Seção da Galeria de Fotos
                  </span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Título da Galeria:</label>
                    <input
                      type="text"
                      value={formData.textos?.galeriaTitulo || ''}
                      onChange={(e) => handleTextoChange('galeriaTitulo', e.target.value)}
                      placeholder="Ex: Conheça Nossa Estrutura em Jaguaruna"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Subtítulo da Galeria:</label>
                    <input
                      type="text"
                      value={formData.textos?.galeriaSubtitulo || ''}
                      onChange={(e) => handleTextoChange('galeriaSubtitulo', e.target.value)}
                      placeholder="Ex: Amplo estacionamento, pátio privativo, corredores organizados..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Localização */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
                  <span className="text-xs font-black uppercase text-emerald-800 block border-b border-slate-100 pb-1.5">
                    Seção de Localização e Mapa
                  </span>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Título da Localização:</label>
                    <input
                      type="text"
                      value={formData.textos?.localizacaoTitulo || ''}
                      onChange={(e) => handleTextoChange('localizacaoTitulo', e.target.value)}
                      placeholder="Ex: Venha nos Visitar em Jaguaruna - SC"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Subtítulo da Localização:</label>
                    <input
                      type="text"
                      value={formData.textos?.localizacaoSubtitulo || ''}
                      onChange={(e) => handleTextoChange('localizacaoSubtitulo', e.target.value)}
                      placeholder="Ex: Loja ampla com amplo pátio de estacionamento..."
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Ações do Formulário */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetToDefault}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw size={15} />
                <span>Restaurar Padrão da Loja</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-sm shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Save size={18} />
                <span>Salvar Todas as Alterações</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Integração Firebase */}
      {showFirebaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-lg text-slate-900">
                  Estrutura para Integração com Firebase
                </h3>
              </div>
              <button
                onClick={() => setShowFirebaseModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs text-slate-700">
              <p>
                O código deste site já está 100% estruturado para se conectar com o <strong>Firebase Firestore</strong> e <strong>Firebase Auth</strong>. Atualmente, os dados são salvos com persistência instantânea no <code className="bg-slate-100 text-amber-800 px-1 py-0.5 rounded font-mono">localStorage</code>.
              </p>

              <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] overflow-x-auto">
                <pre>{`// Exemplo de chamada pronta para o Firebase Firestore:
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

// 1. Suas chaves do Firebase Console:
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "casa-das-cores.firebaseapp.com",
  projectId: "casa-das-cores",
  storageBucket: "casa-das-cores.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Onde salvar os dados alterados pelo proprietário:
export async function salvarConfiguracoesLoja(dados) {
  await setDoc(doc(db, "configuracoes", "geral"), dados, { merge: true });
}

// 3. Onde escutar alterações em tempo real no site:
export function sincronizarConfiguracoes(callback) {
  return onSnapshot(doc(db, "configuracoes", "geral"), (snap) => {
    if (snap.exists()) callback(snap.data());
  });
}`}</pre>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <h4 className="font-bold text-amber-900 mb-1">Como Ativar:</h4>
                <ol className="list-decimal pl-4 space-y-1 text-amber-800">
                  <li>Crie um projeto no console do Firebase.</li>
                  <li>Ative o Cloud Firestore e a Autenticação do Google.</li>
                  <li>Cole as credenciais no arquivo de configuração.</li>
                  <li>Os dados salvos no painel serão gravados e atualizados instantaneamente em qualquer dispositivo.</li>
                </ol>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowFirebaseModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Exportação HTML Único */}
      {showHtmlExportModal && onGenerateSingleHtml && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-600" />
                <h3 className="font-extrabold text-lg text-slate-900">
                  Código Completo em Arquivo Único (HTML + CSS + JS)
                </h3>
              </div>
              <button
                onClick={() => setShowHtmlExportModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-3">
              Você pode copiar ou fazer o download do arquivo <code className="bg-slate-100 font-mono text-amber-700 px-1 py-0.5 rounded">index.html</code> independente, contendo todo o layout, estilos inline e scripts prontos para rodar em qualquer hospedagem simples ou abrir diretamente no navegador!
            </p>

            <div className="my-3 flex-1 overflow-hidden relative rounded-xl border border-slate-200 bg-slate-950 text-slate-200">
              <textarea
                readOnly
                value={onGenerateSingleHtml()}
                className="w-full h-80 p-3 font-mono text-[11px] leading-relaxed bg-transparent resize-none focus:outline-none"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-500 font-semibold">
                {copyCodeSuccess ? '✅ Código copiado para a área de transferência!' : 'Arquivo autônomo sem dependências externas.'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const code = onGenerateSingleHtml();
                    navigator.clipboard.writeText(code);
                    setCopyCodeSuccess(true);
                    setTimeout(() => setCopyCodeSuccess(false), 3000);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Copy size={14} />
                  <span>Copiar Código</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const code = onGenerateSingleHtml();
                    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'casa_das_cores_jaguaruna.html';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Download size={14} />
                  <span>Baixar index.html</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
