import React, { useState } from "react";

export function CheckBoxes({ label, isChecked, onChange }) {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onChange(isChecked);
  };

  return (
    <>
      <label className="flex text-lg font-bold leading-20 text-blue-100">Детский</label>
      <div>
        <label className="flex items-center cursor-pointer">

          <div className="relative">
            <input
              type="checkbox"
              className="hidden"
              checked={checked}
              onChange={handleChange}
            />
            <div className="w-5 h-5 border border-gray-400 rounded-sm bg-white absolute top-0 left-0"></div>
            {checked && (
              <svg
                className="w-4 h-4 text-indigo-600 absolute top-0 left-0 ml-0.5 mt-0.5"
                viewBox="0 0 20 20">
                <path
                  fill="currentColor"
                  d="M18.36,3.64c-0.39-0.39-1.02-0.39-1.41,0L8,12.19L3.05,7.24c-0.39-0.39-1.02-0.39-1.41,0c-0.39,0.39-0.39,1.02,0,1.41L8.7,14.7c0.19,0.19,0.45,0.29,0.71,0.29c0.26,0,0.52-0.1,0.71-0.29l9.65-9.65C18.75,4.66,18.75,4.03,18.36,3.64z"
                />
              </svg>
            )}
          </div>
          <span className="ml-2">{label}</span>
        </label>
      </div>
    </>
  );
}
