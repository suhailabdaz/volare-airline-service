import mongoose, { Document, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Define the Seat interface
interface Seat {
  number: string;
  position: 'window' | 'middle' | 'aisle';
  isAvailable: boolean;
}

// Define the Row interface
interface Row {
  row: number;
  seats: Seat[];
}

// Define the SeatLayout interface
interface SeatLayout {
  economyClass: Row[];
  businessClass: Row[];
  firstClass: Row[];
}

// Define the Flight interface
export interface IFlight extends Document {
  flight_code: string;
  manufacturer: string;
  economy_seats: number;
  business_seats: number;
  first_class_seats: number;
  status: boolean;
  airline_id: mongoose.Schema.Types.ObjectId;
  seatLayout: SeatLayout;
}

// Define the Seat schema
const seatSchema = new mongoose.Schema({
  number: { type: String, required: true },
  position: { type: String, enum: ['window', 'middle', 'aisle'], required: true },
  isAvailable: { type: Boolean, default: true }
});

// Define the Row schema
const rowSchema = new mongoose.Schema({
  row: { type: Number, required: true },
  seats: [seatSchema]
});

const seatLayoutSchema = new mongoose.Schema({
  economyClass: [rowSchema],
  businessClass: [rowSchema],
  firstClass: [rowSchema]
});

const flightSchema: Schema<IFlight> = new mongoose.Schema(
  {
    flight_code: {
      type: String,
      required: [true, "Flight code is required"], 
    },
    manufacturer: {
      type: String,
      required: [true, "Manufacturer is required"], 
    },
    economy_seats: {
      type: Number,
      required: [true, "Economy seats are required"], 
    },
    business_seats: {
      type: Number,
      required: [true, "Business seats are required"], 
    },
    first_class_seats: {
      type: Number,
      required: [true, "First class seats are required"], 
    },
    airline_id: {
      type: Schema.Types.ObjectId, 
      ref: "Airlines", 
      required: [true, "Airline ID is required"], 
    },
    status: {
      type: Boolean, 
      default: true
    },
    seatLayout: {
      type: seatLayoutSchema,
      required: [true, "Seat layout is required"]
    }
  },
  {
    timestamps: true, 
  }
);

const FlightModel: Model<IFlight> = mongoose.model("Flight", flightSchema);
export default FlightModel;