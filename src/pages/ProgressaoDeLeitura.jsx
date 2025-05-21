"use client"

import { useEffect, useState } from "react"
import Grafico from "../components/grafico/Grafico"
import "bootstrap/dist/css/bootstrap.min.css"

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

  
  const handleRatingChange = (bookId, newRating) => {
    setBooks((prevBooks) => prevBooks.map((book) => (book.id === bookId ? { ...book, avaliacao: newRating } : book)))

   
    console.log(`Livro ID ${bookId} avaliado com ${newRating} estrelas`)
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Progresso de Leitura</h1>

      <div className="row">
        {books.map((livro) => (
          <div key={livro.id} className="col-md-6 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm" style={{ backgroundColor: "#876b5d", color: "white" }}>
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
                        onClick={() => handleRatingChange(livro.id, star)}
                        aria-label={`Avaliar com ${star} ${star === 1 ? "estrela" : "estrelas"}`}
                        style={{ fontSize: "1.5rem", color: star <= livro.avaliacao ? "#ffd700" : "#e0e0e0" }}
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
                    <small className="text-light opacity-75">{livro.progresso}% concluído</small>
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
