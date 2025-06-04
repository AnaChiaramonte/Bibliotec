import React from "react";
import Footer from "../components/footer/Footer";


const Home = () => {
  return (
    <div>
      <div className="md flex-column align-items-center justify-content-center vh-100">
      
        <img className="livro" src="src/assets/imagem projeto.jpg" alt="" />
        <img
          className="imagem-folha mt-5 md"
          src="src/assets/Black White Minimalist Book Club Logo (1).png"
          alt=""
        />
          <h2 className="principal align-items-center justify-content-center d-flex  mt-5">
          Tenha uma leitura leve e
          <br /> tranquila com <br /> Bibliotech
        </h2>
      </div>
    
     
      
     
     
     
      <div className="frase  bottom-0 w-100 top-100 h-25 align-items-center justify-content-center d-flex mt-0 ">
      <h1 className=" palavra position-absolute align-items-center justify-content-center d-flex ">
          {" "}
          Bibliotec
          <br />
        </h1>
        <h2 className=" frase-2  align-content-center justify-content-center fs-4 text-center text-md-start">
          Seu universo literário organizado em um só lugar!
        </h2>

      </div>
    
  <div className="  col-md-6 d-flex w-100 top-100 h-100 align-items-center justify-content-center d-flex flex-column ">
     
        <div className=" icone-livro d-flex align-items-center  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="currentColor"
            className="bi bi-book-fill mt-5 d-none d-md-block d-block"
            viewBox="0 0 16 16"
          >
            <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
          </svg>
          <div className="col-12 col-md-10">
                <h5 className="fs-4 fs-md-3 fw-semibold text-center text-md-start m-4">
                  Cadastro e Organização de Livros
                </h5>
                <p className="text-dark text-center text-md-start fs-6 lh-base m-4">
                  Gerencie sua biblioteca de forma simples e eficiente! <br />
                  Nosso sistema permite cadastrar livros com informações detalhadas, como título, autor, categoria, ano
                  de publicação e número de páginas. <br />
                  Encontre facilmente qualquer livro através da nossa busca avançada e mantenha sua coleção sempre
                  organizada.
                </p>
              </div>
            </div>

          
            <div className="row align-items-center px-3">
              <div className="col-12 col-md-10 order-md-1 order-2">
                <h5 className="fs-4 fs-md-3 fw-semibold text-center text-md-end mb-3 icone-livro">
                  Controle de Progresso de Leitura
                </h5>
                <p className="text-center text-md-end fs-6 lh-base">
                  Acompanhe seu progresso de leitura de forma prática e intuitiva! <br />
                  Com nosso sistema, você pode registrar o andamento de cada livro, incluindo a página atual e o tempo
                  estimado para conclusão. <br />
                  Além disso, você pode adicionar anotações e comentários para enriquecer sua experiência de leitura.
                </p>
              </div>
              <div className="icone-livro col-12 col-md-2 text-center order-md-2 order-1 mb-3 mb-md-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  className="d-block d-md-none mb-3 mb-md-0"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  className="d-none d-md-block "
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
                  />
                </svg>
              </div>
         </div>
    </div>
    </div>
  );
};

export default Home;