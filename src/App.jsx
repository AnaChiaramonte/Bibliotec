import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";

import Header from "./components/header/Header";
import Home from "./pages/Home";

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
          </Routes>
        </main>

      </BrowserRouter>
    </>
  );
}

export default App;