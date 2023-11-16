import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [userID, setID] = useState('');
    const [pass, setPass] = useState('');
    const [con_pass, setConPass] = useState('');
    const [name, setName] = useState('');
    const [phone, setTel] = useState('');
    const [userId, setUserId] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = await fetch('http://localhost:4000/signup', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: pass,
                Number: phone,
                userid: userId,
                passwordConfirm: con_pass
            }),
            
            headers: {
                "Content-Type": "application/json"
            }
        }).catch((err) => console.log(err))
        console.log(data)
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>

            <label htmlFor="userid">User ID</label>
            <input value={userId} name="userId" onChange={(e) => setUserId(e.target.value)} id="userId" placeholder="Your ID" />
            
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Your Name" />
               
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            
            <label htmlFor="userID">userID</label>
            <input value={userID} onChange={(e) => setID(e.target.value)}type="text" placeholder="your userID" id="email" name="email" />
             
            <label htmlFor="phone">Phone Number</label>
            <input value={phone} name="phone" onChange={(e) => setTel(e.target.value)} type="tel" placeholder="01x xxxx xxxx" />
            
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            
            <label htmlFor="password">Confirm Password</label>
            <input value={con_pass} onChange={(e) => setConPass(e.target.value)} type="password" placeholder="********" id="password" name="conPassword" />
            

            <button type="submit">Register</button>
        
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}