import { IAirlineService } from "../interfaces/IAirlineInterface"

export class AirlineController {
  private service: IAirlineService;

  constructor(service: IAirlineService) {
    this.service = service;
  }
 


  login = async (data : {name:string,password:string}) => {
    try {
      const response = await this.service.login(data);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

  register = async (data : {name:string,password:string}) => {
    try {
      const response = await this.service.register(data);
      return response;
    } catch (e: any) {
      console.log(e);
    }
  };

}
