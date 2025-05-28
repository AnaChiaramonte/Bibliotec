
import React, { useEffect, useState } from "react";
import { Link } from "react-router";




const Perfil = () => {
 
  const [usuario, setUsuario] = useState([]);
  const [nomeEditado, setNomeEditado] = useState("");
  const [emailEditado, setEmailEditado] = useState("");
  const [senhaEditada, setSenhaEditada] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [editar, setEditar] = useState("disabled");

  useEffect(() => {
    editar === "" && document.getElementById("nome").focus();
  }, [editar]);

  const disableInput = () => {
    editar === "disabled" ? setEditar("") : setEditar("disabled");
  };

  useEffect(() => {
    const salvaUsuario = localStorage.getItem("devlogin");
    if (salvaUsuario) {
      const user = JSON.parse(salvaUsuario);
      setUsuario(user);
      setNomeEditado(user.nome); // define valor inicial
      setEmailEditado(user.email); // define valor inicial
      setSenhaEditada(user.senha); // define valor inicial
      setAno(ano); // define valor inicial
      setMes(mes); // define valor inicial
      setDia(dia); // define valor inicial
   // Verifica se `user.data` existe e está no formato esperado
   if (user.data && typeof user.data === "string") {
    const [ano, mes, dia] = user.data.split("/");
    setAno(ano || ""); // Define valores iniciais ou strings vazias
    setMes(mes || "");
    setDia(dia || "");
  } else {
    console.warn("Formato inválido para user.data:", user.data);
  }
}
  }, []);


  if (!usuario) {
    return <p>Carregando...</p>;
  }
   

  const handleSave = () => {
    const usuarioAtualizado = {
      ...usuario,
      nome: nomeEditado,
      email: emailEditado,
      senha: senhaEditada,
      
      data: `${dia}/${mes}/${ano}`,
    };

    setUsuario(usuarioAtualizado);
    localStorage.setItem("devlogin", JSON.stringify(usuarioAtualizado));
    setEditar("disabled");
    alert("🎲Dados salvos com sucesso!😁");
  };


  return (
    <>

      
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100dvh" }}>
      <div className="d-flex flex-column gap-2 mt-5 text-light">
     
        {usuario.tipo === "admin" ? (
          <>
            <h2>Administração</h2>
            <Link to="/clientes" className="btn btn-primary">Gerenciar Clientes</Link>
            <Link to="/jogos" className="btn btn-primary">Gerenciar Jogos</Link>
            <Link to="/cupons" className="btn btn-primary">Gerenciar Cupons</Link>
          </>
        ) : (
          <>
            
           
       

   
     
          <div className="perfil rounded-3 d-flex flex-column align-items-start p-5 gap-3">
            <div className="d-flex justify-content-between w-100">
              <div>
                <h5 className="text-light">Cadastro</h5>
                <p className="textEdicao">Nome cadastrado</p>
              </div>
              <button
                className="btn btn-danger h-75"
                onClick={() => disableInput()}
              >
                editar
              </button>
            </div>
            
            <input
              id="nome"
              type="text"
              placeholder="Edite seu nome"
              className={`form-control w-100 ${editar}`}
              disabled={editar}
              value={nomeEditado}
              onChange={(e) => setNomeEditado(e.target.value)}
            />
             <p className="text-light m-0">Email</p>
                <input
              id="email"
              type="text"
              placeholder="Edite seu email"
              className={`form-control w-100 ${editar}`}
              disabled={editar}
              value={emailEditado}
              onChange={(e) => setEmailEditado(e.target.value)}
            />
             <div class="col-auto">
             <p className="text-light">Senha</p>
              <input
              class="form-control"
              id="senha"
              type="password"
              placeholder="Edite sua senha"
              className={`form-control w-100 aria-describedby="passwordHelpInline col-auto col-form-label" ${editar}`}
              disabled={editar}
              value={senhaEditada}
              onChange={(e) => setSenhaEditada(e.target.value)}
              
            />


  
<div  >

        <p className="text-light">Data Nascimento</p>
        <div className="mb-3">
        <input
    value={`${ano}-${mes}-${dia}`} // Formata a data no formato YYYY-MM-DD

    onChange={(e) =>  {
      const [year, month, day] = e.target.value.split("-");
      setAno(year);
      setMes(month);
      setDia(day);
    }}
    className={`form-control w-100 ${editar === "disabled" ? "disabled" : ""}`} // Ajusta a classe com base no valor de `editar`
    disabled={editar === "disabled"} // Define `disabled` como booleano
    placeholder="Edite sua data de nascimento"
    type="date"
    name="frmNascimento"
    id="frmNascimento"
    required
  />
</div>
          
          
        </div>
            <button
              className="btn btn-success shadow "
              disabled={editar}
              onClick={() => handleSave()}
            >
              Salvar
            </button>
        
      
      </div>
      </div>
          </>
        )}
    </div>
</div>
    </>
  );
};

export default Perfil;
