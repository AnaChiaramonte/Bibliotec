

import { useState } from "react"


const Adm = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F.Scott Fitzgerald", genre: "Romance" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Ficção" },
    { id: 3, title: "1984", author: "George Orwell", genre: "Ficção científica" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance" },
  ])

  const [categories] = useState(["Ficção", "Não ficção", "Ficção científica", "Fantasia"])

  const handleEdit = (id) => {
    console.log("Editar livro:", id)
  }

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  const handleAddBook = () => {
    console.log("Adicionar novo livro")
  }

  const handleAddCategory = () => {
    console.log("Adicionar nova categoria")
  }

  return (
    <>
      {/* Bootstrap CSS CDN */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

      <div className="container-fluid p-0">
        <div className="row g-0 min-vh-100">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 sidebar-custom">
            <div className="p-4">
              <h2 className="text-white fw-bold ls-2">ADMIN</h2>
            </div>
            <nav className="nav flex-column">
              <a className="nav-link text-white py-3 px-4 nav-item-active" href="#">
                <i className="bi bi-grid me-2"></i>Dashboard
              </a>
              <a className="nav-link text-white py-3 px-4" href="#">
                <i className="bi bi-book me-2"></i>Livros
              </a>
              <a className="nav-link text-white py-3 px-4" href="#">
                <i className="bi bi-list-ul me-2"></i>Categorias
              </a>
              <a className="nav-link text-white py-3 px-4" href="#">
                <i className="bi bi-person me-2"></i>Usuários
              </a>
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-md-9 col-lg-10 main-bg">
            <div className="p-4">
              {/* Header */}
              <div className="mb-4">
                <h1 className="display-5 fw-bold text-dark">Dashboard</h1>
              </div>

              {/* Stats Cards */}
              <div className="row g-3 mb-5">
                <div className="col-sm-6 col-lg-3">
                  <div className="card border-secondary h-100">
                    <div className="card-body text-center">
                      <h2 className="card-title display-4 fw-bold text-dark mb-2">1,250</h2>
                      <p className="card-text text-muted fs-6">Livros</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card border-secondary h-100">
                    <div className="card-body text-center">
                      <h2 className="card-title display-4 fw-bold text-dark mb-2">120</h2>
                      <p className="card-text text-muted fs-6">Categorias</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card border-secondary h-100">
                    <div className="card-body text-center">
                      <h2 className="card-title display-4 fw-bold text-dark mb-2">300</h2>
                      <p className="card-text text-muted fs-6">Usuários</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card border-secondary h-100">
                    <div className="card-body text-center">
                      <h2 className="card-title display-4 fw-bold text-dark mb-2">50</h2>
                      <p className="card-text text-muted fs-6">Resenhas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Books Section */}
              <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h3 fw-bold text-dark">Livros</h2>
                  <button className="btn btn-primary" onClick={handleAddBook}>
                    + Adicionar Livro
                  </button>
                </div>

                <div className="card border-secondary">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="fw-semibold text-dark">Título</th>
                          <th className="fw-semibold text-dark">Autor</th>
                          <th className="fw-semibold text-dark">Gênero</th>
                          <th className="fw-semibold text-dark">Editar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book) => (
                          <tr key={book.id}>
                            <td className="text-dark">{book.title}</td>
                            <td className="text-dark">{book.author}</td>
                            <td className="text-dark">{book.genre}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <button className="btn btn-primary btn-sm" onClick={() => handleEdit(book.id)}>
                                  Editar
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book.id)}>
                                  Excluir
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Categories Section */}
              <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h3 fw-bold text-dark">Categorias</h2>
                  <button className="btn btn-primary" onClick={handleAddCategory}>
                    + Adicionar Categoria
                  </button>
                </div>

                <div className="card border-secondary">
                  <div className="card-body">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className={`py-2 text-dark ${index < categories.length - 1 ? "border-bottom border-secondary" : ""}`}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Icons CDN */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
    </>
  )
}

export default Adm
