import { Baggage, Cancelation, IAirlineService, Meals } from '../interfaces/iAirlineService';
import { IAirlineRepository } from '../interfaces/iAirlineRepository';
import { Airline } from '../model/airline.entity';
import jwt, { Secret } from 'jsonwebtoken';
import 'dotenv/config';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { generateOtp } from '../utils/generateOtp';
import { sendOtpEmail } from '../utils/emailOTP';
import { Flight } from '../model/flight.entity';

export class AirlineService implements IAirlineService {
  private repository: IAirlineRepository;

  constructor(repository: IAirlineRepository) {
    this.repository = repository;
  } 

  // helper function send otp if user is new
  async register(email: string) {
    try {
      const emailExist = await this.repository.findOne(email);
      if (!emailExist) {
        const otp = generateOtp();
        await sendOtpEmail(email, otp);
        return {
          doExist: false,
          message: 'otp send successfully',
          success: true,
          otp,
        };
      } else {
        return {
          doExist: true,
          message: 'user Exists',
          success: false,
        };
      }
    } catch (err) {
      return null;
    }
  }

  async create(airlineData: Airline) {
    try {
      const airline = await this.repository.register(airlineData);
      if (!airline) {
        throw new Error('User creation failed');
      }
      const accessToken = airline.SignAccessToken();
      const refreshToken = airline.SignRefreshToken();
      console.log({ airline, accessToken, refreshToken });

      return { airline, accessToken, refreshToken };
    } catch (err) {
      return null;
    }
  }

  async login(airlineData: {
    airline_code: string;
    airline_name: string;
    airline_password: string;
    airline_email: string;
  }) {
    try {
      // Find the airline by email
      const airline = await this.repository.findOne(airlineData.airline_email);

      // Check if airline exists
      if (!airline) {
        return { success: false, message: 'Email not found' };
      }

      // Verify credentials
      const isCodeValid = airline.airline_code === airlineData.airline_code;
      const isNameValid = airline.airline_name === airlineData.airline_name;
      const isPassword = await airline.comparePassword(
        airlineData.airline_password
      );

      if (!isCodeValid || !isNameValid || !isPassword) {
        return { success: false, message: 'Invalid credentials' };
      }

      // Sign tokens
      const accessToken = airline.SignAccessToken();
      const refreshToken = airline.SignRefreshToken();

      // Return airline data and tokens
      return { success: true, airline, accessToken, refreshToken };
    } catch (err: any) {
      console.error(err.message); // Log the error for debugging
      throw new Error(err);
    }
  }

  async addFlight(flightData: Flight) {
    try {

      const flight = await this.repository.flightRegister(flightData);
      return { flight:flight,success:true};
    } catch (err) {
      return null;
    }
  }

  async getFlights(id: string) {
    try {
      const flights = await this.repository.getFlights(id);
      return { flights:flights,success:true};
    } catch (err) {
      return null;
    }
  }
  async saveFlight(flightData:Flight) {
    try {
      const id = flightData?._id || ''
      const flights = await this.repository.FliFindByIdUpdate(id,flightData);
      return { flights:flights,success:true};
    } catch (err) {
      return null;
    }
  }

  async suspendFlight(id:string) {
    try {
      const flights = await this.repository.toggleFlightStatusAndGetAllByAirlineId(id);
      return { flights:flights,success:true};
    } catch (err) {
      return null;
    }
  }

  async getAirlines() {
    try {
      const airlines = await this.repository.getAirlines();
      return { success: true, airlines: airlines };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }

  async getAirline(id: string) {
    try {
      const airline = await this.repository.findById(id);
      return { success: true, airline_data: airline };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }


  
  async getFlight(id: string) {
    try {
      const flight = await this.repository.flightfindById(id);
      return { success: true, flight_data: flight };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }

  async allFlights() {
    try {
      const flight = await this.repository.allFlights();
      return flight;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }


  async updateUser(data: { values: any; id: string }) {
    try {
      const user = await this.repository.findByIdAndUpdate(
        data.id,
        data.values
      );
      return { success: true, user_data: user };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error resending OTP: ${error.message}`);
      }
      throw error;
    }
  }
async addBaggagePolicy(data: { airlineId: string; baggage: Baggage; }) {
  try {
    const baggagePolicy = await this.repository.addBaggagePolicy(data.airlineId,data.baggage);
    return baggagePolicy;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error resending OTP: ${error.message}`);
    }
    throw error;
  }
}

async addCancellationPolicy(data: { airlineId: string; cancellation: Cancelation; }) {
  try {
    const cancellationPolicy = await this.repository.addCancellationPolicy(data.airlineId,data.cancellation);
    return cancellationPolicy;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error resending OTP: ${error.message}`);
    }
    throw error;
  }
}

async addMeals(data: { airlineId: string; meal: Meals; }) {
  try {
    const mealsArray = await this.repository.addMeals(data.airlineId,data.meal);
    return mealsArray;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error resending OTP: ${error.message}`);
    }
    throw error;
  }
}

async getAllBaggagePolicy(airlineId: string) {
  try {
    const allBaggage = await this.repository.getAllBaggagePolicy(airlineId);
    return allBaggage;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error resending OTP: ${error.message}`);
    }
    throw error;
  }
}

async getAllCancellationPolicy(airlineId: string) {
  try {
    const allCancelation = await this.repository.getAllCancellationPolicy(airlineId);
    return allCancelation;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error resending OTP: ${error.message}`);
    }
    throw error;
  }
}


async getAllMeals(airlineId: string) {
  try {
    const allMeals = await this.repository.getAllMeals(airlineId);
    console.log(allMeals,'allmeals');
    
    return allMeals;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error resending OTP: ${error.message}`);
    }
    throw error;
  }
}

}
