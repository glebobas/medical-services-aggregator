import React, {useContext} from 'react';
import {AuthContext} from "../../context";
import {SearchResultsContext} from "../../context/context";
import {useNavigate} from "react-router-dom";

function RandomSearch(props) {

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
            <div>random search</div>
            <button
                className="border rounded ml-2 px-8 py-2 bg-green-700 text-white hover:bg-green-800"
                onClick={handleButtonClick}>
                Search
            </button>
        </>
    );
}

export default RandomSearch;
