import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Header from "../components/Header";

export const TicketConfirmation = () => {
    const [transactionID, setTransactionID] = useState('');
    const [error, setError] = useState(null);
    const {pname} = useParams();
    const {Price} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/buy-package', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userid: document.cookie.split('=')[1],
                    packageName: pname,
                    amountPaid: Price,
                    transactionId: transactionID
                }),
            });

            if (response.status === 200) {
                setError(null);
                window.location.href = "/packages";
            }   else {
                setError('Failed to submit. Please try again.');
            }
        }   catch (error) {
            setError('Failed to submit. Please try again.');
        }
    };

    return (
        <>
        <Header />
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold my-4">Ticket Confirmation</h1>

            <form className="p-20 border border-white rounded-2xl m-2 bg-gradient-to-br from-red-500 via-pink-500 to-pink-200 flex flex-col gap-4 w-2/3" onSubmit={handleSubmit}> 
                {error}
                <label htmlFor="packageName">Package Name</label>
                <input className="my-2 mx-0 p-4 border-0 rounded-2xl font-bold" readOnly value={pname} />

                <label htmlFor="paidAmount">Paid Amount</label>
                <input className="my-2 mx-0 p-4 border-0 rounded-2xl font-bold" readOnly value={Price} />

                <label htmlFor="transactionID">Transaction ID</label>
                <input className="my-2 mx-0 p-4 border-0 rounded-2xl font-bold" value={transactionID} onChange={(e) => setTransactionID(e.target.value)}type="text" placeholder="Transaction ID"/>

                <div className="w-full flex justify-center">
                    <button className="font-bold relative top-2 border-none bg-white px-5 py-4 rounded-lg cursor-pointer w-1/3" type="submit">Confirm</button>
                </div>
            </form>
        </div>
        </>
    );
}

export default TicketConfirmation;