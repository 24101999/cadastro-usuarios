import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import Cadastro from "./components/Cadastro";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Edit from "./components/admin/edit/Edit";
import Insert from "./components/admin/insert/Insert";
import Info from "./components/info/Info";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dado/:id" element={<Info />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
