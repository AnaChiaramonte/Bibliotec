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

  // Lista de gêneros para o select
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

  // Preenche o formulário quando o livro é passado como prop
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
    // Limpa o erro quando o usuário começa a digitar
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

    // Validação opcional para ISBN (formato básico)
    if (livroEditado.isbn && !/^[0-9-]{10,17}$/.test(livroEditado.isbn)) {
      newErrors.isbn = "ISBN inválido"
    }

    // Validação opcional para ano (entre 1800 e ano atual)
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
      // Simulando uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Mantém o ID original do livro
      const livroAtualizado = {
        ...livroEditado,
        id: livro.id,
      }

      // Chama a função de callback passada pelo componente pai
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

  // Se o modal não estiver visível, não renderiza nada
  if (!show || !livro) return null

  return (
    <div className="modal-backdrop">
      <div
        className="modal-content-custom rounded shadow-lg w-90 mw-100"
        style={{ maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-custom bg-custom-light">
          <div className="d-flex align-items-center">
            <h5 className="text-custom-dark fw-bold m-0 me-2">
              <i className="bi bi-pencil-square me-2"></i>
              Editar Livro
            </h5>
            <span className="badge badge-id">ID: {livro.id}</span>
          </div>
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Body */}
          <div className="p-3 bg-custom-light">
            {/* Aviso sobre alterações */}
            <div className="alert alert-warning mb-3">
              <small>
                <i className="bi bi-exclamation-triangle me-1"></i>
                <strong>Atenção:</strong> As alterações feitas aqui serão permanentes. Verifique todas as informações
                antes de salvar.
              </small>
            </div>

            <div className="row g-3">
              {/* Título */}
              <div className="col-12">
                <label htmlFor="titulo" className="form-label text-custom-dark fw-semibold">
                  Título <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
                  id="titulo"
                  name="titulo"
                  value={livroEditado.titulo}
                  onChange={handleChange}
                  placeholder="Digite o título do livro"
                />
                {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
              </div>

              {/* Autor */}
              <div className="col-md-6">
                <label htmlFor="autor" className="form-label text-custom-dark fw-semibold">
                  Autor <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.autor ? "is-invalid" : ""}`}
                  id="autor"
                  name="autor"
                  value={livroEditado.autor}
                  onChange={handleChange}
                  placeholder="Nome do autor"
                />
                {errors.autor && <div className="invalid-feedback">{errors.autor}</div>}
              </div>

              {/* Gênero */}
              <div className="col-md-6">
                <label htmlFor="genero" className="form-label text-custom-dark fw-semibold">
                  Gênero <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${errors.genero ? "is-invalid" : ""}`}
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
                {errors.genero && <div className="invalid-feedback">{errors.genero}</div>}
              </div>

              {/* ISBN */}
              <div className="col-md-6">
                <label htmlFor="isbn" className="form-label text-custom-dark fw-semibold">
                  ISBN
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.isbn ? "is-invalid" : ""}`}
                  id="isbn"
                  name="isbn"
                  value={livroEditado.isbn}
                  onChange={handleChange}
                  placeholder="Ex: 978-3-16-148410-0"
                />
                {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
              </div>

              {/* Ano de Publicação */}
              <div className="col-md-6">
                <label htmlFor="anoPublicacao" className="form-label text-custom-dark fw-semibold">
                  Ano de Publicação
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.anoPublicacao ? "is-invalid" : ""}`}
                  id="anoPublicacao"
                  name="anoPublicacao"
                  value={livroEditado.anoPublicacao}
                  onChange={handleChange}
                  placeholder="Ex: 2023"
                />
                {errors.anoPublicacao && <div className="invalid-feedback">{errors.anoPublicacao}</div>}
              </div>

              {/* Editora */}
              <div className="col-12">
                <label htmlFor="editora" className="form-label text-custom-dark fw-semibold">
                  Editora
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editora"
                  name="editora"
                  value={livroEditado.editora}
                  onChange={handleChange}
                  placeholder="Nome da editora"
                />
              </div>

              {/* Descrição */}
              <div className="col-12">
                <label htmlFor="descricao" className="form-label text-custom-dark fw-semibold">
                  Descrição
                </label>
                <textarea
                  className="form-control"
                  id="descricao"
                  name="descricao"
                  rows="3"
                  value={livroEditado.descricao}
                  onChange={handleChange}
                  placeholder="Breve descrição do livro"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-end gap-2 p-3 border-top border-custom bg-custom-light">
            <button type="button" className="btn btn-outline-secondary" onClick={handleClose}>
              <i className="bi bi-x-lg me-1"></i>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
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
        </form>
      </div>
    </div>
  )
}

export default EditarLivros
