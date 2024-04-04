import imagination from "../images/imagination.png"
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <nav id="header" className="bg-black text-white">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">

                <div className="logo-wrapper pl-4 flex items-center">
                    <Link to="/" className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
                        <img src={imagination} alt="logo" className="w-40 h-20 object-cover"/>
                    </Link>
                </div>

                <div className="flex items-center justify-center space-x-4">
                    <Link className="font-bold" to="/">Home</Link>
                    <Link className="font-bold" to="/Rides">Rides</Link>
                    <Link className="font-bold" to="/user-profile">User Profile</Link>
                    <Link className="font-bold" to="/reviews">Reviews</Link>

                    <div className="font-bold" style={{ cursor: "pointer" }} onClick={() => {
                        document.cookie = 'token=0'
                        window.location.href = 'http://localhost:3000/login'
                    }}>Sign Out</div>
                    
                    <p>&nbsp;&nbsp;</p>
                </div>

            </div>
        </nav>
    )
}

export default Header;