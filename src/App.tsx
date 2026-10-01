/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StoreConfig, UserSession } from './types';
import { INITIAL_STORE_CONFIG, OWNER_EMAIL, OWNER_EMAILS } from './data/initialData';
import { generateSingleHtml } from './utils/generateSingleHtml';

// Componentes
import { Header } from './components/Header';
import { AdminPanel } from './components/AdminPanel';
import { Hero } from './components/Hero';
import { BrandLogos } from './components/BrandLogos';
import { PromotionsSection } from './components/PromotionsSection';
import { AboutSection } from './components/AboutSection';
import { PaintCalculator } from './components/PaintCalculator';
import { ColorSimulator } from './components/ColorSimulator';
import { ProductLines } from './components/ProductLines';
import { Gallery } from './components/Gallery';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AuthModal } from './components/AuthModal';

const STORAGE_KEY = 'casa_das_cores_config_v2';
const USER_KEY = 'casa_das_cores_user_v1';

export default function App() {
  // Estado das configurações da loja
  const [config, setConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_STORE_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Erro ao ler localStorage:', e);
    }
    return INITIAL_STORE_CONFIG;
  });

  // Estado da sessão do usuário
  const [currentUser, setCurrentUser] = useState<UserSession>(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Erro ao ler sessão:', e);
    }
    return {
      isLoggedIn: false,
      email: null,
      name: null,
      photoUrl: null
    };
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);

  // O painel de edição só é acessível e visível se o e-mail logado for EXATAMENTE um dos proprietários autorizados
  const isOwner = Boolean(
    currentUser.isLoggedIn &&
    currentUser.email &&
    OWNER_EMAILS.some(e => e.toLowerCase() === currentUser.email?.trim().toLowerCase())
  );

  // Sincronização opcional com Firestore e Auth do Firebase
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).firebase) {
        const fb = (window as any).firebase;
        if (fb.apps && fb.apps.length > 0) {
          const auth = fb.auth();
          const unsubscribe = auth.onAuthStateChanged((user: any) => {
            if (user && user.email) {
              handleLogin(user.email, user.displayName || user.email.split('@')[0], user.photoURL);
            }
          });
          return () => unsubscribe();
        }
      }
    } catch (e) {
      console.warn('Firebase init check:', e);
    }
  }, []);

  // Salvar alterações de configuração
  const handleSaveConfig = (newConfig: StoreConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
      console.error('Erro ao persistir no localStorage:', e);
    }

    try {
      if (typeof window !== 'undefined' && (window as any).firebase) {
        const fb = (window as any).firebase;
        if (fb.apps && fb.apps.length > 0) {
          const db = fb.firestore();
          db.collection('configuracoes').doc('loja').set(newConfig, { merge: true })
            .catch((err: any) => console.warn('Aviso ao sincronizar Firestore:', err?.message));
        }
      }
    } catch (e) {
      // Ignora silenciosamente se o Firestore não estiver ativo no momento
    }
  };

  // Efetuar Login
  const handleLogin = (email: string, name?: string, photoUrl?: string | null) => {
    const user: UserSession = {
      isLoggedIn: true,
      email: email.trim().toLowerCase(),
      name: name || email.split('@')[0],
      photoUrl: photoUrl || null
    };
    setCurrentUser(user);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Erro ao salvar sessão:', e);
    }
  };

  // Efetuar Logout
  const handleLogout = () => {
    const user: UserSession = {
      isLoggedIn: false,
      email: null,
      name: null,
      photoUrl: null
    };
    setCurrentUser(user);
    try {
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Erro ao limpar sessão:', e);
    }
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExportSingleHtml = (): string => {
    return generateSingleHtml(config);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* 1. Cabeçalho e Navegação */}
      <Header
        config={config}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onScrollToSection={handleScrollToSection}
        isOwner={isOwner}
      />

      {/* 2. Painel de Edição do Proprietário (Oculto por padrão, visível EXCLUSIVAMENTE para casadascoresjaguarunaadm@gmail.com) */}
      <AdminPanel
        config={config}
        onSave={handleSaveConfig}
        isOwner={isOwner}
        onGenerateSingleHtml={handleExportSingleHtml}
      />

      <main className="flex-1">
        {/* 3. Hero & Apresentação com Fachada e Estacionamento */}
        <Hero
          config={config}
          onScrollTo={handleScrollToSection}
          onUpdateConfig={handleSaveConfig}
          isOwner={isOwner}
        />

        {/* 4. Marcas Parceiras Oficiais (Suvinil, Coral, Anjo, Eucatex, Atlas) */}
        <div id="marcas">
          <BrandLogos config={config} />
        </div>

        {/* 5. Ofertas da Semana & Produtos em Destaque */}
        <PromotionsSection config={config} />

        {/* 6. Sobre Nós e Diferenciais da Loja Física */}
        <AboutSection config={config} onUpdateConfig={handleSaveConfig} isOwner={isOwner} />

        {/* 6. Linha Completa de Produtos */}
        <ProductLines config={config} />

        {/* 7. Calculadora Inteligente de Tinta com Envio para o WhatsApp */}
        <PaintCalculator config={config} />

        {/* 8. Simulador Interativo de Cores */}
        <ColorSimulator config={config} />

        {/* 9. Galeria de Fotos da Loja e Produtos com Lightbox */}
        <Gallery config={config} onUpdateConfig={handleSaveConfig} isOwner={isOwner} />

        {/* 10. Localização e Mapa Incorporado do Google Maps */}
        <LocationSection config={config} />
      </main>

      {/* 11. Rodapé com Links Sociais e Informações Legais */}
      <Footer
        config={config}
        onOpenAuth={() => setAuthModalOpen(true)}
        onScrollTo={handleScrollToSection}
        isOwner={isOwner}
      />

      {/* 12. Botão Flutuante de WhatsApp */}
      <FloatingWhatsApp config={config} />

      {/* 13. Modal de Autenticação com Google */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </div>
  );
}
