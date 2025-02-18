/* eslint-disable react-hooks/exhaustive-deps */
import { DashboardLayout, PageContainer } from "@toolpad/core"
import { Outlet, useNavigate } from "react-router-dom"
import { UserMenu } from "./Footer/UserMenu"
import { useEffect, useState } from "react";
import { useGetOne } from "../../hooks/useGetOne";
import { ProfileContext } from "../Context/profileContext";



export const Layout = () => {


    let userId = localStorage.getItem("id");
    const [isLoggedIn, setIsLoggedIn] = useState(userId);


    const profileData = useGetOne('http://localhost:4000/get-profile', userId)
    
    const data = profileData?.data;
    

    console.log(data);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        userId = null
        setIsLoggedIn(false);
    };

    const login = () => {
        navigate("/");
    };

    useEffect(() => {
        if (!userId) {
            logout();
        }
    }, []);


    function showProfile() {
        navigate("showProfile");
    }


    return (<>
        {
            <ProfileContext.Provider value={{ profileData: data }}>
                <DashboardLayout slots={{
                    appTitle: () => null,
                    sidebarFooter: () => (
                        <UserMenu
                            showProfile={showProfile}
                            isLoggedIn={isLoggedIn}
                            onLogout={logout}
                            onLogin={login}
                        />
                    ),
                }}
                >
                    <PageContainer>
                        <Outlet />
                    </PageContainer>
                </DashboardLayout>
            </ProfileContext.Provider>

        }
    </>
    )
}