import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const BuyTickets = () => {
  const [packages, setPackages] = useState([]);
  const [packageName, setPackageName] = useState(0);
  const [Price, setPrice] = useState(0);

  useEffect(() => {
    fetch('http://localhost:4000/get-package')
      .then((response) => response.json())
      .then((data) => { setPackages(data); console.log(data)})
      .catch((error) => console.error('Error:', error));
  }, []);


 const handleBuyTicket = (pname) => {
    setPackageName(pname);
    setPrice(Price);
 };

 return (
  <>
  <Header />
    <div className="flex flex-col items-cente">
      <h1 className="text-3xl my-6 text-center font-bold">Buy Tickets</h1>

      <div className="justify-center gap-6 flex flex-col items-center">
        {packages.map((pack) => (
          <div key={pack.PackageID} className="py-8 bg-red-400 flex flex-col justify-center items-center text-center w-2/3 rounded-lg box-shadow-special">
            <h2 className="text-xl font-bold">{pack.PackageName}</h2>
            <h2>{pack.PackageDetails}</h2>
            <h2>Price: {pack.Price}</h2>
            <h2>tickets available: {pack.AvailableTickets}</h2>
            {pack.AvailableTickets > 0 ? (
              <button className="font-bold relative border-none bg-white px-4 py-4 rounded-lg cursor-pointer top-3" onClick={() => handleBuyTicket(pack.PackageID)}>
                <Link to={`/buy-tickets/${pack.PackageName}/${pack.Price}`}>Buy Ticket</Link>
              </button>
              ) : (
              <p className='msg'>Sorry! tickets for this package are currently unavailable</p>
            )}
          </div>
        ))}
      </div>
    </div>

    <div className="my-8"></div>
    </>
 );
};

export default BuyTickets;