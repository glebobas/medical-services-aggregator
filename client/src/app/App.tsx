import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import './App.css';
import {Register} from "../components/Modal/Register";
import {Layout} from "./Layout";
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
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
