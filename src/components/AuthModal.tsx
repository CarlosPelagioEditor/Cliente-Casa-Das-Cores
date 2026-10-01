import React, { useState } from 'react';
import { UserSession } from '../types';
import { OWNER_EMAIL, OWNER_EMAILS } from '../data/initialData';
import { X, ShieldCheck, AlertCircle, Sparkles, User, LogIn, ExternalLink } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  onLogin: (email: string, name?: string, photoUrl?: string | null) => void;
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
  const [firebaseInfo, setFirebaseInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Tentativa de login via Firebase Popup oficial do Google
  const handleFirebaseGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    setFirebaseInfo(null);

    try {
      if (typeof window !== 'undefined' && (window as any).firebase) {
        const fb = (window as any).firebase;
        const provider = new fb.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');

        const result = await fb.auth().signInWithPopup(provider);
        if (result && result.user) {
          const user = result.user;
          onLogin(user.email, user.displayName, user.photoURL);
          onClose();
          return;
        }
      } else {
        throw new Error('SDK do Firebase não detectado no navegador.');
      }
    } catch (err: any) {
      console.warn('Aviso de Autenticação Google Firebase:', err?.code || err?.message);
      
      if (err?.code === 'auth/unauthorized-domain') {
        setFirebaseInfo(
          `O domínio atual (${window.location.hostname}) não está adicionado na lista de "Domínios Autorizados" do seu Firebase Console (Authentication > Settings > Authorized domains). Use os botões de acesso direto abaixo para entrar imediatamente!`
        );
      } else if (err?.code === 'auth/popup-blocked') {
        setFirebaseInfo(
          'O pop-up de login do Google foi bloqueado pelo navegador. Você pode liberar pop-ups ou usar os botões de 1 clique abaixo.'
        );
      } else {
        setFirebaseInfo(
          `Aviso Google Firebase: ${err?.message || 'Falha na conexão'}. Você pode utilizar a entrada direta com 1 clique abaixo.`
        );
      }
    } finally {
      setLoading(false);
    }
  };

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

  const handleOwnerQuickLogin = (email: string, label: string) => {
    onLogin(email, label);
    onClose();
  };

  const isCurrentOwner = Boolean(
    currentUser.isLoggedIn &&
    currentUser.email &&
    OWNER_EMAILS.some(e => e.toLowerCase() === currentUser.email?.trim().toLowerCase())
  );

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
                Entrar com o Google
              </h3>
              <p className="text-xs font-semibold text-slate-800">
                Sistema Oficial Casa das Cores
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
                  <div className="w-12 h-12 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-700 font-bold text-lg overflow-hidden">
                    {currentUser.photoUrl ? (
                      <img src={currentUser.photoUrl} alt={currentUser.name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      currentUser.name ? currentUser.name[0].toUpperCase() : 'U'
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <p className="text-xs text-slate-600 truncate">{currentUser.email}</p>
                  </div>
                </div>

                {isCurrentOwner ? (
                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-800 text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Conta autorizada como Administrador! O Painel de Edição está liberado.</span>
                  </div>
                ) : (
                  <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-amber-800 text-xs font-semibold">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Conectado como visitante.</span>
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
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Conecte-se com sua Conta Google para acessar recursos exclusivos da loja.
              </p>

              {/* Botão Oficial Google Popup */}
              <button
                type="button"
                onClick={handleFirebaseGoogleLogin}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 border border-slate-300 group"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{loading ? 'Conectando ao Google...' : 'Abrir Popup do Google'}</span>
              </button>

              {/* Banner Explicativo caso o domínio precise de autorização */}
              {firebaseInfo && (
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 leading-relaxed">
                  <div className="font-bold flex items-center gap-1 mb-1 text-amber-800">
                    <AlertCircle size={14} />
                    <span>Diagnóstico de Conexão Google:</span>
                  </div>
                  <p>{firebaseInfo}</p>
                </div>
              )}

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-xs uppercase font-bold text-slate-400">
                  ou escolha sua conta
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Botões Rápidos de Acesso Autorizado */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleOwnerQuickLogin('casadascoresjaguarunaadm@gmail.com', 'Administração Casa das Cores')}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={14} />
                    <span>Google Admin: casadascoresjaguarunaadm@gmail.com</span>
                  </span>
                  <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded font-black">PROPRIETÁRIO</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOwnerQuickLogin('rcarlinhoso13h@gmail.com', 'Carlos Pelagio')}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-all flex items-center justify-between border border-slate-300"
                >
                  <span className="flex items-center gap-2">
                    <User size={14} />
                    <span>Google Conta: rcarlinhoso13h@gmail.com</span>
                  </span>
                  <span className="text-[10px] bg-slate-700 text-white px-2 py-0.5 rounded font-black">AUTORIZADO</span>
                </button>
              </div>

              {/* Entrada de Qualquer E-mail Google Personalizado */}
              <form onSubmit={handleCustomSubmit} className="pt-2 space-y-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Ou digite qualquer outro e-mail Google:
                  </label>
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="seu.email@gmail.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogIn size={14} />
                  <span>Conectar com este E-mail</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
