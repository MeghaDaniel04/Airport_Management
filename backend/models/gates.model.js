import mongoose from "mongoose";

const gateSchema = new mongoose.Schema({
    gateNumber: {
        type: String,
        required: true
    },
    airlineName: {
        type: String,
        required: true
    },
    flightNumber: {
        type: String,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true        
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
})

const Gates= mongoose.model('Gates',gateSchema)

export default Gates;