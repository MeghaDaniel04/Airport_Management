import express from 'express';
import { checkInPassenger, updateLuggageDetails } from '../controllers/passenger.controller.js';

import { createPassenger } from '../controllers/passenger.controller.js'; // Adjust path as needed

const router = express.Router();

// POST endpoint to create a new passenger
router.post("/", createPassenger);


// POST request to check in a passenger
router.post('/check-in', checkInPassenger);

// PUT request to update luggage details for a specific passenger
// In your routes file
router.put('/:passportNumber/luggage', updateLuggageDetails);

//POST request to print Boarding Pass
router.post('/boarding-pass', checkInPassenger);

router.get('/boarding-pass', (req, res) => {
    res.status(200).json({ message: "GET request to /boarding-pass" });
});


// In your passenger.routes.js or main app file
router.get('/status', (req, res) => {
    res.status(200).json({ message: "Server is up and running!" });
});


export default router;
