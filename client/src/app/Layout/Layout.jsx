import React, {FC, useContext, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {NavBar} from "../../components/NavBar";
import {Footer} from "../../components/Footer";
import {CommonInput} from "../../components/CommonInput/CommonInput";
import {SearchResultsContext} from "../../context/context";


// interface LayoutProps {
//   title?: string
// }

export const Layout = ({title}) => {
  const [data, setData] = useState({})


  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col min-h-screen">
      <NavBar/>
      <div className="container flex flex-col flex-grow mx-auto">
        <CommonInput setData={setData}/>
        <SearchResultsContext.Provider value={{data, setData}}>
          <Outlet/>
        </SearchResultsContext.Provider>
      </div>
      {/*<div className="container pt-6 flex flex-col px-4 w-full">*/}
      {/*  {title && <h1 className="text-3xl font-bold text-clifford">{title}</h1>}*/}
      {/*</div>*/}

      <Footer/>
    </div>
  );
}
