/* eslint-disable react/prop-types */
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = ({ showProfile, isLoggedIn = true, onLogout, onLogin }) => {
    return (
        <div className="flex flex-col items-center justify-center p-2 border-t border-gray-700">
            <button
                onClick={showProfile}
                title="Profile"
                className="flex items-center gap-3 w-full px-4 py-3 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
            >
                <FontAwesomeIcon icon={faUserAlt} style={{ color: "white", width: "20px", height: "20px" }} />
                <span>Profile</span>
            </button>

            {isLoggedIn ? (
                <button
                    onClick={onLogout}
                    title="Logout"
                    className="w-full mt-3 px-4 py-3 rounded-md bg-red-600 text-white hover:bg-red-500 transition"
                >
                    Logout
                </button>
            ) : (
                <button
                    onClick={onLogin}
                    title="Login"
                    className="w-full mt-3 px-4 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition">Login
                </button>
            )}
        </div>
    );
};
