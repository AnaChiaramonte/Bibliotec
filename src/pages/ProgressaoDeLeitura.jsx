import { useEffect, useState, useCallback } from "react";
import Grafico from "../components/grafico/Grafico";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom"; // Corrigido o import para 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

const ProgressoLivros = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // Estado para o livro selecionado no modal

  // Usa useCallback para memoizar a função de fechar o modal
  const closeModal = useCallback(() => {
    const bookDetailsModalElement = document.getElementById("bookDetailsModal");
    if (bookDetailsModalElement) {
      const bookDetailsModal = bootstrap.Modal.getInstance(bookDetailsModalElement);
      if (bookDetailsModal) {
        bookDetailsModal.hide();
      }
    }
  }, []);

  // Efeito para carregar os livros do localStorage na montagem
  useEffect(() => {
    document.title = "Progresso de Leitura";
    const savedBooks = JSON.parse(localStorage.getItem("livrosEmProgresso")) || [];
    setBooks(savedBooks);

    // Inicializa tooltips do Bootstrap
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltips = Array.from(tooltipTriggerList).map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );

    // Cleanup para remover tooltips quando o componente desmontar
    return () => {
      tooltips.forEach((tooltipInstance) => {
        if (tooltipInstance) {
          tooltipInstance.dispose();
        }
      });
    };
  }, []); // Array de dependências vazio para rodar apenas uma vez na montagem

  // NOVO useEffect: Salva os livros no localStorage sempre que o estado 'books' é atualizado
  useEffect(() => {
    if (books.length > 0 || localStorage.getItem("livrosEmProgresso") !== null) {
      localStorage.setItem("livrosEmProgresso", JSON.stringify(books));
    }
  }, [books]); // Depende de 'books', será executado sempre que 'books' mudar

  // Função para atualizar a avaliação de um livro
  const handleRatingChange = (bookId, newRating) => {
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.map((book) =>
        book.id === bookId ? { ...book, avaliacao: newRating } : book
      );
      // Se o livro selecionado for o que está sendo atualizado, atualiza-o também no modal
      if (selectedBook && selectedBook.id === bookId) {
        setSelectedBook((prevSelected) => ({ ...prevSelected, avaliacao: newRating }));
      }
      return updatedBooks;
    });
    console.log(`Livro ID ${bookId} avaliado com ${newRating} estrelas`);
  };

  // Função para atualizar o progresso de um livro
  const handleProgressChange = (bookId, newProgress) => {
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.map((book) =>
        book.id === bookId ? { ...book, progresso: newProgress } : book
      );
      // Se o livro selecionado for o que está sendo atualizado, atualiza-o também no modal
      if (selectedBook && selectedBook.id === bookId) {
        setSelectedBook((prevSelected) => ({ ...prevSelected, progresso: newProgress }));
      }
      return updatedBooks;
    });
    console.log(`Livro ID ${bookId} com progresso de ${newProgress}%`);
  };

  // Função para abrir os detalhes do livro no modal
  const openBookDetails = (book) => {
    setSelectedBook(book);
    const bookDetailsModal = new bootstrap.Modal(
      document.getElementById("bookDetailsModal")
    );
    bookDetailsModal.show();
  };

  return (
    <div className="bg-pattern container-fluid" style={{ minHeight: "100vh" }}>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#876B5D" }}>
        <div className="container">
          <Link className="navbar-brand text-white" to="/">Minha Biblioteca</Link>
        </div>
      </nav>

      <div className="container py-4">
        <h1 className="text-center mb-4" style={{ color: "#E4CFC4" }}>
          Progresso de Leitura
        </h1>

        <div className="row justify-content-center">
          {books.length === 0 ? (
            <div className="col-12 text-center text-white-50">
              <p>Nenhum livro em progresso ainda. Comece a ler para adicioná-los aqui!</p>
              <Link to="/livros" className="btn btn-primary-custom mt-3">
                Explorar Livros
              </Link>
            </div>
          ) : (
            books.map((livro) => (
              <div
                key={livro.id}
                className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex"
              >
                <div
                  className="card h-100 shadow-sm w-100"
                  style={{ backgroundColor: "#bca397", color: "white", cursor: "pointer" }}
                  onClick={() => openBookDetails(livro)}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Clique para ver detalhes"
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img
                      src={livro.imagem || "/placeholder.svg"}
                      alt={livro.titulo}
                      className="card-img-top img-fluid h-100 w-100"
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-dark">{livro.titulo}</h5>
                    <p className="card-text text-light opacity-75 mb-1">Autor: {livro.autor}</p>
                    <div className="mb-2">
                      <p className="card-text mb-1">Avaliação:</p>
                      <div className="d-flex align-items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="bg-transparent border-0 p-0 me-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRatingChange(livro.id, star);
                            }}
                            aria-label={`Avaliar com ${star} ${
                              star === 1 ? "estrela" : "estrelas"
                            }`}
                            style={{
                              fontSize: "1.5rem",
                              color: star <= livro.avaliacao ? "#ffd700" : "#e0e0e0",
                            }}
                          >
                            ★
                          </button>
                        ))}
                        <span className="ms-2 small text-light opacity-75">
                          ({livro.avaliacao || 0})
                        </span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Grafico progresso={livro.progresso} />
                      <div className="text-end mt-1">
                        <small className="text-dark opacity-75">
                          {livro.progresso || 0}% concluído
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Detalhes do Livro */}
      <div
        className="modal fade"
        id="bookDetailsModal"
        tabIndex="-1"
        aria-labelledby="bookDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content" style={{ backgroundColor: "#bba597f8" }}>
            {selectedBook && (
              <>
                <div
                  className="modal-header"
                  style={{ backgroundColor: "#876b5d", color: "white" }}
                >
                  <h5 className="modal-title" id="bookDetailsModalLabel">
                    {selectedBook.titulo}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    data-bs-dismiss="modal"
                    aria-label="Fechar"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                      <img
                        src={selectedBook.imagem || "/placeholder.svg"}
                        alt={selectedBook.titulo}
                        className="img-fluid rounded"
                        style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
                      />
                      <div className="mt-3">
                        <h6>Progresso de Leitura:</h6>
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${selectedBook.progresso}%`,
                              backgroundColor: "#876b5d",
                            }}
                            aria-valuenow={selectedBook.progresso}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {selectedBook.progresso || 0}%
                          </div>
                        </div>
                        {/* Botões de atualização de progresso */}
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              const newProg = Math.max(0, (selectedBook.progresso || 0) - 10);
                              handleProgressChange(selectedBook.id, newProg);
                            }}
                          >
                            -10%
                          </button>
                          <input
                            type="number"
                            className="form-control mx-2"
                            style={{ width: "80px" }}
                            value={selectedBook.progresso || 0}
                            onChange={(e) => {
                              const newProg = parseInt(e.target.value);
                              if (!isNaN(newProg) && newProg >= 0 && newProg <= 100) {
                                handleProgressChange(selectedBook.id, newProg);
                              }
                            }}
                          />
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              const newProg = Math.min(100, (selectedBook.progresso || 0) + 10);
                              handleProgressChange(selectedBook.id, newProg);
                            }}
                          >
                            +10%
                          </button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h6>Avaliação:</h6>
                        <div className="d-flex align-items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              onClick={() => {
                                handleRatingChange(selectedBook.id, star);
                              }}
                              style={{
                                fontSize: "1.5rem",
                                color: star <= selectedBook.avaliacao ? "#ffd700" : "#e0e0e0",
                                cursor: "pointer",
                              }}
                            >
                              ★
                            </span>
                          ))}
                          <span className="ms-2">({selectedBook.avaliacao || 0}/5)</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8 text-dark">
                      <h5>Sobre o Livro</h5>
                      <p>
                        <strong>Autor:</strong> {selectedBook.autor}
                      </p>
                      <div className="mb-4">
                        <Link
                          to={`/ler-livro/${selectedBook.id}`}
                          className="btn btn-primary-custom"
                          onClick={closeModal} // Fecha o modal ao clicar no botão "Continuar Lendo"
                        >
                          <i className="bi bi-play-circle me-2"></i>
                          {selectedBook.progresso < 100 ? "Continuar Lendo" : "Reler Livro"}
                        </Link>
                      </div>
                      <h6 className="text-accent-custom mb-2">Resumo:</h6>
                      <p className="text-dark lh-base">
                        {selectedBook.descricao || "Descrição não disponível."}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProgressoLivros;