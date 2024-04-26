import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import Ridebox from "../components/RidesBox";
import { Link } from "react-router-dom";

const CustomPackage = () => {
    const [rides, setrides] = useState(false);
    const [ridePrice, setRidePrice] = useState([]);
    const [rideAmount, selectedRideAmount] = useState([]);

    useEffect(() => {
        async function getData() {
            let data = await fetch("http://localhost:4000/rides");
            data = await data.json();

            for(let i = 0; i < data.length; i++) {
                selectedRideAmount((prev) => {
                    if(prev.length < data.length) return [...prev, 0]
                    else return prev
                })
            }

            setrides(data);

            for(let i = 0; i < data.length; i++) {
                setRidePrice((prev) => {
                    if(prev.length < data.length) return [...prev, 0]
                    else return prev
                });
            }
        }

        getData();
    }, []);

    function calculateData() {
        let route = "?"

        for(let i = 0; i < rides.length; i++) {
            if(rideAmount[i] > 0) {
                route += `${rides[i].Name}=${rideAmount[i]}&`
            }
        }

        route = route.slice(0, route.length - 1)
        window.location = '/checkout' + route
    }

    return (
        <>
            <Header />

            <div className="flex flex-col items-center">
                <h1 className="text-3xl my-6 text-center font-bold">
                    Create your own Package!
                </h1>
                <>
                    <div className="flex items-center flex-col relative top-9">
                        <div id="h-16 w-full bg-white text-lg flex justify-center items-center border-b-3 border-gray-300 sticky top-0">
                            {/* <h1>Rides</h1> */}
                        </div>

                        <div className="gap-3 flex flex-col div-size-special">
                            {rides === false
                                ? "Loading"
                                : rides.map((elm, i) => (
                                      <div key={i} className="shadow-md rounded-md float-right flex w-full gap-4 border-2 border-gray-300 p-3">
                                          <img
                                              className="h-14 w-14"
                                              src={elm.image}
                                          ></img>
                                          <p className="relative top-1 font-bold">
                                              {elm.Name.replace(" ", "")} <br></br>
                                              {elm.Price}
                                          </p>
                                          
                                          <div className="w-full">
                                            <input type="number" value={rideAmount[i]} className="font-bold rounded-md border float-right h-full w-20 p-2" onChange={(e) => {
                                                selectedRideAmount((prev) => {
                                                    if(Number(e.target.value) < 0) return prev

                                                    let newArr = [...prev];
                                                    newArr[i] = Number(e.target.value)

                                                    setRidePrice((prev) => {
                                                        let nArr = [...prev]
                                                        nArr[i] = newArr[i] * rides[i].Price

                                                        return nArr
                                                    })

                                                    return newArr
                                                })
                                            }}></input>
                                            <div className="float-right p-4 font-bold">{ridePrice[i]}</div>
                                          </div>
                                      </div>
                                  ))}
                        </div>

                        <Link onClick={calculateData} className="rounded-md shadow-xl border-2 border-red-700 py-2 font-bold px-5 my-6 bg-red-400">Checkout</Link>
                    </div>
                </>
            </div>
        </>
    );
};

export default CustomPackage;