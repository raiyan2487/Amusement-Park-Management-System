import React, { useState } from "react";

export const Login = (props) => {
    const [email, setID] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }
    
    return (
        <div className="auth-form-container">
            <h2>Admin Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setID(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                
                <button type="submit">Log In</button>
            
            </form>
        </div>
    )
}