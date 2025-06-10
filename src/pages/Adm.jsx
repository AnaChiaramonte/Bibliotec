import { useState, useEffect } from "react"
import AddLivros from "../components/addlivros/AddLivros"
import AddCategorias from "../components/addcategorias/AddCategorias"
import EditarLivros from "../components/editar/Editar"

const Adm = () => {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [users, setUsers] = useState([])

  const [showAddLivros, setShowAddLivros] = useState(false)
  const [showAddCategorias, setShowAddCategorias] = useState(false)
  const [showEditLivros, setShowEditLivros] = useState(false)
  const [livroParaEditar, setLivroParaEditar] = useState(null)

  // ===== LIVROS =====
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://bibliotech.somee.com/api/Livros")
      const data = await res.json()
      setBooks(data)
    } catch (err) {
      console.error("Erro ao buscar livros:", err)
    }
  }

  useEffect(() => {
    fetchBooks()
    fetchUsers()
    fetchCategories()
  }, [])

  const handleAddBook = () => setShowAddLivros(true)
  const handleSaveBook = async (novoLivro) => {
    try {
      await fetch("http://bibliotech.somee.com/api/Livros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoLivro),
      })
      fetchBooks()
    } catch (err) {
      console.error("Erro ao adicionar livro:", err)
    }
  }

  const handleEdit = (id) => {
    const livro = books.find((book) => book.id === id)
    setLivroParaEditar(livro)
    setShowEditLivros(true)
  }

  const handleSaveEdit = async (livroAtualizado) => {
    try {
      await fetch(`http://bibliotech.somee.com/api/Livros/${livroAtualizado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(livroAtualizado),
      })
      fetchBooks()
    } catch (err) {
      console.error("Erro ao editar livro:", err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://bibliotech.somee.com/api/Livros/${id}`, {
        method: "DELETE",
      })
      fetchBooks()
    } catch (err) {
      console.error("Erro ao excluir livro:", err)
    }
  }

  // ===== CATEGORIAS =====
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://bibliotech.somee.com/api/Categorias")
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      console.error("Erro ao buscar categorias:", err)
    }
  }

  const handleAddCategory = () => setShowAddCategorias(true)

  const handleSaveCategory = async (novaCategoria) => {
    try {
      await fetch("http://bibliotech.somee.com/api/Categorias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaCategoria),
      })
      fetchCategories()
    } catch (err) {
      console.error("Erro ao adicionar categoria:", err)
    }
  }

  // ===== USUÁRIOS =====
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://bibliotech.somee.com/api/Usuarios")
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      console.error("Erro ao buscar usuários:", err)
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://bibliotech.somee.com/api/Usuarios/${id}`, {
        method: "DELETE",
      })
      fetchUsers()
    } catch (err) {
      console.error("Erro ao excluir usuário:", err)
    }
  }

  const handleLogout = () => {
    console.log("Logout realizado")
  }

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="container-fluid main-bg min-vh-100">
        <div className="p-4">
          {/* HEADER */}
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <h1 className="display-5 fw-bold text-custom-dark">Dashboard Administrativo</h1>
            <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i>Sair
            </button>
          </div>

          {/* LIVROS */}
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
                      <th>Título</th>
                      <th>Autor</th>
                      <th>Gênero</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book.id}>
                        <td>{book.titulo}</td>
                        <td>{book.autor}</td>
                        <td>{book.genero}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(book.id)}>Editar</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book.id)}>Excluir</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CATEGORIAS */}
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
                  <div key={index} className={`py-2 ${index < categories.length - 1 ? "border-bottom" : ""}`}>
                    {category.nome}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* USUÁRIOS */}
          <div className="mb-5">
            <h2 className="h3 fw-bold text-custom-dark mb-3">Usuários</h2>
            <div className="card border-custom shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.nome}</td>
                        <td>{user.email}</td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddLivros show={showAddLivros} onClose={() => setShowAddLivros(false)} onSave={handleSaveBook} />
      <AddCategorias show={showAddCategorias} onClose={() => setShowAddCategorias(false)} onSave={handleSaveCategory} />
      <EditarLivros show={showEditLivros} onClose={() => setShowEditLivros(false)} onSave={handleSaveEdit} livro={livroParaEditar} />
    </>
  )
}

export default Adm
