import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Updated import

const CheckInForm = () => {
  const [passportNumber, setPassportNumber] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [passenger, setPassenger] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use navigate instead of useHistory

  const handleCheckIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/passengers/check-in',
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

  const handleContinue = () => {
    // Save passenger data in local storage
    localStorage.setItem('passenger', JSON.stringify(passenger));
    navigate('/luggage'); // Use navigate instead of history.push
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Passenger Check-In</h2>

      <form onSubmit={handleCheckIn}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Passport Number</label>
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
          <label className="block text-gray-700 font-semibold mb-2">Ticket Number</label>
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
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

          <button
            onClick={handleContinue}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200 mt-4"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckInForm;
