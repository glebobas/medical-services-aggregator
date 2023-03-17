import React, { useEffect, useState, useCallback } from "react";
import {useDispatch, useSelector} from 'react-redux';
import styles from "./clinical.css";
import SelectMenus from "../../components/SelectMenus/SelectMenus";
import DoctorsTable from "../../components/DoctorsTable/DoctorsTable";
import YandexMap from "../../components/Map/Map";
import Rating from "../../components/Rating/Rating";
import { TypesClinic } from "../../redux/types/typesClinic";

export default function ClinicalCard() {
  const [clinic, setClinic] = useState({});
  const [doc, setDoc] = useState()
  const dispatch = useDispatch()
  const data = { id: 1 };
  useEffect(() => {
    (async () => {
      const response = await fetch("/clinical", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();
     setClinic(res);
     
    })();
   
  }, []);
 useEffect(() => {
  const clinicData = {
    clinicInfo: {
    id: clinic.id,
    name: clinic.name,
    phone: clinic.phone,
    email: clinic.email,
    generalInfo: clinic.generalInfo
  },
  addressClinic: {
    country:clinic['Address.countryName'],
    city: clinic['Address.cityName'],
    street: clinic['Address.streetName'],
},
}

dispatch({type: TypesClinic.GET_CLINIC, payload: clinicData})
//console.log("диспатч отправлен")
 }, [clinic, dispatch])
 const result = useSelector((state) => state.getClinic.clinicInfo)
// if (clinic.name) {
//   console.log(result)
// }  

  return (
    <>
      <div className="bg-white">
        <div className="pt-6">
          {/* <!-- Image gallery --> */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8 clinical">
            <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
              <img
                src="https://avatars.mds.yandex.net/get-altay/2767250/2a0000017497e0475cfffa14776f1aca2b34/XXL_height"
                alt="Model wearing plain white basic tee."
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {clinic.name}
                </h1>
              </div>

              {/* <!-- Options --> */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xs tracking-tight text-gray-600">
                  {clinic.generalnfo}
                </p>

                {/* <!-- Reviews --> */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <Rating rat={clinic.clinicRating} />
                    <a
                      href="#"
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Отзывы клиентов
                    </a>
                  </div>
                </div>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                {/* <!-- Description and details --> */}
              </div>
            </div>
          </div>
          <div className="space-y-6 infoClinic">
            <p className="text-base text-gray-900">
              Address: {clinic["Address.streetName"]},{" "}
              {clinic["Address.cityName"]}, {clinic["Address.countryName"]}
            </p>
            <p className="text-base text-gray-900">Phone: {clinic.phone}</p>
            <p className="text-base text-gray-900">Email: {clinic.email}</p>
          </div>

          {/* <!-- Product info --> */}
        </div>
        <div className="tableDoctors">
          <div>
            <SelectMenus />
          </div>
          <div>
            <DoctorsTable />
          </div>
        </div>
        <div className="ymaps">
          <div className="ymap">
            <YandexMap />
          </div>
        </div>
      </div>
    </>
  );
}
