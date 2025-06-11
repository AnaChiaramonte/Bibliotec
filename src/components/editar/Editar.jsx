import { useState, useEffect } from "react";

const Editar = ({ show, onClose, onSave, livro }) => {
  const [livroEditado, setLivroEditado] = useState({
    livrosId: "", // ID é importante para a requisição PUT
    titulo: "",
    autor: "",
    genero: "",
    isbn: "",
    anoPublicacao: "",
    editora: "",
    descricao: "",
    // imagemCapaUrl: "", // Adicionar se você tiver este campo
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Gêneros devem vir da API de categorias ou ser uma lista mais abrangente
  const generos = [
    "Ficção", "Não ficção", "Ficção científica", "Fantasia", "Romance",
    "Mistério", "Terror", "Biografia", "História", "Autoajuda",
    "Drama",
  ];

  useEffect(() => {
    if (show && livro) {
      setLivroEditado({
        livrosId: livro.livrosId || "", // Garante que o ID esteja presente
        titulo: livro.titulo || "",
        autor: livro.autor || "",
        genero: livro.genero || "",
        isbn: livro.isbn || "",
        anoPublicacao: livro.anoPublicacao || "",
        editora: livro.editora || "",
        descricao: livro.descricao || "",
        // imagemCapaUrl: livro.imagemCapaUrl || "",
      });
      setErrors({}); // Limpa erros ao abrir o modal
    }
  }, [show, livro]); // Depende de 'show' e 'livro'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivroEditado({
      ...livroEditado,
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
    if (!livroEditado.titulo.trim()) newErrors.titulo = "Título é obrigatório";
    if (!livroEditado.autor.trim()) newErrors.autor = "Autor é obrigatório";
    if (!livroEditado.genero) newErrors.genero = "Gênero é obrigatório";

    if (livroEditado.isbn && !/^[0-9-]{10,17}$/.test(livroEditado.isbn)) {
      newErrors.isbn = "ISBN inválido";
    }

    const anoAtual = new Date().getFullYear();
    if (livroEditado.anoPublicacao && (livroEditado.anoPublicacao < 1800 || livroEditado.anoPublicacao > anoAtual)) {
      newErrors.anoPublicacao = `Ano deve ser entre 1800 e ${anoAtual}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      // onSave é uma prop que chama a função handleSaveEdit do Adm.jsx
      // e ela já faz a requisição PUT para a API com o token
      await onSave(livroEditado); // Passa o livro editado para a função onSave do pai

      onClose(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao salvar edição do livro (no componente EditarLivros):", error);
      alert("Falha ao editar livro. Verifique o console para mais detalhes.");
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
          <h5 className="text-custom-dark fw-bold m-0">Editar Livro</h5>
          <button type="button" className="btn-close" onClick={onClose} disabled={isLoading}></button>
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
                  value={livroEditado.titulo}
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
                  value={livroEditado.autor}
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
                  value={livroEditado.genero}
                  onChange={handleChange}
                  disabled={isLoading}
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
                  value={livroEditado.isbn}
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
                  value={livroEditado.anoPublicacao}
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
                  value={livroEditado.editora}
                  onChange={handleChange}
                  placeholder="Nome da editora"
                  disabled={isLoading}
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
                  value={livroEditado.descricao}
                  onChange={handleChange}
                  placeholder="Breve descrição do livro"
                  disabled={isLoading}
                ></textarea>
              </div>

              {/* Adicionar campo para URL da imagem se sua API aceitar */}
              {/* <div className="col-12">
                <label htmlFor="imagemCapaUrl" className="form-label text-custom-dark fw-semibold">
                  URL da Imagem da Capa
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="imagemCapaUrl"
                  name="imagemCapaUrl"
                  value={livroEditado.imagemCapaUrl}
                  onChange={handleChange}
                  placeholder="Ex: https://seusite.com/imagens/capa.jpg"
                  disabled={isLoading}
                />
              </div> */}

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
              {isLoading ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editar;