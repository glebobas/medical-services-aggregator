import {useEffect, useState} from "react";
import {Select} from 'antd';

const OPTIONS = ['Иванов Иван Иванович', 'Петров Петр Петрович', 'Сидоров Сидор Сидорович', 'Клиника Беркут'];

export function CommonInput() {
  // Выпадающее меню
  const [originalList, setOriginalList] = useState([])
  console.log("-> originalList", originalList);
  const [filteredList, setFilteredList] = useState([]);
  console.log("-> filteredList", filteredList);
  const [searchInput, setSearchInput] = useState("");
  console.log("-> searchInput", searchInput);


  useEffect(() => {
    fetch('/main/alldataquery')
      .then(response => response.json())
      .then(response => [...response.readyClinicList, ...response.readyDoctorList])
      .then(data => {
        const newArray = data.map(item => item.name);
        setOriginalList((prevState) => [...prevState, ...newArray])
        setFilteredList(newArray.slice(0, 8))
      })
      .catch(error => {
        console.error(error);
      })
  }, [])

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);

    fetch(`main/alldata/${event.target.value}`)
      .then(response => response.json())
      .then(data => [...data.readyClinicList, ...data.readyDoctorList])
      .then(data => {
        const newArray = data.map(item => item.name);
        setFilteredList(newArray)
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <div className="flex flex-col w-full mx-auto">
      <input list="options" className="rounded-lg border py-1 px-5" type="text" value={searchInput} onChange={handleSearchInput}/>
      <datalist id="options" className="w-[420px]">
        {originalList.map((option) => (
          <option key={option.id} value={option} />
        ))}
      </datalist>
      <ul>
        {filteredList.map(item => (<li key={item.id}>{item.name}</li>))}
      </ul>
    </div>
  )


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
}

