
import { useMutation } from "@tanstack/react-query";


export const useUpdate = (url, id) => {

    const mutation = useMutation({
        mutationFn: async (data) => {
            const res = await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error);
            }

            return await res.json()
        }
    })
    return mutation;

}
