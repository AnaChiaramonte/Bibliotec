"use client";
import { useState, useEffect, useCallback } from "react";
import Footer from "../components/footer/Footer";
import "./Livro.css";

const Livro = () => {
  const [books, setBooks] = useState([]); // Todos os livros da API
  const [categories, setCategories] = useState([]); // Todas as categorias da API
  const [filteredBooks, setFilteredBooks] = useState([]); // Livros filtrados por categoria ou busca

  const [selectedCategory, setSelectedCategory] = useState("Todos"); // Categoria selecionada
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o input de busca
  const [loading, setLoading] = useState(true); // Estado para o indicador de carregamento
  const [error, setError] = useState(null); // Estado para o tratamento de erros

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://bibliotech.somee.com";

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
      // filteredBooks será atualizado pelo useEffect de filtro
    } catch (e) {
      console.error("Erro ao buscar livros:", e);
      setError(
        "Não foi possível carregar os livros. Tente novamente mais tarde."
      );
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
      // Adiciona uma categoria "Todos" para exibir todos os livros
      setCategories([{ categoriasId: "all", nome: "Todos" }, ...data]);
    } catch (e) {
      console.error("Erro ao buscar categorias:", e);
    }
  }, [API_BASE_URL]);

  // Carrega livros e categorias na montagem do componente
  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, [fetchBooks, fetchCategories]); // Dependências do useEffect

  // Efeito para filtrar livros com base na categoria selecionada e termo de busca
  useEffect(() => {
    let currentBooks = [...books]; // Começa com todos os livros

    // 1. Filtrar por categoria
    if (selectedCategory && selectedCategory !== "Todos") {
      currentBooks = currentBooks.filter(
        (book) =>
          // Certifique-se de que book.genero existe e corresponde à categoria
          book.genero &&
          book.genero.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Filtrar por termo de busca
    if (searchTerm.trim()) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentBooks = currentBooks.filter(
        (book) =>
          book.titulo.toLowerCase().includes(lowerCaseSearchTerm) ||
          book.autor.toLowerCase().includes(lowerCaseSearchTerm) ||
          (book.editora &&
            book.editora.toLowerCase().includes(lowerCaseSearchTerm)) ||
          // Corrigido: usando book.url_capa para busca
          (book.url_capa &&
            book.url_capa.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (book.descricao &&
            book.descricao.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }
    setFilteredBooks(currentBooks);
  }, [selectedCategory, searchTerm, books]); // Dependências do useEffect de filtro

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${index < rating ? "text-warning" : "text-muted"}`}
      >
        ★
      </span>
    ));
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setSearchTerm(""); // Limpa o termo de busca ao mudar de categoria
  };

  const handleStartReading = (book) => {
    const savedBooks =
      JSON.parse(localStorage.getItem("livrosEmProgresso")) || [];

    const livroAtual = {
      id: book.livrosId, // Use o ID real do livro da API
      titulo: book.titulo,
      autor: book.autor,
      // Corrigido: Usando book.url_capa para a imagem
      imagem: book.url_capa || "/placeholder.svg",
      progresso: 0,
      avaliacao: book.rating || 0, // Assumindo que a API pode retornar uma avaliação
      descricao: book.descricao,
    };

    const livroJaExiste = savedBooks.some(
      (livro) => livro.id === livroAtual.id
    );

    if (!livroJaExiste) {
      savedBooks.push(livroAtual);
      localStorage.setItem("livrosEmProgresso", JSON.stringify(savedBooks));
      alert(`${book.titulo} foi adicionado ao seu progresso de leitura!`);
    } else {
      alert("Esse livro já está no seu progresso de leitura!");
    }
  };

  // Funções de feedback (mantidas como estavam, pois são mockadas no frontend)
  const [userRating, setUserRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      user: "Maria Silva",
      rating: 5,
      comment: "Livro incrível! Não consegui parar de ler.",
    },
    {
      id: 2,
      user: "João Santos",
      rating: 4,
      comment: "História envolvente, recomendo!",
    },
  ]);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (feedback.trim() && userRating > 0) {
      const newFeedback = {
        id: feedbacks.length + 1,
        user: "Usuário Atual",
        rating: userRating,
        comment: feedback.trim(),
      };
      setFeedbacks([newFeedback, ...feedbacks]);
      setFeedback("");
      setUserRating(0);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#876b5d", minHeight: "100vh" }}
    >
      {/* Header (mantido como estava no seu código, mas você pode adicionar links) */}


      
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#876B5D" }}
      >
        <div className="container">
          <a className="navbar-brand text-white" href="#"></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {/* Adicionar links aqui se necessário */}
            </ul>
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
              <input
                type="text"
                className="form-control"
                placeholder="Pesquisar livros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-secondary" type="button">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="categories-section">
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.categoriasId}
                    className={`btn btn-outline-secondary ${
                      selectedCategory === category.nome ? "active" : ""
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
      </div>

      {/* Display Filtered Books */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {loading && (
              <p className="text-white text-center">Carregando livros...</p>
            )}
            {error && <p className="text-danger text-center">{error}</p>}

            {!loading && !error && filteredBooks.length === 0 && (
              <p className="text-white text-center">
                Nenhum livro encontrado para os critérios selecionados.
              </p>
            )}

            {!loading &&
              !error &&
              filteredBooks.length > 0 &&
              filteredBooks.map(
                (
                  book,
                  index // Adicionado 'index' para o fallback da key
                ) => (
                  // Corrigido: Usando 'book.livrosId || `book-${index}`' para a key
                  // Isso garante uma key única mesmo que 'livrosId' esteja ausente ou nulo
                  <div
                    key={book.livrosId || `book-${index}`}
                    className="book-card border-0 shadow-sm mb-4"
                  >
                    <div className="card-body text-center p-4">
                      <div className="mb-4">
                        {/* Corrigido: Usando book.url_capa para o src da imagem */}
                        <img
                          src={book.url_capa || "/placeholder.svg"}
                          alt={book.titulo}
                          className="img-fluid rounded shadow book-cover"
                        />
                      </div>
                      <div className="book-info-section">
                        <h2 className="book-title">{book.titulo}</h2>
                        <p className="book-author">por {book.autor}</p>
                        <p className="book-publisher">
                          publicado pela editora {book.editora || "N/A"}
                        </p>
                        <div className="book-description">
                          {book.descricao || "Descrição não disponível."}
                        </div>
                      </div>

                      <div className="action-buttons mb-4">
                        <button
                          className="btn btn-primary btn-lg me-3 start-reading-btn"
                          onClick={() => handleStartReading(book)}
                        >
                          <i className="bi bi-play-circle me-2"></i>
                          Iniciar leitura
                        </button>
                      </div>

                      <div className="rating-section">
                        <h5 className="rating-title">Avaliações</h5>
                        <div className="rating-stars">
                          {renderStars(book.rating || 0)}
                        </div>{" "}
                        {/* Ajuste se sua API tiver um campo de rating */}
                        <p className="rating-info">
                          {book.rating || 0}.0 de 5 estrelas (N/A avaliações)
                        </p>
                      </div>

                      {/* Feedback Section (mantido como estava, sem integração com API de feedback) */}
                      <div className="comment-section mt-4">
                        <div className="user-rating-container mb-3">
                          <p className="text-white mb-2">Sua avaliação:</p>
                          <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star} // Key para estrelas (ok)
                                className={`rating-star ${
                                  userRating >= star ? "active" : ""
                                }`}
                                onClick={() => setUserRating(star)}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <textarea
                          className="comment-box"
                          placeholder="Deixe seu comentário sobre o livro..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                        ></textarea>
                        <button
                          className="submit-comment-btn mt-3"
                          onClick={handleSubmitFeedback}
                          disabled={!feedback.trim() || userRating === 0}
                        >
                          Enviar
                        </button>
                      </div>

                      <div className="feedbacks-list mt-4">
                        <h6 className="text-white mb-3">
                          Comentários dos leitores:
                        </h6>
                        {feedbacks.map((fb) => (
                          <div key={fb.id} className="feedback-item">
                            {" "}
                            {/* Key para feedbacks (ok) */}
                            <div className="d-flex justify-content-between align-items-start">
                              <strong className="text-warning">
                                {fb.user}
                              </strong>
                              <div className="feedback-stars">
                                {renderStars(fb.rating)}
                              </div>
                            </div>
                            <p className="text-light mt-2 mb-0">{fb.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Livro;
