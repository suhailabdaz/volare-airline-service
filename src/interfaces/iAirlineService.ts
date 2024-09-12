import { Airline } from '../model/airline.entity';
import { Flight } from '../model/flight.entity';
import { IFlight } from '../model/schemas/flight.schema';

export interface Baggage {
    policyName: string;
    cabinLimit: number;
    luggageLimit: number;
}

export interface Cancelation{
    policyName: string;
    firstPeriodPenalty: number;
    secondPeriodPenalty: number;
    thirdPeriodPenalty: number;
}

export interface Meals{
  mealName: string;
  price: number;
}

export interface IAirlineService {
  register(email: string): any;
  create(airlineData: Airline): any;
  login(airlineData: {
    airline_name: string;
    airline_code: string;
    airline_email: string;
    airline_password: string;
  }): any;
  addFlight(flightData:Flight):any
  getFlights(id:string):any
  suspendFlight(id:string):any
  saveFlight(flightData:Flight):any
  getAirlines():any
  getAirline(id:string):any
  updateUser(data:{}):any
  getFlight(id:string):any
  allFlights():any

  addBaggagePolicy(data:{airlineId:string,baggage:Baggage}):any
  addCancellationPolicy(data:{airlineId:string,cancellation:Cancelation}):any
  addMeals(data:{airlineId:string,meal:Meals}):any
  getAllBaggagePolicy(airlineId:string):any
  getAllCancellationPolicy(airlineId:string):any
  getAllMeals(airlineId:string):any





}
