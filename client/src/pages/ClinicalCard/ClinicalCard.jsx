import React, { useEffect, useState, useCallback } from "react";

import styles from "./clinical.css";
import SelectMenus from "../../components/SelectMenus/SelectMenus";
import { DoctorsTable } from "../../components/DoctorsTable";
import YandexMap from "../../components/Map/Map";
import Rating from "../../components/Rating/Rating";
import { ContextAddReview } from "../../context/context";
import { useParams } from "react-router-dom";
import ReviewsMenu from "../../components/ReviewsMenu/ReviewsMenu";
import {FormattedMessage} from "react-intl";

const location = {
  "Turkey":[39.920756, 32.854049],
  "Australia":[-35.306907, 149.125531],
 " Vietnam":[21.033999, 105.842113],
}

export default function ClinicalCard() {
  const { id } = useParams();
  const [clinic, setClinic] = useState({ readyClinic: [], doctors: [] });
  console.log("-> clinic", clinic);
  const [reviews, setReviews] = useState();
  const [dataRes, setDataRes] = useState();

  const data = { id: 1 };
  const loc = clinic?.readyClinic[0]?.address.split(', ')[2]
// console.log(loc)
//   console.log(location[`${loc}`])
  useEffect(() => {
    (async () => {
      const response = await fetch(`/main/clinic?clinicId=${id}`);

      response.json().then((r) => {
      setClinic(r);
      })
          // .catch((err) => {console.error(err)})
    })();

  }, []);


  const handleClick2 = (e) => {
    const profile = e.target.innerHTML;
    if (profile.length < 20) {
      // console.log(profile.length)
      if (profile !== "All doctors") {
        const fill = clinic?.readyDoctorList?.filter(
          (el) => el.speciality === profile
        );
        console.log("-> clinic", clinic);
        console.log("-> fill", fill);
        setDataRes(fill);
      } else if (profile === "All doctors") {
        setDataRes(clinic?.readyDoctorList);
      }
    }
  };


  return (
    <ContextAddReview.Provider value={{ setClinic }}>
      <>
        {/* <!-- Head block --> */}
        <div className="flex flex-col justify-center px-6 py-6 mt-4 bg-white border rounded">
          {/* <!-- Title --> */}
          <div className="title">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {clinic?.readyClinic[0]?.name}
            </h1>
          </div>

          <div>
            <div className="doctor__card-row-1 flex flex-row justify-between">
              <div className="row-1__column-left flex flex-col w-2/5 justify-between">
                <table className="mt-4 w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="text-gray-500">
                        <FormattedMessage
                            id='Address:'
                            defaultMessage="Default error message"
                        />
                      </td>
                      <td className="pl-4 font-semibold pt-2">
                        {clinic?.readyClinic[0]?.address}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="text-gray-500">
                        <FormattedMessage
                            id='Phone:'
                            defaultMessage="Default error message"
                        />
                      </td>
                      <td className="pl-4 font-semibold pt-2">
                        {clinic?.readyClinic[0]?.phone}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="text-gray-500">
                        <FormattedMessage
                            id='Email:'
                            defaultMessage="Default error message"
                        />
                      </td>
                      <td className="pl-4 font-semibold pt-2">
                        {clinic?.readyClinic[0]?.email}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="text-gray-500">
                        <FormattedMessage
                            id='Rewiews:'
                            defaultMessage="Default error message"
                        />
                        </td>
                      <td className="pl-4 font-semibold pt-2">
                        <div className="flex items-center">
                          <Rating
                            rat={clinic?.readyClinic[0]?.averageClinicRating}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row-1__column-right flex border w-[150px] h-[150px] rounded bg-blue-200 items-center justify-center">
                <img
                  src="https://source.unsplash.com/random/?clinic"
                  alt="Model wearing plain white basic tee."
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          <div className="options flex flex-row justify-between mt-4">
            <div className="flex-col border-b">
              <h2 className="text-gray-500">
                <FormattedMessage
                    id='Clinic information'
                    defaultMessage="Default error message"
                />
              </h2>
              <p className="text-3xs tracking-tight text-gray-600">
                <FormattedMessage
                    id={clinic?.readyClinic[0]?.generalInfo || ' '}
                    defaultMessage="Default error message"
                />
              </p>
            </div>
            <div className="flex-col">
               {/*// <!-- Reviews -->*/}
              <div className="mt-6"></div>
            </div>
          </div>
          <div onClick={handleClick2} className="mt-4">
            {" "}
            <SelectMenus />
          </div>

          {dataRes ? (
            <>
              <DoctorsTable data={dataRes} />
            </>
          ) : (
            <></>
          )}
          <ReviewsMenu rev={clinic?.reviewsReady} />
          <div className="ymaps w-full mt-4">
            <div className="ymap">
              <YandexMap geo={location[`${loc}`]}/>
            </div>
          </div>
        </div>
      </>
    </ContextAddReview.Provider>
  );
}
