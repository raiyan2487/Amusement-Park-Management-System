import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const UserHistoryPage = () => {
    const [UserHistory, setUserHistory] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/fetch-user-history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: document.cookie.split('=')[1]
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setUserHistory(data);
                console.log(data);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <>
            <Header />
            <div className="balance-sheet">
                <h1 className="text-4xl py-3 font-bold text-gray-800 text-center">
                    User History
                </h1>
                <table className="w-full table-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-red-400 text-white">
                            <th className="py-2 px-4">Package No.</th>
                            <th className="py-2 px-4">Package ID</th>
                            <th className="py-2 px-4">Package Name</th>
                            <th className="py-2 px-4">Price</th>
                            <th className="py-2 px-4">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserHistory.map((b, index) => (
                            <tr
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? "bg-red-200"
                                        : "bg-red-100"
                                }
                            >
                                <td className="py-2 px-4 text-center">{index + 1}</td>
                                <td className="py-2 px-4 text-center">{b.TicketID}</td>
                                <td className="py-2 px-4 text-center">{b.Type}</td>
                                <td className="py-2 px-4 text-center">{b.Price}</td>
                                <td className="py-2 px-4 text-center">{b.PackageDetails}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserHistoryPage