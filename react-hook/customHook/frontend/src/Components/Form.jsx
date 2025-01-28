/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form"
import { useUpdateUser } from "../hook/useUpdateUser";

export const Form = ({ data }) => {

    const id = data.id;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: data.userName,
            email: data.email,
        }
    })

    const mutation = useUpdateUser('http://localhost:4000/update', id)

    const onSubmit = (data) => {
        mutation.mutate(data);

        console.log(mutation.data.success);
    };


    return (
        <>
            <div className="fixed top-0 h-screen w-screen bg-black text-white opacity-30"></div>

            <div className="fixed top-0 h-screen w-screen flex flex-col justify-center items-center">


                <form onSubmit={handleSubmit(onSubmit)} method="post" className=" m-2 w-96 rounded-lg bg-white flex flex-col justify-center items-center shadow-2xl" >

                    {mutation.isSuccess && <p className="p-2 m-2 text-green-600">{mutation.data.success}</p>}

                    <h1 className="relative top-4 text-blue-600 font-semibold m-2" style={{ fontSize: "30px" }}>Update Your Profile</h1>


                    <div className="flex w-5/6 flex-col m-3">
                        <label htmlFor="name" className="text-base p-1">Name</label>
                        <input type="text" name="name" id="name" className={`h-9 rounded-md p-2 border-2 focus:border-teal-500 focus:border-2 ${errors.name ? "border-rose-500 focus:outline-red-500" : "border-black focus:outline-black"}`}
                            {...register("name", { required: "Enter your Name" })} />
                    </div>

                    <button type="submit" className=" w-5/6 bg-green-400 p-2 rounded-lg self-center font-medium text-xl text-white hover:bg-green-500 transition duration-300 m-5">  Update User </button>
                </form>
            </div>
        </>

    )
}