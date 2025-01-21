/* eslint-disable react/prop-types */


export const Validation = ({ value }) => {
    return (
        <>
            {(value.component == "response") ? <div className="bg-red-500 text-white m-0 p-2 rounded transition-opacity duration-0">{value.text}</div>
                : <div className=" text-red-500 transition ease-in text-base">{value.text}</div>}
        </>
    )
}
