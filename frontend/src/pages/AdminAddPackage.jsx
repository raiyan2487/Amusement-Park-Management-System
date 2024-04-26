import React, { useState } from "react";
import Header from "../components/AdminHeader";

export const AddPackage = () => {
    const [packageId, setPackageID] = useState('');
    const [packageName, setPackageName] = useState('');
    const [packageDetails, setPackageDetails] = useState('');
    const [price, setPrice] = useState('');
    const [availableTickets, setAvailableTickets] = useState('');
    const [description, setDescription] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        const packageData = {
            packageId,
            packageName,
            packageDetails,
            price,
            availableTickets,
            adminToken: localStorage.getItem('admin-token')
        };

        try {
            const response = await fetch('http://localhost:4000/admin-add-package', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(packageData),
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            } else {
                alert("Package " + packageName + " added successfully.")
            }

            // Clearing input fields
            window.location.href = "/admin/view-package";
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Header />

            <div className="text-center flex flex-col items-center">
                <h1 className="text-4xl font-bold py-4">Add Package</h1>

                <form className="p-20 border rounded-lg bg-cyan-500 flex flex-col w-3/5 box-shadow-special" onSubmit={handleSubmit}> 
                    <label className="font-bold text-left" htmlFor="packageID">Package ID</label>
                    <input value={packageId} onChange={(e) => setPackageID(e.target.value)} type="text" id="packageID" name="packageID" className="input-field" />

                    <label className="font-bold text-left" htmlFor="packageName">Package Name</label>
                    <input value={packageName} onChange={(e) => setPackageName(e.target.value)} type="text" id="packageName" name="packageName" className="input-field" />

                    <label className="font-bold text-left" htmlFor="packageDetails">Package Description</label>
                    <input value={packageDetails} onChange={(e) => setPackageDetails(e.target.value)} type="text" id="packageDetails" name="packageDetails" className="input-field" />

                    <label className="font-bold text-left" htmlFor="price">Price</label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" id="price" name="price" className="input-field" />

                    <label className="font-bold text-left" htmlFor="availableTickets">Available Tickets</label>
                    <input value={availableTickets} onChange={(e) => setAvailableTickets(e.target.value)} type="text" id="availableTickets" name="availableTickets" className="input-field" />

                    <div className="flex justify-center">
                    <button className="bg-cyan-600 rounded-lg text-white mx-4 my-4 p-2 rounded-md; w-1/3" type="submit">Add</button>
                    </div>
                    
                </form>
            </div>
        </>
    );
};

export default AddPackage;