import React, { useState } from "react";
import background from "../images/adminbackground.gif";

const AdminLogin = (props) => {
    const [userID, setID] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let data = await fetch('http://localhost:4000/admin-login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                credentials: "include"
            },
            body: JSON.stringify({
                userid: userID,
                password: pass
            })
        })

        data = await data.json()
        console.log(data)
        localStorage.setItem('admin-token', data.token)

        window.location.href = 'http://localhost:3000/admin'
    }
    
    return (
        <div className="h-screen flex items-center justify-center text-gray-900 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
        <div className="text-center flex min-h-screen items-center justify-center text-gray-900 bg-cover bg-rgb-203-167-181">
          
        <div className="absolute flex flex-col items-center bg-cyan-500 px-12 py-24 rounded-2xl box-shadow-special">
            <h1 className="font-bold text-4xl relative bottom-7">Admin Login</h1>

            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="flex w-auto justify-between items-center gap-6">
                    <label className="py-1 px-0 font-bold" htmlFor="userID">Admin ID</label>
                    <input className="my-2 mx-0 p-4 border-0 rounded-2xl font-bold" value={userID} onChange={(e) => setID(e.target.value)}type="text" placeholder="Admin ID" id="email" name="email" />
                </div>
    
                <div className="flex w-auto justify-between items-center gap-6">
                    <label className="font-bold py-1 px-0" htmlFor="password">Password</label>
                    <input className="font-bold my-2 mx-0 p-4 border-0 rounded-2xl" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                </div>

                <div className="w-full border border-y-cyan-800 my-4"></div>

                <button className="font-bold relative top-2 border-none bg-white px-5 py-4 rounded-lg cursor-pointer" type="submit">Log In</button>
            </form>
        </div>
        </div>
        </div>
    )
}

export default AdminLogin;