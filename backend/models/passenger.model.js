
import mongoose from 'mongoose';

const passengerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    passportNumber: {
      type: String,
      required: true,
      unique: true,
    },
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },
    ticketDetails: {
      airlineName: {
        type: String,
        required: true,
      },
      flightNumber: {
        type: String,
        required: true,
      },
      seatNumber: {
        type: String,
        required: true,
      },
      departureTime: {
        type: Date,
        required: true,
      },
      arrivalTime: {
        type: Date,
        required: true,
      },
      gateNumber: {
        type: String,
        required: true,
      },
      gateChecked:{
        type:Boolean,
        default:false,
        required:true
      },
    },
    contactDetails: {
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    luggageDetails: {
      totalWeight: {
        type: Number,
        default: 0, // Default value if not provided
      },
      bags: {
        type: [Number],
        default: [], // Default value if not provided
      },
    },
  }, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  });
  
const Passenger = mongoose.model('Passenger', passengerSchema);

export default Passenger;
