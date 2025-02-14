
/* eslint-disable react/prop-types */


export const Response = ({value,alert = false}) =>{

    return(
        <>
        {/* <div className="absolute bg-black h-1/4 w-1/4 flex justify-center items-center sm:scale-90 "> */}
        <div className={`xl:absolute xl:right-10 xl:z-10 xl:bottom-14 sm:h-10 sm:mt-2 xl:h-14 w-80 text-white flex justify-center items-center text-lg rounded-lg shadow-lg transition-opacity duration-2000 ease-in-out ${value.response == "error" ? "bg-red-500" : "bg-green-500"} ${alert ? "opacity-100" : "opacity-0" }`}>{value.text}</div>
        </>
    )
 

}