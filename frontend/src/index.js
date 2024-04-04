import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'

import UserProfile from './pages/UserProfile.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import BanUser from './pages/AdminBanUser.jsx'
import UserLogin from './pages/UserLogin.jsx'
import AdminHome from './pages/AdminHome.jsx'
import Packages from './pages/Packages.jsx'
import Review from './pages/Review.jsx'
import Rides from './pages/Rides.jsx'
import Home from './pages/Home.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/rides" element={<Rides />} />
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/login" element={<AdminLogin />} /> 
                <Route path="/admin/ban-user" element={<BanUser />} />
                <Route path="/reviews" element={<Review />} />
                <Route path="/packages" element={<Packages />} />
            </Routes>
        </BrowserRouter> 
    </React.StrictMode>
)
