import React, { useState, useEffect } from "react";
import Header from "../components/AdminHeader";

const BalanceSheet = () => {
    const [balanceSheet, setbalanceSheet] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/fetch-balance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                adminToken: localStorage.getItem("admin-token"),
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setbalanceSheet(data);
                console.log(data);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <>
            <Header />
            <div className="balance-sheet">
                <h1 className="text-4xl py-3 font-bold text-gray-800 text-center">
                    Balance Sheet
                </h1>
                <table className="w-full table-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-cyan-500 text-white">
                            <th className="py-2 px-4">User ID</th>
                            <th className="py-2 px-4">Ticket ID</th>
                            <th className="py-2 px-4">Ticket Name</th>
                            <th className="py-2 px-4">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {balanceSheet.map((b, index) => (
                            <tr
                                key={index}
                                className={
                                    index % 2 === 0
                                        ? "bg-gray-200"
                                        : "bg-gray-100"
                                }
                            >
                                <td className="py-2 px-4">{b.UserUserID}</td>
                                <td className="py-2 px-4">{b.TicketID}</td>
                                <td className="py-2 px-4">{b.Type}</td>
                                <td className="py-2 px-4">{b.Price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BalanceSheet