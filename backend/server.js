import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors'; // Import cors
import { fileURLToPath } from 'url'; // Import to handle __dirname in ES modules

import { connectDB } from "./config/db.js";
import passengerRoutes from './routes/passenger.route.js';
import gateRoutes from './routes/gates.route.js'

// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Adjust the path to your .env file if it's in the root
console.log('Loaded MongoDB URI:', process.env.MONGODB_URI);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());
app.use(express.json());

// Routes
app.use('/api/passengers', passengerRoutes);
app.use('/api/gates', gateRoutes);

// Serve static files from the React app (assumes your React app is built)
// app.use(express.static(path.join(__dirname, '../frontend')));

// The "catchall" handler: for any request that doesn't match one above, send back the React app.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
// });

// Start server and connect to database
app.listen(PORT, async () => { // Add async here
  await connectDB(); // Await the MongoDB connection
  console.log(`Server started at http://localhost:${PORT}`);
});
