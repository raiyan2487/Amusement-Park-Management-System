import { useEffect, useState } from "react";
import Ridebox from "../components/RidesBox";
import Header from "../components/Header";

export default function RidesPage() {
    const [rides, setRides] = useState(false)

    useEffect(() => {
        async function getData() {
            let data = await fetch('http://localhost:4000/rides')
            data = await data.json()

            console.log(data)
            setRides(data)
        }

        getData()
    }, [])

    return (
        <>
        <Header />

        <div className="flex items-center flex-col relative top-9">
            <div id="h-16 w-full bg-white text-lg flex justify-center items-center border-b-3 border-gray-300 sticky top-0">
                {/* <h1>Rides</h1> */}
            </div>

            {rides === false ? "Loading"
             : rides.map((elm, i) => <Ridebox key={i} name={elm.Name} imageSrc={elm.image} description={elm.Description} price={elm.Price}/>)
            }
        
        </div>
        </>
    );
}