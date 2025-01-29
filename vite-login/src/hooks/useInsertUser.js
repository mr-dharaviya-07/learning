
import { useMutation } from "@tanstack/react-query";


export const useInsertUser = (url) => {

    const mutation = useMutation({
        mutationKey: ['InsertUser'],
        mutationFn: async (data) => {
            const res = await fetch(url, {
                method: "POST",
                body: data
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error);
            }

            return await res.json();
        },
    });

    return mutation;
}

