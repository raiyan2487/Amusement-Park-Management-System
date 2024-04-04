import React, { useState } from "react";
import Header from "../components/AdminHeader";

export const BanUser = () => {
    const [UserID, setUserID] = useState('')
    const [sureText, setSureText] = useState('')
    const [id, setId] = useState('')
    const [number, setNumber] = useState('')
    const [userName, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [showCon, setShowCon] = useState('none')

    const banUser = async () => {
        const jsonData = await fetch('http://localhost:4000/delete-user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: UserID,
                adminToken: localStorage.getItem('admin-token')
            })
        })

        alert('User ' + UserID + " has been banned.")
        window.location.href = 'http://localhost:3000/admin'
    }

    const rejectbanUser = () => {
        setSureText("")
        setId("")
        setEmail("")
        setNumber("")
        setUsername("")

        setShowCon('none')

        alert("User " + UserID + " wasn't banned")
    }

    const handleDelete = async (e) => {
        e.preventDefault()

        const userData = await fetch('http://localhost:4000/get-user-as-admin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: UserID,
                adminToken: localStorage.getItem('admin-token')
            })
        })

        
        if(userData.status == 404) {
            alert("User " + UserID + " not found.")
            return
        }
        
        else {
            const data = await userData.json();
            
            setSureText("Are you sure you want to ban this user?")
            setId("ID: " +  data[0].UserID)
            setEmail("Email:" + data[0].Email)
            setNumber("Number: " + data[0].Number)
            setUsername("Name: " + data[0].Name)

            setShowCon('block')
        }
    };

    return (
        <>
        <Header />
        <div className="text-center flex-col m-10 flex items-center">
            <h1 className="text-3xl font-bold relative bottom-3.5">Ban a User</h1>
            <div className="w-full border border-y-gray-300 my-4"></div>

            <form className="text-center flex flex-col m-10  max-w-4xl" onSubmit={handleDelete}> 

                <label htmlFor="userID" className="font-bold text-2xl">User ID</label>
                <input className="w-96 my-2 py-4 px-6 border-4 border-black rounded-lg" value={UserID} onChange={(e) => setUserID(e.target.value)} type="text" id="userID" name="userID" />

                <div>

                <button className="font-bold relative top-3.5 border-none bg-cyan-400 px-5 py-4 rounded-lg cursor-pointer text-black w-40" type="submit">Ban</button>
            
                </div>
            </form>

            <div className="flex-col box-shadow-special border-4 border-gray-600 h-80 rounded-lg" style={{ width: '1000px', maxWidth: '80%'}}>
                <p className="font-bold text-1xl my-5">{sureText}</p>
                <p className="font-bold text-3xl">{id}</p>
                <p className="font-bold text-3xl">{number}</p>
                <p className="font-bold text-3xl">{userName}</p>
                <p className="font-bold text-3xl">{email}</p>

                <div className="space-x-4" style={{ display: showCon }}>
                    <button onClick={banUser} className="box-shadow-special font-bold relative top-3.5 border-none bg-lime-400 px-5 py-4 rounded-lg cursor-pointer text-black w-40" type="submit">Yes</button>
                    <button onClick={rejectbanUser} className="box-shadow-special font-bold relative top-3.5 border-none bg-red-400 px-5 py-4 rounded-lg cursor-pointer text-black w-40" type="submit">No</button>
                </div>
            </div>

        </div>

        </>
    );
};

export default BanUser;