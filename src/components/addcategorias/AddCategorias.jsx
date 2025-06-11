// src/components/addcategorias/AddCategorias.jsx
import { useState, useEffect } from "react";

const AddCategorias = ({ show, onClose, onSave }) => {
  const [categoria, setCategoria] = useState({
    nome: "",
    descricao: "", // Esta é a descrição que você usa no formulário
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://bibliotech.somee.com";

  useEffect(() => {
    if (!show) {
      setCategoria({
        nome: "",
        descricao: "",
      });
      setErrors({});
      setIsLoading(false);
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({
      ...categoria,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!categoria.nome.trim()) {
      newErrors.nome = "Nome da categoria é obrigatório";
    } else if (categoria.nome.trim().length < 2) {
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres";
    } else if (categoria.nome.trim().length > 50) {
      newErrors.nome = "Nome deve ter no máximo 50 caracteres";
    }
    if (categoria.descricao && categoria.descricao.length > 200) {
      newErrors.descricao = "Descrição deve ter no máximo 200 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
    
      const categoriaParaAPI = { // <--- COLOQUE/VERIFIQUE O CÓDIGO A PARTIR DAQUI
       
        nome: categoria.nome.trim(), // Este será o nome exibido nos botões de categoria e no dropdown de livros
        genero: categoria.nome.trim(), // <--- CHAVE! ENVIE O MESMO NOME PARA O CAMPO 'genero' DA CATEGORIA
        
       
      }; // <--- ATÉ AQUI

      await onSave(categoriaParaAPI); // Isso chamará sua função 'handleSaveCategory' no Adm.jsx

      setCategoria({
        nome: "",
        descricao: "",
      });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      alert(`Erro ao adicionar categoria: ${error.message || 'Verifique o console para mais detalhes.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div
        className="modal-content-custom rounded shadow-lg w-90 mw-100"
        style={{ maxWidth: "500px", maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-custom bg-custom-light">
          <h5 className="text-custom-dark fw-bold m-0">
            <i className="bi bi-plus-circle me-2"></i>
            Adicionar Nova Categoria
          </h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 bg-custom-light">
            <div className="row g-3">
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
                  placeholder="Ex: Fantasia Épica, Suspense Policial, etc."
                  maxLength="50"
                />
                {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
                <div className="form-text text-muted">{categoria.nome.length}/50 caracteres</div>
              </div>

              <div className="col-12">
                <label htmlFor="descricao" className="form-label text-custom-dark fw-semibold">
                  <i className="bi bi-text-paragraph me-1"></i>
                  Descrição da Categoria (Opcional)
                </label>
                <textarea
                  className={`form-control ${errors.descricao ? "is-invalid" : ""}`}
                  id="descricao"
                  name="descricao" // Mantém 'descricao' para o estado do seu formulário
                  rows="3"
                  value={categoria.descricao}
                  onChange={handleChange}
                  placeholder="Breve descrição da categoria (opcional)"
                  maxLength="200"
                ></textarea>
                {errors.descricao && <div className="invalid-feedback">{errors.descricao}</div>}
                <div className="form-text text-muted">{categoria.descricao.length}/200 caracteres</div>
              </div>
            </div>
          </div>

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
  );
};

export default AddCategorias;