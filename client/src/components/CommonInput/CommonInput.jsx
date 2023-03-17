import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Select} from 'antd';

import { Types } from "../../redux/types/types";

const OPTIONS = ['Иванов Иван Иванович', 'Петров Петр Петрович', 'Сидоров Сидор Сидорович', 'Клиника Беркут'];

export function CommonInput() {

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
      <input list="options" className="rounded-lg border py-1 px-5" type="text" value={searchInput}
             onChange={handleSearchInput}/>
      <datalist id="options" className="w-[420px]">
        {originalList?.map((option) => (
          <option key={option.id} value={option}/>
        ))}
      </datalist>
      {/*<ul>*/}
      {/*  {filteredList.map(item => (<li key={item.id}>{item.name}</li>))}*/}
      {/*</ul>*/}
    </div>

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
  )
}
