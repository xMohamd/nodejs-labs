const http = require("http");
const fs = require("fs");
const queryString = require("querystring");
var mainHTML = "";

var mainHTML = fs.readFile(
  "../client-side/pages/main.html",
  "utf-8",
  (err, data) => {
    if (err) {
      console.error("Error: " + err);
    } else {
      mainHTML = data;
    }
  }
);
var welcomeHTML = fs.readFileSync("../client-side/pages/welcome.html", "utf-8");
var Style = fs.readFileSync("../client-side/styles/style.css", "utf-8");
var Script = fs.readFileSync("../client-side/scripts/script.js", "utf-8");
var userJSON = fs.readFileSync("../client-side/json/clients.json");

http
  .createServer((req, res) => {
    if (req.method == "GET") {
      switch (req.url) {
        case "/":
        case "/main.html":
        case "/pages/main.html":
        case "/client-side/pages/main.html":
          res.setHeader("Content-Type", "text/html");
          res.write(mainHTML);
          break;
        case "/style.css":
        case "/styles/style.css":
        case "/client-side/styles/style.css":
          res.setHeader("Content-Type", "text/css");
          res.write(Style);
          break;
        case "/script.js":
        case "/scripts/script.js":
        case "/client-side/scripts/script.js":
          res.setHeader("Content-Type", "text/javascript");
          res.write(Script);
          break;
        case "/clients.json":
        case "/json/clients.json":
        case "/client-side/json/clients.json":
          res.setHeader("Content-Type", "application/json");
          res.write(userJSON);
          break;
        default:
          if (req.url.includes("welcome.html")) {
            res.setHeader("Content-Type", "text/html");
            res.write(welcomeHTML);
          } else {
            res.setHeader("Content-Type", "text/html");
            res.write("<h1>Invalid URL!</h1>");
          }
          break;
      }
      res.end();
    } else if (req.method == "POST") {
      let parseUser = "";
      req.on("data", (data) => {
        parseUser += data;
      });

      req.on("end", () => {
        const UserData = queryString.parse(parseUser);

        const { name, mobile, address, email } = UserData;

        const newUser = {
          Name: name,
          Mobile: mobile,
          Address: address,
          Email: email,
        };

        let data = [];
        try {
          const jsonData = fs.readFileSync("../client-side/json/clients.json");
          data = JSON.parse(jsonData);
        } catch (error) {
          console.error("Error reading JSON file:", error);
        }
        data.push(newUser);

        fs.writeFileSync(
          "../client-side/json/clients.json",
          JSON.stringify(data, null, 2)
        );

        res.setHeader("Content-Type", "text/html");
        let userHtml = welcomeHTML
          .replace("{userName}", name)
          .replace("{userMobile}", mobile)
          .replace("{userAddress}", address)
          .replace("{userEmail}", email);
        res.write(userHtml);
        res.end();
      });

      req.on("error", () => {
        console.error("Error");
      });

      req.on("close", () => {
        console.log("Closed");
      });
    } else {
      req.end("Please Check Your Method [GET - POST - PUT - PATCH - DELETE]");
    }
  })
  .listen(7000, () => {
    console.log("http://localhost:7000");
  });
