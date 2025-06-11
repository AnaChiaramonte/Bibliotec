import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AddLivros from "../components/addlivros/AddLivros"
import AddCategorias from "../components/addcategorias/AddCategorias"
import EditarLivros from "../components/editar/Editar"

const Adm = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")
    if (isAdmin !== "true") {
      navigate("/login")
    }
  }, [navigate])

  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F.Scott Fitzgerald", genre: "Romance" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Ficção" },
    { id: 3, title: "1984", author: "George Orwell", genre: "Ficção científica" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", genre: "Romance" },
  ])

  const [categories] = useState(["Ficção", "Não ficção", "Ficção científica", "Fantasia"])
  const [showAddLivros, setShowAddLivros] = useState(false)
  const [showAddCategorias, setShowAddCategorias] = useState(false)
  const [showEditLivros, setShowEditLivros] = useState(false)
  const [livroParaEditar, setLivroParaEditar] = useState(null)

  const handleEdit = (id) => {
    const livro = books.find((book) => book.id === id)
    setLivroParaEditar(livro)
    setShowEditLivros(true)
  }

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  const handleAddBook = () => {
    setShowAddLivros(true)
  }

  const handleSaveBook = (novoLivro) => {
    const livroFormatado = {
      id: novoLivro.id,
      title: novoLivro.titulo,
      author: novoLivro.autor,
      genre: novoLivro.genero,
    }
    setBooks([...books, livroFormatado])
  }

  const handleAddCategory = () => {
    setShowAddCategorias(true)
  }

  const handleSaveCategory = (novaCategoria) => {
    console.log("Nova categoria:", novaCategoria)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    navigate("/login")
  }

  const handleSaveEdit = (livroAtualizado) => {
    setBooks(
      books.map((book) =>
        book.id === livroAtualizado.id
          ? {
              id: livroAtualizado.id,
              title: livroAtualizado.titulo,
              author: livroAtualizado.autor,
              genre: livroAtualizado.genero,
            }
          : book,
      ),
    )
  }

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="container-fluid bg-light min-vh-100">
        <div className="p-4">
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <h1 className="display-5 fw-bold text-dark-custom">Dashboard Administrativo</h1>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i>Sair
            </button>
          </div>

          <div className="row g-3 mb-5">
            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <i className="bi bi-book-fill fs-1 text-primary-custom mb-2"></i>
                  <h2 className="display-4 fw-bold text-dark mb-2">1.250</h2>
                  <p className="text-muted fs-6 mb-0">Livros</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <i className="bi bi-list-ul fs-1 text-primary-custom mb-2"></i>
                  <h2 className="display-4 fw-bold text-dark mb-2">120</h2>
                  <p className="text-muted fs-6 mb-0">Categorias</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <i className="bi bi-people-fill fs-1 text-primary-custom mb-2"></i>
                  <h2 className="display-4 fw-bold text-dark mb-2">300</h2>
                  <p className="text-muted fs-6 mb-0">Usuários</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <i className="bi bi-chat-square-text-fill fs-1 text-primary-custom mb-2"></i>
                  <h2 className="display-4 fw-bold text-dark mb-2">50</h2>
                  <p className="text-muted fs-6 mb-0">Resenhas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h3 fw-bold text-dark">Livros</h2>
              <button className="btn btn-primary-custom" onClick={handleAddBook}>
                + Adicionar Livro
              </button>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="fw-semibold">Título</th>
                      <th className="fw-semibold">Autor</th>
                      <th className="fw-semibold">Gênero</th>
                      <th className="fw-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-primary-custom btn-sm" onClick={() => handleEdit(book.id)}>
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

          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h3 fw-bold text-dark">Categorias</h2>
              <button className="btn btn-primary-custom" onClick={handleAddCategory}>
                + Adicionar Categoria
              </button>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body">
                {categories.map((category, index) => (
                  <div key={index} className={`py-2 ${index < categories.length - 1 ? "border-bottom" : ""}`}>
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddLivros show={showAddLivros} onClose={() => setShowAddLivros(false)} onSave={handleSaveBook} />
      <AddCategorias show={showAddCategorias} onClose={() => setShowAddCategorias(false)} onSave={handleSaveCategory} />
      <EditarLivros
        show={showEditLivros}
        onClose={() => setShowEditLivros(false)}
        onSave={handleSaveEdit}
        livro={livroParaEditar}
      />
    </>
  )
}

export default Adm
