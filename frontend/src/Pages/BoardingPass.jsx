import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BoardingPass = () => {
  const [passenger, setPassenger] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const hasCheckedIn = useRef(false); // Use ref to track if check-in has already happened

  const navigate = useNavigate();

  const handleCheckIn = async (passportNumber, ticketNumber) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/passengers/boarding-pass',
        { passportNumber, ticketNumber }
      );

      if (response.data.success) {
        setPassenger(response.data.data);
      } else {
        setErrorMessage('Passenger not found.');
      }
    } catch (error) {
      console.error('Error fetching passenger details:', error);
      setErrorMessage('Error fetching passenger details.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('en-GB', options); // British English for "24th June"
    
    // Get the day and month separately
    const [day, month] = formattedDate.split(' ');
    
    // Add ordinal suffix to the day
    const dayWithSuffix = `${day}${day.endsWith('1') && day !== '11' ? 'st' : day.endsWith('2') && day !== '12' ? 'nd' : day.endsWith('3') && day !== '13' ? 'rd' : 'th'}`;
    
    return `${dayWithSuffix} ${month}`;
  };

  useEffect(() => {
    if (hasCheckedIn.current) return; // Prevent multiple calls

    const storedPassenger = JSON.parse(localStorage.getItem('passenger'));

    if (storedPassenger) {
      const { passportNumber, ticketNumber } = storedPassenger;
      console.log({ passportNumber, ticketNumber });
      handleCheckIn(passportNumber, ticketNumber);
      hasCheckedIn.current = true; // Set to true after check-in
    } else {
      setErrorMessage('Passport number and ticket number not found in storage.');
    }
  }, []);

  const handleContinueToGates = () => {
    localStorage.clear(); // Clear local storage
    navigate('/gates'); // Navigate to gates page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {passenger && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-red-500">Boarding Pass</h3>
          {passenger.contactDetails && (
            <>
              <p>Name: {passenger.name}</p>
              <p>Airline: {passenger.ticketDetails.airlineName}</p>
              <p>Flight: {passenger.ticketDetails.flightNumber}</p>
              <p>Boarding Time: {new Date(passenger.ticketDetails.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
              <p>Date of Departure: {formatDate(passenger.ticketDetails.departureTime)}</p>
              <p>Gate: {passenger.ticketDetails.gateNumber}</p>
              <p>Destination</p>
              <p>Seat: {passenger.ticketDetails.seatNumber}</p>
              <p>Ticket Number: {passenger.ticketNumber}</p>
              <h3 className="text-lg font-semibold text-red-500">Luggage Details</h3>
              {passenger.luggageDetails.bags.length > 0 ? (
                passenger.luggageDetails.bags.map((weight, index) => (
                  <p key={index}>Bag {index + 1}: {weight} kg</p>
                ))
              ) : (
                <p>No luggage details available.</p>
              )}

              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
                onClick={handleContinueToGates} // Updated to call the new handler
              >
                Continue to Gates
              </button>
            </>
          )}
        </div>
      )}

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default BoardingPass;
