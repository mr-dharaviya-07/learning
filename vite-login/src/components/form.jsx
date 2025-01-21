/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form"
import { Validation } from "./validation"
import { Response } from "./response"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const Form = ({ data }) => {

    const [response, setResponse] = useState('');
    const [responseError, setResponseError] = useState('');
    const [profilePicture, setProfilePicture] = useState(data.profilePicture);
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: data.name,
            email: data.email,
            dob: data.dob,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            profilePicture: data.profilePicture
        }
    })


    const showAlert = () => {
        setAlert(true);

        setTimeout(() => {
            setAlert(false)
        }, 1200)
    }

    const onSubmit = (data) => {

        const formData = new FormData();

        // Append form fields
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('dob', data.dob);
        formData.append('gender', data.gender);
        formData.append('profilePicture', data.profilePicture[0]);
        formData.append('oldProfilePicture', profilePicture);


        const userId = localStorage.getItem('userId');

        const sendData = async () => {

            try {
                const res = await fetch(`http://localhost:4000/update-profile/${userId}`, {
                    method: 'PUT',
                    body: formData
                })

                const data = await res.json();

                if (!res.ok) {
                    setResponseError(data.message);
                    setResponse("");

                    showAlert();
                    return
                }
                setResponse(data.message);
                setResponseError("");
                showAlert();

                setTimeout(() => {
                    navigate('/profile');
                }, 2000)

            }
            catch (error) {
                console.log(error);
                // setResponseError(`Error :${error.message}`);
            }
        }
        sendData();

    }

    return (
        <>
            <div className="fixed top-0 h-screen w-screen bg-black text-white opacity-30"></div>

            <div className="fixed top-0 h-screen w-screen flex flex-col justify-center items-center">

                {responseError ? <Response value={{ text: responseError, response: "error" }} alert={alert} /> : <Response value={{ text: response, response: "" }} alert={alert} />}

                <form onSubmit={handleSubmit(onSubmit)} method="post" className=" m-2 w-96 rounded-lg bg-white flex flex-col justify-center items-center shadow-2xl" >

                    <h1 className="relative top-4 text-blue-600 font-semibold m-2" style={{ fontSize: "30px" }}>Update Your Profile</h1>

                    <div className="flex w-5/6 flex-col m-3">
                        <label htmlFor="name" className="text-base p-1">Name</label>
                        <input type="text" name="name" id="name" className={`h-9 rounded-md p-2 border-2 focus:border-teal-500 focus:border-2 ${errors.name ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("name", { required: "Enter your Name" })} />
                        {errors.name && (<Validation value={{ text: errors.name.message, component: "validation" }} />)}
                    </div>

                    <div className="flex w-5/6 flex-col m-3">
                        <label htmlFor="dob" className="text-base p-1"> Date of Birth </label>
                        <input type="date" name="dob" id="dob" className={`h-9 rounded-md p-2 border-2 ${errors.dob ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("dob", { required: "Enter your Date of Birth" })} />
                        {errors.dob && (<Validation value={{ text: errors.dob.message, component: "validation" }} />)}
                    </div>

                    <div className="flex w-5/6 flex-col m-3">
                        <label htmlFor="phoneNumber" className="text-base p-1"> Phone Number</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" maxLength={10} className={`h-9 rounded-md p-2 border-2 [&::-webkit-inner-spin-button]:appearance-none ${errors.phoneNumber ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("phoneNumber", {
                                required: "Enter your Phone Number", maxLength: { value: 10, message: "Phone Number must be 10 digits", }, pattern: { value: /^[0-9]*$/, message: "Only numbers are allowed" },
                            })} />
                        {errors.phoneNumber && (<Validation value={{ text: errors.number.message, component: "validation" }} />)}
                    </div>

                    <div className="flex w-5/6 flex-col my-1">
                        <label htmlFor="profilePicture" className="text-base p-1">Profile Picture</label>
                        <img src={`http://localhost:4000/uploads/${profilePicture}`} alt="Profile" className="w-20 aspect-square object-cover object-top rounded-full " />
                        <input type="file" name="profilePicture" id="profilePicture" className={`h-10 p-1 rounded-md border-2 border-black focus:outline-black"}`}
                            {...register("profilePicture")} />
                        {/* {errors.profilePicture && (<Validation value={{ text: errors.profilePicture.message, component: "validation" }} />)} */}
                    </div>

                    <div className="flex w-5/6 flex-col m-3">
                        <label htmlFor="gender" className="text-base p-1"> Gender</label>
                        <select name="gender" id="gender" className={`h-10 rounded-md p-2 border-2 ${errors.gender ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("gender", { required: "Select your Gender" })}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && (<Validation value={{ text: errors.gender.message, component: "validation" }} />)}
                    </div>

                    <button type="submit" className=" w-5/6 bg-green-400 p-2 rounded-lg self-center font-medium text-xl text-white hover:bg-green-500 transition duration-300 m-5"> Save </button>
                </form>
            </div>
        </>

    )
}



