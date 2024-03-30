const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const params = url.split("/");
  const operation = params[1];
  const numbers = params.slice(2).map(Number);
  // console.log(numbers);
  if (numbers.some(isNaN)) {
    res.statusCode = 400;
    res.end("<h1>Invalid input</h1>");
    return;
  }

  let result;
  switch (operation) {
    case "add":
      result = numbers.reduce((accumulator, number) => accumulator + number, 0);
      break;
    case "sub":
      result = numbers.reduce((accumulator, number) => accumulator - number);
      break;
    case "mul":
      result = numbers.reduce((accumulator, number) => accumulator * number, 1);
      break;
    case "div":
      if (numbers.slice(1).some((number) => number === 0)) {
        res.statusCode = 400;
        res.end("<h1>Cannot divide by zero</h1>");
        return;
      }
      result = numbers.reduce((accumulator, number) => accumulator / number);
      break;
    default:
      res.statusCode = 400;
      res.end("<h1>Invalid operation</h1>");
      return;
  }

  const logEntry = `${new Date().toISOString()} - ${operation} ${numbers.join(
    " "
  )} = ${result}\n`;
  fs.appendFile("calculations.log", logEntry, (error) => {
    if (error) throw error;
    res.statusCode = 200;
    res.end(
      `<h1>The result of ${operation} ${numbers.join(" ")} is ${result}</h1>`
    );
  });
});

const port = 7000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
