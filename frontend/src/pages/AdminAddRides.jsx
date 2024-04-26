import React, { useState } from "react";
import Header from "../components/AdminHeader";

export const AddRide = () => {
    const [RideId, setRideID] = useState('');
    const [ridePrice, setRidePrice] = useState()
    const [rideImage, setrideImage] = useState('');
    const [RideDetails, setRideDetails] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const RideData = {
            rideName: RideId,
            rideDescription: RideDetails,
            rideImageLink: rideImage,
            price: ridePrice,
            adminToken: localStorage.getItem('admin-token')
          };

        try {
            const response = await fetch('http://localhost:4000/admin-add-rides', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(RideData),
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            setRideID('');
            setRideDetails('');
            setrideImage('')
            setRidePrice('')
            
            alert("Added ride " + RideId)
        }   catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <>
        <Header />
        <div className="text-center flex flex-col m-20 items-center">
            <h1 className="text-3xl font-bold">Add a Ride</h1>

            <form className="box-shadow-special font-bold flex flex-col p-16 rounded-lg m-8 bg-cyan-400 w-2/3" onSubmit={handleSubmit}> 
                <label htmlFor="packageID">Ride Name</label>
                <input className="my-2 p-4 border-0 rounded-2xl font-bold" value={RideId} onChange={(e) => setRideID(e.target.value)} type="text" />
                <label htmlFor="packageID">Ride Price</label>

                <input className="my-2 p-4 border-0 rounded-2xl font-bold" type="number" value={ridePrice} onChange={(e) => setRidePrice(e.target.value)} />
                <label htmlFor="packageName">Ride Image URL</label>

                <input className="my-2 p-4 border-0 rounded-2xl font-bold" value={rideImage} onChange={(e) => setrideImage(e.target.value)} type="text" />
                <label htmlFor="packageDetails">Ride Description</label>

                <input className="my-2 p-4 border-0 rounded-2xl font-bold" value={RideDetails} onChange={(e) => setRideDetails(e.target.value)} type="text" />
                <div className="w-full flex justify-center">

                <button className="font-bold relative top-2 border-none bg-white px-5 py-4 rounded-lg cursor-pointer w-1/3" type="submit">Add</button>
                </div>
            </form>
        </div>
        </>
    );

};

export default AddRide;