/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


export const Response = ({value,alert = false}) =>{

    return(
        <>
        <div className="absolute right-0 bottom-28 bot h-1/4 w-1/4 flex justify-end items-end overflow-hidden ">
        <div className={`absolute right-10 w-80 h-14 text-white flex justify-center items-center text-xl py-2 rounded-lg shadow-lg transition-opacity duration-2000 ease-in-out ${value.response == "error" ? "bg-red-500" : "bg-green-500"} ${alert ? "opacity-100" : "opacity-0" }`}>{value.text}</div>
        </div>
        </>
    )
 

}