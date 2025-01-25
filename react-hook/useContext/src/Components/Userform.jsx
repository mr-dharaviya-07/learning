
import { Button } from "./Button"

export const Userform = () => {

    return (
        <>
            <div className="flex flex-col w-full h-screen justify-center items-center dark:bg-gray-900">
                <div className=" w-96 h-56 flex justify-center items-center flex-col">
                    <div className=" w-72 flex justify-center items-center">
                        <label htmlFor="" className=" w-20 text-center dark:text-white">Email</label>
                        <input type="text" className="bg-white border-2 border-black m-2 text-black p-2 rounded-xl dark:bg-white" />
                    </div>
                    <div className=" w-72 flex justify-center items-center">
                        <label htmlFor="" className="w-20 text-black dark:text-white">Password</label>
                        <input type="password" className="bg-white border-2 border-black m-2 text-black p-2 rounded-xl dark:bg-white" />
                    </div>
                <Button />
                </div>
            </div>
        </>
    )

}