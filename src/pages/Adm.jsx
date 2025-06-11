import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AddLivros from "../components/addlivros/AddLivros";
import AddCategorias from "../components/addcategorias/AddCategorias";
import EditarLivros from "../components/editar/Editar";

const Adm = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  const [showAddLivros, setShowAddLivros] = useState(false);
  const [showAddCategorias, setShowAddCategorias] = useState(false);
  const [showEditLivros, setShowEditLivros] = useState(false);
  const [livroParaEditar, setLivroParaEditar] = useState(null);

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://bibliotech.somee.com";

  const getToken = () => localStorage.getItem("userToken");

  // ===== LIVROS =====
  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/Livros`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
    }
  };

  const handleSaveBook = async (novoLivro) => {
    const token = getToken();
    if (!token) {
      alert("Você precisa estar logado para adicionar livros.");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/Livros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(novoLivro),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      fetchBooks();
      setShowAddLivros(false);
    } catch (err) {
      console.error("Erro ao adicionar livro:", err);
      alert(`Erro ao adicionar livro: ${err.message}`);
    }
  };

  const handleEdit = (id) => {
    const livro = books.find((book) => book.livrosId === id);
    setLivroParaEditar(livro);
    setShowEditLivros(true);
  };

  const handleSaveEdit = async (livroAtualizado) => {
    const token = getToken();
    if (!token) {
      alert("Você precisa estar logado para editar livros.");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/Livros/${livroAtualizado.livrosId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(livroAtualizado),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      fetchBooks();
      setShowEditLivros(false);
    } catch (err) {
      console.error("Erro ao editar livro:", err);
      alert(`Erro ao editar livro: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    const token = getToken();
    if (!token) {
      alert("Você precisa estar logado para excluir livros.");
      navigate("/login");
      return;
    }
    if (!window.confirm("Tem certeza que deseja excluir este livro?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/Livros/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      fetchBooks();
    } catch (err) {
      console.error("Erro ao excluir livro:", err);
      alert(`Erro ao excluir livro: ${err.message}`);
    }
  };

  // ===== CATEGORIAS =====
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/Categorias`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  const handleSaveCategory = async (novaCategoria) => {
    const token = getToken();
    if (!token) {
      alert("Você precisa estar logado para adicionar categorias.");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/Categorias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(novaCategoria),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      fetchCategories();
      setShowAddCategorias(false);
    } catch (err) {
      console.error("Erro ao adicionar categoria:", err);
      alert(`Erro ao adicionar categoria: ${err.message}`);
    }
  };

  const handleDeleteCategory = async (id) => {
    const token = getToken();
    if (!token) {
      alert("Você precisa estar logado para excluir categorias.");
      navigate("/login");
      return;
    }
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/Categorias/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      fetchCategories();
    } catch (err) {
      console.error("Erro ao excluir categoria:", err);
      alert(`Erro ao excluir categoria: ${err.message}`);
    }
  };

  // ===== USUÁRIOS =====
  const fetchUsers = async () => {
    const token = getToken();
    if (!token) {
      console.warn("Nenhum token encontrado para buscar usuários. Redirecionando para login.");
      navigate("/login");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/Usuarios`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      if (res.status === 401 || res.status === 403) {
          alert("Você não tem permissão para ver os usuários.");
          navigate("/login");
          return;
      }
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      alert(`Erro ao buscar usuários: ${err.message}. Você pode não ter permissão.`);
    }
  };

  const handleDeleteUser = async (id) => {
    const token = getToken();
    if (!token) {
      alert("Você precisa estar logado para excluir usuários.");
      navigate("/login");
      return;
    }
    if (!window.confirm("Tem certeza que deseja excluir este usuário? Esta ação é irreversível.")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/Usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      fetchUsers();
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      alert(`Erro ao excluir usuário: ${err.message}`);
    }
  };

  useEffect(() => {
    const userRoles = JSON.parse(localStorage.getItem("userRoles") || "[]");
    const isAdmin = userRoles.includes("Admin");

    if (!isAdmin) {
      alert("Acesso negado. Apenas administradores podem acessar esta página.");
      navigate("/login");
      return;
    }

    fetchBooks();
    fetchUsers();
    fetchCategories();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRoles");
    console.log("Logout realizado");
    navigate("/login");
  };

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="container-fluid main-bg min-vh-100">
        <div className="p-4">
          {/* HEADER */}
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <h1 className="display-5 fw-bold text-custom-dark">
              Dashboard Administrativo
            </h1>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>Sair
            </button>
          </div>

          {/* LIVROS */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h3 fw-bold text-custom-dark">Livros</h2>
              <button className="btn btn-primary" onClick={() => setShowAddLivros(true)}>
                + Adicionar Livro
              </button>
            </div>

            <div className="card border-custom shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    {/* Linha THs da tabela de Livros - Formato Compacto */}
                    <tr><th>ID</th><th>Título</th><th>Autor</th><th>Gênero</th><th>Capa</th><th>Ações</th></tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                     <tr key={book.livrosId}>
                        <td>{book.livrosId}</td>
                        <td>{book.titulo}</td>
                        <td>{book.autor}</td>
                        <td>{book.genero}</td>
                        <td>
                          <img
                            src={book.capa || "/placeholder.jpg"}
                            alt={book.titulo}
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleEdit(book.livrosId)}
                            >
                              Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(book.livrosId)}
                            >
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

          {/* CATEGORIAS */}
          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h3 fw-bold text-custom-dark">Categorias</h2>
              <button className="btn btn-primary" onClick={() => setShowAddCategorias(true)}>
                + Adicionar Categoria
              </button>
            </div>

            <div className="card border-custom shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    {/* Linha THs da tabela de Categorias - Formato Compacto */}
                    <tr><th>ID</th><th>Nome</th><th>Ações</th></tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.categoriasId}>
                        <td>{category.categoriasId}</td>
                        <td>{category.nome}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteCategory(category.categoriasId)}
                          >
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

          {/* USUÁRIOS */}
          <div className="mb-5">
            <h2 className="h3 fw-bold text-custom-dark mb-3">Usuários</h2>
            <div className="card border-custom shadow-sm">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    {/* Linha THs da tabela de Usuários - Formato Compacto */}
                    <tr><th>ID</th><th>Nome</th><th>Email</th><th>Ações</th></tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.nome}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
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

      <AddLivros
        show={showAddLivros}
        onClose={() => setShowAddLivros(false)}
        onSave={handleSaveBook}
      />
      <AddCategorias
        show={showAddCategorias}
        onClose={() => setShowAddCategorias(false)}
        onSave={handleSaveCategory}
      />
      <EditarLivros
        show={showEditLivros}
        onClose={() => setShowEditLivros(false)}
        onSave={handleSaveEdit}
        livro={livroParaEditar}
      />
    </>
  );
};

export default Adm;