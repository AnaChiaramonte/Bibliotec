"use client"

const Footer = () => {
  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <footer className="bg-dark-custom text-white pt-4 w-100 mt-5">
        <div className="container py-4">
          <div className="row">
            {/* Sobre Nós */}
            <div className="col-lg-4 mb-4">
              <h5 className="text-accent-custom border-bottom border-warning pb-2 mb-3">
                <i className="bi bi-info-circle me-2"></i>
                Sobre Nós
              </h5>
              <div className="border-start border-warning ps-3">
                <p className="fst-italic text-light mb-0 lh-base">
                  "Um livro é um sonho que você segura em suas mãos. Cada página virada é uma porta para um novo mundo
                  de emoções."
                </p>
                <small className="text-muted-custom d-block mt-2">
                  <i className="bi bi-heart-fill text-warning me-1"></i>
                  Conectando leitores desde 2024
                </small>
              </div>
            </div>

            {/* Formas de Pagamento */}
            <div className="col-lg-4 mb-4">
              <h5 className="text-accent-custom border-bottom border-warning pb-2 mb-3">
                <i className="bi bi-credit-card me-2"></i>
                Formas de Pagamento
              </h5>
              <div className="row g-2">
                <div className="col-6">
                  <div className="bg-secondary-custom rounded p-2 text-center">
                    <i className="bi bi-credit-card text-warning fs-5 mb-1 d-block"></i>
                    <small className="text-light">Cartão de Crédito</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-secondary-custom rounded p-2 text-center">
                    <i className="bi bi-credit-card-2-front text-warning fs-5 mb-1 d-block"></i>
                    <small className="text-light">Cartão de Débito</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-secondary-custom rounded p-2 text-center">
                    <i className="bi bi-qr-code text-warning fs-5 mb-1 d-block"></i>
                    <small className="text-light">Pix</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-secondary-custom rounded p-2 text-center">
                    <i className="bi bi-file-earmark-text text-warning fs-5 mb-1 d-block"></i>
                    <small className="text-light">Boleto</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Contato e Redes Sociais */}
            <div className="col-lg-4 mb-4">
              {/* Contato */}
              <h5 className="text-accent-custom border-bottom border-warning pb-2 mb-3">
                <i className="bi bi-envelope me-2"></i>
                Contato
              </h5>
              <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-envelope-fill text-warning me-2"></i>
                  <a href="mailto:contato@bibliotec.com.br" className="text-light text-decoration-none">
                    contato@bibliotec.com.br
                  </a>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-telephone-fill text-warning me-2"></i>
                  <span className="text-light">(11) 9999-9999</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-geo-alt-fill text-warning me-2"></i>
                  <span className="text-light">São Paulo, SP</span>
                </div>
              </div>

              {/* Redes Sociais */}
              <h5 className="text-accent-custom border-bottom border-warning pb-2 mb-3">
                <i className="bi bi-share me-2"></i>
                Redes Sociais
              </h5>
              <div className="d-flex gap-3">
                <a
                  href="#"
                  className="btn btn-outline-custom rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                  aria-label="Instagram"
                  title="Siga-nos no Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>

                <a
                  href="#"
                  className="btn btn-outline-custom rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                  aria-label="TikTok"
                  title="Siga-nos no TikTok"
                >
                  <i className="bi bi-tiktok"></i>
                </a>

                <a
                  href="#"
                  className="btn btn-outline-custom rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                  aria-label="Twitter"
                  title="Siga-nos no Twitter"
                >
                  <i className="bi bi-twitter-x"></i>
                </a>

                <a
                  href="#"
                  className="btn btn-outline-custom rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                  aria-label="Facebook"
                  title="Siga-nos no Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>

                <a
                  href="#"
                  className="btn btn-outline-custom rounded-circle p-2 d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                  aria-label="YouTube"
                  title="Inscreva-se no nosso canal"
                >
                  <i className="bi bi-youtube"></i>
                </a>
              </div>

              {/* Newsletter */}
              <div className="mt-4">
                <h6 className="text-accent-custom mb-2">
                  <i className="bi bi-bell me-1"></i>
                  Newsletter
                </h6>
                <div className="input-group input-group-sm">
                  <input
                    type="email"
                    className="form-control border-custom"
                    placeholder="Seu e-mail"
                    aria-label="Email para newsletter"
                  />
                  <button className="btn btn-primary-custom" type="button">
                    <i className="bi bi-send"></i>
                  </button>
                </div>
                <small className="text-muted-custom">Receba novidades sobre livros</small>
              </div>
            </div>
          </div>

          {/* Links úteis */}
          <div className="row mt-4 pt-4 border-top border-warning">
            <div className="col-md-3 mb-3">
              <h6 className="text-accent-custom mb-2">Navegação</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    <i className="bi bi-house me-1"></i>Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    <i className="bi bi-book me-1"></i>Livros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    <i className="bi bi-person me-1"></i>Perfil
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mb-3">
              <h6 className="text-accent-custom mb-2">Categorias</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    Romance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    Ficção Científica
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    Fantasia
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mb-3">
              <h6 className="text-accent-custom mb-2">Suporte</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    <i className="bi bi-question-circle me-1"></i>FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    <i className="bi bi-headset me-1"></i>Suporte
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    <i className="bi bi-shield-check me-1"></i>Privacidade
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 mb-3">
              <h6 className="text-accent-custom mb-2">Empresa</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    <i className="bi bi-info-circle me-1"></i>Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    <i className="bi bi-briefcase me-1"></i>Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="text-light text-decoration-none small">
                    <i className="bi bi-newspaper me-1"></i>Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-secondary-custom py-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="text-center text-md-start mb-0 text-light">
                  &copy; {new Date().getFullYear()} Bibliotec. Todos os direitos reservados.
                </p>
              </div>
              <div className="col-md-6">
                <div className="d-flex justify-content-center justify-content-md-end gap-3">
                  <a href="#" className="text-light text-decoration-none small">
                    Termos de Uso
                  </a>
                  <a href="#" className="text-light text-decoration-none small">
                    Política de Privacidade
                  </a>
                  <a href="#" className="text-light text-decoration-none small">
                    Cookies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
