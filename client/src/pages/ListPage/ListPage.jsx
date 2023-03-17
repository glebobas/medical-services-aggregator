import React, {useContext} from 'react';
import {ClinicsAndDoctorsTable} from "../../components/ClinicsAndDoctorsTable";
import {SearchResultsContext} from "../../context/context";

export function ListPage(props) {
  const {data} = useContext(SearchResultsContext)
  console.log("ListPage-> data", data.readyClinicList, data.readyDoctorList);

  return (
    <div className="flex flex-col pt-4">
      <ClinicsAndDoctorsTable  data={data.readyClinicList}/>
    </div>
  );
}

