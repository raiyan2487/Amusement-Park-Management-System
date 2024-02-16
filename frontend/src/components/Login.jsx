import React, { useState } from "react";

const Login = (props) => {
    const [userID, setID] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let data = await fetch('http://localhost:4000/login', {
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
        document.cookie = `token=${data.token}`

        window.location.href = 'http://localhost:3000/'
    }
    
    return (
        <div className="absolute flex flex-col items-center bg-red-400 px-12 py-24 rounded-2xl box-shadow-special">
            <h1 className="font-bold text-4xl relative bottom-7">Login</h1>

            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="flex w-auto justify-between items-center gap-6">
                    <label className="py-1 px-0 font-bold" htmlFor="userID">USER's ID</label>
                    <input className="my-2 mx-0 p-4 border-0 rounded-2xl font-bold" value={userID} onChange={(e) => setID(e.target.value)}type="text" placeholder="your userID" id="email" name="email" />
                </div>
    
                <div className="flex w-auto justify-between items-center gap-6">
                    <label className="font-bold py-1 px-0" htmlFor="password">Password</label>
                    <input className="font-bold my-2 mx-0 p-4 border-0 rounded-2xl" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                </div>

                <div className="w-full border border-y-red-800 my-4"></div>

                <button className="font-bold relative top-2 border-none bg-white px-5 py-4 rounded-lg cursor-pointer text-purple-600" type="submit">Log In</button>
            </form>
            <button className="relative top-8 bg-transparent text-white underline " onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}

export default Login;