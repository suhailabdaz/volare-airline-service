import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Airline } from "../airline.entity";

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IAirline extends Document {
  airline_name: string;
  airline_email: string;
  airline_password: string;
  status: boolean;
  role:string;
  airline_code:string;
  airline_image_link:string;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const airlineSchema: Schema<IAirline> = new mongoose.Schema(
  {
    airline_name: {
      type: String,
    },
    airline_code: {
      type: String,
    },
    
    airline_email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegex.test(value);
        },
        message: "Please enter a valid email.",
      },
      unique: true,
    },

    airline_password: {
      type: String,
    },
    airline_image_link: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password
airlineSchema.pre<IAirline>("save", async function (next) {
  if (!this.isModified("airline_password")) {
    next();
  }
  this.airline_password = await bcrypt.hash(this.airline_password || "", 10);
  next();
});

// sign access token
airlineSchema.methods.SignAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role || "airline" },
    process.env.ACCESS_TOKEN || "suhail" ,
    {
      expiresIn: "5m",
    }
  );
};

// sign refresh token
airlineSchema.methods.SignRefreshToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role || "airline" },
    process.env.REFRESH_TOKEN || "suhail",
    {
      expiresIn: "7d",
    }
  );
};

// compare password
airlineSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.airline_password);
};

const AirlineModel: Model<IAirline> = mongoose.model("Airlines", airlineSchema);
export default AirlineModel;
