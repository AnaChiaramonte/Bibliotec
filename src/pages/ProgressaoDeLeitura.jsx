import { useEffect, useState } from "react";
import Grafico from "../components/grafico/Grafico";
import Footer from "../components/footer/Footer";
import { Link } from "react-router-dom"; // Corrigido o import do Link

import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

const ProgressoLivros = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // 🔥 Aqui estava faltando!

  useEffect(() => {
    document.title = "Progresso de Leitura";
    const savedBooks = JSON.parse(localStorage.getItem("livrosEmProgresso")) || [];
    setBooks(savedBooks);

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
  }, []);

  const handleRatingChange = (bookId, newRating) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === bookId ? { ...book, avaliacao: newRating } : book))
    );
    console.log(`Livro ID ${bookId} avaliado com ${newRating} estrelas`);
  };

  const openBookDetails = (book) => {
    setSelectedBook(book);
    const bookDetailsModal = new bootstrap.Modal(document.getElementById("bookDetailsModal"));
    bookDetailsModal.show();
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Progresso de Leitura</h1>

      <div className="row">
        {books.map((livro) => (
          <div key={livro.id} className="col-md-6 col-lg-3 mb-4">
            <div
              className="card h-100 shadow-sm"
              style={{ backgroundColor: "#bca397", color: "#a7866454", cursor: "pointer" }}
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
              <div className="card-body">
                <h5 className="card-title">{livro.titulo}</h5>
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
                        aria-label={`Avaliar com ${star} ${star === 1 ? "estrela" : "estrelas"}`}
                        style={{
                          fontSize: "1.5rem",
                          color: star <= livro.avaliacao ? "#ffd700" : "#e0e0e0",
                        }}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ms-2 small text-light opacity-75">({livro.avaliacao})</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Grafico progresso={livro.progresso} />
                  <div className="text-end mt-1">
                    <small className="text-dark opacity-75">{livro.progresso}% concluído</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="bookDetailsModal"
        tabIndex="-1"
        aria-labelledby="bookDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content" style={{ backgroundColor: "#bba597f8" }}>
            {selectedBook && (
              <>
                <div className="modal-header" style={{ backgroundColor: "#876b5d", color: "white" }}>
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
                            style={{ width: `${selectedBook.progresso}%`, backgroundColor: "#876b5d" }}
                            aria-valuenow={selectedBook.progresso}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {selectedBook.progresso}%
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h6>Avaliação:</h6>
                        <div className="d-flex align-items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              style={{
                                fontSize: "1.5rem",
                                color: star <= selectedBook.avaliacao ? "#ffd700" : "#e0e0e0",
                              }}
                            >
                              ★
                            </span>
                          ))}
                          <span className="ms-2">({selectedBook.avaliacao}/5)</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h5>Sobre o Livro</h5>
                      <p>
                        <strong>Autor:</strong> {selectedBook.autor}
                      </p>

                      <div className="mb-4">
                        <button
                          className="btn btn-primary"
                          style={{ backgroundColor: "#876b5d", borderColor: "#876b5d" }}
                        >
                          {selectedBook.progresso < 100 ? "Continuar Lendo" : "Reler Livro"}
                        </button>
                      </div>

                      <h6>Resumo:</h6>
                      <p className="text-muted">{selectedBook.resumo}</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Fechar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

    
   
       </div>
    
             
     
    </div>
  );
};

export default ProgressoLivros;
