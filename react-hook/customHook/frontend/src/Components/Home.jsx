import { useGetAllUser } from "../hook/useGetAllUser"


export const Home = () => {


    const userData = useGetAllUser('http://localhost:4000/user');

    return (
        <>
            <div className="h-screen w-full bg-gray-500">
                {userData.isSuccess && userData.data.map((user) => {
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