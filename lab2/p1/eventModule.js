const EventEmitter = require("events");
const FlightTicket = require("../p2/flightTicket.js");

const e = new EventEmitter();

e.on("newFlight", () => {
  const newFlight = new FlightTicket(
    11,
    111,
    "LHR",
    "DXB",
    new Date().toLocaleDateString()
  );
  console.log("New flight details: ");
  newFlight.displayTicketInfo();
});

e.emit("newFlight");
