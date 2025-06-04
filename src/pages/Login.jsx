import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const fazerLogin = (e) => {
    e.preventDefault();

    // Validação do e-mail
    if (!email.includes("@")) {
      setMensagem("Digite um e-mail válido.");
      return;
    }

    // Validação da senha
    if (senha.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    

    // Login local sem API
    if (email === "admin@admin.com" && senha === "12345678") {
      navigate("/Adm");
    
    } else {
      setMensagem("Email ou senha inválidos.");
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center vh-100">
      <div className="w-100 p-4" style={{ maxWidth: "400px" }}>
        <h2 className="text-center m-5" style={{ color: "#E4CFC4" }}>
          Bem-vindo(a)
        </h2>
        <form onSubmit={fazerLogin}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMensagem("");
              }}
              className="form-control rounded-5"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setMensagem("");
              }}
              className="form-control rounded-5"
            />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Lembrar-me
            </label>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn w-100" style={{ background: "#E4CFC4" }}>
              Entrar
            </button>
          </div>
        </form>

        {mensagem && (
          <p className="text-center mt-3 text-danger" style={{ fontWeight: "bold" }}>
            {mensagem}
          </p>
        )}

        <div className="d-flex justify-content-center">
          <Link to={"/cadastrar"} className="text-light dropdown-item my-3 text-center">
            <p style={{ color: "#c1b2aa" }}>Cadastrar-se</p>
          </Link>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
