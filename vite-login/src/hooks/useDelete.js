
import { useMutation } from "@tanstack/react-query";


export const useDelete = (url, id) => {

    
    const mutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`${url}/${id}`, {
                method: "DELETE",
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
