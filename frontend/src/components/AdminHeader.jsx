import imagination from '../images/imagination.png'
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <nav id="header" className="bg-black text-white">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">

                <div className="logo-wrapper pl-4 flex items-center">
                    <Link to="/admin" className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
                        <img src={imagination} alt="logo" className="top-1.5 relative w-40 h-20 object-cover"/>
                    </Link>
                </div>

                <div className="flex items-center justify-center space-x-5">
                    <Link className="font-bold" to="/admin/balance-sheet">Balance Sheet</Link>
                    <p className="font-bold" style={{ cursor: 'pointer' }} onClick={() => {
                        localStorage.setItem('admin-token', '')
                        window.location.href = 'http://localhost:3000/admin'
                    }}>Sign Out</p>
                </div>

            </div>
        </nav>
    )
}

export default Header;