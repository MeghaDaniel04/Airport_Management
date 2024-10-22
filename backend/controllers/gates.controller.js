import Gates from '../models/gates.model.js';
import Passengers from '../models/passenger.model.js';

const displayGates = async (req, res) => {
    try {
        // Fetch all gate entries from the database
        const gates = await Gates.find();

        // Send the fetched data as a response
        res.status(200).json(gates);
    } catch (error) {
        // Handle any errors that occur during the database query
        res.status(500).json({ message: 'Error retrieving gates', error: error.message });
    }
};

const displayPassengers = async (req, res) => {
    const { gateNumber, flightNumber } = req.query; // Retrieve from query parameters
    console.log('Query Parameters:', { gateNumber, flightNumber });

    try {
        const passengers = await Passengers.find({
            'ticketDetails.gateNumber': gateNumber,
            // 'ticketDetails.flightNumber': flightNumber
        });

        res.status(200).json(passengers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving passengers', error: error.message });
    }
};

export { displayGates, displayPassengers };
