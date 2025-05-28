
import { useState } from "react"

import AddLivros from "../components/addlivros/AddLivros"
import AddCategorias from "../components/addcategorias/AddCategorias"
import EditarLivros from "../components/editar/EditarLivros"

const Adm = () => {
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
    console.log("Logout realizado")

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

      <div className="container-fluid main-bg min-vh-100">
        <div className="p-4">
       
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <h1 className="display-5 fw-bold text-custom-dark">Dashboard Administrativo</h1>
            <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i>Sair
            </button>
          </div>

          <div className="row g-3 mb-5">
            <div className="col-sm-6 col-lg-3">
              <div className="card border-custom shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="mb-2">
                    <i className="bi bi-book-fill fs-1 text-custom-primary"></i>
                  </div>
                  <h2 className="display-4 fw-bold text-custom-dark mb-2">1.250</h2>
                  <p className="text-custom-muted fs-6 mb-0">Livros</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-custom shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="mb-2">
                    <i className="bi bi-list-ul fs-1 text-custom-primary"></i>
                  </div>
                  <h2 className="display-4 fw-bold text-custom-dark mb-2">120</h2>
                  <p className="text-custom-muted fs-6 mb-0">Categorias</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-custom shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="mb-2">
                    <i className="bi bi-people-fill fs-1 text-custom-primary"></i>
                  </div>
                  <h2 className="display-4 fw-bold text-custom-dark mb-2">300</h2>
                  <p className="text-custom-muted fs-6 mb-0">Usuários</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card border-custom shadow-sm h-100">
                <div className="card-body text-center p-4">
                  <div className="mb-2">
                    <i className="bi bi-chat-square-text-fill fs-1 text-custom-primary"></i>
                  </div>
                  <h2 className="display-4 fw-bold text-custom-dark mb-2">50</h2>
                  <p className="text-custom-muted fs-6 mb-0">Resenhas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Books Section */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h3 fw-bold text-custom-dark">Livros</h2>
              <button className="btn btn-primary" onClick={handleAddBook}>
                + Adicionar Livro
              </button>
            </div>

            <div className="card border-custom shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="fw-semibold text-custom-dark">Título</th>
                      <th className="fw-semibold text-custom-dark">Autor</th>
                      <th className="fw-semibold text-custom-dark">Gênero</th>
                      <th className="fw-semibold text-custom-dark">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.id}>
                        <td className="text-custom-dark">{book.title}</td>
                        <td className="text-custom-dark">{book.author}</td>
                        <td className="text-custom-dark">{book.genre}</td>
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

         
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h3 fw-bold text-custom-dark">Categorias</h2>
              <button className="btn btn-primary" onClick={handleAddCategory}>
                + Adicionar Categoria
              </button>
            </div>

            <div className="card border-custom shadow-sm">
              <div className="card-body">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`py-2 text-custom-dark ${
                      index < categories.length - 1 ? "border-bottom border-custom" : ""
                    }`}
                  >
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
