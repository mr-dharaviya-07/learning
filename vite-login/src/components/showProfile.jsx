/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Form } from "./form";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";


export const ShowProfile = () => {

    const id = localStorage.getItem("id");

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            logout()
        }
    }, [id]);

    const mutation = useGetUser('http://localhost:4000/get-profile', id)




    const showFrom = () => {
        setShow(true);
    }

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <>
            <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
                {mutation.isSuccess && <div className=" bg-white h-96 w-96 m-3 flex flex-col justify-around items-center p-2 rounded-lg shadow-2xl">
                    <div className="flex">
                        <img src={`http://localhost:4000/uploads/${mutation.data.profile_picture}`} alt="Profile" className="w-20 aspect-square object-cover object-top rounded-full " />
                    </div>
                    <div className="flex text-lg ">
                        <div className="m-1 font-medium">Name :</div>
                        <div className="m-1">{mutation.data.name}</div>
                    </div>
                    <div className="flex text-lg ">
                        <div className="m-1 font-medium">Email :</div>
                        <div className="m-1">{mutation.data.email}</div>
                    </div>
                    <div className="flex text-lg ">
                        <div className="m-1 font-medium">Phone Number :</div>
                        <div className="m-1">{mutation.data.phone_number}</div>
                    </div>
                    <div className="flex text-lg ">
                        <div className="m-1 font-medium">Gender :</div>
                        <div className="m-1">{mutation.data.gender}</div>
                    </div>
                    <div className="flex text-lg ">
                        <div className="m-1 font-medium">Date of Brith :</div>
                        <div className="m-1">{mutation.data.formatted_dob}</div>
                    </div>

                    <div>
                        <button onClick={showFrom} className="bg-blue-500 p-2 m-2 rounded text-lg text-white">Edit Profile</button>
                        <button onClick={logout} className="bg-blue-500 p-2 m-2 rounded text-lg text-white">Log out</button>

                    </div>
                </div>}
            </div >

            {show && <Form data={mutation.data} />}
        </>
    )
}