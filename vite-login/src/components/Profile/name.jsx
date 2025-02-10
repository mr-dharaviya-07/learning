/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


import { useContext, useEffect, useState } from "react";
import { useGetOne } from "../../hooks/useGetOne";
import { ProfileContext } from "../Context/profileContext";

export const Name = () => {

    const { profileData } = useContext(ProfileContext);


    return (
        <>
            <div className=" flex flex-col justify-center items-center" style={{ height: "366px" }}>
                <div className="h-72 w-96 flex flex-col justify-around items-center rounded">
                    <h1 className="text-blue-600 text-5xl">
                        Welcome, {profileData ? profileData.name : "Guest"}
                    </h1>
                </div>
            </div>
        </>
    )
} 