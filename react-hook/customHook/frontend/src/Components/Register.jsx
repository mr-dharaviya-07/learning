import { useForm } from "react-hook-form"
import { useInsertUser } from "../hook/useInsertUser";


export const Register = () => {

    const mutation = useInsertUser("http://localhost:4000/insert");

    const {
        register,
        handleSubmit,
    } = useForm()


    const onSubmit = (data) => {
        mutation.mutate(data);

    }


    return (
        <>
            <div className="flex flex-col w-full h-screen justify-center items-center dark:bg-gray-900">

                {mutation.isSuccess && <p className="text-white">{mutation.data.success}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" w-96 h-56 flex justify-center items-center flex-col">
                        <div className=" w-72 flex justify-center items-center">
                            <label htmlFor="" className=" w-20 text-center dark:text-white">Name</label>
                            <input type="text" className="bg-white border-2 border-black m-2 text-black p-2 rounded-xl dark:bg-white"
                                {...register("name")} />
                        </div>
                        <div className=" w-72 flex justify-center items-center">
                            <label htmlFor="" className=" w-20 text-center dark:text-white">Email</label>
                            <input type="text" className="bg-white border-2 border-black m-2 text-black p-2 rounded-xl dark:bg-white"
                                {...register("email")} />
                        </div>
                        <div className=" w-72 flex justify-center items-center">
                            <label htmlFor="" className="w-20 text-black dark:text-white">Password</label>
                            <input type="password" className="bg-white border-2 border-black m-2 text-black p-2 rounded-xl dark:bg-white"
                                {...register("password")} />
                        </div>
                        <button className=" p-2 m-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:cursor-pointer">Submit </button>
                    </div>
                </form>

            </div>
        </>
    )

}