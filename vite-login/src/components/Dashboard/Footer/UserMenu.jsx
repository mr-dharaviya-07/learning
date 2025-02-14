/* eslint-disable react/prop-types */
import { faArrowRightFromBracket, faArrowRightToBracket, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UserMenu = ({ showProfile, isLoggedIn = true, onLogout, onLogin }) => {
    return (
        <div className="flex flex-col items-center justify-center px-2 py-2 border-t border-gray-700 overflow-hidden">
            <button onClick={showProfile} title="Profile" className="flex items-center gap-5 w-full px-4 py-3 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"> 
                <FontAwesomeIcon icon={faUserAlt} style={{ color: "white", width: "18px", height: "18px" }} /> <span>Profile</span>
            </button>

            {isLoggedIn ? (<button onClick={onLogout} title="Logout" className="flex items-center gap-5 w-full mt-3 px-4 py-3 rounded-md bg-gray-800 text-white hover:bg-red-500 transition">
                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "white", width: "18px", height: "18px" }} /><span>Logout</span> 
                </button>)
                : (<button onClick={onLogin} title="Login" className="flex items-center gap-5 text-left w-full mt-3 px-4 py-3 rounded-md bg-gray-800 text-white hover:bg-blue-500 transition">
                <FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: "white", width: "18px", height: "18px" }} /><span>Login</span> 
                </button>
                )}
        </div>
    );
};
