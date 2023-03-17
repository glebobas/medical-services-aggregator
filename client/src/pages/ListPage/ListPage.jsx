import React, {useContext} from 'react';
import {ClinicsAndDoctorsTable} from "../../components/ClinicsAndDoctorsTable";
import {SearchResultsContext} from "../../context/context";

export function ListPage(props) {
  const {data} = useContext(SearchResultsContext)
  console.log("ListPage-> data", data);

  return (
    <div className="flex flex-col pt-4">
      <div className="header text-lg font-semibold">Клиники и доктора</div>
        <ClinicsAndDoctorsTable />
    </div>
  );
}

