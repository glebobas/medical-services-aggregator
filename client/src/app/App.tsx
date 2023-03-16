import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import './App.css';
import {Layout} from "./Layout";
import ClinicalCard from '../pages/ClinicalCard/ClinicalCard';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

import {MainPage} from "../pages/MainPage/MainPage";
import {AuthProvider} from '../context';
import {useDispatch, useSelector} from "react-redux";
import {store} from './../redux'
import {IGeneralState, IUser, Types} from "../redux/types/types";




function App() {
  // const getUser = useSelector((store: IGeneralState) => store?.user?.username)
  // const token = localStorage.getItem("jwtToken")
  // console.log("-> token", {token});
  // const dispatch = useDispatch()
  //
  // useEffect(() => {
  //   // Обновляет информацию в хранилище после того как юзер залогинился
  //
  //   if (!getUser && token) {
  //     (async () => {
  //       const response = await fetch('/auth/user', {
  //         method: 'POST',
  //         headers: {
  //           'Content-type': 'Application-json',
  //         },
  //         body: JSON.stringify({token})
  //       })
  //       const user = await response.json()
  //       console.log("-> user", user);
  //       // dispatch({type: Types.LOGIN_SUCCESS, payload: user});
  //     })()
  //   }
  // }, [])

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='/clinical' element={<ClinicalCard />} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
