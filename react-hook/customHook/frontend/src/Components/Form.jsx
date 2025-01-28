/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form"
import { useUpdateUser } from "../hook/useUpdateUser";
import { useMutation } from "react-query";

export const Form = ({ data }) => {


    const id = data.id;
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: data.userName,
            email: data.email,
        }
    })

    const mutation = useMutation(useUpdateUser)
    // const { response, updateData } = useUpdateUser(`http://localhost:4000/update/${id}`)

    const onSubmit = (data) => {

        mutation.mutate({ url: 'http://localhost:4000/update', id: id, data: data }, {

            onSuccess: (response) => {
                console.log('update successful:', response.success);
            },
            onError: (error) => {
                console.error('update failed:', error.message);
            },
        }
        );

    };



    return (
        <>
            <div className="fixed top-0 h-screen w-screen bg-black text-white opacity-30"></div>

            <div className="fixed top-0 h-screen w-screen flex flex-col justify-center items-center">


                <form onSubmit={handleSubmit(onSubmit)} method="post" className=" m-2 w-96 rounded-lg bg-white flex flex-col justify-center items-center shadow-2xl" >

                    <h1 className="relative top-4 text-blue-600 font-semibold m-2" style={{ fontSize: "30px" }}>Update Your Profile</h1>

                    {/* {responseError ? <Response value={{ text: responseError, response: "error" }} alert={alert} /> : <Response value={{ text: response, response: "" }} alert={alert} />} */}

                    <div className="flex w-5/6 flex-col m-3">
                        <label htmlFor="name" className="text-base p-1">Name</label>
                        <input type="text" name="name" id="name" className={`h-9 rounded-md p-2 border-2 focus:border-teal-500 focus:border-2 ${errors.name ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("name", { required: "Enter your Name" })} />
                        {/* {errors.name && (<Validation value={{ text: errors.name.message, component: "validation" }} />)} */}
                    </div>

                    <button type="submit" className=" w-5/6 bg-green-400 p-2 rounded-lg self-center font-medium text-xl text-white hover:bg-green-500 transition duration-300 m-5">   {mutation.isLoading ? 'Updating...' : 'Update User'} </button>
                </form>
            </div>
        </>

    )
}