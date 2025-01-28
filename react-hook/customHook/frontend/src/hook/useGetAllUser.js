

export const useGetAllUser = async ({queryKey}) => {

    const [url] = queryKey;
    const res = await fetch(url);
    return await res.json();
}