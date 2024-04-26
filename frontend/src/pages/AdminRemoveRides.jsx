import Header from "../components/Header";
import React, {useState} from 'react'

const AdminRemoveRides = () => {
    const [rideName, setRideName] = useState('');
    const [message, setMessage] = useState('')

    const handleDelete = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/admin-remove-rides', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            rideName: rideName,
            adminToken: localStorage.getItem('admin-token')
            })
        })
        .then((response) => {
            if (!response.ok) {
            if (response.status === 404) {
                setMessage("Ride not found");
            } else {
                setMessage("An error occurred");
            }
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setMessage("Ride deleted successfully");
            alert("Ride deleted successfully")
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
            setMessage("An error occurred during deletion");
        });
    };

    return (
        <>
        <Header />
        <div className="text-center flex-col m-10 flex items-center">
            <h1 className="text-3xl font-bold relative bottom-3.5">Remove a Ride</h1>
            <div className="w-full border border-y-gray-300 my-4"></div>

            <form className="text-center flex flex-col m-10  max-w-4xl" onSubmit={handleDelete}> 

                <label htmlFor="userID" className="font-bold text-2xl">Ride Name</label>
                <input className="w-96 my-2 py-4 px-6 border-4 border-black rounded-lg" value={rideName} onChange={(e) => setRideName(e.target.value)} type="text" id="userID" name="userID" />

                <div>

                <button className="font-bold relative top-3.5 border-none bg-cyan-400 px-5 py-4 rounded-lg cursor-pointer text-black w-40" type="submit">Remove</button>
                </div>
            </form>

            <p className="text-center font-bold">{message}</p>
        </div>
        </>
    );
}

export default AdminRemoveRides;