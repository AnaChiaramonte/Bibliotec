import { Link } from "react-router";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="container">
        <Link className="navbar-brand" to="/">
      <img src="src/assets/Black White Minimalist Book Club Logo.png" alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sobre#navbar">
               Livros
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contato#navbar">
                Contato
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;