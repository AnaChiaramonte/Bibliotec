import { Link } from "react-router";



const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
       
        <Link className="navbar-brand" to="/">
          <img
            src="src/assets/Black White Minimalist Book Club Logo.png"
            alt="Logo"
            className="logo"
            style={{ width: "60px" }}
          />
        </Link>

        {/* Botão de menu mobile */}
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Itens do menu */}
        <div className="collapse navbar-collapse justify-content-center align-items-center" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/Livros">
                Livros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/ProgressaoDeLeitura">
                Progresso de Leitura
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/Perfil">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-light ms-3" to="/Login">
                Entrar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;