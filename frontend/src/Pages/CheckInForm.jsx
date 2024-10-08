import React, { useState } from 'react';
import axios from 'axios';
import LuggageDetailsForm from './LuggageDetails.jsx';

const CheckInForm = () => {
  const [passportNumber, setPassportNumber] = useState('');
  const [ticketNumber, setTicketNumber] = useState(''); // New state for ticket number
  const [passenger, setPassenger] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckIn = async (e) => {
    e.preventDefault();

    try {
      // Use POST to send both passport and ticket numbers
      const response = await axios.post(
        'http://localhost:3000/api/passengers/check-in', // Update to the correct endpoint
        { passportNumber, ticketNumber }
      );

      if (response.data.success) {
        setPassenger(response.data.data); // Set passenger data if found
      } else {
        setErrorMessage('Passenger not found.');
      }
    } catch (error) {
      console.error('Error fetching passenger details:', error);
      setErrorMessage('Error fetching passenger details.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Passenger Check-In</h2>

      <form onSubmit={handleCheckIn}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Passport Number
          </label>
          <input
            type="text"
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter passport number"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Ticket Number
          </label>
          <input
            type="text"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ticket number"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
          Check In
        </button>

        {errorMessage && (
          <p className="text-red-500 font-semibold mt-2">{errorMessage}</p>
        )}
      </form>

      {passenger && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-red-500">Passenger Details</h3>
          <p>Name: {passenger.name}</p>
          <p>Contact Phone: {passenger.contactDetails.phone}</p>
          <p>Contact Email: {passenger.contactDetails.email}</p>
          <p>Flight Number: {passenger.ticketDetails.flightNumber}</p>
          <LuggageDetailsForm passportNumber={passportNumber} />
        </div>
      )}
    </div>
  );
};

export default CheckInForm;
