import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

const EditPackage = () => {
    const [packageInfo, setPackageInfo] = useState({
        packageId: '',
        packageName: '',
        packageDetails: '',
        price: '',
        availableTickets: ''
    });

    useEffect(() => {
        let url = new URL(window.location.href);

        setPackageInfo({
            ...packageInfo,
            packageId: url.searchParams.get('id'),
            packageName: url.searchParams.get('name'),
            packageDetails: url.searchParams.get('details'),
            price: url.searchParams.get('price'),
            availableTickets: url.searchParams.get('tickets')
        });

        console.log(packageInfo);
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPackageInfo({ ...packageInfo, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:4000/admin-update-package', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...packageInfo, adminToken: localStorage.getItem('admin-token') })
        }).then((res) => {
            window.location.href = 'http://localhost:3000/admin/view-package';
        });
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center">
                <h2 className="text-4xl py-3 font-bold">Edit Package</h2>
                <form className='w-5/6 max-w-5xl bg-cyan-500 p-8 rounded-lg flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor="packageID" className="font-bold text-left text-white">Package ID:</label>
                    <input type="text" value={packageInfo.packageId} id="packageID" name="packageID" className="input-field" readOnly />

                    <label htmlFor="packageName" className=" font-boldtext-left text-white">Package Name:</label>
                    <input type="text" value={packageInfo.packageName} onChange={handleInputChange} id="packageName" name="packageName" className="input-field" />

                    <label htmlFor="packageDetails" className="font-bold text-left text-white">Package Details:</label>
                    <input type="text" value={packageInfo.packageDetails} onChange={handleInputChange} id="packageDetails" name="packageDetails" className="input-field" />

                    <label htmlFor="price" className="font-bold text-left text-white">Price:</label>
                    <input type="text" value={packageInfo.price} onChange={handleInputChange} id="price" name="price" className="input-field" />

                    <label htmlFor="availableTickets" className="font-bold text-left text-white">Available Tickets:</label>
                    <input type="number" value={packageInfo.availableTickets} onChange={handleInputChange} id="availableTickets" name="availableTickets" className="input-field" />

                    <button className='bg-cyan-700 text-white py-2 px-4 rounded-md mt-4' type="submit">Update Package</button>
                </form>
            </div>
        </>
    );
}

export default EditPackage;