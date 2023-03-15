export function CommonInput() {
  return (
    <div>
      <label htmlFor="request" className="flex text-lg font-bold leading-20 text-blue-100">
        Введите ваш запрос
      </label>
      <div className=" mt-2 w-70 rounded-md shadow-sm">
        <input
          type="text"
          name="request"
          id="request"
          className="block w-1/2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder=""
        />
      </div>
    </div>
  )
}

