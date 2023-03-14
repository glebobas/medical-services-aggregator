import React from 'react';
import {Route, Routes} from "react-router-dom";
import './App.css';
import {Register} from "../components/Modal/Register";
import {Layout} from "./Layout";
import ClinicalCard from '../pages/ClinicalCard/ClinicalCard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      {/*TODO: Прописать внутренние роуты*/}
      <Route path='/clinical' element={<ClinicalCard />} />
      </Route>
    </Routes>
  );
}

export default App;
