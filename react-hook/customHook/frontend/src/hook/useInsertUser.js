import { useMutation } from "react-query";


export const useInsertUser = (url) => {

    const mutation = useMutation({
        mutationKey: ['InsertUser'],
        mutationFn: async (data) => {
            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                return await res.json();

            } catch (err) {
                return await err
            }
        }
    });

    return  mutation ;
}



// export const useInsertUser = async ({url , data}) => {

//     const res = await fetch("url", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify("data")
//     })


//     return await res.json();
// }