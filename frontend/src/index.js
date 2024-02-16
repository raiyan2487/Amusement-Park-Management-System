import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'

import Home from './pages/Home.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
