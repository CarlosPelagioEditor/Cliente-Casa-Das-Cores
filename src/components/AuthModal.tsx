import React, { useState } from 'react';
import { UserSession } from '../types';
import { OWNER_EMAIL } from '../data/initialData';
import { X, ShieldCheck, AlertCircle, Sparkles, User, LogIn } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  onLogin: (email: string, name?: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}) => {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) {
      setErrorMsg('Por favor, informe um endereço de e-mail válido.');
      return;
    }
    setErrorMsg('');
    onLogin(customEmail.trim().toLowerCase(), customName.trim() || customEmail.split('@')[0]);
    onClose();
  };

  const handleOwnerQuickLogin = () => {
    onLogin(OWNER_EMAIL, 'Administração Casa das Cores');
    onClose();
  };

  const handleGuestQuickLogin = () => {
    onLogin('cliente.visitante@gmail.com', 'Cliente Jaguaruna');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Top Header Decor */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-6 text-slate-950 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-slate-900 transition-colors"
            title="Fechar"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
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
            </div>
            <div>
              <h3 className="text-xl font-black font-heading tracking-tight text-slate-900">
                Acesso com Google
              </h3>
              <p className="text-xs font-semibold text-slate-800">
                Autenticação do Sistema Casa das Cores
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentUser.isLoggedIn ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-700 font-bold text-lg">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-xs text-slate-600 truncate">{currentUser.email}</p>
                  </div>
                </div>

                {currentUser.email === OWNER_EMAIL ? (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-800 text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Conta autorizada como Proprietário! O Painel de Edição está desbloqueado.</span>
                  </div>
                ) : (
                  <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-amber-800 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Acesso de Visitante. O Painel de Edição só é visível para {OWNER_EMAIL}.</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 font-bold text-sm transition-colors text-center"
                >
                  Desconectar Sessão
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-sm transition-colors text-center"
                >
                  Continuar no Site
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="text-sm text-slate-600">
                <p>
                  Conecte-se com sua Conta Google. Se você for o administrador registrado (<strong>{OWNER_EMAIL}</strong>), você terá acesso imediato ao painel de controle para gerenciar os dados da loja.
                </p>
              </div>

              {/* Botão de 1-Clique Proprietário */}
              <button
                type="button"
                onClick={handleOwnerQuickLogin}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 border border-amber-400 group"
              >
                <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Entrar como Proprietário (Acesso Rápido)</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-xs uppercase font-bold text-slate-400">
                  ou faça login personalizado
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <form onSubmit={handleCustomSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    E-mail do Google:
                  </label>
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="seu.email@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome de Exibição (Opcional):
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Seu Nome ou Empresa"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
                )}

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={handleGuestQuickLogin}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <User size={14} />
                    Entrar como Visitante
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <LogIn size={14} />
                    Entrar com este E-mail
                  </button>
                </div>
              </form>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                <span className="font-bold text-slate-700">Regra de Segurança:</span> O painel de edição é renderizado exclusivamente quando o e-mail autenticado for rigorosamente igual a <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono">{OWNER_EMAIL}</code>.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
