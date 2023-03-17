import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Select} from 'antd';

import { Types } from "../../redux/types/types";

const OPTIONS = ['Иванов Иван Иванович', 'Петров Петр Петрович', 'Сидоров Сидор Сидорович', 'Клиника Беркут'];

export function CommonInput() {
<<<<<<< Updated upstream

  const getClinicsAndDoctors = useSelector((state) => state?.clinicsAndDoctors?.clinicsAndDoctors?.map(item => item.name))

  // Выпадающее меню
  const [originalList, setOriginalList] = useState(getClinicsAndDoctors)
  const [filteredList, setFilteredList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (event) => {

    setSearchInput(event.target.value);
  //
  //   fetch(`main/alldata/${event.target.value}`)
  //     .then(response => response.json())
  //     .then(data => [...data.readyClinicList, ...data.readyDoctorList])
  //     .then(data => {
  //       const newArray = data.map(item => item.name);
  //       setFilteredList(newArray)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  console.log("-> event", event.target.value);
  }

  return (
    <div className="flex flex-col w-full mx-auto">
      <input list="options" className="rounded-lg border py-1 px-5" type="text" value={searchInput} onChange={handleSearchInput}/>
      <datalist id="options" className="w-[420px]">
        {originalList?.map((option) => (
          <option key={option.id} value={option} />
        ))}
      </datalist>
      {/*<ul>*/}
      {/*  {filteredList.map(item => (<li key={item.id}>{item.name}</li>))}*/}
      {/*</ul>*/}
    </div>
  )
=======
    const [initialList, setInitialList] = useState([]);
    const [visibleList, setVisibleList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
      // Fetch initial list from backend
      fetch("/main/alldataquery")
        .then((response) => response.json())
        .then(response => [...response.readyClinicList, ...response.readyDoctorList])
        .then(data => {
          const newArray = data.map(item => item.name);
          setInitialList((prevState) => [...prevState, ...newArray])
          setVisibleList(newArray.slice(0, 8))
        })
        .catch(error => {
          console.error(error)
        })
    }, []);


    useEffect(() => {
      // Make API call to backend when search term changes
      const delayDebounceFn = setTimeout(() => {
        fetch(`main/alldata/${searchTerm}`)
          .then((response) => response.json())
          .then(data => [...data.readyClinicList, ...data.readyDoctorList])
          .then(data => {
            const newArray = data.map(item => item.name);
            setSearchResults(newArray)
          })
          .catch((error) => {
            console.error(error);
          });
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleInputChange = (event) => {
      const {value} = event.target;
      setSearchTerm(value);

      if (value === "") {
        setVisibleList(initialList.slice(0, 8));
      } else {
        // Filter visible list based on search term
        const filteredList = initialList.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
        );
        setVisibleList(filteredList.slice(0, 8));
      }
    };
>>>>>>> Stashed changes

    return (
      <div className="w-full">
        <input className="px-5 py-2 border rounded w-full" type="text" value={searchTerm} onChange={handleInputChange}/>
        <ul>
          {visibleList.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                {result.name} - {result.type}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };


  // // Выпадающее меню
  // const [originalList, setOriginalList] = useState([])
  // console.log("-> originalList", originalList);
  // const [filteredList, setFilteredList] = useState([]);
  // console.log("-> filteredList", filteredList);
  // const [searchInput, setSearchInput] = useState("");
  // console.log("-> searchInput", searchInput);
  //
  //
  // useEffect(() => {
  //   fetch('/main/alldataquery')
  //     .then(response => response.json())
  //     .then(response => [...response.readyClinicList, ...response.readyDoctorList])
  //     .then(data => {
  //       const newArray = data.map(item => item.name);
  //       setOriginalList((prevState) => [...prevState, ...newArray])
  //       setFilteredList(newArray.slice(0, 8))
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  // }, [])
  //
  // const handleSearchInput = (event) => {
  //   setSearchInput(event.target.value);
  //
  //   fetch(`main/alldata/${event.target.value}`)
  //     .then(response => response.json())
  //     .then(data => [...data.readyClinicList, ...data.readyDoctorList])
  //     .then(data => {
  //       const newArray = data.map(item => item.name);
  //       setFilteredList(newArray)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     })
  // }
  //
  // return (
  //   <div className="flex flex-col w-full mx-auto">
  //     <input list="options" className="rounded-lg border py-1 px-5" type="text" value={searchInput} onChange={handleSearchInput}/>
  //     <datalist id="options" className="w-[420px]">
  //       {originalList.map((option) => (
  //         <option key={option.id} value={option} />
  //       ))}
  //     </datalist>
  //     <ul>
  //       {filteredList.map(item => (<li key={item.id}>{item.name}</li>))}
  //     </ul>
  //   </div>
  // )

  // OLD CODE

  // const [selectedItems, setSelectedItems] = useState([]);
  // const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  //
  // return (
  //   <div className="flex flex-col w-full mx-auto">
  //     <label htmlFor="request" className="flex text-lg font-bold leading-20 dark:text-blue-100">
  //        Найти клинику или врача
  //     </label>
  //     <div className=" mt-2 rounded-md shadow-sm">
  //       <Select
  //         mode="multiple"
  //         placeholder="Найти врача | Клинику | Записаться на прием"
  //         value={selectedItems}
  //         onChange={setSelectedItems}
  //         style={{ width: '100%' }}
  //         options={filteredOptions.map((item) => ({
  //           value: item,
  //           label: item,
  //         }))}
  //       />
  //
  //     </div>
  //   </div>
  // )

