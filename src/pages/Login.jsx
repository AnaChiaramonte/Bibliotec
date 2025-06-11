import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const fazerLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!email.includes("@")) {
      setMensagem("Digite um e-mail válido.")
      setLoading(false)
      return
    }

    if (senha.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.")
      setLoading(false)
      return
    }

    setTimeout(() => {
      if (email === "admin@admin.com" && senha === "12345678") {
        navigate("/Adm")
      } else {
        setMensagem("Email ou senha inválidos.")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />

      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-pattern">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow border-0 fade-in">
                <div className="card-body p-4">
                  <div className="text-center mb-4">
                    <i className="bi bi-book-fill text-accent-custom" style={{ fontSize: "3rem" }}></i>
                    <h2 className="text-accent-custom fw-bold mb-2">Bem-vindo(a)</h2>
                    <p className="text-muted">Entre na sua conta para continuar</p>
                  </div>

                  <form onSubmit={fazerLogin}>
                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-envelope text-primary-custom"></i>
                        </span>
                        <input
                          type="email"
                          placeholder="Seu e-mail"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value)
                            setMensagem("")
                          }}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text bg-light">
                          <i className="bi bi-lock text-primary-custom"></i>
                        </span>
                        <input
                          type="password"
                          placeholder="Sua senha"
                          value={senha}
                          onChange={(e) => {
                            setSenha(e.target.value)
                            setMensagem("")
                          }}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-check mb-4">
                      <input type="checkbox" className="form-check-input" id="rememberMe" />
                      <label className="form-check-label text-primary-custom" htmlFor="rememberMe">
                        Lembrar-me
                      </label>
                    </div>

                    {mensagem && (
                      <div className="alert alert-danger text-center mb-3" role="alert">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {mensagem}
                      </div>
                    )}

                    <div className="d-grid mb-3">
                      <button
                        type="submit"
                        className={`btn btn-primary-custom btn-lg ${loading ? "loading" : ""}`}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Entrando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Entrar
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center">
                      <p className="text-muted mb-2">
                        Esqueceu sua senha?{" "}
                        <a href="#" className="text-primary-custom text-decoration-none fw-semibold">
                          Recuperar
                        </a>
                      </p>
                      <p className="text-muted mb-0">
                        Não tem uma conta?{" "}
                        <Link to="/cadastrar" className="text-accent-custom text-decoration-none fw-semibold">
                          Cadastrar-se
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
