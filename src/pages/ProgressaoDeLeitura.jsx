
import { useEffect, useState } from "react"
import Grafico from "../components/grafico/Grafico"
import { Link } from "react-router";
import Footer from "../components/footer/Footer";

import "bootstrap/dist/css/bootstrap.min.css"
import * as bootstrap from "bootstrap"


const Books = [
  {
    id: 1,
    titulo: "Um Verão na Itália",
    autor: "Carrie Elks",
    progresso: 25,
    avaliacao: 4,
    imagem: "/src/assets/ʕ•́ᴥ•̀ʔっ Book's ♥.jpg",
    resumo:
      "Em 'Um Verão na Itália', acompanhamos a jornada de Sofia, uma jovem estudante de arte que decide passar o verão na Toscana após uma decepção amorosa. Lá, ela conhece Marco, um charmoso chef local que a ensina sobre a culinária italiana e, aos poucos, a ajuda a redescobrir o amor e a paixão pela vida. Entre vinhedos, oliveiras e o pôr do sol italiano, Sofia aprende que às vezes é preciso se perder para encontrar o verdadeiro caminho.",
  },
  {
    id: 2,
    titulo: "A Garota do Lago",
    autor: "Charlie Donlea",
    progresso: 50,
    avaliacao: 5,
    imagem: "/src/assets/e3c3884a-20e2-4a72-b544-3d155f968e84.jpg",
    resumo:
      "Neste thriller psicológico, a jornalista investigativa Kelsey Castle é contratada para produzir um documentário sobre o desaparecimento de Summit Lake, uma estudante de direito encontrada morta em circunstâncias misteriosas. Conforme Kelsey mergulha na investigação, ela descobre segredos obscuros da pequena cidade e percebe que o caso tem semelhanças perturbadoras com um trauma de seu próprio passado. Uma narrativa envolvente sobre obsessão, segredos e a busca incansável pela verdade.",
  },
  {
    id: 3,
    titulo: "O Sol é Para Todos",
    autor: "Harper Lee",
    progresso: 75,
    avaliacao: 5,
    imagem: "/src/assets/A lista de livros para você ler durante as férias….jpg",
    resumo:
      "Ambientado nos anos 1930 em uma pequena cidade do Alabama, este clássico da literatura americana narra a história através dos olhos de Scout Finch, uma menina de seis anos. Seu pai, o advogado Atticus Finch, defende um homem negro injustamente acusado de estuprar uma mulher branca, enfrentando o preconceito enraizado da comunidade. A obra aborda temas como racismo, injustiça, compaixão e perda da inocência, oferecendo um retrato poderoso da sociedade sulista americana e uma reflexão atemporal sobre ética e moralidade.",
  },
  {
    id: 4,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    progresso: 100,
    avaliacao: 5,
    imagem: "/src/assets/O Pequeno Príncipe Livros Clássicos Livros….jpg",
    resumo:
      "Esta fábula encantadora conta a história de um piloto que, após cair com seu avião no deserto do Saara, encontra um pequeno príncipe vindo de um asteroide distante. Através das conversas entre os dois, o livro explora temas profundos como amor, amizade, solidão e o sentido da vida. Com sua célebre frase 'O essencial é invisível aos olhos', a obra nos lembra que as coisas mais importantes da vida só podem ser verdadeiramente vistas com o coração, não com os olhos.",
  },
]

const ProgressoLivros = () => {
  const [books, setBooks] = useState(Books)
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    document.title = "Progresso de Leitura"

  
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
  }, [])

  
  const handleRatingChange = (bookId, newRating) => {
    setBooks((prevBooks) => prevBooks.map((book) => (book.id === bookId ? { ...book, avaliacao: newRating } : book)))
    
    console.log(`Livro ID ${bookId} avaliado com ${newRating} estrelas`)
  }


  const openBookDetails = (book) => {
    setSelectedBook(book)
    
    const modal = new bootstrap.Modal(document.getElementById("bookDetailsModal"))
    modal.show()
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Progresso de Leitura</h1>

      <div className="row">
        {books.map((livro) => (
          <div key={livro.id} className="col-md-6 col-lg-3 mb-4">
            <div
              className="card h-100 shadow-sm"
              style={{ backgroundColor: "#876b5d", color: "white", cursor: "pointer" }}
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
                          e.stopPropagation() 
                          handleRatingChange(livro.id, star)
                        }}
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

      
      <div
        className="modal fade"
        id="bookDetailsModal"
        tabIndex="-1"
        aria-labelledby="bookDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
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

    
   
       <Footer/>
       </div>
  )
}

export default ProgressoLivros
