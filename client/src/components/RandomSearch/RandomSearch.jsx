import React, {useContext} from 'react';
import {AuthContext} from "../../context";
import {SearchResultsContext} from "../../context/context";
import {useNavigate} from "react-router-dom";
import {SelectSpecialization} from "../SelectSpecialization/SelectSpecialization";
import {CheckBoxes} from "../CheckBoxes/CheckBoxes";
import {SelectLocation} from "../SelectLocation/SelectLocation";

function Search(props) {

    const navigate = useNavigate();

    const {
        setData
    } = useContext(SearchResultsContext)

    const handleButtonClick = async () => {
        // console.log(searchTerm)
        try {
            // const response =  await fetch(`/main/alldata/${searchTerm}`)
            // const results = await response.json();
            // // console.log("-> results", results);
            // // const getClinicsAndDoctors = [...results.readyClinicList, ...results.readyDoctorList]
            // // console.log("-> getClinicsAndDoctors", getClinicsAndDoctors);
            // setData(results)
            // navigate("/listpage")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div>search</div>
            <div className="main-col-left flex flex-col w-2/5 px-8 pt-4 bg-white">
                <SelectSpecialization />
                <div className="flex flex-row justify-around">
                    <div className="flex flex-col w-full"><CheckBoxes label={"Детский"}/></div>
                    <div className="flex flex-col w-full"><CheckBoxes label={"Взрослый"} /></div>
                </div>
                <br />
                <SelectLocation />
            </div>
            <button
                className="border rounded ml-2 px-8 py-2 bg-green-700 text-white hover:bg-green-800"
                onClick={handleButtonClick}>
                Search
            </button>
        </>
    );
}

export default Search;
