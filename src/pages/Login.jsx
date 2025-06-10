import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const fazerLogin = async (e) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL;
    console.log("API URL:", apiUrl);

    try {
      const resposta = await fetch(`${apiUrl}/api/Usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: senha,
        }),
      });

      if (!resposta.ok) {
        let erroMsg = "Email ou senha inválidos.";
        try {
          const erro = await resposta.json();
          erroMsg = erro.message || erroMsg;
        } catch (error) {
          console.error("Erro ao processar resposta:", error);
        }
        setMensagem(erroMsg);
        return;
      }

      const dados = await resposta.json();
      console.log("Dados do usuário:", dados);
      alert("Login realizado com sucesso!");
      navigate("/Adm");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMensagem("Erro ao fazer login. Tente novamente mais tarde.");
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          {mensagem && <p className="text-danger">{mensagem}</p>}
          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>
        </form>
        <div className="text-center mt-3">
        <p>
          Não tem uma conta?{" "}
          <Link to="/Cadastrar" className="text-decoration-none text-primary">
            Cadastre-se
          </Link>
        </p>
        </div>
      </div>
     
    </div>
  );
};

export default Login;