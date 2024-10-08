import React, { useState } from 'react';
import axios from 'axios';

const LuggageDetailsForm = ({ passportNumber }) => {
  const [bags, setBags] = useState([0]); // Start with one bag
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Add a new bag input field
  const addBag = () => {
    setBags([...bags, 0]);
  };

  // Update the weight of a specific bag
  const updateBagWeight = (index, value) => {
    const weight = parseFloat(value); // Convert to number, or NaN if invalid
    const updatedBags = [...bags];

    // Only update if the input is a valid number
    updatedBags[index] = isNaN(weight) ? '' : weight;
    setBags(updatedBags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalWeight = bags.reduce((acc, weight) => acc + (weight || 0), 0); // Handle undefined/empty inputs as 0

    if (totalWeight > 30) {
      setErrorMessage('Total luggage weight exceeds 30kg');
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
      }
    } catch (error) {
      console.error('Error updating luggage details:', error);
      setErrorMessage('Error updating luggage details');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Luggage Details:</label>
      {bags.map((bagWeight, index) => (
        <div key={index}>
          <label>Bag {index + 1} Weight (kg):</label>
          <input
            type="number"
            value={bagWeight || ''} // Ensure value is never NaN
            min="0"
            onChange={(e) => updateBagWeight(index, e.target.value)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addBag}>Add Another Bag</button>
      <button type="submit">Update Luggage</button>

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
};

export default LuggageDetailsForm;
