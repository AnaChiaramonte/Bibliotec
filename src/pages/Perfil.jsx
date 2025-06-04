import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Perfil = () => {
  const [usuario, setUsuario] = useState([]);
  const [nomeEditado, setNomeEditado] = useState("");
  const [emailEditado, setEmailEditado] = useState("");
  const [senhaEditada, setSenhaEditada] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [editar, setEditar] = useState("disabled");

  const navigate = useNavigate();

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
    } else {
      // Redireciona para a página de cadastro se não houver conta
      alert("Você precisa criar uma conta para acessar o perfil.");
      navigate("/cadastrar");
    }
  }, []);

  return (
    <div>
      <h1>Perfil</h1>
      {usuario.nome ? (
        <div>
          <p>Nome: {usuario.nome}</p>
          <p>Email: {usuario.email}</p>
          <button onClick={disableInput}>Editar</button>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Perfil;