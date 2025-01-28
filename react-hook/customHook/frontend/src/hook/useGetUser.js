

// import { useEffect, useState } from "react";

// export const useGetUser = (url,id) => {
//     const [userData, setuserData] = useState({})

//     useEffect(()=>{
//         const fetchData = async () => {
//             try {
//                 const res = await fetch(`${url}/${id}`);
//                 const result = await res.json();
//                 setuserData(result);
//                 // console.log(result)
//             } catch (err) {
//                 console.error("Fetch error:", err);
//             }
//         }
//         fetchData();
//     },[]);


//     return userData;
// };



export const useGetUser = async ({queryKey}) => {
   const [id,url] = queryKey;

    const response = await fetch(`${url}/${id}`);
    return await response.json();
};





