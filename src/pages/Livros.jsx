"use client";
import { useState, useEffect, useCallback } from "react";
import Footer from "../components/footer/Footer";
import "./Livro.css";

import { useState } from "react"
import Footer from "../components/footer/Footer"

const Livro = () => {
  const [books, setBooks] = useState([]); // Todos os livros da API
  const [categories, setCategories] = useState([]); // Todas as categorias da API
  const [filteredBooks, setFilteredBooks] = useState([]); // Livros filtrados por categoria ou busca
  

  const [selectedCategory, setSelectedCategory] = useState("Todos"); // Categoria selecionada
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o input de busca
  const [loading, setLoading] = useState(true); // Estado para o indicador de carregamento
  const [error, setError] = useState(null); // Estado para o tratamento de erros

  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://bibliotech.somee.com";

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
      currentBooks = currentBooks.filter(book =>
        // Certifique-se de que book.genero existe e corresponde à categoria
        book.genero && book.genero.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 2. Filtrar por termo de busca
    if (searchTerm.trim()) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentBooks = currentBooks.filter(book =>
        book.titulo.toLowerCase().includes(lowerCaseSearchTerm) ||
        book.autor.toLowerCase().includes(lowerCaseSearchTerm) ||
        (book.editora && book.editora.toLowerCase().includes(lowerCaseSearchTerm)) ||
        // Corrigido: usando book.url_capa para busca
        (book.url_capa && book.url_capa.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (book.descricao && book.descricao.toLowerCase().includes(lowerCaseSearchTerm))
      );
    }
    setFilteredBooks(currentBooks);
  }, [selectedCategory, searchTerm, books]); // Dependências do useEffect de filtro
