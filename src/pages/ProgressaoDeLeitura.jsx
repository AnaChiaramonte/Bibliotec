import React from "react";
import Grafico from "../components/grafico/Grafico";


const books = [
  {
    titulo: "Um Verão na Itália",
    autor: "Carrie Elks",
    progresso: 25,
    avaliacao: 4,
    imagem: "caminho-para-imagem1.jpg",
  },
  {
    titulo: "A Garota do Lago",
    autor: "Charlie Donlea",
    progresso: 50,
    avaliacao: 5,
    imagem: "caminho-para-imagem2.jpg",
  },
  {
    titulo: "O Sol é Para Todos",
    autor: "Harper Lee",
    progresso: 75,
    avaliacao: 5,
    imagem: "caminho-para-imagem3.jpg",
  },
  {
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    progresso: 100,
    avaliacao: 5,
    imagem: "caminho-para-imagem4.jpg",
  },
];

const ProgressoLivros = () => {
  return (
    <div className="container">
      {books.map((livro, index) => (
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
