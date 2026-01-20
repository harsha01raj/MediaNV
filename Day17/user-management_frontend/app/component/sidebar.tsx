export default function Sidebar() {
    const user = {
        name: "harsh",
        email: "a@gmail.com",
        role: "user"
    }
    const userInitial = user?.name?.[0].toUpperCase() || user?.email?.[0].toUpperCase() || "";
    return (
        <div className="w-[15vw] bg-white z-500 border border-teal-300 h-screen shadow-2 shadow-2xs ">
            <div className="w-full h-25 border-b border-teal-300 p-5">
                <h1 className="font-bold text-xl">User Management</h1>
                <p className="text-teal-700">Admin Portal</p>
            </div>
            <div className="h-25 border-b border-teal-300">
                <div className="flex gap-4 items-center p-5">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                        {userInitial}
                    </div>
                    <div className="leading-[1.2]">
                        <h1 className="font-semibold">{user.name}</h1>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className="border w-fit pl-4 pr-4 pt-0.2 pb-0.2 text-blue-800 bg-blue-200 rounded-3xl font-semibold ml-5 ">{user.role}</div>
            </div>


        </div>
    )
}