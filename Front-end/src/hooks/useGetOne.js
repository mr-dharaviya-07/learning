import { useQuery } from "@tanstack/react-query";

export const useGetOne = (url,userId) => {

    const query = useQuery({
        queryKey: userId ? [userId] : [url],
        queryFn: async () => {
            if (!userId) return null;

            const res = await fetch(`${url}/${userId}`);
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error);
            }

            return await res.json()
        }
    })
    return query
}