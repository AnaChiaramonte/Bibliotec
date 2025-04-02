
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";



const ProgressaoDeLeitura = [
  {
    title: "Um Verão na Itália",
    author: "Carrie Elks",
    progress: 25,
    rating: 4,
    image: "caminho-para-imagem1.jpg",
  },
  {
    title: "O Verão que Mudou Minha Vida",
    author: "Jenny Han",
    progress: 50,
    rating: 5,
    image: "caminho-para-imagem2.jpg",
  },
  {
    title: "É Assim que Começa",
    author: "Colleen Hoover",
    progress: 70,
    rating: 4,
    image: "caminho-para-imagem3.jpg",
  },
];

const BookProgress = () => {
  return (
    <div className="bg-[#5e4a3f] min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-[#c4a997] p-4 rounded-lg shadow-lg">
        {ProgressaoDeLeitura.map((book, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-[#e4d3c3] rounded-lg mb-4"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-20 h-28 object-cover rounded-lg"
            />
            <div className="flex-1 ml-4">
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p className="text-sm text-gray-700">Autor: {book.author}</p>
              <p className="text-sm text-gray-700">Progresso: {book.progress}%</p>
              <p className="text-sm text-yellow-500">Avaliação: {"⭐".repeat(book.rating)}</p>
            </div>
            <div className="w-16 h-16">
              <CircularProgressbar
                value={book.progress}
                text={`${book.progress}%`}
                styles={buildStyles({
                  textSize: "24px",
                  pathColor: `#5e4a3f`,
                  textColor: "#5e4a3f",
                  trailColor: "#e4d3c3",
                })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ProgressaoDeLeitura