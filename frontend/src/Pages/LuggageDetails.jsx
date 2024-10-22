import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LuggageDetailsForm = () => {
  const [bags, setBags] = useState([0]); // Start with one bag
  const [passportNumber, setPassportNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Retrieve passenger data from local storage
    const passenger = JSON.parse(localStorage.getItem('passenger'));
    if (passenger) {
      setPassportNumber(passenger.passportNumber); // Assuming passportNumber is stored
    }
  }, []);

  const addBag = () => {
    setBags([...bags, 0]);
  };

  const updateBagWeight = (index, value) => {
    const weight = parseFloat(value);
    const updatedBags = [...bags];
    updatedBags[index] = isNaN(weight) ? '' : weight;
    setBags(updatedBags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalWeight = bags.reduce((acc, weight) => acc + (weight || 0), 0);

    if (totalWeight > 30) {
      setErrorMessage('Total luggage weight exceeds 30kg');
      setSuccessMessage(''); // Clear success message if weight exceeds limit
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/passengers/${passportNumber}/luggage`,
        { bags }
      );

      if (response.data.success) {
        setSuccessMessage('Luggage details updated successfully');
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to update luggage details');
        setSuccessMessage(''); // Clear success message on failure
      }
    } catch (error) {
      console.error('Error updating luggage details:', error);
      setErrorMessage('Error updating luggage details');
      setSuccessMessage(''); // Clear success message on error
    }
  };

  const handleContinue = () => {
    navigate('/boardingpass'); // Navigate to the GatePage
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Luggage Details</h2>
      <form onSubmit={handleSubmit}>
        <label className="block text-gray-700 font-semibold mb-2">Luggage Details:</label>
        {bags.map((bagWeight, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-600">Bag {index + 1} Weight (kg):</label>
            <input
              type="number"
              value={bagWeight || ''}
              min="0"
              onChange={(e) => updateBagWeight(index, e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addBag}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 mb-4"
        >
          Add Another Bag
        </button>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
        >
          Update Luggage
        </button>

        {successMessage && <p className="text-green-500 font-semibold mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 font-semibold mt-2">{errorMessage}</p>}

        {successMessage && ( // Conditionally render the Continue button
          <button
            onClick={handleContinue}
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition duration-200 mt-4"
          >
            Print Boarding Pass
          </button>
        )}
      </form>
    </div>
  );
};

export default LuggageDetailsForm;
