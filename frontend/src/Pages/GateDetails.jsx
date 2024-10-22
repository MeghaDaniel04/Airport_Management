import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import '../GateDetails.css'; // Import CSS file for styles

const GateDetails = () => {
    const [passengers, setPassengers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [gateNumber, setGateNumber] = useState(null);
    const [flightNumber, setFlightNumber] = useState(null);
    const [airlineName, setAirlineName] = useState(null);
    const hasCheckedIn = useRef(false);

    useEffect(() => {
        if (hasCheckedIn.current) return;

        const storedGateNumber = JSON.parse(localStorage.getItem('gateNumber'));
        const flightNumber = JSON.parse(localStorage.getItem('flightNumber'));
        const airlineName = JSON.parse(localStorage.getItem('airlineName'));

        if (storedGateNumber && flightNumber) {
            setGateNumber(storedGateNumber);
            setFlightNumber(flightNumber);
            setAirlineName(airlineName);

            const fetchPassengers = async () => {
                try {
                    console.log('Fetching passengers with:', { storedGateNumber, flightNumber });

                    const response = await axios.get(
                        'http://localhost:3000/api/gates/gatedetails', {
                            params: {
                                gateNumber: storedGateNumber,
                                flightNumber
                            }
                        }
                    );
                    console.log('Response data:', response.data);
                    setPassengers(response.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchPassengers();
        } else {
            setError('Gate number or flight number not found in local storage.');
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="container">
            <h1 className="title">Gate Number: {gateNumber}</h1>
            <div className="header">
                {gateNumber && <h2 className="gate-number">Airline Name: {airlineName}</h2>}
                {flightNumber && <h2 className="gate-number">Flight Number: {flightNumber}</h2>}
                {flightNumber && <h3 className="flight-number">All Passenger Details</h3>}
            </div>
            {passengers.length > 0 ? (
                <table className="passenger-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Ticket</th>
                            <th>Seat</th>
                            <th>Boarded</th> {/* New column for Boarded */}
                        </tr>
                    </thead>
                    <tbody>
                        {passengers.map((passenger) => (
                            <tr key={passenger.ticketNumber}>
                                <td>{passenger.name}</td>
                                <td>{passenger.ticketNumber}</td>
                                <td>{passenger.ticketDetails.seatNumber}</td>
                                <td>{passenger.ticketDetails.gateChecked ? 'Yes' : 'No'}</td> {/* Boarded value */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="no-passengers">No passengers found.</div>
            )}
        </div>
    );
};

export default GateDetails;
