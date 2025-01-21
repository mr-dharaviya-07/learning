/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Form } from "./form";
import { useNavigate } from "react-router-dom";


export const ShowProfile = () => {

    const userId = localStorage.getItem("userId");

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        profilePicture: '',
    });

    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            logout()
        }
        fetchData(userId);
    }, [userId]);

    const fetchData = async (userId) => {

        try {
            const res = await fetch(`http://localhost:4000/get-profile/${userId}`);

            const userData = await res.json();
            setProfile({
                name: userData.name,
                email: userData.email,
                dob: userData.formatted_dob,
                gender: userData.gender,
                phoneNumber: userData.phone_number,
                profilePicture: `${userData.profile_picture}`,
            });

            // console.log(userData.dob.toLocaleDateString());
        }
        catch (error) {
            console.log(error);
            // setResponseError(error);
        }

    }

    const showFrom = () => {
        setShow(true);
    }

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <>
            <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
                <div className=" bg-white h-96 w-96 m-3 flex flex-col justify-around items-center p-2 rounded-lg shadow-2xl">
                    <div className="flex">
                    <img src={`http://localhost:4000/uploads/${profile.profilePicture}`} alt="Profile" className="w-20 aspect-square object-cover object-top rounded-full "  />
                    </div>
                    <div className="flex text-lg ">
                        <div className="m-1 font-medium">Name :</div>
                        <div className="m-1">{profile.name}</div>
                    </div>
                    <div className="flex text-lg ">
                        <div className="m-1 font-medium">Email :</div>
                        <div className="m-1">{profile.email}</div>
                    </div>
                    <div className="flex text-lg ">
                        <div className="m-1 font-medium">Phone Number :</div>
                        <div className="m-1">{profile.phoneNumber}</div>
                    </div>
                    <div className="flex text-lg ">
                        <div className="m-1 font-medium">Gender :</div>
                        <div className="m-1">{profile.gender}</div>
                    </div>
                    <div className="flex text-lg ">
                        <div className="m-1 font-medium">Date of Brith :</div>
                        <div className="m-1">{profile.dob}</div>
                    </div>


                    <div>
                        <button onClick={showFrom} className="bg-blue-500 p-2 m-2 rounded text-lg text-white">Edit Profile</button>
                        <button onClick={logout} className="bg-blue-500 p-2 m-2 rounded text-lg text-white">Log out</button>

                    </div>
                </div>
            </div >

            {show && <Form data={profile} />}
        </>
    )
}