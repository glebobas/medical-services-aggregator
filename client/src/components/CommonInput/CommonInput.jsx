import {useState} from "react";
import { Select } from 'antd';

const OPTIONS = ['Иванов Иван Иванович', 'Петров Петр Петрович', 'Сидоров Сидор Сидорович' , 'Клиника Беркут'];

export function CommonInput() {
  // Выпадающее меню
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  return (
    <div className="flex flex-col w-full mx-auto">
      <label htmlFor="request" className="flex text-lg font-bold leading-20 dark:text-blue-100">
         Найти клинику или врача
      </label>
      <div className=" mt-2 rounded-md shadow-sm">
        <Select
          mode="multiple"
          placeholder="Найти врача | Клинику | Записаться на прием"
          value={selectedItems}
          onChange={setSelectedItems}
          style={{ width: '100%' }}
          options={filteredOptions.map((item) => ({
            value: item,
            label: item,
          }))}
        />

    {/*<Select*/}
    {/*  defaultValue={selectedOption}*/}
    {/*  onChange={setInputSearch}*/}
    {/*  options={options}*/}
    {/*/>*/}
        {/*<input*/}
        {/*  onChange={handleChange}*/}
        {/*  value={inputSearch}*/}
        {/*  type="text"*/}
        {/*  name="request"*/}
        {/*  id="request"*/}
        {/*  className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
        {/*  placeholder="Найти врача | Клинику | Записаться на прием"*/}
        {/*/>*/}
      </div>
    </div>
  )
}

