import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import { Register } from "../components/Modal/Register";
import { Layout } from "./Layout";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}/>
      {/*TODO: Прописать внутренние роуты*/}
    </Routes>
  );
}

export default App;
