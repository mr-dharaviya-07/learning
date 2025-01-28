/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from 'react-query';

import { useState } from "react";
import { useGetUser } from "../hook/useGetUser";
import { Form } from "./Form";



export const UserUpdate = () => {

    const [show, setShow] = useState(false);

    const id = 1;
    const { data, isLoading } = useQuery([id, 'http://localhost:4000/user'], useGetUser);

    if (isLoading) {
        return null;
    }


    const showForm = () => {
        setShow(true)
    }
    return (
        <>
            <div className="w-full h-screen bg-gray-500 flex justify-center items-center">
                <div className="bg-white w-56 h-76 rounded-2xl flex flex-col justify-center items-center ">
                    <h1 className="font-bold text-lg m-5">
                        Name : {data.name}
                    </h1>
                    <h1 className="font-bold text-lg ">
                        Email : {data.email}
                    </h1>
                    {show && <Form data = {{id: data.id ,userName: data.name ,email: data.email}}/>}
                    <button onClick={showForm} className="m-5 bg-blue-400 px-5 py-2 rounded-lg cursor-pointer" >Edit</button>
                </div>

            </div>
        </>
    )
}