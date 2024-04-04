import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { FaHistory } from "react-icons/fa";
import amusementPark from '../images/background.gif'
import { FaUser } from "react-icons/fa";

const UserProfile = () => {
    const [id, setId] = useState("...");
    const [number, setNumber] = useState("...");
    const [userName, setUsername] = useState("...");
    const [email, setEmail] = useState("...");

    useEffect(() => {
        async function getData() {
            const userData = await fetch("http://localhost:4000/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jwtToken: document.cookie.split("=")[1],
                }),
            });

            const data = await userData.json();
            setId(data[0].UserID);
            setEmail(data[0].Email);
            setUsername(data[0].Name);
            setNumber(data[0].Number);

            console.log(data);
        }

        getData();
    }, []);

    return (
        <>
            <Header></Header>

            
            <div class="flex justify-center items-center h-screen">
                <div class="card bg-white rounded-lg shadow-md w-real-large h-real-large width-big flex flex-row relative bottom-24">
                    <div class="img-avatar text-3xl w-20 h-20 absolute rounded-full border-4 border-white bg-gradient-to-br from-red-700 to-white top-20 left-4 flex justify-center items-center">
                        <FaUser />
                    </div>
                    <div class="card-text grid grid-cols-1 gap-x-4 w-full">
                        <div
                            class="portada h-32 rounded-l-lg"
                            style={{ backgroundImage: `url(${amusementPark})`, backgroundPosition: "bottom center", backgroundSize: "cover" }}
                        ></div>
                        <div class="title-total px-6 bottom-24 relative">
                            <div class="title text-right text-red-500 font-bold text-s">
                                {id}
                            </div>
                            <h2 class="text-4xl font-bold">
                                {userName}
                            </h2>
                            <div class="desc text-s py-2 relative bottom-1">
                                {email}
                            </div>

                            <button className="relative top-52 w-full flex justify-between">
                                <p className="relative top-1 font-bold text-red-500">{number}</p>
                                <FaHistory className="relative bottom-3 text-4xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
