import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    // Simula um usuário admin cadastrado
    const admin = {
      email: "admin@admin.com",
      senha: "123456",
      tipo: "admin"
    }

    if (email === admin.email && senha === admin.senha) {
      localStorage.setItem("usuarioAdmin", JSON.stringify(admin))
      navigate("/adm") // redireciona para a página do painel administrativo
    } else {
      alert("Email ou senha incorretos")
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleLogin} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="form-group mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Senha:</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  )
}

export default Login
