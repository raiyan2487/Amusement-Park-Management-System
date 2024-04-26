import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const Checkout = () => {
    const [rides, setRides] = useState([]);
    const [total, setTotal] = useState(0);
    const [transaction, setTransaction] = useState('');

    useEffect(() => {
        async function getData() {
            let data = await fetch("http://localhost:4000/rides");
            data = await data.json();

            setRides(data);

            let url = window.location.search.split("&");
            let totalM = 0;

            for (let i = 0; i < url.length; i++) {
                let name = decodeURIComponent(url[i].split("=")[0]).replace(
                    "?",
                    ""
                );

                function GetIndexOfData(name) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].Name == name) return data[i].Price;
                    }
                }

                totalM += GetIndexOfData(name) * Number(url[i].split("=")[1]);
            }

            setTotal(totalM);
        }

        getData();
    }, []);

    function GetIndex(name) {
        for (let i = 0; i < rides.length; i++) {
            if (rides[i].Name == name) {
                return rides[i].Price;
            }
        }
    }

    function Purchase() {
        let rideArr = [];
        let rideAmount = [];

        let url = window.location.search.split("&");

        for (let i = 0; i < url.length; i++) {
            rideArr.push(decodeURIComponent(url[i].split("=")[0]).replace('?', ''));
            rideAmount.push(Number(url[i].split("=")[1]));
        }

        console.log(rideArr)
        console.log(rideAmount)

        fetch("http://localhost:4000/custom-package", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                price: total,
                rides: rideArr,
                ticketCount: rideAmount,
                token: document.cookie.split('=')[1],
                transactionId: transaction
            })
        }).then(data => data.json()).then((data) => {
            if(data.success) {
                alert('You have successfully purchased this package with transaction id of ' + transaction)
                window.location.href = '/user-history'
            }

            else {
                alert('An error has occured during your purchase.')
            }
        })
    }

    return (
        <>
            <Header />

            <div className="flex flex-col items-center">
                <h1 className="text-3xl my-6 text-center font-bold">
                    Checkout
                </h1>

                {rides.length == 0 ? (
                    "Loading"
                ) : (
                    <div className="box-shadow-special rounded-xl p-6 w-2/3 border-2 relative top-10">
                        {window.location.search.split("&").map((elm, i) => (
                            <div
                                key={i}
                                className="flex justify-between font-bold"
                            >
                                <p key={i + "-data1"} className="w-60">
                                    {decodeURIComponent(
                                        elm.split("=")[0]
                                    ).replace("?", "")}
                                </p>
                                <p>{elm.split("=")[1]}</p>
                                <p className="w-32 text-right">
                                    {GetIndex(
                                        decodeURIComponent(
                                            elm.split("=")[0]
                                        ).replace("?", "")
                                    ) * Number(elm.split("=")[1])}
                                </p>
                            </div>
                        ))}

                        <div className="w-full border relative top-2"></div>

                        <div className="my-5 font-bold flex justify-between">
                            <p>Total:</p>
                            <p>{total}</p>
                        </div>

                        <label className="font-bold">Transaction ID:</label>
                        <input type="number" value={transaction} className="font-bold border-2 h-10 p-2 top-2 relative w-full rounded-lg"  onChange={(e) => setTransaction(e.target.value)}/>

                        <div className="w-full flex justify-center">
                            <button
                                onClick={Purchase}
                                className="relative top-4 rounded-md shadow-xl border-2 border-red-700 py-2 font-bold px-5 my-6 bg-red-400"
                            >
                                Purchase
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Checkout;