import { IAirlineRepository } from '../interfaces/iAirlineRepository';
import AirlineModel, { IAirline } from '../model/schemas/airline.schema';
import { Airline } from '../model/airline.entity';
import FlightModel, { IFlight } from '../model/schemas/flight.schema';
import { Flight } from '../model/flight.entity';

export class AirlineRepository implements IAirlineRepository {
  



  


 


  register(airlineData: Airline): Promise<IAirline | null> {
    try {
      return AirlineModel.create(airlineData);
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  async findOne(email: string) : Promise<IAirline | null> {
    try {
      const user = await AirlineModel.findOne({ airline_email:email });
      return user;
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  flightRegister(flightData:Flight): Promise<IFlight | null> {
    try {
      return FlightModel.create(flightData);
    } catch (e: any) {
      throw new Error('db error');
    }
  }
  async getFlights(id: string) {
    try {
      const flights = await FlightModel.find({ airline_id: id });
      return flights;
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  async  FliFindByIdUpdate(id: string, values: Flight) {
    try {
      // Find and update the flight document by its ID
      const updatedFlight = await FlightModel.findByIdAndUpdate(
        id,
        { $set: values }, // Update the fields with new values
        { new: true } // Return the updated document
      );
  
      if (!updatedFlight) {
        throw new Error('Flight not found');
      }
  
      // Retrieve all flights with the same airline_id as the updated flight

  
      return updatedFlight
      
    } catch (e: any) {
      throw new Error(`DB error: ${e.message}`);
    }
  }

  async  toggleFlightStatusAndGetAllByAirlineId(flightId: string) {
    try {
      // Find the specific flight by its ID
      const flight = await FlightModel.findById(flightId);
  
      if (!flight) {
        throw new Error('Flight not found');
      }
  
      // Toggle the status of the specific flight
      const updatedFlight = await FlightModel.findByIdAndUpdate(
        flightId,
        { status: !flight.status }, // Toggle the status
        { new: true } // Return the updated document
      );
  
      if (!updatedFlight) {
        throw new Error('Error updating flight status');
      }
  
  
      return updatedFlight;
    } catch (e: any) {
      throw new Error(`Error: ${e.message}`);
    }
  }

  async getAirlines() {
    try {
      const users = AirlineModel.find();
      return users;
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  async allFlights(): Promise<IFlight[] | null> {
    try {
      const flights = FlightModel.find();
      return flights;
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  async findById(id: string): Promise<IAirline | null> {
    try {
      const user = await AirlineModel.findById(id);
      return user;
    } catch (e: any) {
      throw new Error('db error');
    }
  }
  async flightfindById(id: string): Promise<IFlight | null> {
    try {
      const flight = await FlightModel.findById(id);
      return flight ;
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  async findByIdAndUpdate(id: string, values: any): Promise<IAirline | null> {
    try {
      const user = await AirlineModel.findByIdAndUpdate(id, values, {
        new: true,
        runValidators: true,
      });
      return user;
    } catch (e: any) {
      throw new Error('db error');
    }
  }

  
}
