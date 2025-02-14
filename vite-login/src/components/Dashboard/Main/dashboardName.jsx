import { useContext} from "react";
import { ProfileContext } from "../../Context/profileContext";

export const DashboardName = () => {
    const { profileData } = useContext(ProfileContext);
    return (
        <>
            <div className=" flex flex-col justify-center items-center" style={{ height: "466px" }}>
                <div className="h-72 w-96 flex flex-col justify-around items-center rounded">
                    <h1 className="text-blue-600 text-5xl">
                        Welcome, {profileData ? profileData.name : "Guest"}
                    </h1>
                </div>
            </div>
        </>
    )
} 