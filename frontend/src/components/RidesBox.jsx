import React from 'react';

function Ridebox(props) {
  const { imageSrc, name, description } = props;

  return (
    <div className="flex m-3 p-5 bg-pink border max-w-7xl border-gray-300 w-auto">

      <div  className="w-60 h-60 mr-5 overflow-hidden">
        <img className="h-full w-full object-cover" src={imageSrc} alt={name} />
      </div>

      <div className="flex-1">
        <p className="flex-1 text-3xl font-bold mb-4">{name}</p>
        <p className="flex-1">{description}</p>
        {/* <p className="price">Price: {price}</p>
        <p className="available-tickets">Available Tickets: {availableTickets}</p> */}
      </div>
    </div>
  );
}

export default Ridebox;
