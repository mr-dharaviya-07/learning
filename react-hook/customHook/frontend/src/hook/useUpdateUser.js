


export const useUpdateUser = async ({ url, id, data }) => {

    const res = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await res.json()

}