
import { useMutation } from "@tanstack/react-query";

export const useLogin = (url) => {

    const mutation = useMutation({
        mutationKey: ['Login'],
        mutationFn: async (data) => {
            let res;
            try{
                res = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }catch{
                throw new Error("Server Error");
            }

            
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error);
            }
            else {
                const userData = await res.json();
                localStorage.setItem('id', userData.id);

                return userData
            }

        },
    });

    return mutation;
}

