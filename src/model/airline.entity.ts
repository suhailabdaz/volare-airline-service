export class Airline {
  constructor(
    public readonly airline_email: string,
    public readonly airline_code : string,
    public readonly airline_name: string,
    public airline_password : string,
    public readonly _id: string,
    public readonly airline_status: boolean,
    public readonly airline_image_link  : string,
  ) {}
}
