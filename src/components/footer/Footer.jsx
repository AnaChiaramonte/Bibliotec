"use client";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#523832", color: "white" }}
      className="mt-5 pt-4 footer w-100  "
    >
      <div className="container py-4 w-100">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <h5
              className="border-bottom pb-2 mb-3"
              style={{ borderColor: "#ffd700" }}
            >
              Sobre Nós
            </h5>
            <p
              className="fst-italic border-start ps-3"
              style={{ borderColor: "#ffd700" }}
            >
              "Um livro é um sonho que você segura em suas mãos. Cada página
              virada é uma porta para um novo mundo de emoções."
            </p>
          </div>

          <div className="col-lg-4 mb-4">
            <h5
              className="border-bottom pb-2 mb-3"
              style={{ borderColor: "#ffd700" }}
            >
              Formas de Pagamento
            </h5>
            <div className="d-flex flex-wrap gap-2">
              <div
                className="d-flex align-items-center p-2 rounded"
                style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              >
                <span>💳 Cartão de Crédito</span>
              </div>
              <div
                className="d-flex align-items-center p-2 rounded"
                style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              >
                <span>💲 Cartão de Débito</span>
              </div>
              <div
                className="d-flex align-items-center p-2 rounded"
                style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              >
                <span>🏦 Pix</span>
              </div>
              <div
                className="d-flex align-items-center p-2 rounded"
                style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              >
                <span>📄 Boleto</span>
              </div>
            </div>
          </div>

          <div className="col-lg-4 mb-4">
            <h5
              className="border-bottom pb-2 mb-3"
              style={{ borderColor: "#ffd700" }}
            >
              Contato
            </h5>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <span>✉️</span>
                <a
                  href="mailto:contato@bibliotec.com.br"
                  className="ms-2 text-white text-decoration-none"
                >
                  contato@bibliotec.com.br
                </a>
              </div>
            </div>

            <h5
              className="border-bottom pb-2 mb-3"
              style={{ borderColor: "#ffd700" }}
            >
              Redes Sociais
            </h5>
            <div className="d-flex gap-3">
              <a
                href="#"
                className="text-decoration-none"
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  color: "white",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a
                href="#"
                className="text-decoration-none"
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  color: "white",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                </svg>
              </a>

              <a
                href="#"
                className="text-decoration-none"
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  color: "white",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="X (Twitter)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>

              <a
                href="#"
                className="text-decoration-none"
                style={{
                  backgroundColor: "rgba(0,0,0,0.2)",
                  color: "white",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "rgba(0,0,0,0.2)" }} className="py-3">
        <div className="container">
          <p className="text-center mb-0">
            &copy; {new Date().getFullYear()} Bibliotec. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
