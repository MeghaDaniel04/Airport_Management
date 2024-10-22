import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../GatesPage.css'; // Import a CSS file for styles

const GatesPage = () => {
    const [gates, setGates] = useState([]); // State to store gates data
    const [error, setError] = useState(null); // State to handle errors
    const hasCheckedIn = useRef(false);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        if (hasCheckedIn.current) return;
        const fetchGates = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/gates/gates');
                setGates(response.data); // Update the state with the fetched data
            } catch (err) {
                setError(err.message); // Handle any errors
            }
        };

        fetchGates(); // Call the function to fetch data
    }, []); // Empty dependency array means this runs once when the component mounts

    const handleGoToGate = (gate) => {
        // Store the gate details in local storage
        localStorage.setItem('gateNumber', JSON.stringify(gate.gateNumber));
        localStorage.setItem('flightNumber', JSON.stringify(gate.flightNumber));
        localStorage.setItem('airlineName', JSON.stringify(gate.airlineName));
        
        // Navigate to the details page
        navigate('/GateDetails');
    };

    return (
        <div className="gates-container">
            <h1>Gates Information</h1>
            {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
            <table className="gates-table">
                <thead>
                    <tr>
                        <th>Gate Number</th>
                        <th>Airline Name</th>
                        <th>Flight Number</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Action</th> {/* New column for the button */}
                    </tr>
                </thead>
                <tbody>
                    {gates.map((gate) => (
                        <tr key={gate._id}>
                            <td>{gate.gateNumber}</td>
                            <td>{gate.airlineName}</td>
                            <td>{gate.flightNumber}</td>
                            <td>{new Date(gate.departureTime).toLocaleString()}</td>
                            <td>{new Date(gate.arrivalTime).toLocaleString()}</td>
                            <td>
                                <button
                                    className="go-to-button" // Optional styling class
                                    onClick={() => handleGoToGate(gate)} // Call function with gate details
                                >
                                    Go To
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GatesPage;
