// src/components/addcategorias/AddCategorias.jsx
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa o CSS do Bootstrap
import "bootstrap-icons/font/bootstrap-icons.css"; // Importa os ícones do Bootstrap

const AddCategorias = ({ show, onClose, onSave }) => {
  // Estado único para a categoria, incluindo nome e descrição
  const [categoria, setCategoria] = useState({
    nome: "",
    descricao: "",
    // Removi 'categoriaBase' daqui, pois ele parece ser parte de uma lógica de IDs local,
    // e o foco é adicionar uma categoria com nome e descrição para uma API externa.
    // Se 'categoriaBase' for realmente um campo que a API espera, adicione-o de volta
    // e ajuste a lógica de envio no handleSubmit.
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // A URL base da API está correta
  // const API_BASE_URL = import.meta.env.VITE_API_URL || "https://bibliotech.somee.com";
  // Não está sendo usada diretamente aqui, mas é bom manter a linha de referência.

  // O bloco useEffect para resetar o formulário quando o modal é fechado está correto.
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

  // Função única para lidar com as mudanças nos inputs do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria({
      ...categoria,
      [name]: value,
    });

    // Limpa o erro específico do campo quando o usuário começa a digitar
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Função única para validar o formulário
  const validate = () => {
    const newErrors = {};
    if (!categoria.nome.trim()) {
      newErrors.nome = "Nome da categoria é obrigatório";
    } else if (categoria.nome.trim().length < 2) {
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres";
    } else if (categoria.nome.trim().length > 50) {
      newErrors.nome = "Nome deve ter no máximo 50 caracteres";
    }
    // A validação da descrição é opcional, mas o limite de caracteres é bom.
    if (categoria.descricao && categoria.descricao.length > 200) {
      newErrors.descricao = "Descrição deve ter no máximo 200 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função única para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Se a validação falhar, para a execução

    setIsLoading(true); // Ativa o estado de carregamento

    try {
      // Objeto da categoria a ser enviado para a API
      const categoriaParaAPI = {
        nome: categoria.nome.trim(),
        // Assumindo que a API espera 'genero' como o próprio nome da categoria
        genero: categoria.nome.trim(),
        // Incluir a descrição se ela for relevante para a API
        descricao: categoria.descricao.trim(),
      };

      // Chama a função onSave passada via props (provavelmente para fazer a requisição à API)
      await onSave(categoriaParaAPI);

      // Resetar o formulário e fechar o modal após o sucesso
      setCategoria({
        nome: "",
        descricao: "",
      });
      setErrors({}); // Limpa os erros após o sucesso
      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      // Exibe uma mensagem de erro para o usuário
      alert(`Erro ao adicionar categoria: ${error.message || 'Verifique o console para mais detalhes.'}`);
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento, independentemente do resultado
    }
  };

  // Se 'show' for false, não renderiza o modal
  if (!show) return null;

  return (
    // Um único modal-backdrop e sua estrutura de conteúdo
    <div className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" onClick={onClose}>
      <div
        className="modal-content-custom rounded shadow-custom fade-in" // Removi mw-100 e w-90 pois max-width já define o tamanho
        style={{ maxWidth: "500px", maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal feche-o
      >
        <div className="d-flex justify-content-between align-items-center p-4 border-bottom border-custom bg-custom-light">
          <h5 className="text-accent-custom fw-bold m-0">
            <i className="bi bi-plus-circle me-2"></i>
            Adicionar Nova Categoria
          </h5>
          <button type="button" className="btn btn-outline-custom btn-sm" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
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
                  placeholder="Ex: Ficção Científica, Romance Policial, etc."
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