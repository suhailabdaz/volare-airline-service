import { IAirlineRepository } from '../interfaces/iAirlineRepository';
import AirlineModel, { IAirline } from '../model/schemas/airline.schema';
import { Airline } from '../model/airline.entity';
import FlightModel, { IFlight } from '../model/schemas/flight.schema';
import { Flight } from '../model/flight.entity';
import { Baggage, Cancelation, Meals } from '../interfaces/iAirlineService';

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
  async addBaggagePolicy(airlineId: string, baggage: Baggage): Promise<Baggage | null> {
    try {
      const updatedAirline = await AirlineModel.findByIdAndUpdate(
        airlineId,
        { $push: { baggagePolicies: baggage } },
        { new: true }
      );
      return updatedAirline ? updatedAirline.baggagePolicies[updatedAirline.baggagePolicies.length - 1] : null;
    } catch (e: any) {
      console.error('Error adding baggage policy:', e);
      throw new Error('db error');
    }
  }

  async addCancellationPolicy(airlineId: string, data: Cancelation): Promise<Cancelation | null> {
    try {
      const updatedAirline = await AirlineModel.findByIdAndUpdate(
        airlineId,
        { $push: { cancellationPolicies: data } },
        { new: true}
      );
      return updatedAirline ? updatedAirline.cancellationPolicies[updatedAirline.cancellationPolicies.length - 1] : null;
    } catch (e: any) {
      console.error('Error adding cancellation policy:', e);
      throw new Error('db error');
    }
  }

  async addMeals(airlineId: string, data: Meals): Promise<Meals | null> {
    try {
      const updatedAirline = await AirlineModel.findByIdAndUpdate(
        airlineId,
        { $push: { meals: data } },
        { new: true}
      );
      return updatedAirline ? updatedAirline.meals[updatedAirline.meals.length - 1] : null;
    } catch (e: any) {
      console.error('Error adding meals:', e);
      throw new Error('db error');
    }
  }

  async getAllBaggagePolicy(airlineId: string): Promise<Baggage[] | null> {
    try {
      const airline = await AirlineModel.findById(airlineId);
      return airline ? airline.baggagePolicies : null;
    } catch (e: any) {
      console.error('Error fetching all baggage policies:', e);
      throw new Error('db error');
    }
  }

  async getAllCancellationPolicy(airlineId: string): Promise<Cancelation[] | null> {
    try {
      const airline = await AirlineModel.findById(airlineId);
      return airline ? airline.cancellationPolicies : null;
    } catch (e: any) {
      console.error('Error fetching all cancellation policies:', e);
      throw new Error('db error');
    }
  }

  async getAllMeals(airlineId: string): Promise<Meals[] | null> {
    try {
      const airline = await AirlineModel.findById(airlineId);
      console.log(airline ? airline.meals : null);
      
      return airline ? airline.meals : null;
    } catch (e: any) {
      console.error('Error fetching all meals:', e);
      throw new Error('db error');
    }
  }
  
  
  
  
  
}
