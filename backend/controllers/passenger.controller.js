import Passenger from '../models/passenger.model.js';
// import mongoose from 'mongoose';


const createPassenger = async (req, res) => {
    const passengerData = req.body; // Get the passenger data from the request body

    // Validate required fields
    const { name, passportNumber, ticketNumber, contactDetails } = passengerData;
    if (!name || !passportNumber || !ticketNumber || !contactDetails) {
        return res.status(400).json({ success: false, message: "Please provide all required fields." });
    }

    // Create a new passenger instance
    const newPassenger = new Passenger(passengerData);

    try {
        // Save the new passenger to the database
        await newPassenger.save();
        res.status(201).json({ success: true, data: newPassenger });
    } catch (error) {
        console.error("Error creating passenger:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// Check-in a passenger (find passenger by passport or ticket number)
const checkInPassenger = async (req, res) => {
  const { passportNumber, ticketNumber } = req.body;

  try {
    const passenger = await Passenger.findOne({ passportNumber, ticketNumber });

    if (!passenger) {
      return res.status(404).json({ success: false, message: "Passenger not found" });
    }

    res.status(200).json({ success: true, data: passenger });
  } catch (error) {
    console.error("Error fetching passenger:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update luggage details for a passenger
// In your controller file
const updateLuggageDetails = async (req, res) => {
  const { passportNumber } = req.params;
  const { bags } = req.body; // Assuming an array of bag weights is sent

  try {
    // Calculate total luggage weight
    const totalWeight = bags.reduce((acc, weight) => acc + weight, 0);

    // Ensure total weight doesn't exceed 30kg
    if (totalWeight > 30) {
      return res.status(400).json({
        success: false,
        message: "Total luggage weight exceeds 30kg limit",
      });
    }

    // Update luggage details for the passenger
    const passenger = await Passenger.findOneAndUpdate(
      { passportNumber: passportNumber },
      {
        "luggageDetails.bags": bags,
        "luggageDetails.totalWeight": totalWeight,
      },
      { new: true }
    );

    if (!passenger) {
      return res.status(404).json({ success: false, message: "Passenger not found" });
    }

    res.json({ success: true, data: passenger });
  } catch (error) {
    console.error("Error updating luggage details:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


  export {createPassenger , checkInPassenger, updateLuggageDetails };
  