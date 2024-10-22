import express from 'express';
import { displayGates, displayPassengers } from '../controllers/gates.controller.js'; // Ensure this is correct

const router = express.Router();

// Change the POST route if needed or keep it for another purpose
router.post('/gates', (req, res) => {
    res.status(200).json({ message: "POST request to /gates" });
});

router.get('/gates', displayGates); // Ensure this matches the GET request from the frontend

router.post('/gatedetails', (req, res) => {
    res.status(200).json({ message: "POST request to /gatedetails" });
});
router.get('/gatedetails', async (req, res) => {
    try {
        await displayPassengers(req, res);
    } catch (error) {
        console.error('Error in /gatedetails route:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



export default router;
