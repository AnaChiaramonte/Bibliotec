import { Link } from "react-router";


const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fs-5 bg-bg-light fixed-top" id="navbar">
      <div className="container ">
        <Link   className="logo m-5 " to="/">
      <img src="src/assets/Black White Minimalist Book Club Logo.png"   className=" logo mt-0 m-0  "alt="" />
        </Link>
       
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav collapse navbar-collapse" >
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link className="nav-link mt-5 fs-4" to="/Livros">
              <h5 >Livros</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mt-5 m-5 fs-4 " to="/ProgressaoDeLeitura">
              <h5>  Progresso Leitura</h5>
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-end position-relative">
          <Link className="nav-link mt-3 m-3 fs-4 " to="/Perfil">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>

</svg>
</Link>
</div>
<Link className="nav-link mt-2  fs-4 " to="/Login#navbar">
<h5 className="ms-4">Entrar</h5>
</Link>
      </div>
    </nav>
  );
};

export default Header;