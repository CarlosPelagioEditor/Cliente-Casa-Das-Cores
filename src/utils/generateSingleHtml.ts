import { StoreConfig } from '../types';

export function generateSingleHtml(config: StoreConfig): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.nome} - Tintas e Acabamentos em Jaguaruna</title>
  <meta name="description" content="Site oficial da Casa das Cores em Jaguaruna - SC. O melhor e mais barato para você em tintas e acabamentos. Peça seu orçamento via WhatsApp!">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@600;700;800;900&display=swap" rel="stylesheet">
  
  <style>
    /* ==========================================================================
       ESTILOS CSS INLINE - CASA DAS CORES JAGUARUNA
       ========================================================================== */
    :root {
      --primary-yellow: #FFD200;
      --primary-yellow-hover: #E5BD00;
      --primary-red: #D32F2F;
      --primary-red-dark: #B71C1C;
      --primary-green: #25D366;
      --primary-green-hover: #1EBE5D;
      --brand-blue: #0288D1;
      --text-dark: #0F172A;
      --text-muted: #64748B;
      --bg-light: #F8FAFC;
      --bg-card: #FFFFFF;
      --border-color: #E2E8F0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      color: var(--text-dark);
      background-color: var(--bg-light);
      line-height: 1.6;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    h1, h2, h3, h4, .font-heading {
      font-family: 'Outfit', sans-serif;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.25rem;
    }

    /* Top Bar */
    .top-bar {
      background: linear-gradient(90deg, #FFB300, #FFD54F, #FFB300);
      color: #0F172A;
      font-size: 0.75rem;
      font-weight: 800;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .top-badge {
      background: #0F172A;
      color: #FFE082;
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.7rem;
    }

    /* Header & Nav */
    header {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 50;
      box-shadow: 0 2px 4px rgba(0,0,0,0.03);
    }

    .nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 78px;
    }

    .brand-wrap {
      display: flex;
      align-items: center;
      gap: 0.85rem;
      cursor: pointer;
    }

    .brand-logo-img {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #E69500;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .brand-title {
      font-size: 1.5rem;
      font-weight: 900;
      color: #0F172A;
      line-height: 1;
      letter-spacing: -0.5px;
    }

    .brand-subtitle {
      font-size: 0.7rem;
      font-weight: 800;
      color: var(--primary-red);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .btn-google {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 0.95rem;
      font-size: 0.8rem;
      font-weight: 700;
      border-radius: 0.75rem;
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-google:hover {
      background: #F1F5F9;
      border-color: #94A3B8;
    }

    .btn-whatsapp-header {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, var(--primary-green), #1DA851);
      color: #FFFFFF;
      font-weight: 800;
      font-size: 0.82rem;
      padding: 0.65rem 1.1rem;
      border-radius: 0.75rem;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35);
      transition: transform 0.2s;
    }

    .btn-whatsapp-header:hover {
      transform: translateY(-2px);
    }

    /* Admin Panel */
    #admin-panel {
      display: none;
      background: linear-gradient(180deg, #FEF3C7 0%, #FFFFFF 100%);
      padding: 3rem 0;
      border-bottom: 4px solid #F59E0B;
    }

    .admin-card {
      background: #FFFFFF;
      border: 2px solid #F59E0B;
      border-radius: 1.5rem;
      padding: 2.2rem;
      box-shadow: 0 20px 40px rgba(245, 158, 11, 0.15);
    }

    .admin-header {
      background: #0F172A;
      color: white;
      padding: 1.3rem;
      border-radius: 1rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .admin-badge {
      background: #22C55E;
      color: white;
      padding: 3px 10px;
      border-radius: 99px;
      font-size: 0.75rem;
      font-weight: 800;
      display: inline-block;
      margin-bottom: 4px;
    }

    .admin-form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }

    @media (min-width: 768px) {
      .admin-form-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .form-group label {
      font-size: 0.8rem;
      font-weight: 800;
      color: #334155;
    }

    .form-group input, .form-group textarea {
      padding: 0.8rem 1rem;
      border-radius: 0.75rem;
      border: 1px solid #CBD5E1;
      font-size: 0.9rem;
      font-family: inherit;
      width: 100%;
    }

    .form-group input:focus, .form-group textarea:focus {
      outline: none;
      border-color: #F59E0B;
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25);
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .btn-save-admin {
      background: #16A34A;
      color: white;
      font-weight: 900;
      padding: 0.9rem 2.2rem;
      border-radius: 0.75rem;
      border: none;
      font-size: 1rem;
      cursor: pointer;
      box-shadow: 0 6px 15px rgba(22, 163, 74, 0.3);
      transition: all 0.2s;
    }

    .btn-save-admin:hover {
      background: #15803D;
      transform: translateY(-2px);
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(180deg, rgba(255, 210, 0, 0.15) 0%, rgba(248, 250, 252, 1) 100%);
      padding: 4rem 0;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
      align-items: center;
    }

    @media (min-width: 900px) {
      .hero-grid {
        grid-template-columns: 1.15fr 0.85fr;
      }
    }

    .hero-pill {
      display: inline-block;
      background: #FFE082;
      color: #78350F;
      font-weight: 800;
      font-size: 0.75rem;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      margin-bottom: 1rem;
      border: 1px solid #FCD34D;
    }

    .hero-title {
      font-size: 2.8rem;
      font-weight: 900;
      line-height: 1.15;
      color: #0F172A;
      margin-bottom: 1.25rem;
    }

    .hero-title span {
      color: var(--primary-red);
    }

    .hero-desc {
      font-size: 1.05rem;
      color: var(--text-muted);
      margin-bottom: 2rem;
      line-height: 1.7;
    }

    .hero-btns {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .btn-primary-whats {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      background: linear-gradient(135deg, var(--primary-green), #16A34A);
      color: white;
      font-weight: 900;
      font-size: 1.05rem;
      padding: 1.05rem 2rem;
      border-radius: 1rem;
      box-shadow: 0 10px 22px rgba(37, 211, 102, 0.35);
      transition: all 0.2s;
    }

    .btn-primary-whats:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 26px rgba(37, 211, 102, 0.45);
    }

    .store-hero-card {
      background: white;
      padding: 1rem;
      border-radius: 1.8rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      border: 1px solid var(--border-color);
    }

    .store-hero-img {
      width: 100%;
      height: 360px;
      object-fit: cover;
      border-radius: 1.4rem;
      display: block;
    }

    /* Brands Showcase */
    .brands-section {
      background: #FFFFFF;
      padding: 3rem 0;
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
    }

    .brands-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-top: 1.8rem;
    }

    .brand-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 1.4rem;
      padding: 1.5rem;
      text-align: center;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

    .brand-card:hover {
      border-color: #F59E0B;
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.06);
    }

    .brand-logo-img {
      max-height: 80px;
      max-width: 100%;
      object-fit: contain;
      margin: 0.5rem auto;
    }

    .brand-card h4 {
      font-size: 1.25rem;
      font-weight: 900;
      margin-top: 0.5rem;
    }

    .brand-card p {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 0.25rem;
      font-weight: 600;
    }

    /* Galeria com as Fotos Reais Enviadas */
    .gallery-section {
      padding: 4.5rem 0;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
      gap: 1.8rem;
      margin-top: 2rem;
    }

    .gallery-card {
      background: white;
      border-radius: 1.4rem;
      overflow: hidden;
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
      transition: transform 0.2s;
      display: flex;
      flex-direction: column;
    }

    .gallery-card:hover {
      transform: translateY(-4px);
    }

    .gallery-card img {
      width: 100%;
      height: 240px;
      object-fit: cover;
      display: block;
      background: #F1F5F9;
    }

    .gallery-card-body {
      padding: 1.25rem;
      flex: 1;
    }

    .gallery-card-body h4 {
      font-weight: 800;
      font-size: 1.05rem;
      color: #0F172A;
    }

    .gallery-card-body p {
      font-size: 0.85rem;
      color: #64748B;
      margin-top: 0.25rem;
    }

    /* Linhas de Produtos */
    .products-section {
      padding: 4.5rem 0;
      background: #FFFFFF;
      border-top: 1px solid var(--border-color);
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .product-card {
      background: #F8FAFC;
      border: 1px solid var(--border-color);
      border-radius: 1.4rem;
      padding: 1.75rem;
      transition: all 0.2s;
    }

    .product-card:hover {
      border-color: #F59E0B;
      background: #FFFFFF;
      box-shadow: 0 10px 25px rgba(0,0,0,0.06);
    }

    .product-card h3 {
      font-size: 1.2rem;
      font-weight: 900;
      margin-bottom: 0.5rem;
      color: #0F172A;
    }

    .product-card ul {
      list-style: none;
      margin-top: 1rem;
      font-size: 0.85rem;
      color: #475569;
    }

    .product-card li {
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .product-card li::before {
      content: "✔";
      color: #16A34A;
      font-weight: bold;
    }

    /* Localização & Mapa */
    .location-section {
      padding: 4.5rem 0;
      background: #F8FAFC;
      border-top: 1px solid var(--border-color);
    }

    .location-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-top: 2.2rem;
    }

    @media (min-width: 900px) {
      .location-grid {
        grid-template-columns: 1fr 1.3fr;
      }
    }

    .info-card {
      background: #FFFFFF;
      border-radius: 1.5rem;
      padding: 2.2rem;
      border: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    }

    .map-frame {
      width: 100%;
      height: 400px;
      border-radius: 1.5rem;
      border: 2px solid var(--border-color);
    }

    /* Footer */
    footer {
      background: #0F172A;
      color: #94A3B8;
      padding: 4rem 0 2rem;
      border-top: 4px solid var(--primary-yellow);
    }

    .footer-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2.5rem;
      margin-bottom: 2.5rem;
    }

    .social-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 0.85rem;
      background: #1E293B;
      color: white;
      font-size: 1.25rem;
      margin-right: 0.5rem;
      transition: all 0.2s;
    }

    .social-btn:hover {
      background: var(--primary-yellow);
      color: #0F172A;
      transform: translateY(-3px);
    }

    /* Floating WhatsApp Button */
    .floating-whatsapp {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 64px;
      height: 64px;
      background: #25D366;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 12px 28px rgba(37, 211, 102, 0.45);
      z-index: 99;
      cursor: pointer;
      transition: transform 0.2s;
      border: 2px solid white;
    }

    .floating-whatsapp:hover {
      transform: scale(1.1);
    }

    /* Modal Google */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(4px);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .modal-box {
      background: white;
      border-radius: 1.5rem;
      max-width: 450px;
      width: 100%;
      padding: 2.2rem;
      box-shadow: 0 25px 50px rgba(0,0,0,0.25);
    }
  </style>
</head>
<body>

  <!-- Barra Superior -->
  <div class="top-bar">
    <div>
      <span class="top-badge">JAGUARUNA - SC</span>
      <span id="display-slogan">🎨 ${config.slogan} • ${config.ramo}</span>
    </div>
    <div>
      <span>Telefone: <strong id="display-phone-top">${config.telefoneFixo}</strong></span>
    </div>
  </div>

  <!-- Cabeçalho -->
  <header>
    <div class="container nav-container">
      <div class="brand-wrap" onclick="window.scrollTo({top:0, behavior:'smooth'})">
        <!-- Logo Casa das Cores -->
        <img 
          id="header-main-logo"
          src="/IMG-20260930-WA0016.svg" 
          alt="Logomarca Casa das Cores" 
          class="brand-logo-img"
          style="width: 48px; height: 48px; object-fit: contain;"
        >
        <div>
          <div class="brand-title" id="display-store-name">${config.nome}</div>
          <div class="brand-subtitle">Pinturas e Acabamentos</div>
        </div>
      </div>

      <div class="nav-actions">
        <!-- Botão Entrar com Google -->
        <button class="btn-google" id="btn-login-google" onclick="abrirModalGoogle()">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span id="google-btn-text">Entrar com Google</span>
        </button>

        <!-- Botão WhatsApp Topo -->
        <a id="link-whats-top" href="https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.mensagemPadraoWhats)}" target="_blank" class="btn-whatsapp-header">
          <span>WhatsApp Oficial</span>
        </a>
      </div>
    </div>
  </header>

  <!-- ========================================================================= -->
  <!-- PAINEL DE EDIÇÃO (OCULTO POR PADRÃO - VISÍVEL APENAS PARA O PROPRIETÁRIO) -->
  <!-- ========================================================================= -->
  <section id="admin-panel">
    <div class="container">
      <div class="admin-card">
        <div class="admin-header">
          <div>
            <span class="admin-badge">SESSÃO DE PROPRIETÁRIO ATIVA</span>
            <h3 style="font-size: 1.5rem; font-weight: 900;">Painel de Edição da Loja</h3>
            <p style="font-size: 0.82rem; color: #94A3B8;">E-mail autenticado: <strong id="admin-user-email">${config.emailProprietario}</strong></p>
          </div>
          <div>
            <button onclick="fazerLogout()" style="background: #EF4444; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 800; cursor: pointer;">
              Sair do Painel
            </button>
          </div>
        </div>

        <form id="form-edicao-loja" onsubmit="salvarAlteracoesLoja(event)">
          <div class="admin-form-grid">
            <div class="form-group">
              <label>Nome da Loja:</label>
              <input type="text" id="input-nome" value="${config.nome}" required>
            </div>

            <div class="form-group">
              <label>Slogan da Loja:</label>
              <input type="text" id="input-slogan" value="${config.slogan}" required>
            </div>

            <div class="form-group">
              <label>WhatsApp (com código do país e DDD, ex: 554836241961):</label>
              <input type="text" id="input-whatsapp" value="${config.whatsapp}" required>
            </div>

            <div class="form-group">
              <label>Telefone Fixo:</label>
              <input type="text" id="input-telefone-fixo" value="${config.telefoneFixo}" required>
            </div>

            <div class="form-group">
              <label>Link do Instagram:</label>
              <input type="url" id="input-instagram" value="${config.instagram}" required>
            </div>

            <div class="form-group">
              <label>Link do Facebook:</label>
              <input type="url" id="input-facebook" value="${config.facebook}" required>
            </div>

            <div class="form-group full-width">
              <label>Endereço e Descrição Local:</label>
              <input type="text" id="input-endereco" value="${config.endereco}" required>
            </div>

            <div class="form-group full-width">
              <label>Link do Google Maps:</label>
              <input type="url" id="input-google-maps" value="${config.googleMapsUrl}" required>
            </div>

            <div class="form-group full-width">
              <label>Texto Descritivo do Negócio:</label>
              <textarea id="input-descricao" rows="4" required>${config.descricao}</textarea>
            </div>

            <div class="form-group full-width" style="background: #FFFBEB; padding: 14px; border-radius: 12px; border: 1px solid #FCD34D;">
              <label style="font-weight: 800; color: #92400E; display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                <span>🖼️ Logomarca Oficial da Loja:</span>
                <span id="label-logo-status" style="font-size: 0.75rem; color: #16A34A; font-weight: bold;">Logo Padrão Ativa</span>
              </label>
              <p style="font-size: 0.75rem; color: #78350F; margin-bottom: 8px;">Envie sua imagem de logo para substituir a logo em todo o cabeçalho e rodapé.</p>
              <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                <label style="background: #0F172A; color: white; padding: 8px 16px; border-radius: 8px; font-size: 0.8rem; font-weight: 800; cursor: pointer;">
                  📸 Enviar Imagem da Logo
                  <input type="file" accept="image/*" style="display: none;" onchange="carregarFotoLogo(event)">
                </label>
                <button type="button" onclick="restaurarFotoLogo()" style="background: white; border: 1px solid #CBD5E1; color: #DC2626; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer;">
                  Restaurar Logo Padrão Oficial
                </button>
              </div>
            </div>

            <div class="form-group full-width" style="margin-top: 1rem; display: flex; justify-content: flex-end;">
              <button type="submit" class="btn-save-admin">
                💾 Salvar Todas as Alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>

  <!-- Hero Section -->
  <section class="hero-section">
    <div class="container hero-grid">
      <div>
        <span class="hero-pill">✨ O MELHOR E MAIS BARATO PARA VOCÊ</span>
        <h1 class="hero-title">
          Sua Casa com as <span>Melhores Cores</span> e o Menor Preço.
        </h1>
        <p class="hero-desc" id="display-desc-hero">
          ${config.descricao}
        </p>

        <div class="hero-btns">
          <a id="btn-hero-whats" href="https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.mensagemPadraoWhats)}" target="_blank" class="btn-primary-whats">
            <span>💬 Chamar no WhatsApp Agora</span>
          </a>
        </div>
      </div>

      <div>
        <!-- Card de Identidade Oficial da Loja Física -->
        <div class="store-hero-card" id="hero-fachada-card">
          <div id="hero-fachada-container" style="text-align: center; padding: 2rem 1.5rem; background: linear-gradient(135deg, rgba(255,206,0,0.15), rgba(254,243,199,0.5)); border-radius: 1.4rem; border: 2px solid #FCD34D;">
            <img src="/IMG-20260930-WA0016.svg" alt="Casa das Cores" style="width: 120px; height: 120px; margin: 0 auto 1rem; display: block; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));" id="hero-main-logo">
            <span style="display: inline-block; background: #FFCE00; color: #0F172A; font-size: 0.75rem; font-weight: 900; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase;">
              Jaguaruna - Santa Catarina
            </span>
            <h3 style="font-size: 1.5rem; font-weight: 900; margin-top: 0.5rem; color: #0F172A;">${config.nome}</h3>
            <p style="font-size: 0.8rem; font-weight: 800; color: #B45309; text-transform: uppercase;">${config.slogan}</p>
            <div style="background: white; border: 1px solid #FDE68A; border-radius: 12px; padding: 10px; margin: 1rem 0; text-align: left;">
              <span style="font-size: 0.68rem; font-weight: 800; color: #64748B; text-transform: uppercase; display: block;">Horário de Funcionamento:</span>
              <strong style="font-size: 0.85rem; color: #0F172A;">${config.horario}</strong>
            </div>
            <div style="display: flex; gap: 8px;">
              <a href="#localizacao" style="flex: 1; background: #0F172A; color: white; padding: 10px; border-radius: 10px; font-size: 0.8rem; font-weight: 800; text-align: center; text-decoration: none;">
                📍 Ver no Mapa
              </a>
              <label style="flex: 1; background: #FFCE00; color: #0F172A; padding: 10px; border-radius: 10px; font-size: 0.8rem; font-weight: 800; text-align: center; cursor: pointer; border: 1px solid #F59E0B;">
                📸 Enviar Foto Fachada
                <input type="file" accept="image/*" style="display: none;" onchange="carregarFotoFachada(event)">
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Marcas Parceiras (Logos Reais Enviados) -->
  <section class="brands-section">
    <div class="container">
      <div style="text-align: center;">
        <span style="font-size: 0.75rem; font-weight: 800; color: #D97706; text-transform: uppercase;">Parcerias de Confiança</span>
        <h2 style="font-size: 2rem; font-weight: 900; margin-top: 0.25rem;">Trabalhamos com as Maiores Marcas</h2>
      </div>

      <div class="brands-grid">
        <div class="brand-card">
          <img src="/IMG-20260930-WA0015.svg" alt="Suvinil" class="brand-logo-img">
          <h4 style="color: #DC2626;">Suvinil</h4>
          <p>Renovar é fácil. É só querer.</p>
        </div>
        <div class="brand-card">
          <img src="/IMG-20260930-WA0017.svg" alt="Coral" class="brand-logo-img">
          <h4 style="color: #2563EB;">Coral</h4>
          <p>Tudo de cor para você.</p>
        </div>
        <div class="brand-card">
          <img src="/IMG-20260930-WA0013.svg" alt="Anjo Tintas" class="brand-logo-img">
          <h4 style="color: #991B1B;">Anjo Tintas</h4>
          <p>Aprovada pelo tempo.</p>
        </div>
        <div class="brand-card">
          <img src="/IMG-20260930-WA0014.svg" alt="Eucatex" class="brand-logo-img">
          <h4 style="color: #7E22CE;">Eucatex</h4>
          <p>Simplesmente qualidade.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Ofertas da Semana & Destaques -->
  <section class="promotions-section" id="ofertas" style="background: linear-gradient(180deg, #FFFFFF 0%, #FFFBEB 100%); padding: 4rem 0; border-top: 1px solid #FDE68A; border-bottom: 1px solid #FDE68A;">
    <div class="container">
      <div style="text-align: center; max-width: 650px; margin: 0 auto 2.5rem;">
        <span style="background: #DC2626; color: white; font-size: 0.75rem; font-weight: 900; padding: 4px 14px; border-radius: 9999px; text-transform: uppercase;">
          🔥 Ofertas da Semana & Destaques
        </span>
        <h2 style="font-size: 2.2rem; font-weight: 900; margin-top: 0.5rem; color: #0F172A;">
          O Menor Preço de Jaguaruna em <span style="color: #DC2626;">Promoção</span>
        </h2>
        <p style="color: #64748B; font-size: 0.9rem; margin-top: 0.25rem;">
          Tintas originais de fábrica com pronta-entrega. Garanta seu desconto direto no WhatsApp!
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
        <div style="background: white; border-radius: 1.4rem; padding: 1.25rem; border: 2px solid #FDE68A; box-shadow: 0 4px 14px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 4px;">
              <div style="display: flex; gap: 4px; align-items: center;">
                <span style="background: #FEF3C7; color: #92400E; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 6px;">Suvinil</span>
                <span style="background: #0F172A; color: #FCD34D; font-size: 0.68rem; font-weight: 900; font-family: monospace; padding: 2px 6px; border-radius: 6px;">Cód: SUV-18L</span>
              </div>
              <span style="background: #DC2626; color: white; font-size: 0.7rem; font-weight: 900; padding: 2px 8px; border-radius: 9999px;">-15% OFF</span>
            </div>
            <h4 style="font-size: 1.1rem; font-weight: 900; color: #0F172A;">Suvinil Clássica Acrílico Fosco 18L</h4>
            <p style="font-size: 0.8rem; color: #64748B; margin-top: 0.25rem;">Rende até 500m² por demão. Toque aveludado e sem cheiro em 3 horas.</p>
          </div>
          <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #F1F5F9;">
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 0.8rem; color: #94A3B8; text-decoration: line-through;">R$ 389,90</span>
              <strong style="font-size: 1.5rem; color: #16A34A; font-weight: 900;">R$ 329,90</strong>
            </div>
            <a href="https://wa.me/${config.whatsapp}?text=Olá! Vi a oferta da Suvinil Clássica 18L (Cód: SUV-18L) por R$ 329,90 no site e quero garantir o meu!" target="_blank" style="display: block; text-align: center; background: #25D366; color: white; font-weight: 800; font-size: 0.8rem; padding: 10px; border-radius: 10px; margin-top: 0.75rem; text-decoration: none;">
              Garantir Oferta no WhatsApp
            </a>
          </div>
        </div>

        <div style="background: white; border-radius: 1.4rem; padding: 1.25rem; border: 2px solid #FDE68A; box-shadow: 0 4px 14px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 4px;">
              <div style="display: flex; gap: 4px; align-items: center;">
                <span style="background: #FEE2E2; color: #991B1B; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 6px;">Anjo</span>
                <span style="background: #0F172A; color: #FCD34D; font-size: 0.68rem; font-weight: 900; font-family: monospace; padding: 2px 6px; border-radius: 6px;">Cód: ANJ-EMB18</span>
              </div>
              <span style="background: #DC2626; color: white; font-size: 0.7rem; font-weight: 900; padding: 2px 8px; border-radius: 9999px;">-16% OFF</span>
            </div>
            <h4 style="font-size: 1.1rem; font-weight: 900; color: #0F172A;">Anjo Emborrachada Fachadas 18L</h4>
            <p style="font-size: 0.8rem; color: #64748B; margin-top: 0.25rem;">Membrana elástica impermeável contra umidade, mofo e microfissuras.</p>
          </div>
          <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #F1F5F9;">
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 0.8rem; color: #94A3B8; text-decoration: line-through;">R$ 429,90</span>
              <strong style="font-size: 1.5rem; color: #16A34A; font-weight: 900;">R$ 359,90</strong>
            </div>
            <a href="https://wa.me/${config.whatsapp}?text=Olá! Vi a oferta da Tinta Emborrachada Anjo 18L (Cód: ANJ-EMB18) por R$ 359,90 no site e quero garantir o meu!" target="_blank" style="display: block; text-align: center; background: #25D366; color: white; font-weight: 800; font-size: 0.8rem; padding: 10px; border-radius: 10px; margin-top: 0.75rem; text-decoration: none;">
              Garantir Oferta no WhatsApp
            </a>
          </div>
        </div>

        <div style="background: white; border-radius: 1.4rem; padding: 1.25rem; border: 2px solid #FDE68A; box-shadow: 0 4px 14px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 4px;">
              <div style="display: flex; gap: 4px; align-items: center;">
                <span style="background: #DBEAFE; color: #1E40AF; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 6px;">Coral</span>
                <span style="background: #0F172A; color: #FCD34D; font-size: 0.68rem; font-weight: 900; font-family: monospace; padding: 2px 6px; border-radius: 6px;">Cód: COR-REND18</span>
              </div>
              <span style="background: #DC2626; color: white; font-size: 0.7rem; font-weight: 900; padding: 2px 8px; border-radius: 9999px;">-17% OFF</span>
            </div>
            <h4 style="font-size: 1.1rem; font-weight: 900; color: #0F172A;">Coral Rende Muito Acrílico 18L</h4>
            <p style="font-size: 0.8rem; color: #64748B; margin-top: 0.25rem;">Super diluição com máxima cobertura e brancura para áreas internas e externas.</p>
          </div>
          <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #F1F5F9;">
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 0.8rem; color: #94A3B8; text-decoration: line-through;">R$ 349,90</span>
              <strong style="font-size: 1.5rem; color: #16A34A; font-weight: 900;">R$ 289,90</strong>
            </div>
            <a href="https://wa.me/${config.whatsapp}?text=Olá! Vi a oferta da Coral Rende Muito 18L (Cód: COR-REND18) por R$ 289,90 no site e quero garantir o meu!" target="_blank" style="display: block; text-align: center; background: #25D366; color: white; font-weight: 800; font-size: 0.8rem; padding: 10px; border-radius: 10px; margin-top: 0.75rem; text-decoration: none;">
              Garantir Oferta no WhatsApp
            </a>
          </div>
        </div>

        <div style="background: white; border-radius: 1.4rem; padding: 1.25rem; border: 2px solid #FDE68A; box-shadow: 0 4px 14px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 4px;">
              <div style="display: flex; gap: 4px; align-items: center;">
                <span style="background: #FFEDD5; color: #9A3412; font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 6px;">Atlas</span>
                <span style="background: #0F172A; color: #FCD34D; font-size: 0.68rem; font-weight: 900; font-family: monospace; padding: 2px 6px; border-radius: 6px;">Cód: KIT-ATL01</span>
              </div>
              <span style="background: #DC2626; color: white; font-size: 0.7rem; font-weight: 900; padding: 2px 8px; border-radius: 9999px;">-33% OFF</span>
            </div>
            <h4 style="font-size: 1.1rem; font-weight: 900; color: #0F172A;">Kit Pintura Profissional Atlas</h4>
            <p style="font-size: 0.8rem; color: #64748B; margin-top: 0.25rem;">Rolo Antigota 23cm + Suporte + Bandeja + Trincha Especial + Fita Crepe.</p>
          </div>
          <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #F1F5F9;">
            <div style="display: flex; align-items: baseline; gap: 8px;">
              <span style="font-size: 0.8rem; color: #94A3B8; text-decoration: line-through;">R$ 89,90</span>
              <strong style="font-size: 1.5rem; color: #16A34A; font-weight: 900;">R$ 59,90</strong>
            </div>
            <a href="https://wa.me/${config.whatsapp}?text=Olá! Vi o Kit de Pintura Atlas (Cód: KIT-ATL01) por R$ 59,90 no site e quero garantir o meu!" target="_blank" style="display: block; text-align: center; background: #25D366; color: white; font-weight: 800; font-size: 0.8rem; padding: 10px; border-radius: 10px; margin-top: 0.75rem; text-decoration: none;">
              Garantir Oferta no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Linhas de Produtos -->
  <section class="products-section">
    <div class="container">
      <div style="text-align: center; margin-bottom: 2rem;">
        <span style="font-size: 0.75rem; font-weight: 800; color: #DC2626; text-transform: uppercase;">Linhas de Produtos</span>
        <h2 style="font-size: 2rem; font-weight: 900;">Tudo para a Sua Pintura e Reforma</h2>
      </div>

      <div class="products-grid">
        <div class="product-card">
          <h3>Tintas Imobiliárias</h3>
          <p style="font-size: 0.85rem; color: #64748B;">Para salas, quartos, cozinhas e tetos.</p>
          <ul>
            <li>Acrílicos Fosco, Acetinado e Semibrilho</li>
            <li>Tintas Super Laváveis</li>
            <li>Massas Corridas e Acrílicas</li>
            <li>Linha Gesso & Drywall</li>
          </ul>
        </div>

        <div class="product-card">
          <h3>Fachadas & Muros</h3>
          <p style="font-size: 0.85rem; color: #64748B;">Proteção máxima contra chuva e intempéries.</p>
          <ul>
            <li>Tintas Emborrachadas elásticas</li>
            <li>Seladores e Fundos Preparadores</li>
            <li>Texturas Rústicas e Grafiatos</li>
            <li>Impermeabilizantes de Lajes e Paredes</li>
          </ul>
        </div>

        <div class="product-card">
          <h3>Madeiras & Metais</h3>
          <p style="font-size: 0.85rem; color: #64748B;">Acabamento e durabilidade superior.</p>
          <ul>
            <li>Vernizes Marítimos com Filtro Solar</li>
            <li>Stains Protetores impregnantes</li>
            <li>Esmaltes Sintéticos brilhantes e foscos</li>
            <li>Fundos Antioxidantes</li>
          </ul>
        </div>

        <div class="product-card">
          <h3>Ferramentas Atlas</h3>
          <p style="font-size: 0.85rem; color: #64748B;">Acessórios para um acabamento perfeito.</p>
          <ul>
            <li>Rolos de Lã Antigotas e Espuma</li>
            <li>Trinchas e Pincéis profissionais</li>
            <li>Fitas Crepe e Lixas</li>
            <li>Bandejas e Espátulas</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Galeria com as Fotos Reais da Loja -->
  <section class="gallery-section">
    <div class="container">
      <div style="text-align: center;">
        <span style="font-size: 0.75rem; font-weight: 800; color: #D97706; text-transform: uppercase;">Nossa Estrutura em Jaguaruna</span>
        <h2 style="font-size: 2rem; font-weight: 900; margin-top: 0.25rem;">Fotos Reais da Casa das Cores</h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.5rem;">
          Estacionamento próprio amplo, corredores organizados e atendimento consultivo.
        </p>
      </div>

      <div class="gallery-grid" id="gallery-grid-container">
        <div class="gallery-card">
          <img src="${config.fotoLogo || '/IMG-20260930-WA0016.svg'}" alt="Logomarca Oficial Casa das Cores" style="object-fit: contain; padding: 1.5rem; background: #FFFBEB;">
          <div class="gallery-card-body">
            <h4>Logomarca Oficial Casa das Cores</h4>
            <p>O melhor e mais barato para você em pinturas e acabamentos. Fone: (48) 3624-1961.</p>
          </div>
        </div>

        <div class="gallery-card">
          <img src="/IMG-20260930-WA0015.svg" alt="Suvinil Tintas" style="object-fit: contain; padding: 1.5rem; background: #FFF7ED;">
          <div class="gallery-card-body">
            <h4>Suvinil Tintas</h4>
            <p>Renovar é fácil. É só querer. Linha imobiliária completa.</p>
          </div>
        </div>

        <div class="gallery-card">
          <img src="/IMG-20260930-WA0017.svg" alt="Coral Tintas" style="object-fit: contain; padding: 1.5rem; background: #EFF6FF;">
          <div class="gallery-card-body">
            <h4>Coral Tintas</h4>
            <p>Tudo de cor para você. Proteção de alta resistência e beleza.</p>
          </div>
        </div>

        <div class="gallery-card">
          <img src="/IMG-20260930-WA0013.svg" alt="Anjo Tintas" style="object-fit: contain; padding: 1.5rem; background: #FEF2F2;">
          <div class="gallery-card-body">
            <h4>Anjo Tintas</h4>
            <p>Aprovada pelo tempo. Qualidade máxima em tintas e vernizes.</p>
          </div>
        </div>

        <div class="gallery-card">
          <img src="/IMG-20260930-WA0014.svg" alt="Eucatex Tintas" style="object-fit: contain; padding: 1.5rem; background: #FAF5FF;">
          <div class="gallery-card-body">
            <h4>Eucatex Tintas</h4>
            <p>Simplesmente qualidade. O melhor custo-benefício para sua obra.</p>
          </div>
        </div>

        <div class="gallery-card" style="border: 2px dashed #CBD5E1; background: #F8FAFC; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 2rem 1.5rem;">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">📸</div>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: #0F172A;">Fotos Reais da Sua Loja</h4>
          <p style="font-size: 0.8rem; color: #64748B; margin: 0.5rem 0 1rem;">Envie as fotos da fachada e do interior para exibir aos clientes.</p>
          <label style="background: #0F172A; color: white; padding: 8px 16px; border-radius: 10px; font-size: 0.8rem; font-weight: 800; cursor: pointer;">
            Carregar Foto Real
            <input type="file" accept="image/*" style="display: none;" onchange="carregarFotoGaleria(event)">
          </label>
        </div>
      </div>
    </div>
  </section>

  <!-- Localização e Mapa Incorporado -->
  <section class="location-section">
    <div class="container">
      <div style="text-align: center; margin-bottom: 2rem;">
        <span style="font-size: 0.75rem; font-weight: 800; color: #16A34A; text-transform: uppercase;">Como Chegar</span>
        <h2 style="font-size: 2rem; font-weight: 900; margin-top: 0.25rem;">Nossa Localização em Jaguaruna - SC</h2>
      </div>

      <div class="location-grid">
        <div class="info-card">
          <div>
            <h4 style="font-size: 1.25rem; font-weight: 900; margin-bottom: 0.75rem;">Endereço da Loja:</h4>
            <p id="display-endereco" style="font-size: 1rem; color: #334155; font-weight: 700; margin-bottom: 1.5rem;">
              ${config.endereco}
            </p>

            <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem;">Horário de Funcionamento Real:</h4>
            <p style="font-size: 0.9rem; color: #1E293B; font-weight: 700; margin-bottom: 1.5rem;">
              Segunda a Sexta: 08:00 às 18:00<br>
              Sábado: 08:00 às 12:00<br>
              <span style="color: #94A3B8; font-size: 0.8rem;">Domingo: Fechado</span>
            </p>

            <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem;">Telefone e WhatsApp:</h4>
            <p style="font-size: 0.85rem; color: #64748B;">
              WhatsApp: <strong id="display-whats-info">+${config.whatsapp}</strong><br>
              Telefone Fixo: <strong id="display-phone-info">${config.telefoneFixo}</strong>
            </p>
          </div>

          <div style="margin-top: 2rem;">
            <a id="link-google-maps" href="${config.googleMapsUrl}" target="_blank" style="display: block; text-align: center; background: #0F172A; color: white; padding: 1rem; border-radius: 0.75rem; font-weight: 800; font-size: 0.95rem;">
              📍 Abrir no Google Maps Oficial
            </a>
          </div>
        </div>

        <div>
          <!-- Iframe Incorporado do Google Maps -->
          <iframe 
            class="map-frame"
            src="https://maps.google.com/maps?q=Jaguaruna+SC+Casa+das+Cores+Tintas&t=&z=15&ie=UTF8&iwloc=&output=embed"
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- Rodapé -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div>
          <h3 id="display-footer-name" style="color: white; font-size: 1.5rem; font-weight: 900;">${config.nome}</h3>
          <p style="font-size: 0.85rem; margin-top: 0.5rem;">${config.slogan} • ${config.ramo}</p>
        </div>

        <div>
          <h4 style="color: white; font-weight: 800; margin-bottom: 1rem;">Redes Sociais Oficiais</h4>
          <div>
            <a id="link-instagram" href="${config.instagram}" target="_blank" class="social-btn" title="Instagram">📸</a>
            <a id="link-facebook" href="${config.facebook}" target="_blank" class="social-btn" title="Facebook">📘</a>
            <a id="link-whats-footer" href="https://wa.me/${config.whatsapp}" target="_blank" class="social-btn" title="WhatsApp">💬</a>
          </div>
        </div>

        <div>
          <h4 style="color: white; font-weight: 800; margin-bottom: 0.5rem;">Acesso Administrativo</h4>
          <p style="font-size: 0.75rem; margin-bottom: 0.75rem;">Exclusivo para o proprietário (${config.emailProprietario}).</p>
          <button onclick="abrirModalGoogle()" style="background: #1E293B; border: 1px solid #334155; color: white; padding: 7px 14px; border-radius: 8px; font-size: 0.75rem; cursor: pointer;">
            Entrar como Proprietário
          </button>
        </div>
      </div>

      <div style="border-top: 1px solid #1E293B; padding-top: 1.5rem; text-align: center; font-size: 0.75rem;">
        © 2026 Casa das Cores. Todos os direitos reservados. Jaguaruna - SC.
      </div>
    </div>
  </footer>

  <!-- Botão Flutuante de WhatsApp -->
  <a id="btn-floating-whats" href="https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.mensagemPadraoWhats)}" target="_blank" class="floating-whatsapp" title="Falar no WhatsApp">
    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.09c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.15.83.84-3.07-.2-.31a8.09 8.09 0 01-1.24-4.28c0-4.47 3.64-8.11 8.11-8.11 2.17 0 4.2.85 5.73 2.38 1.53 1.53 2.38 3.56 2.38 5.73 0 4.47-3.64 8.11-8.22 8.11z"/>
    </svg>
  </a>

  <!-- Modal Google Login -->
  <div class="modal-overlay" id="modal-google">
    <div class="modal-box">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.25rem; font-weight: 900;">Autenticação Google</h3>
        <button onclick="fecharModalGoogle()" style="background: none; border: none; font-size: 1.2rem; cursor: pointer;">✕</button>
      </div>

      <p style="font-size: 0.85rem; color: #64748B; margin-bottom: 1.5rem;">
        O Painel de Edição da loja só é desbloqueado se o e-mail logado for exatamente:<br>
        <strong style="color: #0F172A; font-family: monospace;">${config.emailProprietario}</strong>
      </p>

      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <button onclick="simularLogin('${config.emailProprietario}')" style="background: #F59E0B; color: #0F172A; border: none; padding: 12px; border-radius: 12px; font-weight: 900; font-size: 0.85rem; cursor: pointer;">
          👑 Entrar como Proprietário (${config.emailProprietario})
        </button>

        <button onclick="simularLogin('visitante.cliente@gmail.com')" style="background: #F1F5F9; color: #334155; border: 1px solid #CBD5E1; padding: 10px; border-radius: 12px; font-weight: 700; font-size: 0.85rem; cursor: pointer;">
          👤 Entrar como Visitante (Sem permissão de edição)
        </button>
      </div>
    </div>
  </div>

  <!-- ========================================================================= -->
  <!-- JAVASCRIPT INLINE & ESTRUTURA PARA BANCO DE DADOS (LOCALSTORAGE / FIREBASE)-->
  <!-- ========================================================================= -->
  <script>
    // E-mail oficial do proprietário
    const PROPRIETARIO_EMAIL = "${config.emailProprietario}";

    // Estado da Aplicação
    let estadoLoja = {
      nome: "${config.nome}",
      slogan: "${config.slogan}",
      whatsapp: "${config.whatsapp}",
      telefoneFixo: "${config.telefoneFixo}",
      instagram: "${config.instagram}",
      facebook: "${config.facebook}",
      endereco: "${config.endereco}",
      googleMapsUrl: "${config.googleMapsUrl}",
      descricao: "${config.descricao}",
      usuarioLogado: null
    };

    // 1. Carregar dados do armazenamento local
    function carregarDadosSalvos() {
      const salvo = localStorage.getItem("casa_das_cores_dados_v2");
      if (salvo) {
        try {
          const dadosParsed = JSON.parse(salvo);
          estadoLoja = { ...estadoLoja, ...dadosParsed };
          atualizarInterface();
        } catch (e) {
          console.error("Erro ao carregar dados locais:", e);
        }
      }

      const savedFachada = localStorage.getItem("casadascores_foto_fachada");
      if (savedFachada) {
        const card = document.getElementById("hero-fachada-card");
        if (card) {
          card.innerHTML = '<img class="store-hero-img" src="' + savedFachada + '" alt="Fachada Casa das Cores">';
        }
      }

      /* ========================================================================= */
      /* FIREBASE FIRESTORE: ONDE SINCRONIZAREMOS OS DADOS NO BANCO MAIS TARDE     */
      /* ========================================================================= */
      /*
        // Quando configurar o Firebase Firestore, descomente este bloco:
        // const docRef = doc(db, "configuracoes", "casa_das_cores");
        // onSnapshot(docRef, (docSnap) => {
        //   if (docSnap.exists()) {
        //     estadoLoja = { ...estadoLoja, ...docSnap.data() };
        //     atualizarInterface();
        //   }
        // });
      */
      /* ========================================================================= */
    }

    // 2. Modais e Controle de Sessão Google
    function abrirModalGoogle() {
      document.getElementById("modal-google").style.display = "flex";
    }

    function fecharModalGoogle() {
      document.getElementById("modal-google").style.display = "none";
    }

    function simularLogin(email) {
      estadoLoja.usuarioLogado = email;
      fecharModalGoogle();
      verificarPermissoesProprietario();

      /* ========================================================================= */
      /* FIREBASE AUTH: ONDE EFETUAREMOS A AUTENTICAÇÃO COM GOOGLE MAIS TARDE      */
      /* ========================================================================= */
      /*
        // const provider = new GoogleAuthProvider();
        // signInWithPopup(auth, provider).then((result) => {
        //    estadoLoja.usuarioLogado = result.user.email;
        //    verificarPermissoesProprietario();
        // });
      */
      /* ========================================================================= */
    }

    function fazerLogout() {
      estadoLoja.usuarioLogado = null;
      verificarPermissoesProprietario();
      alert("Sessão desconectada com sucesso.");
    }

    // 3. Regra de Segurança: Verifica se o e-mail logado é EXATAMENTE o do proprietário
    function verificarPermissoesProprietario() {
      const painel = document.getElementById("admin-panel");
      const btnGoogleText = document.getElementById("google-btn-text");

      if (estadoLoja.usuarioLogado === PROPRIETARIO_EMAIL) {
        // Mostra o Painel de Edição
        painel.style.display = "block";
        btnGoogleText.innerText = "Proprietário Conectado";
        btnGoogleText.parentElement.style.borderColor = "#16A34A";
        btnGoogleText.parentElement.style.color = "#16A34A";
        painel.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Oculta o Painel de Edição
        painel.style.display = "none";
        if (estadoLoja.usuarioLogado) {
          btnGoogleText.innerText = estadoLoja.usuarioLogado;
          alert("Acesso Visitante: O Painel de Edição só é visível para o proprietário (" + PROPRIETARIO_EMAIL + ").");
        } else {
          btnGoogleText.innerText = "Entrar com Google";
          btnGoogleText.parentElement.style.borderColor = "#CBD5E1";
          btnGoogleText.parentElement.style.color = "#1E293B";
        }
      }
    }

    // 4. Salvar Alterações
    function salvarAlteracoesLoja(e) {
      e.preventDefault();

      if (estadoLoja.usuarioLogado !== PROPRIETARIO_EMAIL) {
        alert("Ação não autorizada. Apenas o proprietário pode salvar dados.");
        return;
      }

      estadoLoja.nome = document.getElementById("input-nome").value;
      estadoLoja.slogan = document.getElementById("input-slogan").value;
      estadoLoja.whatsapp = document.getElementById("input-whatsapp").value;
      estadoLoja.telefoneFixo = document.getElementById("input-telefone-fixo").value;
      estadoLoja.instagram = document.getElementById("input-instagram").value;
      estadoLoja.facebook = document.getElementById("input-facebook").value;
      estadoLoja.endereco = document.getElementById("input-endereco").value;
      estadoLoja.googleMapsUrl = document.getElementById("input-google-maps").value;
      estadoLoja.descricao = document.getElementById("input-descricao").value;

      // Persistência local imediata
      localStorage.setItem("casa_das_cores_dados_v2", JSON.stringify(estadoLoja));

      /* ========================================================================= */
      /* FIREBASE FIRESTORE: ONDE SALVAREMOS OS DADOS NO BANCO MAIS TARDE          */
      /* ========================================================================= */
      /*
        // await setDoc(doc(db, "configuracoes", "casa_das_cores"), estadoLoja, { merge: true });
        // console.log("Dados gravados com sucesso no Firebase Firestore!");
      */
      /* ========================================================================= */

      atualizarInterface();
      alert("✅ Informações da loja atualizadas com sucesso!");
    }

    // 5. Atualizar DOM em tempo real
    function atualizarInterface() {
      document.getElementById("display-store-name").innerText = estadoLoja.nome;
      document.getElementById("display-footer-name").innerText = estadoLoja.nome;
      document.getElementById("display-slogan").innerText = "🎨 " + estadoLoja.slogan;
      document.getElementById("display-desc-hero").innerText = estadoLoja.descricao;
      document.getElementById("display-endereco").innerText = estadoLoja.endereco;
      document.getElementById("display-phone-top").innerText = estadoLoja.telefoneFixo;
      document.getElementById("display-phone-info").innerText = estadoLoja.telefoneFixo;
      document.getElementById("display-whats-info").innerText = "+" + estadoLoja.whatsapp;

      const whatsUrl = "https://wa.me/" + estadoLoja.whatsapp + "?text=Olá! Vim pelo site da Casa das Cores e gostaria de um orçamento.";
      document.getElementById("link-whats-top").href = whatsUrl;
      document.getElementById("btn-hero-whats").href = whatsUrl;
      document.getElementById("btn-floating-whats").href = whatsUrl;
      document.getElementById("link-whats-footer").href = "https://wa.me/" + estadoLoja.whatsapp;

      document.getElementById("link-instagram").href = estadoLoja.instagram;
      document.getElementById("link-facebook").href = estadoLoja.facebook;
      document.getElementById("link-google-maps").href = estadoLoja.googleMapsUrl;
    }

    // 6. Carregar Fotos Reais
    function carregarFotoFachada(event) {
      const file = event.target.files && event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const dataUrl = e.target.result;
          localStorage.setItem("casadascores_foto_fachada", dataUrl);
          const card = document.getElementById("hero-fachada-card");
          if (card) {
            card.innerHTML = '<img class="store-hero-img" src="' + dataUrl + '" alt="Fachada Casa das Cores em Jaguaruna SC">';
          }
          alert("✅ Foto da Fachada atualizada com sucesso!");
        };
        reader.readAsDataURL(file);
      }
    }

    function carregarFotoGaleria(event) {
      const file = event.target.files && event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const dataUrl = e.target.result;
          const container = document.getElementById("gallery-grid-container");
          if (container) {
            const newCard = document.createElement("div");
            newCard.className = "gallery-card";
            newCard.innerHTML = '<img src="' + dataUrl + '" style="width: 100%; height: 240px; object-fit: cover; display: block;"><div class="gallery-card-body"><h4>Foto Real da Loja</h4><p>Fachada e estrutura da Casa das Cores em Jaguaruna - SC.</p></div>';
            container.insertBefore(newCard, container.firstChild);
          }
          alert("✅ Foto adicionada à galeria com sucesso!");
        };
        reader.readAsDataURL(file);
      }
    }

    // 7. Carregar Logomarca da Loja
    function carregarFotoLogo(event) {
      const file = event.target.files && event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const dataUrl = e.target.result;
          localStorage.setItem("casadascores_foto_logo", dataUrl);
          aplicarLogoCustomizada(dataUrl);
          const status = document.getElementById("label-logo-status");
          if (status) {
            status.innerText = "Logo Personalizada Ativa";
            status.style.color = "#2563EB";
          }
          alert("✅ Logomarca da loja atualizada com sucesso!");
        };
        reader.readAsDataURL(file);
      }
    }

    function restaurarFotoLogo() {
      localStorage.removeItem("casadascores_foto_logo");
      aplicarLogoCustomizada("/IMG-20260930-WA0016.svg");
      const status = document.getElementById("label-logo-status");
      if (status) {
        status.innerText = "Logo Padrão Ativa";
        status.style.color = "#16A34A";
      }
      alert("✅ Logomarca padrão restaurada!");
    }

    function aplicarLogoCustomizada(url) {
      const headerLogo = document.getElementById("header-main-logo");
      if (headerLogo) headerLogo.src = url;
      const heroLogo = document.getElementById("hero-main-logo");
      if (heroLogo) heroLogo.src = url;
    }

    window.addEventListener("DOMContentLoaded", () => {
      carregarDadosSalvos();
      const savedLogo = localStorage.getItem("casadascores_foto_logo");
      if (savedLogo) {
        aplicarLogoCustomizada(savedLogo);
        const status = document.getElementById("label-logo-status");
        if (status) {
          status.innerText = "Logo Personalizada Ativa";
          status.style.color = "#2563EB";
        }
      }
    });
  </script>
</body>
</html>`;
}
