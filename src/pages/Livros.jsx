const Livro = () => {
  const categories = ["Romance", "Terror", "Fantasia", "Biografia", "Drama", "Ficção"]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? "text-warning" : "text-muted"}>
        ★
      </span>
    ))
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#876b5d", minHeight: "100vh" }}>
      {/* Header */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#876B5D" }}>
        <div className="container">
          <a className="navbar-brand text-white" href="#">
            📚
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link text-white active" href="#">
                  Livros
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Progresso de Leitura
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Favoritos e Próximos
                </a>
              </li>
            </ul>
            <div className="navbar-nav">
              <a className="nav-link text-white" href="#">
                <i className="bi bi-person-circle fs-4"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input type="text" className="form-control" placeholder="Pesquisar livros..." />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="btn btn-outline-secondary btn-sm rounded-pill"
                  style={{ backgroundColor: "#d2b48c", borderColor: "#d2b48c", color: "#8b4513" }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Book Section */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center p-4">
                {/* Book Cover */}
                <div className="mb-4">
                  <img src="src/img/Clube de mary shelley.jpg"
                  
                    className="img-fluid rounded shadow"
                    style={{ maxWidth: "200px", height: "auto" }}
                  />
                </div>

                {/* Book Info */}
                <h2 className="card-title h4 mb-2">O Clube de Mary Shelley</h2>
                <p className="text-muted small mb-3">publicado pela editora Editora Melhoramentos.</p>

                <p className="card-text text-start mb-4" style={{ textAlign: "justify" }}>
                  Seis jovens por um dia tornaram-se mais traumatizantes de suas vidas. Rachel não estava ali para
                  recuperar ou para fazer novos amigos, mas para descobrir o que aconteceu a sua melhor amiga, Rachel,
                  que foi encontrada morta depois de uma noite no Clube de Mary Shelley, e é determinada a descobrir a
                  verdade por trás da morte de Rachel.
                </p>

                {/* Rating */}
                <div className="mt-4">
                  <h5 className="mb-2">Avaliações</h5>
                  <div className="fs-4">{renderStars(4)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Livro
