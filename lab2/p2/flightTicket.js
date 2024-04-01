class FlightTicket {
  constructor(
    seatNum,
    flightNum,
    departureAirport,
    arrivalAirport,
    travellingDate
  ) {
    this.seatNum = seatNum;
    this.flightNum = flightNum;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.travellingDate = travellingDate;
  }

  displayTicketInfo() {
    console.log(`Seat Number: ${this.seatNum}`);
    console.log(`Flight Number: ${this.flightNum}`);
    console.log(`Departure Airport: ${this.departureAirport}`);
    console.log(`Arrival Airport: ${this.arrivalAirport}`);
    console.log(`Travelling Date: ${this.travellingDate}`);
  }

  getTicketInfo() {
    return {
      seatNum: this.seatNum,
      flightNum: this.flightNum,
      departureAirport: this.departureAirport,
      arrivalAirport: this.arrivalAirport,
      travellingDate: this.travellingDate,
    };
  }

  updateTicketInfo(
    newSeatNum,
    newFlightNum,
    newDepartureAirport,
    newArrivalAirport,
    newTravellingDate
  ) {
    this.seatNum = newSeatNum;
    this.flightNum = newFlightNum;
    this.departureAirport = newDepartureAirport;
    this.arrivalAirport = newArrivalAirport;
    this.travellingDate = newTravellingDate;
  }
}

module.exports = FlightTicket;
