import { useState } from "react"


const AddCategorias = ({ show, onClose, onSave }) => {
  const [categoria, setCategoria] = useState({
    nome: "",
    descricao: "",
    cor: "#876b5d", // Cor padrão do tema
  })

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Cores predefinidas para as categorias
  const coresPredefinidas = [
    { nome: "Primária", valor: "#876b5d" },
    { nome: "Escura", valor: "#2f1f1b" },
    { nome: "Média", valor: "#baa89c" },
    { nome: "Azul", valor: "#3498db" },
    { nome: "Verde", valor: "#27ae60" },
    { nome: "Laranja", valor: "#e67e22" },
    { nome: "Roxo", valor: "#9b59b6" },
    { nome: "Vermelho", valor: "#e74c3c" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setCategoria({
      ...categoria,
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

    if (!categoria.nome.trim()) {
      newErrors.nome = "Nome da categoria é obrigatório"
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setIsLoading(true)

    try {
      // Simulando uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Gera um ID único para a nova categoria
      const novaCategoria = {
        ...categoria,
        id: Date.now(),
        nome: categoria.nome.trim(),
        descricao: categoria.descricao.trim(),
      }

      // Chama a função de callback passada pelo componente pai
      onSave(novaCategoria)

      // Limpa o formulário e fecha o modal
      setCategoria({
        nome: "",
        descricao: "",
        cor: "#876b5d",
      })

      onClose()
    } catch (error) {
      console.error("Erro ao salvar categoria:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Se o modal não estiver visível, não renderiza nada
  if (!show) return null

  return (
    <div className="modal-backdrop">
      <div
        className="modal-content-custom rounded shadow-lg w-90 mw-100"
        style={{ maxWidth: "500px", maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-custom bg-custom-light">
          <h5 className="text-custom-dark fw-bold m-0">
            <i className="bi bi-plus-circle me-2"></i>
            Adicionar Nova Categoria
          </h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Body */}
          <div className="p-4 bg-custom-light">
            <div className="row g-3">
              {/* Nome da Categoria */}
              <div className="col-12">
                <label htmlFor="nome" className="form-label text-custom-dark fw-semibold">
                  <i className="bi bi-tag me-1"></i>
                  Nome da Categoria <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.nome ? "is-invalid" : ""}`}
                  id="nome"
                  name="nome"
                  value={categoria.nome}
                  onChange={handleChange}
                  placeholder="Ex: Ficção Científica, Romance, etc."
                  maxLength="50"
                />
                {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                <div className="form-text text-muted">{categoria.nome.length}/50 caracteres</div>
              </div>

              {/* Cor da Categoria */}
              <div className="col-12">
                <label htmlFor="cor" className="form-label text-custom-dark fw-semibold">
                  <i className="bi bi-palette me-1"></i>
                  Cor da Categoria
                </label>
                <div className="row g-2">
                  <div className="col-md-6">
                    <input
                      type="color"
                      className="form-control form-control-color"
                      id="cor"
                      name="cor"
                      value={categoria.cor}
                      onChange={handleChange}
                      title="Escolha uma cor"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-wrap gap-1">
                      {coresPredefinidas.slice(0, 4).map((cor) => (
                        <button
                          key={cor.valor}
                          type="button"
                          className="btn p-0 border"
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: cor.valor,
                            border: categoria.cor === cor.valor ? "2px solid #000" : "1px solid #ccc",
                          }}
                          onClick={() => setCategoria({ ...categoria, cor: cor.valor })}
                          title={cor.nome}
                        ></button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div className="col-12">
                <label htmlFor="descricao" className="form-label text-custom-dark fw-semibold">
                  <i className="bi bi-text-paragraph me-1"></i>
                  Descrição
                </label>
                <textarea
                  className={`form-control ${errors.descricao ? "is-invalid" : ""}`}
                  id="descricao"
                  name="descricao"
                  rows="3"
                  value={categoria.descricao}
                  onChange={handleChange}
                  placeholder="Breve descrição da categoria (opcional)"
                  maxLength="200"
                ></textarea>
                {errors.descricao && <div className="invalid-feedback">{errors.descricao}</div>}
                <div className="form-text text-muted">{categoria.descricao.length}/200 caracteres</div>
              </div>

              {/* Preview da Categoria */}
              {categoria.nome && (
                <div className="col-12">
                  <label className="form-label text-custom-dark fw-semibold">
                    <i className="bi bi-eye me-1"></i>
                    Preview
                  </label>
                  <div className="p-3 border rounded bg-white">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle me-2"
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: categoria.cor,
                        }}
                      ></div>
                      <span className="fw-semibold">{categoria.nome}</span>
                    </div>
                    {categoria.descricao && <small className="text-muted mt-1 d-block">{categoria.descricao}</small>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-end gap-2 p-3 border-top border-custom bg-custom-light">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
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
                  Salvar Categoria
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategorias
