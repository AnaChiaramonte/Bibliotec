
import React, { useState } from "react";
import { useNavigate } from "react-router";

import { Link } from "react-router"; 

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
 
  const navigate = useNavigate();

  const fazerLogin = async (e) => {
    e.preventDefault();
  
    const apiUrl = import.meta.env.VITE_API_URL;
  
    try {
      const resposta = await fetch(`${apiUrl}/Users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
  
      if (!resposta.ok) {
        // Se a resposta não for bem-sucedida, exibe uma mensagem de erro e interrompe o fluxo
        const erro = await resposta.json();
        setMensagem(erro.message || "Email ou senha inválidos");
        return;
      }
  
      // Se a resposta for bem-sucedida, processa os dados e navega
      const dados = await resposta.json();
      alert("Login realizado com sucesso!");
      localStorage.setItem("user", JSON.stringify(dados));
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMensagem("Erro ao fazer login. Tente novamente mais tarde.");
    }
  };
  


  return (
    <>
    

      
      <div className="container py-5 d-flex justify-content-center align-items-center vh-100">
        <div className=" w-100 p-4" style={{ maxWidth: "400px" }}>
          <h2 className=" text-center m-5  "style={{ color: "#E4CFC4"}}>Bem-vindo(a)</h2>
          <form onSubmit={fazerLogin} className="login-form">
            <div className="mb-3 text-start">
              <input
                type="email"
                className="form-control"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control  rounded-5"
              />
            </div>
            <div className="mb-4 text-start">
              <input
                type="password"
                className="form-control"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="form-control rounded-5"
              />
            </div>
           
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Lembrar-me
              </label>
            </div>
            (email && senha) { (mensagem && setMensagem(""))}
        
            <Link className="nav-link mt-5 fs-4" to="/">
            <div className="d-flex justify-content-center">
          
              <button className=" btn btn w-100"style={{ background: "#E4CFC4"}} >Entrar</button>
         
            </div>
            </Link>
          </form>
          
          {mensagem && <p className="login-msg text-center mt-3" >{mensagem}</p>}
          <div className="d-flex justify-content-center">
            <Link 
              to={"/cadastrar"}
              className="text-light dropdown-item my-3 text-center " 
            >
           <p  style={{ color: "#c1b2aa"}}  >
              Cadastrar-se
              </p>
            </Link>
          </div>
   
        </div>
      </div>
    </>
  );
}

export default Login;
