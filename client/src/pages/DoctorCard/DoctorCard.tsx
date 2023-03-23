import React, {useEffect, useState} from 'react';
import {DayView} from "../../components/DayView/DayView";
import {useLocation, useParams} from "react-router-dom";
import {ShedulRecModal} from "../../components/Modal/ShedulRecModal";
import {initialState} from "../../redux/store";
import {object} from "yup";
import {FormattedMessage} from "react-intl";

interface IDoctor {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    speciality: string;
    generalInfo: string;
    address: string;
    email: string;
    adultPatients: boolean;
    avatar: string;
    averageDocRating: string;
    childrenPatients: boolean;
    clinic: boolean;
    clinicId: number;
}

export const DoctorCard = () => {
    const [doctor, setDoctor] = useState<IDoctor>({
        id: 0,
        name: '',
        firstName: '',
        lastName: '',
        speciality: '',
        generalInfo: '',
        address: '',
        email: '',
        adultPatients: false,
        avatar: '',
        averageDocRating: '',
        childrenPatients: false,
        clinic: false,
        clinicId: 0,
    });
    console.log("-> doctor", doctor);

    const location = useLocation()
    const {id} = location.state

    useEffect(() => {
        (async () => {
                const response = await fetch(`/main/doctor?doctorId=${id}`)
                const data = await response.json()
                setDoctor(data.readyDocOne)
            }
        )()
    }, [])

    // useEffect(() => {
    //     fetch(`/main/doctor/${id}`)
    //         .then(response => response.json())
    //         .then(data => setDoctor(data.readyDocOne))
    //         .catch(error => console.error(error));
    // }, []);
    // console.log("-> doctor", doctor);
    return (
        <div className="doctor__cad flex flex-col bg-white w-full mx-auto border rounded py-6 px-6 mt-4">
            <div className="doctor__card-row-1 flex flex-row justify-between">
                <div className="row-1__column-left flex flex-col w-2/5 justify-between">
                    <div className="doctor__card-title text-3xl font-semibold">{doctor?.name}</div>
                    <table className="mt-4 w-full">
                        <tbody>
                        <tr className="border-b">
                            <td className="text-gray-500">
                                <FormattedMessage
                                    id="Speciality"
                                    defaultMessage="Default error message"
                                />
                            </td>
                            <td className="pl-4 font-semibold">

                                <FormattedMessage
                                    id={doctor?.speciality || ' '}
                                    defaultMessage="Default error message"
                                />
                            </td>
                        </tr>
                        {/*<tr className="border-b">*/}
                        {/*    <td className="text-gray-500 pt-2">Стаж</td>*/}
                        {/*    <td className="pl-4 font-semibold pt-2">-</td>*/}
                        {/*</tr>*/}
                        <tr className="border-b">
                            <td className="text-gray-500 pt-2">
                                <FormattedMessage
                                    id="Rating"
                                    defaultMessage="Default error message"
                                />
                            </td>
                            <td className="pl-4 font-semibold pt-2">{doctor?.averageDocRating}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="text-gray-500 pt-2">
                                <FormattedMessage
                                    id="Clinic"
                                    defaultMessage="Default error message"
                                />
                            </td>
                            <td className="pl-4 font-semibold pt-2">{doctor?.clinic}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="text-gray-500 pt-2">
                                <FormattedMessage
                                    id="Address"
                                    defaultMessage="Default error message"
                                />
                            </td>
                            <td className="pl-4 font-semibold pt-2">{doctor?.address}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    className="row-1__column-right flex border w-[150px] h-[150px] rounded bg-blue-200 items-center justify-center">
                    <img src={doctor?.avatar}/></div>
            </div>
            <div className="doctor__card-row-2 mt-4">
                <div className="text-gray-500">
                    <FormattedMessage
                        id="About doctor:"
                        defaultMessage="Default error message"
                    />
                </div>
                <div className="doctor__card-row-2-doctor-params text-sm tracking-wide mt-2">
                    <FormattedMessage
                        id={doctor?.generalInfo || ' '}
                        defaultMessage="Default error message"
                    />
                </div>
            </div>
            <DayView/>
        </div>
    );
};
