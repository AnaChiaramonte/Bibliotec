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
    <div className="modal-backdrop">
      <div
        className="modal-content-custom rounded shadow-lg w-90 mw-100"
        style={{ maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}
      >
      
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-custom bg-custom-light">
          <h5 className="text-custom-dark fw-bold m-0">Adicionar Novo Livro</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
        
          <div className="p-3 bg-custom-light">
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="titulo" className="form-label text-custom-dark fw-semibold">
                  Título <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.titulo ? "is-invalid" : ""}`}
                  id="titulo"
                  name="titulo"
                  value={livro.titulo}
                  onChange={handleChange}
                  placeholder="Digite o título do livro"
                />
                {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
              </div>

           
              <div className="col-md-6">
                <label htmlFor="autor" className="form-label text-custom-dark fw-semibold">
                  Autor <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.autor ? "is-invalid" : ""}`}
                  id="autor"
                  name="autor"
                  value={livro.autor}
                  onChange={handleChange}
                  placeholder="Nome do autor"
                />
                {errors.autor && <div className="invalid-feedback">{errors.autor}</div>}
              </div>

            
              <div className="col-md-6">
                <label htmlFor="genero" className="form-label text-custom-dark fw-semibold">
                  Gênero <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${errors.genero ? "is-invalid" : ""}`}
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
                {errors.genero && <div className="invalid-feedback">{errors.genero}</div>}
              </div>

           
              <div className="col-md-6">
                <label htmlFor="isbn" className="form-label text-custom-dark fw-semibold">
                  ISBN
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.isbn ? "is-invalid" : ""}`}
                  id="isbn"
                  name="isbn"
                  value={livro.isbn}
                  onChange={handleChange}
                  placeholder="Ex: 978-3-16-148410-0"
                />
                {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
              </div>

              
              <div className="col-md-6">
                <label htmlFor="anoPublicacao" className="form-label text-custom-dark fw-semibold">
                  Ano de Publicação
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.anoPublicacao ? "is-invalid" : ""}`}
                  id="anoPublicacao"
                  name="anoPublicacao"
                  value={livro.anoPublicacao}
                  onChange={handleChange}
                  placeholder="Ex: 2023"
                />
                {errors.anoPublicacao && <div className="invalid-feedback">{errors.anoPublicacao}</div>}
              </div>

            
              <div className="col-12">
                <label htmlFor="editora" className="form-label text-custom-dark fw-semibold">
                  Editora
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editora"
                  name="editora"
                  value={livro.editora}
                  onChange={handleChange}
                  placeholder="Nome da editora"
                />
              </div>

              
              <div className="col-12">
                <label htmlFor="descricao" className="form-label text-custom-dark fw-semibold">
                  Descrição
                </label>
                <textarea
                  className="form-control"
                  id="descricao"
                  name="descricao"
                  rows="3"
                  value={livro.descricao}
                  onChange={handleChange}
                  placeholder="Breve descrição do livro"
                ></textarea>
              </div>
            </div>
          </div>

 
          <div className="d-flex justify-content-end gap-2 p-3 border-top border-custom bg-custom-light">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Salvando...
                </>
              ) : (
                "Salvar Livro"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLivros
