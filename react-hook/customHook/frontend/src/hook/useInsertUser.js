// import { useEffect, useState } from "react";


// export const useInsertUser = (url) => {


//     const [response, setResponse] = useState({})

//     const InsertData = async (userData) => {
//         try {
//             const res = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(userData)
//             });

//             const result = await res.json();
//             setResponse(result)

//         } catch (err) {
//             setResponse(err);
//         }
//     };


//     return { response, InsertData };
// }



export const useInsertUser = async ({ url, data }) => {

    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return await res.json();
}
