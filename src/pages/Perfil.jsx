"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router"

const Perfil = () => {
  const [usuario, setUsuario] = useState(null)
  const [nomeEditado, setNomeEditado] = useState("")
  const [emailEditado, setEmailEditado] = useState("")
  const [senhaEditada, setSenhaEditada] = useState("")
  const [dia, setDia] = useState("")
  const [mes, setMes] = useState("")
  const [ano, setAno] = useState("")
  const [editar, setEditar] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    !editar && document.getElementById("nome")?.focus()
  }, [editar])

  const toggleEdit = () => {
    setEditar(!editar)
  }

  useEffect(() => {
    const salvaUsuario = localStorage.getItem("devlogin")
    if (salvaUsuario) {
      const user = JSON.parse(salvaUsuario)
      setUsuario(user)
      setNomeEditado(user.nome || "")
      setEmailEditado(user.email || "")
      setSenhaEditada(user.senha || "")

      // Verifica se `user.nascimento` existe e está no formato esperado
      if (user.nascimento && typeof user.nascimento === "string") {
        const [dia, mes, ano] = user.nascimento.split("/")
        setDia(dia || "")
        setMes(mes || "")
        setAno(ano || "")
      }
    }
  }, [])

  const handleSave = async () => {
    setLoading(true)

    // Simular delay de salvamento
    setTimeout(() => {
      const usuarioAtualizado = {
        ...usuario,
        nome: nomeEditado,
        email: emailEditado,
        senha: senhaEditada,
        nascimento: `${dia}/${mes}/${ano}`,
      }

      setUsuario(usuarioAtualizado)
      localStorage.setItem("devlogin", JSON.stringify(usuarioAtualizado))
      setEditar(true)
      setLoading(false)

      // Toast de sucesso
      const toast = document.createElement("div")
      toast.className = "alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3"
      toast.style.zIndex = "9999"
      toast.innerHTML = '<i class="bi bi-check-circle me-2"></i>Dados salvos com sucesso!'
      document.body.appendChild(toast)
      setTimeout(() => toast.remove(), 3000)
    }, 1000)
  }

  if (!usuario) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-pattern">
        <div className="text-center">
          <div className="spinner-border text-primary-custom mb-3" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="text-accent-custom">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="min-vh-100 bg-pattern">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {usuario.tipo === "admin" ? (
                // Admin Dashboard
                <div className="card card-custom shadow-custom border-custom fade-in">
                  <div className="card-body p-4">
                    <div className="text-center mb-4">
                      <i className="bi bi-shield-check text-accent-custom" style={{ fontSize: "3rem" }}></i>
                      <h2 className="text-accent-custom fw-bold mt-3">Painel Administrativo</h2>
                      <p className="text-muted-custom">Gerencie o sistema</p>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-4">
                        <Link
                          to="/clientes"
                          className="btn btn-primary-custom w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4"
                        >
                          <i className="bi bi-people-fill fs-1 mb-2"></i>
                          <span>Gerenciar Clientes</span>
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link
                          to="/livros"
                          className="btn btn-primary-custom w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4"
                        >
                          <i className="bi bi-book-fill fs-1 mb-2"></i>
                          <span>Gerenciar Livros</span>
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <Link
                          to="/categorias"
                          className="btn btn-primary-custom w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4"
                        >
                          <i className="bi bi-tags-fill fs-1 mb-2"></i>
                          <span>Gerenciar Categorias</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // User Profile
                <div className="card card-custom shadow-custom border-custom fade-in">
                  <div className="card-body p-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h2 className="text-accent-custom fw-bold mb-1">Meu Perfil</h2>
                        <p className="text-muted-custom mb-0">Gerencie suas informações pessoais</p>
                      </div>
                      <button
                        className={`btn ${editar ? "btn-primary-custom" : "btn-outline-custom"}`}
                        onClick={toggleEdit}
                        disabled={loading}
                      >
                        <i className={`bi ${editar ? "bi-pencil" : "bi-x-circle"} me-2`}></i>
                        {editar ? "Editar" : "Cancelar"}
                      </button>
                    </div>

                    {/* Profile Form */}
                    <form onSubmit={(e) => e.preventDefault()}>
                      <div className="row g-3">
                        {/* Nome */}
                        <div className="col-md-6">
                          <label htmlFor="nome" className="form-label text-accent-custom fw-semibold">
                            <i className="bi bi-person me-2"></i>Nome Completo
                          </label>
                          <input
                            id="nome"
                            type="text"
                            placeholder="Seu nome completo"
                            className="form-control border-custom"
                            disabled={editar}
                            value={nomeEditado}
                            onChange={(e) => setNomeEditado(e.target.value)}
                          />
                        </div>

                        {/* Email */}
                        <div className="col-md-6">
                          <label htmlFor="email" className="form-label text-accent-custom fw-semibold">
                            <i className="bi bi-envelope me-2"></i>Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="Seu email"
                            className="form-control border-custom"
                            disabled={editar}
                            value={emailEditado}
                            onChange={(e) => setEmailEditado(e.target.value)}
                          />
                        </div>

                        {/* Senha */}
                        <div className="col-md-6">
                          <label htmlFor="senha" className="form-label text-accent-custom fw-semibold">
                            <i className="bi bi-lock me-2"></i>Senha
                          </label>
                          <input
                            id="senha"
                            type="password"
                            placeholder="Sua senha"
                            className="form-control border-custom"
                            disabled={editar}
                            value={senhaEditada}
                            onChange={(e) => setSenhaEditada(e.target.value)}
                          />
                        </div>

                        {/* Data de Nascimento */}
                        <div className="col-md-6">
                          <label htmlFor="nascimento" className="form-label text-accent-custom fw-semibold">
                            <i className="bi bi-calendar me-2"></i>Data de Nascimento
                          </label>
                          <input
                            id="nascimento"
                            value={ano && mes && dia ? `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}` : ""}
                            onChange={(e) => {
                              const [year, month, day] = e.target.value.split("-")
                              setAno(year || "")
                              setMes(month || "")
                              setDia(day || "")
                            }}
                            className="form-control border-custom"
                            disabled={editar}
                            type="date"
                          />
                        </div>
                      </div>

                      {/* Save Button */}
                      {!editar && (
                        <div className="text-center mt-4">
                          <button
                            type="button"
                            className={`btn btn-primary-custom btn-lg ${loading ? "loading" : ""}`}
                            disabled={loading}
                            onClick={handleSave}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                Salvando...
                              </>
                            ) : (
                              <>
                                <i className="bi bi-check-circle me-2"></i>
                                Salvar Alterações
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </form>

                    {/* User Stats */}
                    <div className="row g-3 mt-4 pt-4 border-top border-custom">
                      <div className="col-md-4 text-center">
                        <div className="bg-secondary-custom rounded p-3">
                          <i className="bi bi-book-fill text-primary-custom fs-2 mb-2 d-block"></i>
                          <h4 className="text-dark-custom fw-bold mb-1">12</h4>
                          <small className="text-muted-custom">Livros Lidos</small>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="bg-secondary-custom rounded p-3">
                          <i className="bi bi-bookmark-fill text-primary-custom fs-2 mb-2 d-block"></i>
                          <h4 className="text-dark-custom fw-bold mb-1">5</h4>
                          <small className="text-muted-custom">Favoritos</small>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="bg-secondary-custom rounded p-3">
                          <i className="bi bi-star-fill text-primary-custom fs-2 mb-2 d-block"></i>
                          <h4 className="text-dark-custom fw-bold mb-1">8</h4>
                          <small className="text-muted-custom">Avaliações</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Perfil
