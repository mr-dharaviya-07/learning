import { useQuery } from "react-query"
import { useGetAllUser } from "../hook/useGetAllUser"


export const Home = () => {


    const { data, isLoading } = useQuery(['http://localhost:4000/user'], useGetAllUser);

    if (isLoading) {
        return null;
    }
    // console.log(data);
    return (
        <>
            <div className="h-screen w-full bg-gray-500">
                {data && data.map((user) => {
                    return (<>
                        <p className="text-white" key={user.id}> Name: {user.name}</p>
                        <p className="text-white" key={user.id}> Email: {user.email}</p>
                        <br />
                    </>)
                })}
            </div>
        </>
    )
}