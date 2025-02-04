
import { useMutation } from "@tanstack/react-query";


export const useInsert = (url) => {

    const mutation = useMutation({
        mutationFn: async (data) => {

            let res;
            try {
                res = await fetch(url, {
                    method: "POST",
                    body: data
                });
            } catch {
                throw new Error("Server Error");
            }

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error);
            }
            else {
                const userData = await res.json();
                localStorage.setItem('id', userData.id);
                return userData;
            }

        },
    });

    return mutation;
}

