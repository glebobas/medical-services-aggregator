import React from 'react';
import {Route, Routes} from "react-router-dom";
import './App.css';
import {Layout} from "./Layout";
import {MainPage} from "../pages/MainPage/MainPage";
import {AuthProvider} from '../context';



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MainPage/>}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
