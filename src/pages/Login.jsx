import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const fazerLogin = async (e) => {
    e.preventDefault();

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

      // **LER O CORPO DA RESPOSTA APENAS UMA VEZ**
      // Obtenha o texto bruto da resposta primeiro.
      // Isso é seguro mesmo se a resposta for JSON, pois JSON é um tipo de texto.
      const respostaText = await resposta.text(); 
      let dadosOuErro;

      try {
        // Tenta parsear o texto como JSON
        dadosOuErro = JSON.parse(respostaText);
      } catch (parseError) {
        // Se falhar ao parsear como JSON, o corpo é texto puro
        dadosOuErro = { message: respostaText }; // Encapsula o texto puro em um objeto para consistência
      }

      if (!resposta.ok) { // Se a resposta não for 2xx (ex: 401, 400, 500)
        let erroMsg = "Email ou senha inválidos."; // Mensagem padrão para falha de login

        // Se o JSON parseou com sucesso e tem uma mensagem
        if (dadosOuErro && dadosOuErro.message) {
            erroMsg = dadosOuErro.message;
        } else if (dadosOuErro && typeof dadosOuErro.message === 'string') {
            // Caso seja apenas a string pura ("Senha incorreta.")
            erroMsg = dadosOuErro.message;
        }
        
        setMensagem(erroMsg);
        return;
      }

      // Se a resposta.ok for true (status 200), então 'dadosOuErro' contém os dados de sucesso
      const dados = dadosOuErro; // Renomeia para clareza

      console.log("Dados do usuário recebidos da API:", dados);

      // ***** LÓGICA PARA LER A ROLE DO JWT *****
      if (dados.token) {
        try {
          const tokenPayloadEncoded = dados.token.split('.')[1];
          const tokenPayload = JSON.parse(atob(tokenPayloadEncoded));

          console.log("Payload do JWT decodificado:", tokenPayload);

          let userRoles = [];
          const roleClaimKey = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

          if (tokenPayload[roleClaimKey]) {
            if (Array.isArray(tokenPayload[roleClaimKey])) {
              userRoles = tokenPayload[roleClaimKey];
            } else if (typeof tokenPayload[roleClaimKey] === 'string') {
              userRoles = [tokenPayload[roleClaimKey]];
            }
          }
          else if (tokenPayload.role) {
             if (Array.isArray(tokenPayload.role)) {
                userRoles = tokenPayload.role;
            } else if (typeof tokenPayload.role === 'string') {
                userRoles = [tokenPayload.role];
            }
          } else if (tokenPayload.roles) {
              if (Array.isArray(tokenPayload.roles)) {
                userRoles = tokenPayload.roles;
            } else if (typeof tokenPayload.roles === 'string') {
                userRoles = [tokenPayload.roles];
            }
          }
          
          console.log("Roles identificadas do usuário:", userRoles);

          const isAdmin = userRoles.includes("Admin");

          localStorage.setItem("userToken", dados.token);
          localStorage.setItem("userRoles", JSON.stringify(userRoles));


          if (isAdmin) {
            alert("Login realizado com sucesso! Bem-vindo, administrador.");
            navigate("/Adm");
          } else {
            alert("Login realizado com sucesso! Bem-vindo.");
            navigate("/");
          }

        } catch (jwtError) {
          console.error("Erro ao decodificar ou processar o JWT:", jwtError);
          setMensagem("Erro ao processar dados de login. Tente novamente mais tarde.");
          alert("Login realizado com sucesso! Bem-vindo."); // Apenas como fallback
          navigate("/");
        }
      } else {
        console.warn("Nenhum token JWT recebido da API de login.");
        alert("Login realizado com sucesso! Bem-vindo.");
        navigate("/");
      }

    } catch (error) {
      console.error("Erro geral na requisição de login:", error);
      setMensagem("Erro ao fazer login. Verifique sua conexão ou tente novamente.");
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
                setMensagem("");
              }}
              className="form-control rounded-5"
              required
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
    </div>
  );
};

export default Login;