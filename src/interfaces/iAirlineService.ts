import { Airline } from '../model/airline.entity';
import { Flight } from '../model/flight.entity';
import { IFlight } from '../model/schemas/flight.schema';

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




}
