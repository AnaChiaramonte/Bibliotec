import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";

import Livros from "./pages/Livros";
import Footer from "./components/footer/Footer";
import Grafico from "./components/grafico/Grafico";
import ProgressaoDeLeitura from "./pages/ProgressaoDeLeitura";
import Cadastrar from "./pages/Cadastrar";

function App() {
  const handleNavLinkClick = (event) => {
    if (event.target.tagName === "A") {
      event.preventDefault();
    }
  };

  return (
    <>
      <BrowserRouter>
        <Header onClick={handleNavLinkClick} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ProgressaoDeLeitura" element={<ProgressaoDeLeitura/>}/>
           <Route path="/Cadastrar" element={<Cadastrar />} />


            <Route path="/Livros" element={<Livros />} />
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </main>
   
      </BrowserRouter>
    </>
  );
}

export default App;
