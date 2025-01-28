import { useMutation } from "react-query";



export const useUpdateUser = (url, id) => {

    const mutation = useMutation({

        mutationKey: ['UserUpdate'],
        mutationFn: async (data) => {

            const res = await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            return await res.json()
        }
    })
    return mutation;

}