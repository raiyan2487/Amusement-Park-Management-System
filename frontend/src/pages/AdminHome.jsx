import { Link } from "react-router-dom";
import Header from "../components/AdminHeader";

const AdminHome = () => {
    return (
        <>
        <Header />
            <div className="flex justify-center items-center flex-row w-full flex-wrap">
                <div className="flex justify-around flex-col items-center text-center p-4 border border-white rounded-lg m-4 bg-cyan-500 h-1/3 w-1/2">
                    <h1 className="text-4xl font-bold">Packages</h1>
                    <div className="space-x-4 m-5">
                        <button className="bg-white px-5 py-4 rounded-lg">
                            <Link className="font-bold" to="/add-package">Add</Link>
                        </button>

                        <button className="bg-white px-5 py-4 rounded-lg">
                            <Link className="font-bold" to="/view-packages">View</Link>
                        </button>
                    </div>
                </div>

                <div className="flex justify-around flex-col items-center text-center p-2 border border-white rounded-lg m-4 bg-cyan-500 h-1/3 w-1/2">
                    <h1 className="text-4xl font-bold">Rides</h1>
                    <div className="space-x-4 m-5">
                        <button className="bg-white px-5 py-4 rounded-lg">
                            <Link className="font-bold" to="/add-ride">Add</Link>
                        </button>

                        <button className="bg-white px-5 py-4 rounded-lg">
                            <Link className="font-bold" to="/delete-ride">Delete</Link>
                        </button>
                    </div>
                </div>

                <div className="flex justify-around flex-col items-center text-center p-2 border border-white rounded-lg m-4 bg-cyan-500 h-1/3 w-1/2">
                    <h1 className="text-4xl font-bold">Ban user</h1>
                    <div className="m-5">
                        <button className="bg-white px-5 py-4 rounded-lg">
                            <Link className="font-bold" to="/admin/ban-user">Ban</Link>
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default AdminHome;