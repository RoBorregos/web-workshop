import Link from "next/link";

export  function NavBar(){
    return (
        <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
            <Link href="/task" className="text-lg font-sembibold text-hover:text-blue-300 hover:scale-110 duration-300 ">
                Tasks
            </Link>
        </nav>
    )
}