import { Outlet} from "react-router-dom";
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { createTheme } from "@mui/material";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Dashboard } from "@mui/icons-material";



const customTheme = createTheme({
    components: {
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "white",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#001f3f",
                    color: "001f3f",
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#001f3f",
                    color: "white",
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    "&.Mui-selected": {
                        backgroundColor: "#ffffff",
                        color: "black",
                        "&:hover": {
                            backgroundColor: "#ffffff",
                        },

                        "& .MuiSvgIcon-root": {
                            color: "rgb(21, 101, 192) !important",
                        },
                    },
                    "&:hover": {
                        backgroundColor: "#0074cc",
                    },
                    "& .MuiSvgIcon-root": {
                        color: "white !important",
                    },
                },
            },
        },
    }   
});


export const Profile = () => {

    const NAVIGATION = [
        {
            title: "Dashboard",
            segment: 'profile',
            icon: <Dashboard />
        },
        {
            segment: 'profile/books',
            title: 'Books',
            icon: <LibraryBooksIcon />,
        },
        {
            segment: 'profile/authors',
            title: 'Authores',
            icon: <PermIdentityIcon />,
        }
    ]


    return (
        <>

            <ReactRouterAppProvider theme={customTheme} navigation={NAVIGATION}>
                <Outlet />
            </ReactRouterAppProvider>
        </>
    );
}

