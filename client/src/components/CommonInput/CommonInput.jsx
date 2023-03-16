import {useEffect, useState} from "react";
import {Select} from 'antd';

const OPTIONS = ['Иванов Иван Иванович', 'Петров Петр Петрович', 'Сидоров Сидор Сидорович', 'Клиника Беркут'];

export function CommonInput() {
  // Выпадающее меню
  const [originalList, setOriginalList] = useState([])
  const [filteredList, setFilteredList] = useState([]);
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    fetch('/main/alldata/query')
      .then(response => {
        setOriginalList(response.data);
        setFilteredList(response.data.slice(0, 8));
      })
      .catch(error => {
        console.error(error);
      })
  }, [])

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);

    fetch(`/api/search?query=${event.target.value}`)
      .then(response => {
        setFilteredList(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  };

  return (
    <div className="flex flex-col w-full mx-auto">
      <input className="rounded-lg border py-1 px-5"  type="text" value={searchInput} onChange={handleSearchInput}/>
      <ul>
        {filteredList.map(item => <li key={item.id}>{item.name}</li>)}
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

