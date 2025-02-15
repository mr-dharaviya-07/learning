/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import { ProfileContext } from "../../Context/profileContext";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useCount } from "../../../hooks/useCount";

export const Dashboard = () => {
    const { profileData } = useContext(ProfileContext);

    console.log(profileData);
    const bookCount = useCount('http://localhost:4000/book-count');
    const authorCount = useCount('http://localhost:4000/author-count');
 
    return (
        <>
            <div className=" flex flex-col justify-center items-center" style={{ height: "466px" }}>
                <div className="h-72 w-96 flex flex-col justify-around items-center rounded">
                    <h1 className="text-blue-600 text-5xl">
                        Welcome, {profileData ? profileData.name : "Guest"}
                    </h1>
                    <Box sx={{ display: "flex", width: 650, gap: 5 , flexWrap:"wrap",  justifyContent: "center", alignItems: "center"}}>
                        <Card sx={{ width: 275, background: "#001f3f", color: "white" }}>
                            <CardContent sx={{ display: "flex", gap: 3, justifyContent: "center", alignItems: "center", padding: "25px" }}>
                                <Typography sx={{ fontSize: 25 }}>
                                    Book :
                                </Typography>
                                <Typography sx={{ fontSize: 25 }}>
                                    {bookCount?.data && bookCount.data.count}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ width: 275, background: "#001f3f", color: "white" }}>
                            <CardContent sx={{ display: "flex", gap: 3, justifyContent: "center", alignItems: "center", padding: "25px" }}>
                                <Typography sx={{ fontSize: 25 }}>
                                    Author :
                                </Typography>
                                <Typography sx={{ fontSize: 25 }}>
                                    {authorCount?.data && authorCount.data.count}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </div>
            </div>
        </>
    )
} 