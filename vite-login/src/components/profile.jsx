/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Profile = () => {

    const [name, setName] = useState('');
    const [profilePicture, setprofilePicture] = useState('');

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

    useEffect(() => {

        if (!userId) {
            logout();
        }
        fetchData(userId);



    }, [userId]);



    const fetchData = async (userId) => {

        try {
            const res = await fetch(`http://localhost:4000/get-profile/${userId}`);

            const userData = await res.json();

            // console.log(userData)
            setName(userData.name);
            setprofilePicture(`http://localhost:4000/uploads/${userData.profile_picture}`);

        }
        catch (error) {
            console.log(error);
            // setResponseError(error);
        }

    }


    const showProfile = () => {
        navigate("/showProfile")
    }



    return (
        <>
            <nav className="absolute bg-gray-800 w-full h-14 shadow-lg text-white flex justify-center items-center">
                <button onClick={showProfile} title="Profile" className="flex justify-center items-center w-12 h-12  bg-green-500 p-2 rounded-full text-lg text-white absolute right-32">
                    {/* { <img src={`${profilePicture}`} alt="" /> && <FontAwesomeIcon icon={faUserAlt} style={{ color: 'rgb(0, 8, 8)', width: "22px", height: "22px" }} /> } */}
                    <img src={profilePicture} alt="Profile" className=" w-52 scale-150 aspect-square object-cover object-top rounded-full " />
                </button>
                <button onClick={logout} title="Logout" className="flex justify-center items-center w-24 h-12 bg-blue-500 p-2 rounded-xl text-lg text-white absolute right-5">
                    {/* <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: 'rgb(0, 8, 8)', width: "25px", height: "25px" }} /> */} Logout
                </button>
            </nav>
            <div className="bg-white h-screen flex flex-col justify-center items-center">


                <div className=" h-72 w-96 flex flex-col justify-around items-center rounded">
                    <h1 className="text-blue-600 text-5xl">
                        Welcome,  {name} !
                    </h1>

                </div>
            </div>
        </>
    );
}

export default Profile;
