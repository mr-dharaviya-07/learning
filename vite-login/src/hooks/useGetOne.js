import { useQuery } from "@tanstack/react-query";

export const useGetOne = (url, id) => {

    const query = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`${url}/${id}`)

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error);
            }

            return await res.json()
        }
    })
    return query
}