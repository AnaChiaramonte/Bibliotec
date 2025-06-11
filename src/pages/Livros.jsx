import { useState } from "react"
import Footer from "../components/footer/Footer"

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

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "filled" : ""} ${interactive ? "" : ""}`}
        onClick={interactive ? () => onStarClick(index + 1) : undefined}
      >
        ★
      </span>
    ))
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setUserRating(0)
    setFeedback("")
  }

  const handleStartReading = () => {
    console.log(`Iniciando leitura de ${currentBook.title}...`)
  }

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    if (feedback.trim() && userRating > 0) {
      const newFeedback = {
        id: feedbacks.length + 1,
        user: "Usuário Atual",
        rating: userRating,
        comment: feedback.trim(),
      }
      setFeedbacks([newFeedback, ...feedbacks])
      setFeedback("")
      setUserRating(0)
    }
  }

  return (
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
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`btn btn-lg rounded-pill ${
                      selectedCategory === category ? "btn-primary-custom" : "btn-outline-custom"
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
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

                  <div className="mb-4">
                    <h5 className="text-accent-custom mb-3">Avaliações</h5>
                    <div className="star-rating mb-2">{renderStars(currentBook.rating)}</div>
                    <p className="text-muted-custom">
                      {currentBook.rating}.0 de 5 estrelas ({feedbacks.length} avaliações)
                    </p>
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

        <Footer />
      </div>
    </>
  )
}

export default Livros
