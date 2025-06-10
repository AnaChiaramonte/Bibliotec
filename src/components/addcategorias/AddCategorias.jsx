"use client"

import { useState } from "react"

const AddCategorias = ({ show, onClose, onSave }) => {
  const [categoria, setCategoria] = useState({
    nome: "",
    categoriaBase: "",
    descricao: "",
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const categoriasPredefinidas = [
    { nome: "Ficção Científica", idBase: 100 },
    { nome: "Fantasia", idBase: 200 },
    { nome: "Romance", idBase: 300 },
    { nome: "Terror", idBase: 400 },
    { nome: "Mistério/Thriller", idBase: 500 },
    { nome: "História/Não-ficção", idBase: 600 },
    { nome: "Biografia", idBase: 700 },
    { nome: "Desenvolvimento pessoal", idBase: 800 },
    { nome: "Filosofia", idBase: 900 },
    { nome: "Clássicos", idBase: 1000 },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setCategoria({
      ...categoria,
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

    if (!categoria.categoriaBase) {
      newErrors.categoriaBase = "Categoria base é obrigatória"
    }

    if (!categoria.nome.trim()) {
      newErrors.nome = "Nome da subcategoria é obrigatório"
    } else if (categoria.nome.trim().length < 2) {
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres"
    } else if (categoria.nome.trim().length > 50) {
      newErrors.nome = "Nome deve ter no máximo 50 caracteres"
    }

    if (categoria.descricao && categoria.descricao.length > 200) {
      newErrors.descricao = "Descrição deve ter no máximo 200 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const gerarId = () => {
    const categoriaEscolhida = categoriasPredefinidas.find((cat) => cat.nome === categoria.categoriaBase)
    if (!categoriaEscolhida) return null

    const numeroAleatorio = Math.floor(Math.random() * 99) + 1
    return categoriaEscolhida.idBase + numeroAleatorio
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 600))

      const idGerado = gerarId()

      const novaCategoria = {
        id: idGerado,
        categoriaBase: categoria.categoriaBase,
        nome: categoria.nome.trim(),
        descricao: categoria.descricao.trim(),
        nomeCompleto: `${categoria.categoriaBase} - ${categoria.nome.trim()}`,
      }

      onSave(novaCategoria)

      setCategoria({
        nome: "",
        categoriaBase: "",
        descricao: "",
      })

      onClose()
    } catch (error) {
      console.error("Erro ao salvar categoria:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!show) return null

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100" onClick={onClose}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div
                className="modal-content-custom rounded shadow-custom fade-in mh-100 overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center p-4 border-bottom border-custom">
                  <h5 className="text-accent-custom fw-bold m-0">
                    <i className="bi bi-plus-circle me-2"></i>
                    Adicionar Nova Categoria
                  </h5>
                  <button type="button" className="btn btn-outline-custom btn-sm" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Body */}
                  <div className="p-4">
                    <div className="row g-3">
                      {/* Categoria Base */}
                      <div className="col-12">
                        <label htmlFor="categoriaBase" className="form-label text-accent-custom fw-semibold">
                          <i className="bi bi-collection me-1"></i>
                          Categoria Base <span className="text-danger">*</span>
                        </label>
                        <select
                          className={`form-control border-custom ${errors.categoriaBase ? "is-invalid" : ""}`}
                          id="categoriaBase"
                          name="categoriaBase"
                          value={categoria.categoriaBase}
                          onChange={handleChange}
                        >
                          <option value="">Selecione uma categoria base</option>
                          {categoriasPredefinidas.map((cat) => (
                            <option key={cat.idBase} value={cat.nome}>
                              {cat.nome} (ID: {cat.idBase}+)
                            </option>
                          ))}
                        </select>
                        {errors.categoriaBase && <div className="text-danger small mt-1">{errors.categoriaBase}</div>}
                      </div>

                      {/* Nome da Subcategoria */}
                      <div className="col-12">
                        <label htmlFor="nome" className="form-label text-accent-custom fw-semibold">
                          <i className="bi bi-tag me-1"></i>
                          Nome da Subcategoria <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control border-custom ${errors.nome ? "is-invalid" : ""}`}
                          id="nome"
                          name="nome"
                          value={categoria.nome}
                          onChange={handleChange}
                          placeholder="Ex: Cyberpunk, Space Opera, etc."
                          maxLength="50"
                        />
                        {errors.nome && <div className="text-danger small mt-1">{errors.nome}</div>}
                        <div className="text-muted-custom small mt-1">{categoria.nome.length}/50 caracteres</div>
                      </div>

                      {/* Descrição */}
                      <div className="col-12">
                        <label htmlFor="descricao" className="form-label text-accent-custom fw-semibold">
                          <i className="bi bi-text-paragraph me-1"></i>
                          Descrição
                        </label>
                        <textarea
                          className={`form-control border-custom ${errors.descricao ? "is-invalid" : ""}`}
                          id="descricao"
                          name="descricao"
                          rows="3"
                          value={categoria.descricao}
                          onChange={handleChange}
                          placeholder="Breve descrição da subcategoria (opcional)"
                          maxLength="200"
                        ></textarea>
                        {errors.descricao && <div className="text-danger small mt-1">{errors.descricao}</div>}
                        <div className="text-muted-custom small mt-1">{categoria.descricao.length}/200 caracteres</div>
                      </div>

                      {/* Preview */}
                      {categoria.categoriaBase && categoria.nome && (
                        <div className="col-12">
                          <label className="form-label text-accent-custom fw-semibold">
                            <i className="bi bi-eye me-1"></i>
                            Preview
                          </label>
                          <div className="p-3 border-custom rounded bg-secondary-custom">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <span className="fw-semibold text-primary-custom">{categoria.categoriaBase}</span>
                                <span className="mx-2 text-muted-custom">→</span>
                                <span className="fw-semibold text-dark-custom">{categoria.nome}</span>
                              </div>
                              <small className="text-muted-custom">
                                ID: {categoriasPredefinidas.find((cat) => cat.nome === categoria.categoriaBase)?.idBase}
                                +
                              </small>
                            </div>
                            {categoria.descricao && (
                              <small className="text-muted-custom mt-1 d-block">{categoria.descricao}</small>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Info Alert */}
                      <div className="col-12">
                        <div className="alert alert-info py-2 border-custom">
                          <small className="text-dark-custom">
                            <i className="bi bi-info-circle me-1"></i>
                            <strong>Sistema de IDs:</strong> Cada categoria recebe um ID único baseado na categoria base
                            escolhida + número aleatório (1-99).
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
                          Salvar Categoria
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

export default AddCategorias
