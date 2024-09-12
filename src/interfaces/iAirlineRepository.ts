import { IAirline } from "../model/schemas/airline.schema";
import { Airline } from "../model/airline.entity";
import { Flight } from "../model/flight.entity";
import { IFlight } from "../model/schemas/flight.schema";
import { Baggage, Cancelation, Meals } from "./iAirlineService";

export interface IAirlineRepository {
  findById(id: string): Promise<IAirline | null>;
  findOne(email:string):any;
  register(airlineData:Airline): Promise<IAirline | null>;
  flightRegister(flightData:Flight): Promise<IFlight | null>;
  getFlights(id:string):Promise<IFlight[] | null>;
  FliFindByIdUpdate(id:string,values:any):any
  toggleFlightStatusAndGetAllByAirlineId(id:string):any
  findByIdAndUpdate(id: string, values: string): Promise<IAirline | null>;
  getAirlines(): any;
  flightfindById(id: string): Promise<IFlight | null>;
  allFlights():Promise<IFlight[] | null>;

  addBaggagePolicy(airlineId :string,baggage:Baggage):Promise<Baggage | null>;
  addCancellationPolicy(airlineId:string , data:Cancelation):Promise<Cancelation | null>;
  addMeals(airlineId:string,data:Meals):Promise<Meals | null>;
  getAllBaggagePolicy(airlineId:string):Promise<Baggage[] | null>;
  getAllCancellationPolicy(airlineId:string):Promise<Cancelation[] | null>;
  getAllMeals(airlineId:string):Promise<Meals[] | null>;
}
