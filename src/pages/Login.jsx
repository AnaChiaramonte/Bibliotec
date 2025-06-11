import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Importe seu arquivo CSS para este componente se houver estilos específicos
// import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false); // Estado para o indicador de carregamento
  const navigate = useNavigate();

  const fazerLogin = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de recarregar a página
    setMensagem(""); // Limpa mensagens anteriores
    setLoading(true); // Ativa o estado de carregamento

    const apiUrl = import.meta.env.VITE_API_URL || "https://bibliotech.somee.com";
    console.log("API URL usada para login:", apiUrl);

    try {
      const resposta = await fetch(`${apiUrl}/api/Usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: senha,
        }),
      });

      // LER O CORPO DA RESPOSTA APENAS UMA VEZ
      // Tenta ler como JSON primeiro, se falhar, lê como texto puro.
      let dadosOuErro;
      const contentType = resposta.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        dadosOuErro = await resposta.json();
      } else {
        // Se não for JSON, trata como texto puro
        dadosOuErro = { message: await resposta.text() };
      }

      if (!resposta.ok) {
        // Se a resposta NÃO for bem-sucedida (ex: 401, 400, 500)
        let erroMsg = "Ocorreu um erro ao fazer login. Tente novamente."; // Mensagem padrão

        if (dadosOuErro && typeof dadosOuErro.message === 'string' && dadosOuErro.message.trim() !== '') {
            erroMsg = dadosOuErro.message; // Usa a mensagem de erro da API
        } else if (typeof dadosOuErro === 'string' && dadosOuErro.trim() !== '') {
            // Caso a resposta seja apenas uma string de erro sem ser JSON
            erroMsg = dadosOuErro;
        } else if (resposta.status === 401) {
            erroMsg = "Email ou senha inválidos.";
        } else if (resposta.status === 400) {
            erroMsg = "Dados de requisição inválidos.";
        }

        setMensagem(erroMsg);
        setLoading(false); // Desativa o carregamento em caso de erro
        return;
      }

      // Se a resposta for bem-sucedida (resposta.ok é true)
      const dados = dadosOuErro; // Renomeia para clareza

      console.log("Dados do usuário recebidos da API:", dados);

      // LÓGICA PARA LER A ROLE DO JWT
      if (dados.token) {
        try {
          const tokenPayloadEncoded = dados.token.split('.')[1];
          // Verifica se o tokenPayloadEncoded é válido antes de decodificar
          if (!tokenPayloadEncoded) {
            throw new Error("Token JWT malformado: payload ausente.");
          }
          const tokenPayload = JSON.parse(atob(tokenPayloadEncoded));

          console.log("Payload do JWT decodificado:", tokenPayload);

          let userRoles = [];
          // Chave de role padrão do .NET Identity (se a API estiver usando)
          const roleClaimKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

          // Tenta identificar a role em diferentes possíveis chaves no payload
          if (tokenPayload[roleClaimKey]) {
            userRoles = Array.isArray(tokenPayload[roleClaimKey])
              ? tokenPayload[roleClaimKey]
              : [tokenPayload[roleClaimKey]];
          } else if (tokenPayload.role) {
            userRoles = Array.isArray(tokenPayload.role)
              ? tokenPayload.role
              : [tokenPayload.role];
          } else if (tokenPayload.roles) {
            userRoles = Array.isArray(tokenPayload.roles)
              ? tokenPayload.roles
              : [tokenPayload.roles];
          }

          console.log("Roles identificadas do usuário:", userRoles);

          const isAdmin = userRoles.includes("Admin"); // Verifica se a role "Admin" existe

          localStorage.setItem("userToken", dados.token);
          localStorage.setItem("userRoles", JSON.stringify(userRoles)); // Armazena as roles

          if (isAdmin) {
            alert("Login realizado com sucesso! Bem-vindo, administrador.");
            navigate("/Adm"); // Redireciona para a página de administração
          } else {
            alert("Login realizado com sucesso! Bem-vindo.");
            navigate("/"); // Redireciona para a página inicial
          }

        } catch (jwtError) {
          console.error("Erro ao decodificar ou processar o JWT:", jwtError);
          setMensagem("Erro ao processar dados de login. Tente novamente mais tarde.");
          alert("Login realizado com sucesso! Bem-vindo."); // Fallback, caso o token esteja malformado mas o login seja ok.
          navigate("/");
        }
      } else {
        console.warn("Nenhum token JWT recebido da API de login.");
        alert("Login realizado com sucesso! Bem-vindo.");
        navigate("/"); // Redireciona mesmo sem token, se o login foi "ok" pela API
      }

    } catch (error) {
      console.error("Erro geral na requisição de login:", error);
      setMensagem("Erro ao fazer login. Verifique sua conexão ou tente novamente.");
    } finally {
      setLoading(false); // Desativa o carregamento no final, seja sucesso ou falha
    }
  };

  return (
    // Certifique-se de que o div externo tem a classe bg-pattern ou outro background adequado
    <div className="bg-pattern container-fluid py-5 d-flex justify-content-center align-items-center vh-100">
      <div className="w-100 p-4 card-custom border-custom shadow-custom" style={{ maxWidth: "400px" }}> {/* Adicionei classes de estilo aqui */}
        <h2 className="text-center m-5 text-accent-custom"> {/* Alterei para text-accent-custom */}
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
                setMensagem(""); // Limpa a mensagem ao digitar
              }}
              className="form-control rounded-5 bg-light-custom border-custom text-dark-custom" // Adicionei classes de estilo
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setMensagem(""); // Limpa a mensagem ao digitar
              }}
              className="form-control rounded-5 bg-light-custom border-custom text-dark-custom" // Adicionei classes de estilo
              required
            />
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label text-muted-custom" htmlFor="rememberMe"> {/* Adicionei classe de estilo */}
              Lembrar-me
            </label>
          </div>

          {/* Mensagem de erro ou sucesso */}
          {mensagem && (
            <div className={`alert ${mensagem.includes("sucesso") ? "alert-success" : "alert-danger"} text-center mb-3`} role="alert">
              <i className={`bi ${mensagem.includes("sucesso") ? "bi-check-circle" : "bi-exclamation-triangle"} me-2`}></i>
              {mensagem}
            </div>
          )}

          <div className="d-grid mb-3">
            <button
              type="submit"
              className={`btn btn-primary-custom btn-lg ${loading ? "loading" : ""}`} // Classes para o botão e loading
              disabled={loading} // Desabilita o botão durante o carregamento
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
        </form>

        {/* Links de recuperação e cadastro */}
        <div className="text-center">
          <p className="text-muted-custom mb-2"> {/* Adicionei classe de estilo */}
            Esqueceu sua senha?{" "}
            <a href="#" className="text-primary-custom text-decoration-none fw-semibold">
              Recuperar
            </a>
          </p>
          <p className="text-muted-custom mb-0"> {/* Adicionei classe de estilo */}
            Não tem uma conta?{" "}
            <Link to="/cadastrar" className="text-accent-custom text-decoration-none fw-semibold">
              Cadastrar-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;