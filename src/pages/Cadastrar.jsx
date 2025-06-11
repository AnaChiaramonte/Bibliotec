import { useState } from "react"
import { Link, useNavigate } from "react-router"

const Cadastrar = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [dia, setDia] = useState("")
  const [senha, setSenha] = useState("")
  const [mes, setMes] = useState("")
  const [ano, setAno] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const apiUrl = import.meta.env.VITE_API_URL
    try {
      const resposta = await fetch(`${apiUrl}/api/Usuarios/registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: senha }),
      })

      if (!resposta.ok) {
        const erro = await resposta.json()
        erro.message || "Email ou senha inválidos"
        return
      }

      alert("Cadastro realizado com sucesso!")
      navigate("/login")
    } catch (error) {
      console.error("Erro ao cadastrar:", error)
      alert("Erro ao cadastrar!")
      return
    }

    if (nome && email) {
      localStorage.setItem(
        "devlogin",
        JSON.stringify({
          nome,
          email,
          nascimento: `${dia}/${mes}/${ano}`,
        }),
      )
      navigate("/")
    }
  }

  return (
    <>
      <div className="container d-flex  flex-column align-items-center justify-content-center mt-5 m-auto">
        <h2 className="mb-4  mt-5 text-cadastrar text-light">Cadastrar-se</h2>

        <form
          onSubmit={handleLogin}
          className="w-100 "
          style={{ maxWidth: "400px" }}
        >
          <div className="mb-3">
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="form-control"
              type="text"
              name="frmNome"
              id="frmNome"
              placeholder="Nome"
              required
            />
          </div>

                    <div className="mb-3">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        type="email"
                        name="frmEmail"
                        id="frmEmail"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="password"
                        id="frmSenha"
                        className="form-control"
                        placeholder="Sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="frmNascimento" className="form-label text-primary-custom fw-semibold">
                        Data de Nascimento
                      </label>
                      <input
                        value={`${ano}-${mes}-${dia}`}
                        onChange={(e) => {
                          const [year, month, day] = e.target.value.split("-")
                          setAno(year)
                          setMes(month)
                          setDia(day)
                        }}
                        className="form-control"
                        type="date"
                        name="frmNascimento"
                        id="frmNascimento"
                        required
                      />
                    </div>

                    <div className="d-grid mb-3">
                      <button type="submit" className="btn btn-primary-custom btn-lg">
                        Cadastrar
                      </button>
                    </div>
                    

                    <div className="text-center">
                      <p className="text-muted-custom mb-0">
                        Já tem uma conta?{" "}
                        <Link to="/login" className="text-primary-custom text-decoration-none fw-semibold">
                          Faça login
                        </Link>
                      </p>
                    </div>
                  </form>

                </div>
                </>
             
           
       
        
  )
}

export default Cadastrar
