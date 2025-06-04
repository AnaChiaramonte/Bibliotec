import { Link } from "react-router";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fs-5 fixed-top">
      <div className="container">
        <Link className="logo m-5" to="/" onClick={closeNavbar}>
          <img
            src="src/assets/Black White Minimalist Book Club Logo.png"
            alt="Logo"
            width="60"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            isOpen ? "show" : ""
          } justify-content-end`}
        >
        <ul className="navbar-nav me-auto">
  <li className="nav-item">
    <Link className="nav-link" to="/Livros" onClick={closeNavbar}>
      Livros
    </Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/ProgressaoDeLeitura" onClick={closeNavbar}>
      Progresso de Leitura
    </Link>
  </li>
</ul>

<div className="d-flex align-items-center ms-auto gap-2 mt-2">
  <Link className="nav-link" to="/Perfil" onClick={closeNavbar}>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="25" fill="#533E39" className="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"/>
    </svg>
  </Link>

  <Link className="nav-link text-white" to="/Login" onClick={closeNavbar}>
    Entrar
  </Link>
</div>

       
        </div>
      </div>
    </nav>
  );
};

export default Header;
