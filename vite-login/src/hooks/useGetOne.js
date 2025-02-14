import { useQuery } from "@tanstack/react-query";

export const useGetOne = (url,userId) => {

    const query = useQuery({
        queryKey: [userId],
        queryFn: async () => {
            const res = userId ? await fetch(`${url}/${userId}`) : Promise.resolve(null)
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error);
            }

            return await res.json()
        }
    })
    return query
}