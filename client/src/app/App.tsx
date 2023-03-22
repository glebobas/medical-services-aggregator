//@ts-nocheck
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
import {ProfileEditing} from '../components/ProfileEditing';
import {ListPage} from "../pages/ListPage";
import {DoctorCard} from "../pages/DoctorCard";
import {DayView} from "../components/DayView/DayView";
import GoogleAuth from "../components/Modal/Google/Google";
import {ClinicList} from '../components/ClinicList';
import {DoctorList} from '../components/DoctorList';
import {SearchPage} from "../pages/SearchPage/SearchPage";
import{NotePage} from '../pages/NotePage/NotePage';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    fetch('/main/alldataquery')
      .then(response => response.json())
      .then(data => [...data.readyClinicList, ...data.readyDoctorList])


      .then(data => dispatch({type: Types.ADD_CLINICS_AND_DOCTORS_SUCCESS, payload: data}))
      .catch(error => {
        console.error(error);
      })
  }, [])

  // getAllSpeciality
  useEffect(() => {
    fetch('/main/specialities')
      .then(response => response.json())
      .then(data => dispatch({type: Types.GET_DOCTORS_SPECIALITY_SUCCESS, payload: data}))
      .catch(error => {
        console.log(error)
      })
  }, [])

  // getAllAddress
  useEffect(() => {
    fetch('/main/addresses')
      .then(response => response.json())
      .then(data => dispatch({type: Types.GET_ADDRES_CLINICS_SUCCESS, payload: data}))
      .catch(error => {
        console.log(error)
      })
  }, [])

  const user = useSelector(state => state.login?.user?.id);


  return (
    <AuthProvider>
      {!user
        ?
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<MainPage/>}/>
            <Route path='/listpage' element={<ListPage/>}/>
            <Route path='/error' element={<ErrorPage/>}/>
            <Route path='/doctor/:id' element={<DoctorCard/>}/>
            <Route path='/search' element={<SearchPage/>}/>
            <Route path='/clinic/:id' element={<ClinicalCard/>}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Route>
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<MainPage/>}/>
            <Route path='/clinics' element={<ClinicList/>}/>
            <Route path='/doctors' element={<DoctorList/>}></Route>
            <Route path='/calendar' element={<h1>Календарь</h1>}/>
            <Route path='/listpage' element={<ListPage/>}/>
            <Route path='/notepage' element={<NotePage/>}/>
            <Route path='/profileEditing' element={<ProfileEditing/>}/>
            <Route path='/doctor/:id' element={<DoctorCard/>}/>
            <Route path='/clinic/:id' element={<ClinicalCard/>}/>
            <Route path='/search' element={<SearchPage/>}/>
            <Route path='/error' element={<ErrorPage/>}/>
            <Route path='*' element={<ErrorPage/>}/>
          </Route>
        </Routes>
      }

    </AuthProvider>
  );
}

export default App;
