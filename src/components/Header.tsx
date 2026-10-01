import React, { useState } from 'react';
import { StoreConfig, UserSession } from '../types';
import { OWNER_EMAIL } from '../data/initialData';
import { CasaDasCoresLogo } from './CasaDasCoresLogo';
import { MessageCircle, Menu, X, ShieldCheck, UserCheck, Sparkles, Phone } from 'lucide-react';

interface HeaderProps {
  config: StoreConfig;
  currentUser: UserSession;
  onOpenAuth: () => void;
  onScrollToSection: (id: string) => void;
  isOwner: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  currentUser,
  onOpenAuth,
  onScrollToSection,
  isOwner
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanWhats = config.whatsapp.replace(/\D/g, '');
  const whatsUrl = `https://wa.me/${cleanWhats}?text=${encodeURIComponent(config.mensagemPadraoWhats)}`;

  const navLinks = [
    { label: 'Início', id: 'hero' },
    { label: '🔥 Ofertas', id: 'ofertas' },
    { label: 'Sobre Nós', id: 'sobre' },
    { label: 'Marcas', id: 'marcas' },
    { label: 'Calculadora de Tintas', id: 'calculadora' },
    { label: 'Simulador de Cores', id: 'simulador' },
    { label: 'Galeria', id: 'galeria' },
    { label: 'Localização & Contato', id: 'localizacao' }
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      {/* Top Banner Informativo & Acesso Administrativo */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 py-1.5 px-4 text-xs font-bold border-b border-amber-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-slate-950 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-black tracking-wide">
              JAGUARUNA - SC
            </span>
            <span className="truncate">
              🎨 {config.slogan} • {config.ramo}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${config.whatsapp}`}
              className="hidden md:inline-flex items-center gap-1 text-slate-900 hover:text-slate-950 hover:underline"
            >
              <Phone size={12} className="text-red-700" />
              <span>Fone: {config.telefoneFixo}</span>
            </a>

            {isOwner && (
              <button
                onClick={() => handleNavClick('painel-admin')}
                className="inline-flex items-center gap-1 bg-red-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-black hover:bg-red-700 shadow-sm transition-colors cursor-pointer"
              >
                <ShieldCheck size={13} />
                Painel Ativo (Clique para Editar)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Name */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group py-1"
          >
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
            <div className="flex flex-col">
              <span className="font-heading font-black text-2xl tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors leading-none flex items-center gap-1.5">
                {config.nome}
              </span>
              <span className="text-xs font-extrabold text-red-600 tracking-wider uppercase mt-1">
                Tintas & Acabamentos
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-amber-50/80 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Botão Entrar com Google */}
            <button
              onClick={onOpenAuth}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm ${
                currentUser.isLoggedIn
                  ? isOwner
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                    : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700 hover:border-amber-400'
              }`}
            >
              {currentUser.isLoggedIn ? (
                <>
                  {isOwner ? (
                    <ShieldCheck size={16} className="text-emerald-600" />
                  ) : (
                    <UserCheck size={16} className="text-slate-600" />
                  )}
                  <span className="max-w-[110px] truncate">
                    {isOwner ? 'Proprietário' : currentUser.name || 'Conectado'}
                  </span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Entrar com Google</span>
                </>
              )}
            </button>

            {/* Botão Chamativo de WhatsApp */}
            <a
              href={whatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md hover:shadow-emerald-500/25 transition-all group"
            >
              <MessageCircle size={17} className="group-hover:scale-110 transition-transform" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAuth}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700"
              title="Acesso Google"
            >
              {currentUser.isLoggedIn ? (
                <ShieldCheck size={20} className={isOwner ? 'text-emerald-600' : 'text-slate-600'} />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {isOwner && (
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs font-bold text-emerald-950">Proprietário Conectado</p>
                  <p className="text-[10px] text-emerald-700">{OWNER_EMAIL}</p>
                </div>
              </div>
              <button
                onClick={() => handleNavClick('painel-admin')}
                className="text-xs font-black bg-emerald-600 text-white px-3 py-1 rounded-lg"
              >
                Abrir Painel
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-700"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <a
              href={whatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm py-3 rounded-xl shadow-md text-center"
            >
              <MessageCircle size={18} />
              <span>Chamar no WhatsApp ({config.whatsapp})</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-800 font-bold text-xs py-2.5 rounded-xl border border-slate-200"
            >
              <Sparkles size={15} className="text-amber-500" />
              <span>{currentUser.isLoggedIn ? 'Minha Conta Google' : 'Fazer Login com Google'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
