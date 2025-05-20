import React from "react";
import Grafico from "./Grafico"; // caminho do componente

const livros = [
  {
    titulo: "Um Verão na Itália",
    autor: "Carrie Elks",
    progresso: 25,
    avaliacao: 4,
    imagem: "caminho-para-imagem1.jpg",
  },
  // outros livros...
];

const ProgressoLivros = () => {
  return (
    <div className="container">
      {livros.map((livro, index) => (
        <div key={index} className="livro">
          <img src={livro.imagem} alt={livro.titulo} />
          <div>
            <h2>{livro.titulo}</h2>
            <p>Autor: {livro.autor}</p>
            <p>Avaliação: {"⭐".repeat(livro.avaliacao)}</p>
          </div>
          <Grafico progresso={livro.progresso} />
        </div>
      ))}
    </div>
  );
};

export default ProgressoLivros;
