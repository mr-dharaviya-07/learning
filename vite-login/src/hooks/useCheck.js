
import { useMutation } from "@tanstack/react-query";


export const useCheck = (url) => {

    const mutation = useMutation({
        mutationKey: ['InsertUser'],
        mutationFn: async (data) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
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

