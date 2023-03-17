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
      <div className="container mx-auto flex-grow flex flex-col">
        <div className="pt-24 flex-1 flex flex-col px-4">
          {title && <h1 className="text-3xl font-bold underline text-clifford">{title}</h1>}
          <CommonInput setData={setData}/>
          <SearchResultsContext.Provider value={{data}}>
            <Outlet/>
          </SearchResultsContext.Provider>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
