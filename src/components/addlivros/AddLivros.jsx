"use client"

import { useState } from "react"

const AddLivros = ({ show, onClose, onSave }) => {
  const [livro, setLivro] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setLivro({
      ...livro,
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
    if (!livro.titulo.trim()) newErrors.titulo = "Título é obrigatório"
    if (!livro.autor.trim()) newErrors.autor = "Autor é obrigatório"
    if (!livro.genero) newErrors.genero = "Gênero é obrigatório"

    if (livro.isbn && !/^[0-9-]{10,17}$/.test(livro.isbn)) {
      newErrors.isbn = "ISBN inválido"
    }

    const anoAtual = new Date().getFullYear()
    if (livro.anoPublicacao && (livro.anoPublicacao < 1800 || livro.anoPublicacao > anoAtual)) {
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

      const novoLivro = {
        ...livro,
        id: Date.now(),
      }

      onSave(novoLivro)

      setLivro({
        titulo: "",
        autor: "",
        genero: "",
        isbn: "",
        anoPublicacao: "",
        editora: "",
        descricao: "",
      })

      onClose()
    } catch (error) {
      console.error("Erro ao salvar livro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!show) return null

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="modal-backdrop-custom" onClick={onClose}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="modal-content-custom rounded shadow-custom fade-in"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: "90vh", overflowY: "auto" }}
              >
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center p-4 border-bottom border-custom">
                  <h5 className="text-accent-custom fw-bold m-0">
                    <i className="bi bi-book-fill me-2"></i>
                    Adicionar Novo Livro
                  </h5>
                  <button type="button" className="btn btn-outline-custom btn-sm" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Body */}
                  <div className="p-4">
                    <div className="row g-3">
                      {/* Título */}
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
                          value={livro.titulo}
                          onChange={handleChange}
                          placeholder="Digite o título do livro"
                        />
                        {errors.titulo && <div className="text-danger small mt-1">{errors.titulo}</div>}
                      </div>

                      {/* Autor */}
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
                          value={livro.autor}
                          onChange={handleChange}
                          placeholder="Nome do autor"
                        />
                        {errors.autor && <div className="text-danger small mt-1">{errors.autor}</div>}
                      </div>

                      {/* Gênero */}
                      <div className="col-md-6">
                        <label htmlFor="genero" className="form-label text-accent-custom fw-semibold">
                          <i className="bi bi-tag me-1"></i>
                          Gênero <span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-control border-custom ${errors.genero ? "is-invalid" : ""}`}
                          id="genero"
                          name="genero"
                          value={livro.genero}
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

                      {/* ISBN */}
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
                          value={livro.isbn}
                          onChange={handleChange}
                          placeholder="Ex: 978-3-16-148410-0"
                        />
                        {errors.isbn && <div className="text-danger small mt-1">{errors.isbn}</div>}
                      </div>

                      {/* Ano de Publicação */}
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
                          value={livro.anoPublicacao}
                          onChange={handleChange}
                          placeholder="Ex: 2023"
                        />
                        {errors.anoPublicacao && <div className="text-danger small mt-1">{errors.anoPublicacao}</div>}
                      </div>

                      {/* Editora */}
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
                          value={livro.editora}
                          onChange={handleChange}
                          placeholder="Nome da editora"
                        />
                      </div>

                      {/* Descrição */}
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
                          value={livro.descricao}
                          onChange={handleChange}
                          placeholder="Breve descrição do livro"
                        ></textarea>
                        <div className="text-muted-custom small mt-1">
                          {livro.descricao.length} caracteres (opcional)
                        </div>
                      </div>

                      {/* Dicas */}
                      <div className="col-12">
                        <div className="alert bg-secondary-custom border-custom py-2">
                          <small className="text-dark-custom">
                            <i className="bi bi-info-circle me-1"></i>
                            <strong>Dica:</strong> Preencha o máximo de informações possível para facilitar a
                            catalogação e busca do livro.
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="d-flex justify-content-end gap-2 p-4 border-top border-custom">
                    <button type="button" className="btn btn-outline-custom" onClick={onClose}>
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
                          Salvar Livro
                        </>
                      )}
                    </button>
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

export default AddLivros
