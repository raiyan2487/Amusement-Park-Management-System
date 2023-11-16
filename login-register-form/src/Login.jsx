import React, { useState } from "react";

export const Login = (props) => {
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
        document.cookie = `token=${data.jwt}`
    }
    
    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                
                <label htmlFor="userID">userID</label>
                <input value={userID} onChange={(e) => setID(e.target.value)}type="text" placeholder="your userID" id="email" name="email" />
                
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                
                <button type="submit">Log In</button>
            
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}