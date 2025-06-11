"use client";
import { useState, useEffect, useCallback } from "react";
import Footer from "../components/footer/Footer";
import "./Livro.css"; // Certifique-se de que este caminho está correto para seu CSS

const Livro = () => {
  // Estados para gerenciar os livros da API
  const [books, setBooks] = useState([]); // Todos os livros da API
  const [categories, setCategories] = useState([]); // Todas as categorias da API
  const [filteredBooks, setFilteredBooks] = useState([]); // Livros filtrados por categoria ou busca

  // Estados para gerenciamento de UI e filtros
  const [selectedCategory, setSelectedCategory] = useState("Todos"); // Categoria selecionada
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o input de busca
  const [loading, setLoading] = useState(true); // Estado para o indicador de carregamento
  const [error, setError] = useState(null); // Estado para o tratamento de erros

  // Estados para o feedback e avaliações (dados mockados para o frontend)
  const [userRating, setUserRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, user: "Maria Silva", rating: 5, comment: "Livro incrível! Não consegui parar de ler." },
    { id: 2, user: "João Santos", rating: 4, comment: "História envolvente, recomendo!" },
  ]);

  // URL base da API
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://bibliotech.somee.com";

  // --- Funções de Busca da API ---

  // Função para buscar livros da API
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/Livros`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    } catch (e) {
      console.error("Erro ao buscar livros:", e);
      setError("Não foi possível carregar os livros. Tente novamente mais tarde.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Função para buscar categorias da API
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Categorias`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Adiciona uma categoria "Todos" no início para exibir todos os livros
      setCategories([{ categoriasId: "all", nome: "Todos" }, ...data]);
    } catch (e) {
      console.error("Erro ao buscar categorias:", e);
      // Você pode adicionar um estado de erro aqui também se quiser
    }
  }, [API_BASE_URL]);

  // --- Efeitos Colaterais (useEffect) ---

  // Carrega livros e categorias na montagem inicial do componente
  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, [fetchBooks, fetchCategories]); // Dependências do useEffect para garantir que as funções sejam chamadas corretamente

  // Efeito para filtrar livros com base na categoria selecionada e termo de busca
  useEffect(() => {
    let currentBooks = [...books]; // Começa com todos os livros

    // 1. Filtrar por categoria
    if (selectedCategory && selectedCategory !== "Todos") {
      currentBooks = currentBooks.filter(book =>
        // Certifique-se de que book.genero existe e corresponde à categoria
        book.genero && book.genero.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Filtrar por termo de busca (título, autor, editora, descrição)
    if (searchTerm.trim()) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentBooks = currentBooks.filter(book =>
        (book.titulo && book.titulo.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (book.autor && book.autor.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (book.editora && book.editora.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (book.descricao && book.descricao.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }
    setFilteredBooks(currentBooks);
  }, [selectedCategory, searchTerm, books]); // Dependências do useEffect de filtro

  // --- Funções de Manipulação de Eventos ---

  // Função para renderizar estrelas de avaliação
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "filled" : ""}`}
        // Não adicione onClick aqui se não for para ser interativo para exibição
      >
        ★
      </span>
    ));
  };

  // Lidar com o clique na categoria
  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchTerm(""); // Limpa o termo de busca ao mudar de categoria
  };

  // Lidar com o botão "Iniciar leitura"
  const handleStartReading = (book) => {
    const savedBooks = JSON.parse(localStorage.getItem("livrosEmProgresso")) || [];

    const livroAtual = {
      id: book.livrosId, // Use o ID real do livro da API
      titulo: book.titulo,
      autor: book.autor,
      imagem: book.url_capa || "/placeholder.svg", // Fallback para imagem
      progresso: 0,
      avaliacao: book.rating || 0, // Assumindo que a API pode retornar uma avaliação
      descricao: book.descricao,
    };

    const livroJaExiste = savedBooks.some((livro) => livro.id === livroAtual.id);

    if (!livroJaExiste) {
      savedBooks.push(livroAtual);
      localStorage.setItem("livrosEmProgresso", JSON.stringify(savedBooks));
      alert(`${book.titulo} foi adicionado ao seu progresso de leitura!`);
    } else {
      alert("Esse livro já está no seu progresso de leitura!");
    }
  };

  // Lidar com o envio de feedback
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (feedback.trim() && userRating > 0) {
      const newFeedback = {
        id: feedbacks.length + 1,
        user: "Usuário Atual", // Você pode integrar com autenticação real aqui
        rating: userRating,
        comment: feedback.trim(),
      };
      setFeedbacks([newFeedback, ...feedbacks]); // Adiciona o novo feedback ao topo
      setFeedback("");
      setUserRating(0);
    }
  };

  // --- Renderização do Componente ---

  return (
    <div className="container-fluid" style={{ backgroundColor: "#876b5d", minHeight: "100vh" }}>
      {/* Bootstrap CSS e Icons (coloque no seu index.html ou App.js principal para evitar duplicação) */}
      {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" /> */}

      {/* Header/Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#876B5D" }}>
        <div className="container">
          <a className="navbar-brand text-white" href="#">Biblioteca</a> {/* Exemplo de marca */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {/* Adicionar links de navegação aqui se necessário */}
            </ul>
          </div>
        </div>
      </nav>

      <div className="bg-pattern min-vh-100" style={{ paddingTop: "20px" }}> {/* Ajustado padding-top */}

        {/* Search Bar */}
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-8"> {/* Aumentado a largura para melhor visualização */}
              <div className="input-group">
                <span className="input-group-text bg-light-custom border-custom">
                  <i className="bi bi-search text-primary-custom"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-custom"
                  placeholder="Pesquisar livros por título, autor ou editora..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* O botão "Buscar" é redundante se a pesquisa é dinâmica com onChange */}
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Categoria */}
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.categoriasId}
                    className={`btn btn-lg rounded-pill ${
                      selectedCategory === category.nome ? "btn-primary-custom" : "btn-outline-custom"
                    }`}
                    onClick={() => handleCategoryClick(category.nome)}
                  >
                    {category.nome}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Display de Livros Filtrados */}
        <div className="container mt-5 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {loading && <p className="text-white text-center">Carregando livros...</p>}
              {error && <p className="text-danger text-center">{error}</p>}

              {!loading && !error && filteredBooks.length === 0 && (
                <p className="text-white text-center">Nenhum livro encontrado para os critérios selecionados.</p>
              )}

              {!loading && !error && filteredBooks.length > 0 && (
                filteredBooks.map((book) => (
                  <div key={book.livrosId} className="book-card border-0 shadow-sm mb-4">
                    <div className="card-body text-center p-4">
                      {/* Imagem da capa do livro */}
                      <div className="mb-4">
                        <img
                          src={book.url_capa || "/placeholder.svg"} // Fallback para imagem padrão
                          alt={book.titulo}
                          className="img-fluid rounded shadow book-cover"
                          style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                      </div>

                      {/* Informações do livro */}
                      <div className="book-info-section">
                        <h2 className="book-title text-accent-custom fw-bold mb-2">{book.titulo}</h2>
                        <p className="book-author text-muted-custom fs-5 mb-1">por {book.autor}</p>
                        <p className="book-publisher text-muted-custom mb-3">publicado pela editora {book.editora || "N/A"}</p>
                        <p className="book-description text-light lh-base">{book.descricao || "Descrição não disponível."}</p>
                      </div>

                      {/* Botão de Ação */}
                      <div className="action-buttons mb-4">
                        <button className="btn btn-primary-custom btn-lg start-reading-btn" onClick={() => handleStartReading(book)}>
                          <i className="bi bi-play-circle me-2"></i>
                          Iniciar leitura
                        </button>
                      </div>

                      {/* Seção de Avaliação do Livro (exibição de estrelas) */}
                      <div className="rating-section mb-4">
                        <h5 className="text-accent-custom mb-3">Avaliação Geral</h5>
                        <div className="star-rating mb-2">{renderStars(book.rating || 0)}</div> {/* Assume que a API pode retornar um rating */}
                        <p className="text-muted-custom">
                          {(book.rating || 0).toFixed(1)} de 5 estrelas (Baseado em N/A avaliações)
                        </p>
                      </div>

                      {/* Seção de Feedback do Usuário (Sua Avaliação e Comentários) */}
                      <div className="comment-section mt-4">
                        <div className="mb-3">
                          <p className="text-accent-custom mb-2">Sua avaliação:</p>
                          <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`star ${userRating >= star ? "filled" : ""}`}
                                onClick={() => setUserRating(star)}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>

                        <textarea
                          className="form-control mb-3 bg-light-custom border-custom"
                          rows="3"
                          placeholder="Deixe seu comentário sobre o livro..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>

                        <button
                          className="btn btn-primary-custom"
                          onClick={handleSubmitFeedback}
                          disabled={!feedback.trim() || userRating === 0}
                        >
                          Enviar Comentário
                        </button>
                      </div>

                      {/* Lista de Comentários dos Leitores */}
                      <div className="feedbacks-list mt-4">
                        <h6 className="text-accent-custom mb-3">Comentários dos leitores:</h6>
                        {feedbacks.map((fb) => (
                          <div key={fb.id} className="card bg-secondary-custom border-custom mb-3">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <strong className="text-primary-custom">{fb.user}</strong>
                                <div className="star-rating">{renderStars(fb.rating)}</div>
                              </div>
                              <p className="text-dark-custom mb-0">{fb.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Livro;