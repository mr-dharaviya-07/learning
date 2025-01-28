import { useMutation, useQuery } from "react-query";

export const useGetUser = (url,id) => {

    // // console.log(url);
    // const mutation = useMutation({
    //     mutationKey: ['GetUser'],
    //     mutationFn: async (id) => {
    //         // console.log(id);
    //         const res = await fetch(`${url}/${id}`);
    //         return await res.json();
    //     }
    // })
    // return mutation

    const query = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`${url}/${id}`)
            return await res.json()
        }
    })
    return query
}





