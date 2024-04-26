import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/AdminHeader';

export const ViewPackages = () => {
    const [packages, setPackages] = useState([]);
    const [adminToken, setAdminToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('admin-token');
        if (token) {
            setAdminToken(token);
        }
        fetch('http://localhost:4000/get-package')
            .then((response) => response.json())
            .then((data) => { setPackages(data); console.log(data) })
            .catch((error) => console.error('Error:', error));
    }, []);

    const handleDelete = async (packageId) => {
        if (window.confirm(`Delete package no.${packageId}?`)) {
            const jsonData = await fetch('http://localhost:4000/admin-delete-package', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    packageId: packageId,
                    adminToken: localStorage.getItem('admin-token')
                })
            });

            window.location.reload();
        }
    };

    return (
        <>
            <Header />
            <div className='view-packages'>
                <h1 className="text-4xl py-4 text-center font-bold">Packages</h1>
                <table className='w-full table-auto bg-white border border-gray-200 rounded-lg shadow-lg'>
                    <thead>
                        <tr className='bg-cyan-500 text-white'>
                            <th className='py-2 px-4'>Package ID</th>
                            <th className='py-2 px-4'>Package Name</th>
                            <th className='py-2 px-4'>Package Details</th>
                            <th className='py-2 px-4'>Price</th>
                            <th className='py-2 px-4'>Available Tickets</th>
                            <th className='py-2 px-4'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pack, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-cyan-200' : 'bg-cyan-100'}>
                                <td className='py-2 px-4'>{pack.PackageID}</td>
                                <td className='py-2 px-4'>{pack.PackageName}</td>
                                <td className='py-2 px-4'>{pack.PackageDetails}</td>
                                <td className='py-2 px-4 text-center'>{pack.Price}</td>
                                <td className='py-2 px-4 text-center'>{pack.AvailableTickets}</td>
                                <td className='py-2 px-4 flex gap-2 justify-center'>
                                    <button className='bg-cyan-400 shadow-md rounded-xl py-2 px-3 edit-button'><Link to={`/admin/edit-package?id=${pack.PackageID}&name=${pack.PackageName}&details=${pack.PackageDetails}&price=${pack.Price}&tickets=${pack.AvailableTickets}`}>Edit</Link></button>
                                    <button className='bg-cyan-400 shadow-md rounded-xl py-2 px-3 delete-button' onClick={() => handleDelete(pack.PackageID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ViewPackages;