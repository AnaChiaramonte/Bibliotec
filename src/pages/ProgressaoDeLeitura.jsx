"use client"

import { useEffect, useState } from "react"
import Grafico from "../components/grafico/Grafico"
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/ProgressoLivros.css"

// Dados iniciais dos livros
const Books = [
  {
    id: 1,
    titulo: "Um Verão na Itália",
    autor: "Carrie Elks",
    progresso: 25,
    avaliacao: 4,
    imagem: "/src/assets/ʕ•́ᴥ•̀ʔっ Book's ♥.jpg",
  },
  {
    id: 2,
    titulo: "A Garota do Lago",
    autor: "Charlie Donlea",
    progresso: 50,
    avaliacao: 5,
    imagem: "/src/assets/e3c3884a-20e2-4a72-b544-3d155f968e84.jpg",
  },
  {
    id: 3,
    titulo: "O Sol é Para Todos",
    autor: "Harper Lee",
    progresso: 75,
    avaliacao: 5,
    imagem: "/src/assets/A lista de livros para você ler durante as férias….jpg",
  },
  {
    id: 4,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    progresso: 100,
    avaliacao: 5,
    imagem: "/src/assets/O Pequeno Príncipe Livros Clássicos Livros….jpg",
  },
]

const ProgressoLivros = () => {
  const [books, setBooks] = useState(Books)

  useEffect(() => {
    document.title = "Progresso de Leitura"
  }, [])

  // Função para atualizar a avaliação de um livro
  const handleRatingChange = (bookId, newRating) => {
    setBooks((prevBooks) => prevBooks.map((book) => (book.id === bookId ? { ...book, avaliacao: newRating } : book)))

    // Aqui você poderia adicionar código para salvar a avaliação em um banco de dados
    console.log(`Livro ID ${bookId} avaliado com ${newRating} estrelas`)
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Progresso de Leitura</h1>

      <div className="row">
        {books.map((livro) => (
          <div key={livro.id} className="col-md-6 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="book-image-container" style={{ height: "200px", overflow: "hidden" }}>
                <img
                  src={livro.imagem || "/placeholder.svg"}
                  alt={livro.titulo}
                  className="card-img-top img-fluid h-100 w-100"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{livro.titulo}</h5>
                <p className="card-text text-muted mb-1">Autor: {livro.autor}</p>
                <div className="mb-2">
                  <p className="card-text mb-1">Avaliação:</p>
                  <div className="rating-buttons">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`btn-star ${star <= livro.avaliacao ? "active" : ""}`}
                        onClick={() => handleRatingChange(livro.id, star)}
                        aria-label={`Avaliar com ${star} ${star === 1 ? "estrela" : "estrelas"}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="rating-value ms-2">({livro.avaliacao})</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Grafico progresso={livro.progresso} />
                  <div className="text-end mt-1">
                    <small className="text-muted">{livro.progresso}% concluído</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressoLivros
