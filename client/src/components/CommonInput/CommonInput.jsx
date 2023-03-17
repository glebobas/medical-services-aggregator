import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {Select} from 'antd';

export function CommonInput() {

  const getClinicsAndDoctors = useSelector((state) => state?.clinicsAndDoctors?.clinicsAndDoctors?.map(item => item.name))
  console.log("-> getClinicsAndDoctors", getClinicsAndDoctors);

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredResults = getClinicsAndDoctors.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    const limitedResults = filteredResults.slice(0, 6);
    setResults(limitedResults);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Search"
        className="px-4 py-2 w-full border border-gray-300 rounded-md"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {results.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 z-10">
          {results.map((item) => (
            <li key={item} className="px-4 py-2">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )

}
