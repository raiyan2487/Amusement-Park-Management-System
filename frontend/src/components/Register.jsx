import React, { useState } from "react";

const Register = (props) => {
    const [email, setEmail] = useState('');
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
        <div className="flex flex-col items-center bg-red-400 px-12 py-28 rounded-2xl box-shadow-special">
            <h2 className="font-bold text-4xl relative bottom-10">Register</h2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>

            <div className="flex w-auto justify-between items-center gap-6">
                <label className="py-1 px-0 font-bold" htmlFor="userid">USER's&nbsp; ID</label>
                <input className="my-2 mx-0 p-4 border-0 rounded-2xl font-bold" value={userId} name="userId" onChange={(e) => setUserId(e.target.value)} id="userId" placeholder="Your ID" />
            </div>
            
            <div className="flex w-auto justify-between items-center gap-6">
                <label className="py-1 px-0 font-bold" htmlFor="name">Username</label>
                <input className="my-2 mx-0 p-4 border-0 rounded-2xl font-bold" value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Your Name" />
            </div>

            <div className="w-full border border-y-red-800 my-4"></div>

            <div className="flex w-auto justify-between items-center gap-6">
                <label className="py-1 px-0 font-bold" htmlFor="email">Email</label>
                <input className="my-2 mx-0 p-4 border-0 rounded-2xl font-bold" value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            </div>
            
            {/* <label htmlFor="userID">userID</label>
            <input value={userID} onChange={(e) => setID(e.target.value)}type="text" placeholder="your userID" id="email" name="email" /> */}
             
             <div className="flex w-auto justify-between items-center gap-6">
                <label className="py-1 px-0 font-bold" htmlFor="phone">Phone</label>
                <input className="my-2 mx-0 p-4 border-0 rounded-2xl font-bold" value={phone} name="phone" onChange={(e) => setTel(e.target.value)} type="tel" placeholder="01x xxxx xxxx" />
            </div>

            <div className="w-full border border-y-red-800 my-4"></div>

            <div className="flex w-auto justify-between items-center gap-6">
                <label className="py-1 px-0 font-bold" htmlFor="password">Enter Password</label>
                <input className="my-2 mx-0 p-4 border-0 rounded-2xl font-bold" value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            </div>

            <div className="flex w-auto justify-between items-center gap-6">
                <label className="py-1 px-0 font-bold" htmlFor="password">Verify Password</label>
                <input className="my-2 mx-0 p-4 border-0 rounded-2xl font-bold" value={con_pass} onChange={(e) => setConPass(e.target.value)} type="password" placeholder="********" id="password" name="conPassword" />
            </div>

            <div className="w-full border border-y-red-800 my-2"></div>

            <button className="font-bold relative top-6 border-none bg-white px-5 py-4 rounded-lg cursor-pointer text-purple-600"type="submit">Register</button>
        
        </form>
        <button className="relative top-12 bg-transparent text-white underline " onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}

export default Register;
