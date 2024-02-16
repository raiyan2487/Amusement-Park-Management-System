import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'

import UserProfile from './pages/UserProfile.jsx'
import UserLogin from './pages/UserLogin.jsx'
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
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)