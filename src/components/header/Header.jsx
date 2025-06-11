import { useState, useEffect } from "react"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const userData = localStorage.getItem("devlogin")
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("devlogin")
    setUser(null)
  }

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

  
      <nav className={`navbar navbar-expand-lg navbar-custom fixed-top h-auto py-2 ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
         
          <a className="navbar-brand d-flex align-items-center h-100" href="/">
            <img
              src="/public/Black White Minimalist Book Club Logo.png"
              alt="Bibliotech Logo"
              style={{ width: "auto", height: "40px" }}
              className="me-2"
            />
            <span className="text-primary-custom fw-bold fs-4">Bibliotech</span>
          </a>

          
          <button
            className="navbar-toggler border-0 p-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

        
          <div className="collapse navbar-collapse" id="navbarNav">
           
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link py-2 px-3" href="/Livros">
                  <i className="bi bi-book me-1"></i>
                  Livros
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link py-2 px-3" href="/ProgressaoDeLeitura">
                  <i className="bi bi-graph-up me-1"></i>
                  Progresso de Leitura
                </a>
              </li>
            </ul>

          
            <div className="navbar-nav">
              {user ? (
                <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center py-2 px-3"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-1 fs-5"></i>
                    <span className="d-none d-md-inline">{user.nome || "Usuário"}</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end bg-light-custom border-custom shadow-custom rounded-3 p-2">
                    <li>
                      <a
                        className="dropdown-item text-dark-custom border-bottom border-custom pb-2 mb-2"
                        href="/Perfil"
                      >
                        <i className="bi bi-person me-2"></i>
                        Meu Perfil
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item text-dark-custom border-bottom border-custom pb-2 mb-2"
                        href="/ProgressaoDeLeitura"
                      >
                        <i className="bi bi-bookmark me-2"></i>
                        Meus Livros
                      </a>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <a className="nav-link py-2 px-3" href="/Cadastrar">
                    <i className="bi bi-person-plus me-1"></i>
                    <span>Cadastrar</span>
                  </a>
                  <a className="btn btn-primary-custom btn-sm" href="/Login">
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                    Entrar
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
