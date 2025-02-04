/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Validation } from './validation';
import { useForm } from "react-hook-form"
import { Response } from './response';
import { useLogin } from '../hooks/useLogin';


export const Login = () => {

    const [alert, setAlert] = useState(false)
    const navigate = useNavigate();

    const mutation = useLogin('http://localhost:4000/login');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const showAlert = async () => {
        setAlert(true);

        setTimeout(() => {
            setAlert(false)
        }, 2200)
    }

    const onSubmit = async (data) => {
        try {
            await mutation.mutateAsync(data);

            setTimeout(() => {
                navigate('/profile')
            }, 1500)
        } catch (error) {
            console.log(error)
        }
        showAlert();

    }



    const registerPage = () => {
        navigate("/register");
    }

    return (
        <>
            <div className="bg-white h-screen flex justify-center items-center ">
                <form onSubmit={handleSubmit(onSubmit)} method="post" className="bg-white w-96 h-96 flex flex-col items-center justify-center rounded-md shadow-2xl" style={{ height: "550px" }}>
                    <h1 className="relative bottom-2 text-blue-600 text-4xl font-medium m-5">Login</h1>

                    {mutation.isSuccess && <Response value={{ text: mutation.data.success, response: "" }} alert={alert} />}
                    {mutation.isError && <Response value={{ text: mutation.error.message, response: "error" }} alert={alert} />}

                    <div className="flex w-4/5 flex-col m-5 ">
                        <label htmlFor="email" className="text-base p-1 ">Email Address</label>
                        <input type="email" name="email" id="email" className={`h-9 rounded-md p-2 border-2 ${errors.email ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("email", { required: "Enter your Email", pattern: { value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, message: "Enter a valid Email", }, })} />
                        {errors.email && (<Validation value={{ text: errors.email.message, component: "validation" }} />)}
                    </div>

                    <div className="flex w-4/5 flex-col m-5">
                        <label htmlFor="password" className="text-base p-1">Password</label>
                        <input type="password" name="password" id="password" className={`h-9 rounded-md p-2 border-2 ${errors.password ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("password", { required: "Enter your Password", minLength: { value: 8, message: "Password must be at least 8 characters long.", }, })} />
                        {errors.password && (<Validation value={{ text: errors.password.message, component: "validation" }} />)}
                    </div>
                    <button type="submit" className="bg-blue-400 p-2 rounded-lg w-4/5 font-medium text-xl m-5 text-white">Login</button>

                    <div className='flex mt-2'>
                        <h2 className='m-1'>Don't have an account?</h2>
                        <button className='m-1 text-blue-600' onClick={registerPage}><strong>Register</strong></button>
                    </div>
                </form>
            </div>
        </>
    )
}






