import { Link } from "react-router";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav style={{ marginRight: "100px" }} className="navbar navbar-expand-lg navbar-dark ">
      <div className="container ">
        <Link   className="navbar-brand " to="/">
      <img src="src/assets/Black White Minimalist Book Club Logo.png"   className="w-50 mt-n3  "alt="" />
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
            <li className="nav-item ">
              <Link className="nav-link mt-5 fs-4" to="/Livros#navbar">
              <p style={{ color: "#533E39" }}>Livros</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mt-5 m-5 fs-4 " to="/contato#navbar">
              <p style={{ color: "#533E39" }}>  Progresso Leitura</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;