import {useMutation, useQuery} from "react-query";

export const useGetAllUser = (url) => {

    // const mutation = useMutation({
    //     mutationKey: ['GetAllUser'],
    //     mutationFn: async () => {
    //         const res = await fetch(url);
    //         // console.log(await res.json());
    //         return await res.json();
    //     }
    // })
    // return mutation

       const query = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(url)
            return await res.json()
        }
    })
    return query

}
