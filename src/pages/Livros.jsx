"use client";
import { useState, useEffect } from "react"; // Import useEffect
import Footer from "../components/footer/Footer";
import "./Livro.css";

const Livro = () => {
  const [selectedCategory, setSelectedCategory] = useState("Romance");
  const [userRating, setUserRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, user: "Maria Silva", rating: 5, comment: "Livro incrível! Não consegui parar de ler." },
    { id: 2, user: "João Santos", rating: 4, comment: "História envolvente, recomendo!" },
  ]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  const categories = ["Romance", "Terror", "Fantasia", "Biografia", "Drama", "Ficção"];

  // Your API base URL (adjust if needed)
  const API_BASE_URL = "https://localhost:7196/api/Livros"; // Replace with your actual API URL

  // Dummy book data (keep this for fallback/initial display if needed)
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
  };

  const currentBook = booksByCategory[selectedCategory];

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${index < rating ? "text-warning" : "text-muted"} ${interactive ? "interactive-star" : ""}`}
        onClick={interactive ? () => onStarClick(index + 1) : undefined}
        style={interactive ? { cursor: "pointer" } : {}}
      >
        ★
      </span>
    ));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setUserRating(0);
    setFeedback("");
    setSearchResults([]); // Clear search results when switching categories
    setSearchTerm(""); // Clear search term as well
  };

  const handleStartReading = () => {
    const savedBooks = JSON.parse(localStorage.getItem("livrosEmProgresso")) || [];

    const livroAtual = {
      id: selectedCategory, // This ID might need to be dynamic if coming from API
      titulo: currentBook.title,
      autor: currentBook.author,
      imagem: currentBook.image,
      progresso: 0,
      avaliacao: currentBook.rating,
      descricao: currentBook.description,
    };

    const livroJaExiste = savedBooks.some((livro) => livro.id === livroAtual.id);

    if (!livroJaExiste) {
      savedBooks.push(livroAtual);
      localStorage.setItem("livrosEmProgresso", JSON.stringify(savedBooks));
      alert(`${currentBook.title} foi adicionado ao seu progresso de leitura!`);
    } else {
      alert("Esse livro já está no seu progresso de leitura!");
    }
  };

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

  // --- NEW SEARCH LOGIC ---
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]); // Clear results if search term is empty
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    try {
      // It's recommended to use a library like axios for API calls, but fetch works too.
      // Make sure your API is running and accessible at API_BASE_URL
      const response = await fetch(`${API_BASE_URL}/searchByTitle?title=${encodeURIComponent(searchTerm)}`);

      if (!response.ok) {
        if (response.status === 404) {
          setSearchResults([]); // No books found for the search term
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (e) {
      console.error("Error fetching search results:", e);
      setError("Não foi possível buscar os livros. Tente novamente mais tarde.");
      setSearchResults([]); // Clear results on error
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  // --- END NEW SEARCH LOGIC ---

  return (
    <div className="container-fluid" style={{ backgroundColor: "#876b5d", minHeight: "100vh" }}>
      {/* Header */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#876B5D" }}>
        <div className="container">
          <a className="navbar-brand text-white" href="#"></a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
          
            
           
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
                onKeyDown={handleKeyDown} // Add onKeyDown to trigger search on Enter
              />
              <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
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
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`btn btn-lg rounded-pill ${selectedCategory === category ? "category-active" : "category-inactive"}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display Search Results or Default Category View */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {loading && <p className="text-white text-center">Carregando...</p>}
            {error && <p className="text-danger text-center">{error}</p>}

            {!loading && !error && searchResults.length > 0 && (
              <div className="search-results-section">
                <h3 className="text-white text-center mb-4">Resultados da Pesquisa</h3>
                {searchResults.map((book) => (
                  <div key={book.livrosId} className="book-card border-0 shadow-sm mb-4">
                    <div className="card-body text-center p-4">
                      <div className="mb-4">
                        {/* You might need to adjust the image path based on your API response */}
                        <img
                          src={book.image || "/placeholder.svg"} // Assuming your API returns an 'image' field
                          alt={book.titulo}
                          className="img-fluid rounded shadow book-cover"
                        />
                      </div>
                      <div className="book-info-section">
                        <h2 className="book-title">{book.titulo}</h2>
                        <p className="book-author">por {book.autor}</p>
                        {/* Add publisher if your API returns it */}
                        {/* <p className="book-publisher">publicado pela editora {book.publisher}</p> */}
                        <div className="book-description">{book.description || "Descrição não disponível."}</div>
                      </div>
                      {/* You can add more book details here from the API response */}
                      <div className="action-buttons mb-4">
                        <button className="btn btn-primary btn-lg me-3 start-reading-btn" onClick={() => handleStartReading(book)}>
                          <i className="bi bi-play-circle me-2"></i>
                          Iniciar leitura
                        </button>
                      </div>
                      {/* Rating section for search results - might need to fetch average rating from API */}
                      <div className="rating-section">
                        <h5 className="rating-title">Avaliações</h5>
                        <div className="rating-stars">{renderStars(book.rating || 0)}</div> {/* Assuming rating from API */}
                        <p className="rating-info">
                          {book.rating || 0}.0 de 5 estrelas (N/A avaliações)
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && searchResults.length === 0 && searchTerm.trim() && (
              <p className="text-white text-center">Nenhum livro encontrado para "${searchTerm}".</p>
            )}

            {/* Display default category view only if no search results and no search term */}
            {!loading && !error && searchResults.length === 0 && !searchTerm.trim() && (
              <div className="book-card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  {/* Book Cover */}
                  <div className="mb-4">
                    <img
                      src={currentBook.image || "/placeholder.svg"}
                      alt={currentBook.title}
                      className="img-fluid rounded shadow book-cover"
                    />
                  </div>

                  {/* Book Info */}
                  <div className="book-info-section">
                    <h2 className="book-title">{currentBook.title}</h2>
                    <p className="book-author">por {currentBook.author}</p>
                    <p className="book-publisher">publicado pela editora {currentBook.publisher}</p>

                    <div className="book-description">{currentBook.description}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons mb-4">
                    <button className="btn btn-primary btn-lg me-3 start-reading-btn" onClick={handleStartReading}>
                      <i className="bi bi-play-circle me-2"></i>
                      Iniciar leitura
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="rating-section">
                    <h5 className="rating-title">Avaliações</h5>
                    <div className="rating-stars">{renderStars(currentBook.rating)}</div>
                    <p className="rating-info">
                      {currentBook.rating}.0 de 5 estrelas ({feedbacks.length} avaliações)
                    </p>
                  </div>

                  {/* User Feedback Section */}
                  <div className="comment-section mt-4">
                    <div className="user-rating-container mb-3">
                      <p className="text-white mb-2">Sua avaliação:</p>
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
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

                  {/* Display Feedbacks */}
                  <div className="feedbacks-list mt-4">
                    <h6 className="text-white mb-3">Comentários dos leitores:</h6>
                    {feedbacks.map((fb) => (
                      <div key={fb.id} className="feedback-item">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Livro;