import imagination from "../images/imagination.png"
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <nav id="header" className="bg-black text-white">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">

                <div className="logo-wrapper pl-4 flex items-center">
                    <Link to="/" className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
                        <img src={imagination} alt="logo" className="relative top-1.5 w-40 h-20 object-cover"/>
                    </Link>
                </div>

                <div className="flex items-center justify-center space-x-4">
                    <Link className="font-bold text-sm" to="/">Home</Link>
                    <Link className="font-bold text-sm" to="/Rides">Rides</Link>
                    <Link className="font-bold text-sm" to="/packages">Packages</Link>
                    <Link className="font-bold text-sm" to="/custom-package">Custom Package</Link>
                    <Link className="font-bold text-sm" to="/reviews">Reviews</Link>
                    <Link className="font-bold text-sm" to="/user-profile">User Profile</Link>

                    {(document.cookie == "token=0" || document.cookie == "" || document.cookie == undefined) ? 
                        <Link className="font-bold text-sm" to="/login">Login</Link> :
                        <div className="font-bold text-sm" style={{ cursor: "pointer" }} onClick={() => {
                            document.cookie = 'token=0'
                            window.location.href = 'http://localhost:3000/login'
                        }}>Sign Out</div>
                    }
                    <p>&nbsp;&nbsp;</p>
                </div>

            </div>
        </nav>
    )
}

export default Header;