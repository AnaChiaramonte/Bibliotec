// src/components/AddLivros.jsx
import { useState, useEffect } from "react"; // Mantenha o useEffect aqui

const AddLivros = ({ show, onClose, onSave }) => {
  const [livro, setLivro] = useState({
    titulo: "",
    autor: "",
    genero: "", // Mantenha como string vazia para iniciar
    isbn: "",
    anoPublicacao: "",
    editora: "",
    descricao: "", // Descrição que será enviada localmente
  });

  const [imageFile, setImageFile] = useState(null); // Estado para o arquivo de imagem
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]); // NOVO estado para categorias da API

  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://bibliotech.somee.com";

  // REMOÇÃO: Remova completamente este array de gêneros hardcoded.
  // const generos = [
  //   "Ficção", "Não ficção", "Ficção científica", "Fantasia", "Romance",
  //   "Mistério", "Terror", "Biografia", "História", "Autoajuda", "Drama",
  // ];

  // NOVO useEffect para buscar categorias da API
  useEffect(() => {
    const fetchAvailableCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/Categorias`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Mapeie os dados para usar apenas o 'nome' como valor da opção e texto
        setAvailableCategories(data.map(cat => cat.nome));
      } catch (e) {
        console.error("Erro ao buscar categorias disponíveis:", e);
        // Opcional: setar um erro ou mostrar uma mensagem ao usuário
      }
    };

    if (show) { // Busca categorias apenas quando o modal está visível
      fetchAvailableCategories();
    }
  }, [show, API_BASE_URL]); // Dependência em 'show' para recarregar se o modal reabrir

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro({
      ...livro,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};
    if (!livro.titulo.trim()) newErrors.titulo = "Título é obrigatório";
    if (!livro.autor.trim()) newErrors.autor = "Autor é obrigatório";
    if (!livro.genero) newErrors.genero = "Gênero é obrigatório"; // Agora validará contra a seleção da API

    if (livro.isbn && !/^[0-9-]{10,17}$/.test(livro.isbn)) {
      newErrors.isbn = "ISBN inválido";
    }

    const anoAtual = new Date().getFullYear();
    if (livro.anoPublicacao && (livro.anoPublicacao < 1800 || livro.anoPublicacao > anoAtual)) {
      newErrors.anoPublicacao = `Ano deve ser entre 1800 e ${anoAtual}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    let imageUrl = 'https://via.placeholder.com/150x200?text=Sem+Capa'; // URL padrão

    try {
      if (imageFile) {
        // Lê o arquivo de imagem como uma Data URL (Base64)
        imageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      }

      // Chama onSave com todos os dados, incluindo a URL da capa
      // onSave será responsável por decidir o que enviar para a API e o que guardar localmente
      await onSave({
        ...livro,
        url_capa: imageUrl, // Adiciona a URL Base64 ou a URL padrão aqui
      });

      // Limpa o formulário e fecha o modal
      setLivro({
        titulo: "", autor: "", genero: "", isbn: "", anoPublicacao: "",
        editora: "", descricao: "",
      });
      setImageFile(null); // Limpa o estado do arquivo
      document.getElementById('fileInputCapa').value = ''; // Limpa o input de arquivo
      onClose();
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
      // Opcional: mostrar uma mensagem de erro para o usuário
    } finally {
      setIsLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div
        className="modal-content-custom rounded shadow-lg w-90 mw-100"
        style={{ maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-custom bg-custom-light">
          <h5 className="text-custom-dark fw-bold m-0">Adicionar Novo Livro</h5>
          <button type="button" className="btn-close" onClick={onClose} disabled={isLoading}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-3 bg-custom-light">
            <div className="row g-3">
              {/* Campos Título, Autor, Gênero, ISBN, Ano Publicacao, Editora (seus campos existentes) */}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                >
                  <option value="">Selecione um gênero</option>
                  {/* AGORA Renderize as categorias buscadas da API */}
                  {availableCategories.map((generoName) => (
                    <option key={generoName} value={generoName}>
                      {generoName}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>

              {/* Descrição - Seu campo existente */}
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
                  disabled={isLoading}
                ></textarea>
              </div>
              <div>
                <label htmlFor="Capa" className="form-label text-custom-dark fw-semibold">
                  Capa do Livro
                </label>
                <div className="border rounded p-2 bg-light">
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Capa do Livro"
                      className="img-fluid"
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <p className="text-muted">Nenhuma imagem selecionada</p>
                  )}
                </div>

                {/* CAMPO DE UPLOAD DE ARQUIVO PARA IMAGEM DA CAPA */}
                <div className="col-12">
                  <label htmlFor="fileInputCapa" className="form-label text-custom-dark fw-semibold">
                    Capa do Livro (Arquivo)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="fileInputCapa" // ID único para este input
                    name="fileInputCapa" // Nome para este input (não corresponde a 'livro' estado)
                    accept="image/*" // Aceita apenas arquivos de imagem
                    onChange={handleImageChange} // Nova função para lidar com a mudança
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 p-3 border-top border-custom bg-custom-light">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar Livro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLivros;