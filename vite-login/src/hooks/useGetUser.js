import { useQuery } from "@tanstack/react-query";

export const useGetUser = (url,id) => {

    const query = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`${url}/${id}`)
            return await res.json()
        }
    })
    return query
}