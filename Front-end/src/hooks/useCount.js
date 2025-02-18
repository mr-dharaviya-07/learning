import { useQuery } from "@tanstack/react-query";

export const useCount = (url) => {

    const query = useQuery({
        queryKey: [url],
        queryFn: async () => {
            const res = await fetch(`${url}`)

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error);
            }

            return await res.json()
        }
    })
    return query
}