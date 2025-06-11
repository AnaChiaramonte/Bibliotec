import { useEffect, useState } from "react"
import Footer from "../components/footer/Footer"

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

const ProgressaoDeLeitura = () => {
  const [books, setBooks] = useState(Books)
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    document.title = "Progresso de Leitura"
  }, [])

  const handleRatingChange = (bookId, newRating) => {
    setBooks((prevBooks) => prevBooks.map((book) => (book.id === bookId ? { ...book, avaliacao: newRating } : book)))
    console.log(`Livro ID ${bookId} avaliado com ${newRating} estrelas`)
  }

  const openBookDetails = (book) => {
    setSelectedBook(book)
  }

  const closeModal = () => {
    setSelectedBook(null)
  }

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="bg-pattern min-vh-100">
        <div className="container py-5">
        
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-accent-custom mb-3">
              <i className="bi bi-graph-up me-3"></i>
              Progresso de Leitura
            </h1>
            <p className="lead text-muted-custom">Acompanhe sua jornada literária</p>
          </div>

          <div className="row g-4">
            {books.map((livro) => (
              <div key={livro.id} className="col-md-6 col-lg-3">
                <div
                  className="card card-custom h-100 shadow-custom border-custom fade-in"
                  style={{ cursor: "pointer" }}
                  onClick={() => openBookDetails(livro)}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img
                      src={livro.imagem || "/placeholder.svg?height=200&width=150"}
                      alt={livro.titulo}
                      className="card-img-top h-100 w-100"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-accent-custom mb-2">{livro.titulo}</h5>
                    <p className="card-text text-muted-custom mb-2">
                      <i className="bi bi-person me-1"></i>
                      {livro.autor}
                    </p>

                    <div className="mb-3">
                      <p className="text-accent-custom mb-1 small">Avaliação:</p>
                      <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`star ${star <= livro.avaliacao ? "filled" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRatingChange(livro.id, star)
                            }}
                          >
                            ★
                          </span>
                        ))}
                        <span className="ms-2 small text-muted-custom">({livro.avaliacao})</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-accent-custom">Progresso:</small>
                        <small className="text-muted-custom">{livro.progresso}%</small>
                      </div>
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-primary-custom"
                          role="progressbar"
                          style={{ width: `${livro.progresso}%` }}
                          aria-valuenow={livro.progresso}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      {livro.progresso === 100 && (
                        <div className="text-center mt-2">
                          <span className="badge bg-primary-custom">
                            <i className="bi bi-check-circle me-1"></i>
                            Concluído
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedBook && (
          <div className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100" onClick={closeModal}>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="modal-content-custom rounded shadow-custom" onClick={(e) => e.stopPropagation()}>
                    {/* Modal Header */}
                    <div className="d-flex justify-content-between align-items-center p-4 border-bottom border-custom">
                      <h4 className="text-accent-custom fw-bold mb-0">{selectedBook.titulo}</h4>
                      <button type="button" className="btn btn-outline-custom btn-sm" onClick={closeModal}>
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="row">
                        <div className="col-md-4 mb-4 mb-md-0">
                          <img
                            src={selectedBook.imagem || "/placeholder.svg?height=400&width=300"}
                            alt={selectedBook.titulo}
                            className="img-fluid rounded shadow-custom"
                            style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
                          />

                         
                          <div className="mt-3">
                            <h6 className="text-accent-custom">Progresso de Leitura:</h6>
                            <div className="progress mb-2" style={{ height: "12px" }}>
                              <div
                                className="progress-bar bg-primary-custom"
                                role="progressbar"
                                style={{ width: `${selectedBook.progresso}%` }}
                                aria-valuenow={selectedBook.progresso}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {selectedBook.progresso}%
                              </div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <h6 className="text-accent-custom">Avaliação:</h6>
                            <div className="star-rating">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className={`star ${star <= selectedBook.avaliacao ? "filled" : ""}`}>
                                  ★
                                </span>
                              ))}
                              <span className="ms-2 text-muted-custom">({selectedBook.avaliacao}/5)</span>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-8">
                          <h5 className="text-accent-custom mb-3">Sobre o Livro</h5>
                          <p className="text-muted-custom mb-3">
                            <strong>Autor:</strong> {selectedBook.autor}
                          </p>

                          <div className="mb-4">
                            <button className="btn btn-primary-custom">
                              <i className="bi bi-play-circle me-2"></i>
                              {selectedBook.progresso < 100 ? "Continuar Lendo" : "Reler Livro"}
                            </button>
                          </div>

                          <h6 className="text-accent-custom mb-2">Resumo:</h6>
                          <p className="text-light lh-base">{selectedBook.resumo}</p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end p-4 border-top border-custom">
                      <button type="button" className="btn btn-outline-custom" onClick={closeModal}>
                        Fechar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  )
}

export default ProgressaoDeLeitura
