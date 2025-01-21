/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form"
import { Validation } from "./validation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Response } from "./response";

export const Register = () => {

    const [response, setResponse] = useState('');
    const [responseError, setResponseError] = useState('');
    const [alert, setAlert] = useState(false)


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const showAlert = () => {
        setAlert(true);

        setTimeout(() => {
            setAlert(false)
        }, 1200)
    }
    const navigate = useNavigate();

    const onSubmit = (data) => {

        const formData = new FormData();

        // Append form fields
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('dob', data.dob);
        formData.append('gender', data.gender);
        formData.append('password', data.password);

        // Append the profile picture file
        formData.append('profilePicture', data.profilePicture[0]);

        const sendData = async () => {

            try {
                const res = await fetch("http://localhost:4000/register", {
                    method: 'POST',
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
                localStorage.setItem('userId', data.userId);
                setTimeout(() => {
                    navigate('/profile');
                }, 2300)

            }
            catch (error) {
                console.log(error);
                setResponseError(`Error :${error.message}`);
            }
        }
        sendData();

    }

    const password = watch('password');

    return (
        <>
            <div className="bg-white min-h-screen flex justify-center items-center ">
                <form onSubmit={handleSubmit(onSubmit)} method="post" className="bg-white w-96 flex flex-col items-center justify-evenly rounded-lg shadow-2xl" style={{ minHeight: "730px" }}>
                    <h1 className="relative top-4 text-blue-600 font-semibold m-2" style={{ fontSize: "42px" }}> Register</h1>

                    {responseError ? <Response value={{ text: responseError, response: "error" }} alert={alert} /> : <Response value={{ text: response, response: "" }} alert={alert} />}

                    <div className="flex w-5/6 flex-col my-1">
                        <label htmlFor="name" className="text-base p-1">Name</label>
                        <input type="text" name="name" id="name" className={`h-9 rounded-md p-2 border-2 focus:border-teal-500 focus:border-2 ${errors.name ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("name", { required: "Enter your Full Name" })} />
                        {errors.name && (<Validation value={{ text: errors.name.message, component: "validation" }} />)}
                    </div>

                    <div className="flex w-5/6 flex-col my-1">
                        <label htmlFor="email" className="text-base p-1">Email</label>
                        <input type="email" name="email" id="email" className={`h-9 rounded-md p-2 border-2 ${errors.email ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("email", { required: "Enter your Email", pattern: { value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, message: "Enter a valid Email", }, })} />
                        {errors.email && (<Validation value={{ text: errors.email.message, component: "validation" }} />)}
                    </div>

                    <div className="flex w-5/6 flex-col my-1">
                        <label htmlFor="dob" className="text-base p-1"> Date of Birth </label>
                        <input type="date" name="dob" id="dob" className={`h-9 rounded-md p-2 border-2 ${errors.dob ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("dob", { required: "Enter your Date of Birth" }, { valueAsDate: true })} />
                        {errors.dob && (<Validation value={{ text: errors.dob.message, component: "validation" }} />)}
                    </div>

                    <div className="flex w-5/6 flex-col my-1">
                        <label htmlFor="phoneNumber" className="text-base p-1"> Phone Number</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" maxLength={10} className={`h-9 rounded-md p-2 border-2 [&::-webkit-inner-spin-button]:appearance-none ${errors.phoneNumber ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("phoneNumber", { required: "Enter your Phone Number", maxLength: { value: 10, message: "Phone Number must be at 10 digits", }, pattern: { value: /^[0-9]*$/, message: "Only numbers are allowed" } })} />
                        {errors.phoneNumber && (<Validation value={{ text: errors.phoneNumber.message, component: "validation" }} />)}
                    </div>

                    <div className="flex w-5/6 flex-col my-1">
                        <label htmlFor="profilePicture" className="text-base p-1">Profile Picture</label>
                        <input type="file" name="profilePicture" id="profilePicture" className={`h-10 p-1 rounded-md border-2  ${errors.profilePicture ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("profilePicture", {
                                required: "Upload your Profile Picture", validate: {type: (file) => ['image/jpeg', 'image/png'].includes(file[0]?.type) || 'Only JPEG and PNG files are allowed'
                                }
                            })} />
                        {errors.profilePicture && (<Validation value={{ text: errors.profilePicture.message, component: "validation" }} />)}
                    </div>

                    <div className="flex w-5/6 flex-col my-1">
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

                    <div className="flex w-5/6 flex-col my-1">
                        <label htmlFor="password" className="text-base p-1">Password</label>
                        <input type="password" name="password" id="password" className={`h-9 rounded-md p-2 border-2 ${errors.password ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("password", { required: "Enter your Password", minLength: { value: 8, message: "Password must be at least 8 characters long.", }, })} />
                        {errors.password && (<Validation value={{ text: errors.password.message, component: "validation" }} />)}
                    </div>

                    <div className="flex w-5/6 flex-col my-1">
                        <label htmlFor="confirmPassword" className="text-base p-1"> Confirm Password </label>
                        <input type="password" name="confirmPassword" id="confirmPassword" className={`h-9 rounded-md p-2 border-2 ${errors.confirmPassword ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("confirmPassword", { required: "Confirm your Password", validate: (value) => value === password || "Passwords don't match!", })} />
                        {errors.confirmPassword && (<Validation value={{ text: errors.confirmPassword.message, component: "validation", }} />)}
                    </div>

                    <button type="submit" className="bg-blue-400 p-2 rounded-lg w-5/6 font-medium text-xl my-5 text-white hover:bg-blue-500 transition duration-300" > Register </button>
                </form>
            </div>
        </>


    )

}