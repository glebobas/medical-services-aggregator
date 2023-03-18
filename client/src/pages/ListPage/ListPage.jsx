import React, {useContext} from 'react';
import {ClinicsTable} from "../../components/ClinicsTable";
import {SearchResultsContext} from "../../context/context";
import {DoctorsTable} from "../../components/DoctorsTable";

export function ListPage(props) {
  const {data} = useContext(SearchResultsContext)
  // console.log("ListPage-> data", data.readyClinicList, data.readyDoctorList);

  return (
    <div className="flex flex-col pt-4">
      <ClinicsTable data={data.readyClinicList}/>
      <DoctorsTable data={data.readyDoctorList}/>
    </div>
  );
}

