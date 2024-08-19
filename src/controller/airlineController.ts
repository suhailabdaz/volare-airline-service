import { IAirlineService } from "../interfaces/iAirlineService"
import { Airline } from "../model/airline.entity";
import { Flight } from "../model/flight.entity";

export class AirlineController {
  private service: IAirlineService;

  constructor(service: IAirlineService) {
    this.service = service;
  }
 


  register = async (email:string) => {
    try {
      const response = await this.service.register(email);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };
  
  create = async (airlineData:Airline) => {
    try {
      const response = await this.service.create(airlineData);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };
  login = async (airlineData:{airline_name:string,airline_code:string,airline_email:string,airline_password:string}) => {
    try {
      const response = await this.service.login(airlineData);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  addFlight = async (flightData:Flight) => {
    try {
      const response = await this.service.addFlight(flightData);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  getFlights = async (id:string) => {
    try {
      const response = await this.service.getFlights(id);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };
  saveFlight = async (flightData:Flight) => {
    try {
      const response = await this.service.saveFlight(flightData);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  suspendFlight = async (id:string) => {
    try {
      const response = await this.service.suspendFlight(id);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  getAirlines = async () => {
    try {
      const response = await this.service.getAirlines();
      return response;
    } catch (e: any) {
      console.error(e);
    }
  };
  getAirline = async (id: string) => {
    try {
      const response = await this.service.getAirline(id);
      return response;
    } catch (e: any) {
      console.error(e);
    }
  };

  getFlight = async (id: string) => {
    try {
      const response = await this.service.getFlight(id);
      return response;
    } catch (e: any) {
      console.error(e);
    }
  };

  updateUser = async (data: { values: any; id: string }) => {
    try {
      const response = await this.service.updateUser(data);
      return response;
    } catch (e: any) {
      console.error(e);
    }
  };

  allFlights = async () => {
    try {
      const response = await this.service.allFlights();
      return response;
    } catch (e: any) {
      console.error(e);
    }
  };


  
}
