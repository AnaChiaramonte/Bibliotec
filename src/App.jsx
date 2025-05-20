import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ProgressaoDeLeitura from "./pages/ProgressaoDeLeitura";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/header/Header";
import Home from "./pages/Home";
import ProgressaoDeLeitura from "./pages/ProgressaoDeLeitura";
import Livros from "./pages/Livros";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
       

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Livros" element={<Livros/>} />
            <Route path="/ProgressoDeLeitura" element={<ProgressaoDeLeitura />} />
          </Routes>
        </main>

      </BrowserRouter>
      <ProgressaoDeLeitura/>
    </>
  );
}

export default App;