const Livros = () => {
  const [selectedCategory, setSelectedCategory] = useState("Romance")
  const [userRating, setUserRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, user: "Maria Silva", rating: 5, comment: "Livro incrível! Não consegui parar de ler." },
    { id: 2, user: "João Santos", rating: 4, comment: "História envolvente, recomendo!" },
  ])

  const categories = ["Romance", "Terror", "Fantasia", "Biografia", "Drama", "Ficção"]

  const booksByCategory = {
    Romance: {
      title: "É Assim Que Começa",
      author: "Colleen Hoover",
      publisher: "Galera Record",
      image: "src/img/É assim que começa.jpg",
      description:
        "Lily acredita que está vivendo o grande amor da sua vida ao lado de Ryle, um neurocirurgião confiante, teimoso e talvez um pouco arrogante, mas que esconde um passado doloroso. Quando Atlas, seu primeiro amor, reaparece em sua vida, tudo muda.",
      rating: 5,
    },
    Terror: {
      title: "O Clube de Mary Shelley",
      author: "Goldy Moldavsky",
      publisher: "Editora Melhoramentos",
      image: "src/img/Clube de mary shelley.jpg",
      description:
        "Seis jovens por um dia tornaram-se mais traumatizantes de suas vidas. Rachel não estava ali para recuperar ou para fazer novos amigos, mas para descobrir o que aconteceu a sua melhor amiga, Rachel, que foi encontrada morta depois de uma noite no Clube de Mary Shelley.",
      rating: 4,
    },
    Fantasia: {
      title: "A Rainha Vermelha",
      author: "Victoria Aveyard",
      publisher: "Seguinte",
      image: "src/img/A rainha vermelha.jpg",
      description:
        "Em um mundo dividido pelo sangue - vermelho ou prateado - Mare Barrow vive como uma ladra Vermelha até descobrir que possui um poder letal próprio. Para esconder essa descoberta, o rei a força a desempenhar o papel de uma princesa Prateada perdida.",
      rating: 4,
    },
    Biografia: {
      title: "Um Verão na Itália",
      author: "Carrie Elks",
      publisher: "Faro Editorial",
      image: "src/img/Um verão na itália.jpg",
      description:
        "Uma jornada de autodescoberta pelas belas paisagens da Itália. Uma história inspiradora sobre recomeços, amor próprio e a coragem de seguir seus sonhos, mesmo quando tudo parece perdido.",
      rating: 4,
    },
    Drama: {
      title: "As Vantagens de Ser Invisível",
      author: "Stephen Chbosky",
      publisher: "Rocco",
      image: "src/img/As vantagens de ser invisivel.jpg",
      description:
        "Charlie é um adolescente tímido e introspectivo que está tentando encontrar seu lugar no mundo. Através de cartas para um amigo anônimo, ele narra sua jornada de crescimento, amizades e descobertas durante o ensino médio.",
      rating: 5,
    },
    Ficção: {
      title: "Harry Potter e a Pedra Filosofal",
      author: "J.K. Rowling",
      publisher: "Rocco",
      image: "src/img/Harry PotterFilosofal.jpg",
      description:
        "Harry Potter é um garoto órfão que vive infeliz com seus tios até descobrir que é um bruxo e ser convidado para estudar na Escola de Magia e Bruxaria de Hogwarts. Lá ele descobre a verdade sobre seus pais e seu destino.",
      rating: 5,
    },
  }

  const currentBook = booksByCategory[selectedCategory]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${index < rating ? "text-warning" : "text-muted"}`}
        className={`star ${index < rating ? "filled" : ""} ${interactive ? "" : ""}`}
        onClick={interactive ? () => onStarClick(index + 1) : undefined}
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
    const savedBooks = JSON.parse(localStorage.getItem("livrosEmProgresso")) || [];

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

    const livroJaExiste = savedBooks.some((livro) => livro.id === livroAtual.id);

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
    { id: 1, user: "Maria Silva", rating: 5, comment: "Livro incrível! Não consegui parar de ler." },
    { id: 2, user: "João Santos", rating: 4, comment: "História envolvente, recomendo!" },
  ]);
  const handleStartReading = () => {
    console.log(`Iniciando leitura de ${currentBook.title}...`)
  }

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
    <div className="container-fluid" style={{ backgroundColor: "#876b5d", minHeight: "100vh" }}>
      {/* Header (mantido como estava no seu código, mas você pode adicionar links) */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#876B5D" }}>
        <div className="container">
          <a className="navbar-brand text-white" href="#"></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
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
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="bg-pattern min-vh-100" style={{ paddingTop: "60px" }}>

        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light-custom border-custom">
                  <i className="bi bi-search text-primary-custom"></i>
                </span>
                <input type="text" className="form-control border-custom" placeholder="Pesquisar livros..." />
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center gap-3">
              
            
                {categories.map((category) => (
                  <button
                    key={category.categoriasId}
                    className={`btn btn-outline-secondary ${selectedCategory === category.nome ? "active" : ""}`}
                    onClick={() => handleCategoryClick(category.nome)}
                    key={index}
                    className={`btn btn-lg rounded-pill ${
                      selectedCategory === category ? "btn-primary-custom" : "btn-outline-custom"
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.nome}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      {/* Display Filtered Books */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {loading && <p className="text-white text-center">Carregando livros...</p>}
            {error && <p className="text-danger text-center">{error}</p>}

            {!loading && !error && filteredBooks.length === 0 && (
              <p className="text-white text-center">Nenhum livro encontrado para os critérios selecionados.</p>
            )}

            {!loading && !error && filteredBooks.length > 0 && (
              filteredBooks.map((book, index) => ( // Adicionado 'index' para o fallback da key
                // Corrigido: Usando 'book.livrosId || `book-${index}`' para a key
                // Isso garante uma key única mesmo que 'livrosId' esteja ausente ou nulo
                <div key={book.livrosId || `book-${index}`} className="book-card border-0 shadow-sm mb-4">
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
                      <p className="book-publisher">publicado pela editora {book.editora || "N/A"}</p>
                      <div className="book-description">{book.descricao || "Descrição não disponível."}</div>
                    </div>
                    
                    <div className="action-buttons mb-4">
                      <button className="btn btn-primary btn-lg me-3 start-reading-btn" onClick={() => handleStartReading(book)}>
                        <i className="bi bi-play-circle me-2"></i>
                        Iniciar leitura
                      </button>
                    </div>
        <div className="container mt-5 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card card-custom border-custom shadow-custom">
                <div className="card-body text-center p-4">
             
                  <div className="mb-4">
                    <img
                      src={currentBook.image || "/placeholder.svg?height=400&width=300"}
                      alt={currentBook.title}
                      className="img-fluid rounded shadow-custom"
                      style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                  </div>

                  <div className="mb-4">
                    <h2 className="text-accent-custom fw-bold mb-2">{currentBook.title}</h2>
                    <p className="text-muted-custom fs-5 mb-1">por {currentBook.author}</p>
                    <p className="text-muted-custom mb-3">publicado pela editora {currentBook.publisher}</p>
                    <p className="text-light lh-base">{currentBook.description}</p>
                  </div>

                  <div className="mb-4">
                    <button className="btn btn-primary-custom btn-lg" onClick={handleStartReading}>
                      <i className="bi bi-play-circle me-2"></i>
                      Iniciar leitura
                    </button>
                  </div>

                    <div className="rating-section">
                      <h5 className="rating-title">Avaliações</h5>
                      <div className="rating-stars">{renderStars(book.rating || 0)}</div> {/* Ajuste se sua API tiver um campo de rating */}
                      <p className="rating-info">
                        {book.rating || 0}.0 de 5 estrelas (N/A avaliações)
                      </p>
                    </div>
                  <div className="mb-4">
                    <h5 className="text-accent-custom mb-3">Avaliações</h5>
                    <div className="star-rating mb-2">{renderStars(currentBook.rating)}</div>
                    <p className="text-muted-custom">
                      {currentBook.rating}.0 de 5 estrelas ({feedbacks.length} avaliações)
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
                              className={`rating-star ${userRating >= star ? "active" : ""}`}
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
                  <div className="mb-4">
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

                    <div className="feedbacks-list mt-4">
                      <h6 className="text-white mb-3">Comentários dos leitores:</h6>
                      {feedbacks.map((fb) => (
                        <div key={fb.id} className="feedback-item"> {/* Key para feedbacks (ok) */}
                          <div className="d-flex justify-content-between align-items-start">
                            <strong className="text-warning">{fb.user}</strong>
                            <div className="feedback-stars">{renderStars(fb.rating)}</div>
                          </div>
                          <p className="text-light mt-2 mb-0">{fb.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
                  <div>
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

        <Footer />
      </div>
    </>
  )
}

export default Livro;
export default Livros
