
import { useMutation } from "@tanstack/react-query";


export const useUpdateUser = (url, id) => {

    const mutation = useMutation({

        mutationKey: ['UserUpdate'],
        mutationFn: async (data) => {
            const res = await fetch(`${url}/${id}`, {
                method: "PUT",
                body: data
            });
            return await res.json()
        }
    })
    return mutation;

}
