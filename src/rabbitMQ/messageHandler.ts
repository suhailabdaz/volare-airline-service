import { AirlineController } from '../controller/airlineController';
import { AirlineRepository } from '../repository/airlineRepository';
import { AirlineService } from '../services/airline.service';
import rabbitClient from './client';

const userRepository = new AirlineRepository();
const service = new AirlineService(userRepository);
const controller = new AirlineController(service);

export default class MessageHandler {
  static async handle(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = data;
    console.log('The operation in user service is', operation, data);

    switch (operation) {
      case 'register':
        response = await controller.register.bind(controller)(data);
        break;
      case 'create-account':
        response = await controller.create.bind(controller)(data);
        break;
      case 'login':
        response = await controller.login.bind(controller)(data);
        break;
      case 'add-flight':
        response = await controller.addFlight.bind(controller)(data);
        break;
      case 'get-flights':
        response = await controller.getFlights.bind(controller)(data);
        break;
      case 'save-flight':
        response = await controller.saveFlight.bind(controller)(data);
        break;
      case 'suspend-flight':
        response = await controller.suspendFlight.bind(controller)(data);
        break;
      case 'get-airlines':
        response = await controller.getAirlines.bind(controller)();
        break;
      case 'get-airline':
        response = await controller.getAirline.bind(controller)(data);
        break;
      case 'update-airline':
        response = await controller.updateUser.bind(controller)(data);
        break;
      case 'get-airline':
        response = await controller.getAirline.bind(controller)(data);
        break;
      case 'get-flight':
        response = await controller.getFlight.bind(controller)(data);
        break;
      default:
        response = 'Request-key notfound';
        break;
    }
    //Produce the response back to the client
    await rabbitClient.produce(response, correlationId, replyTo);
  }
}
