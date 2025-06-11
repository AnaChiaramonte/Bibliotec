import { useState, useEffect } from "react"

const EditarLivros = ({ show, onClose, onSave, livro }) => {
  const [livroEditado, setLivroEditado] = useState({
    titulo: "",
    autor: "",
    genero: "",
    isbn: "",
    anoPublicacao: "",
    editora: "",
    descricao: "",
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const generos = [
    "Ficção",
    "Não ficção",
    "Ficção científica",
    "Fantasia",
    "Romance",
    "Mistério",
    "Terror",
    "Biografia",
    "História",
    "Autoajuda",
  ]


  useEffect(() => {
    if (livro && show) {
      setLivroEditado({
        titulo: livro.title || "",
        autor: livro.author || "",
        genero: livro.genre || "",
        isbn: livro.isbn || "",
        anoPublicacao: livro.anoPublicacao || "",
        editora: livro.editora || "",
        descricao: livro.descricao || "",
      })
      setErrors({})
    }
  }, [livro, show])

  const handleChange = (e) => {
    const { name, value } = e.target
    setLivroEditado({
      ...livroEditado,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!livroEditado.titulo.trim()) newErrors.titulo = "Título é obrigatório"
    if (!livroEditado.autor.trim()) newErrors.autor = "Autor é obrigatório"
    if (!livroEditado.genero) newErrors.genero = "Gênero é obrigatório"

    if (livroEditado.isbn && !/^[0-9-]{10,17}$/.test(livroEditado.isbn)) {
      newErrors.isbn = "ISBN inválido"
    }

    const anoAtual = new Date().getFullYear()
    if (livroEditado.anoPublicacao && (livroEditado.anoPublicacao < 1800 || livroEditado.anoPublicacao > anoAtual)) {
      newErrors.anoPublicacao = `Ano deve ser entre 1800 e ${anoAtual}`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const livroAtualizado = {
        ...livroEditado,
        id: livro.id,
      }

      onSave(livroAtualizado)
      onClose()
    } catch (error) {
      console.error("Erro ao atualizar livro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setErrors({})
    onClose()
  }

  if (!show || !livro) return null

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="modal-backdrop-custom" onClick={handleClose}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="modal-content-custom rounded shadow-custom fade-in"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: "90vh", overflowY: "auto" }}
              >
               
                <div className="d-flex justify-content-between align-items-center p-4 border-bottom border-custom">
                  <div className="d-flex align-items-center">
                    <h5 className="text-accent-custom fw-bold m-0 me-3">
                      <i className="bi bi-pencil-square me-2"></i>
                      Editar Livro
                    </h5>
                    <span className="badge bg-primary-custom">ID: {livro.id}</span>
                  </div>
                  <button type="button" className="btn btn-outline-custom btn-sm" onClick={handleClose}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                 
                  <div className="p-4">
             
                    <div className="alert alert-warning border-custom mb-4">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-exclamation-triangle text-warning fs-5 me-2"></i>
                        <div>
                          <strong className="text-dark-custom">Atenção:</strong>
                          <span className="text-dark-custom">
                            {" "}
                            As alterações feitas aqui serão permanentes. Verifique todas as informações antes de salvar.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="row g-3">
                    
                      <div className="col-12">
                        <label htmlFor="titulo" className="form-label text-accent-custom fw-semibold">
                          <i className="bi bi-type me-1"></i>
                          Título <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control border-custom ${errors.titulo ? "is-invalid" : ""}`}
                          id="titulo"
                          name="titulo"
                          value={livroEditado.titulo}
                          onChange={handleChange}
                          placeholder="Digite o título do livro"
                        />
                        {errors.titulo && <div className="text-danger small mt-1">{errors.titulo}</div>}
                      </div>

                    
                      <div className="col-md-6">
                        <label htmlFor="autor" className="form-label text-accent-custom fw-semibold">
                          <i className="bi bi-person me-1"></i>
                          Autor <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control border-custom ${errors.autor ? "is-invalid" : ""}`}
                          id="autor"
                          name="autor"
                          value={livroEditado.autor}
                          onChange={handleChange}
                          placeholder="Nome do autor"
                        />
                        {errors.autor && <div className="text-danger small mt-1">{errors.autor}</div>}
                      </div>

                    
                      <div className="col-md-6">
                        <label htmlFor="genero" className="form-label text-accent-custom fw-semibold">
                          <i className="bi bi-tag me-1"></i>
                          Gênero <span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-control border-custom ${errors.genero ? "is-invalid" : ""}`}
                          id="genero"
                          name="genero"
                          value={livroEditado.genero}
                          onChange={handleChange}
                        >
                          <option value="">Selecione um gênero</option>
                          {generos.map((genero) => (
                            <option key={genero} value={genero}>
                              {genero}
                            </option>
                          ))}
                        </select>
                        {errors.genero && <div className="text-danger small mt-1">{errors.genero}</div>}
                      </div>

                     
                      <div className="col-md-6">
                        <label htmlFor="isbn" className="form-label text-accent-custom fw-semibold">
                          <i className="bi bi-upc me-1"></i>
                          ISBN
                        </label>
                        <input
                          type="text"
                          className={`form-control border-custom ${errors.isbn ? "is-invalid" : ""}`}
                          id="isbn"
                          name="isbn"
                          value={livroEditado.isbn}
                          onChange={handleChange}
                          placeholder="Ex: 978-3-16-148410-0"
                        />
                        {errors.isbn && <div className="text-danger small mt-1">{errors.isbn}</div>}
                      </div>

                   
                      <div className="col-md-6">
                        <label htmlFor="anoPublicacao" className="form-label text-accent-custom fw-semibold">
                          <i className="bi bi-calendar me-1"></i>
                          Ano de Publicação
                        </label>
                        <input
                          type="number"
                          className={`form-control border-custom ${errors.anoPublicacao ? "is-invalid" : ""}`}
                          id="anoPublicacao"
                          name="anoPublicacao"
                          value={livroEditado.anoPublicacao}
                          onChange={handleChange}
                          placeholder="Ex: 2023"
                        />
                        {errors.anoPublicacao && <div className="text-danger small mt-1">{errors.anoPublicacao}</div>}
                      </div>

                     
                      <div className="col-12">
                        <label htmlFor="editora" className="form-label text-accent-custom fw-semibold">
                          <i className="bi bi-building me-1"></i>
                          Editora
                        </label>
                        <input
                          type="text"
                          className="form-control border-custom"
                          id="editora"
                          name="editora"
                          value={livroEditado.editora}
                          onChange={handleChange}
                          placeholder="Nome da editora"
                        />
                      </div>

                    
                      <div className="col-12">
                        <label htmlFor="descricao" className="form-label text-accent-custom fw-semibold">
                          <i className="bi bi-text-paragraph me-1"></i>
                          Descrição
                        </label>
                        <textarea
                          className="form-control border-custom"
                          id="descricao"
                          name="descricao"
                          rows="4"
                          value={livroEditado.descricao}
                          onChange={handleChange}
                          placeholder="Breve descrição do livro"
                        ></textarea>
                        <div className="text-muted-custom small mt-1">
                          {livroEditado.descricao.length} caracteres (opcional)
                        </div>
                      </div>

                    
                      <div className="col-12">
                        <div className="bg-secondary-custom border-custom rounded p-3">
                          <small className="text-dark-custom">
                            <i className="bi bi-clock-history me-1"></i>
                            <strong>Última edição:</strong> {new Date().toLocaleString("pt-BR")}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="d-flex justify-content-between align-items-center p-4 border-top border-custom">
                    <small className="text-muted-custom">
                      <i className="bi bi-info-circle me-1"></i>
                      Editando livro ID: {livro.id}
                    </small>
                    <div className="d-flex gap-2">
                      <button type="button" className="btn btn-outline-custom" onClick={handleClose}>
                        <i className="bi bi-x-lg me-1"></i>
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className={`btn btn-primary-custom ${isLoading ? "loading" : ""}`}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Salvando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-lg me-1"></i>
                            Salvar Alterações
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditarLivros
