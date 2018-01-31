// Node Dependencies
const express = require("express");
const path = require("path");
const bp = require("body-parser");
const fs = require("fs");
let app = express();

let timestamp = new Date(Date.now());

// Renamed frequently used stuff
const publicPath = path.join(__dirname, "../public");

let myLogger = (req, res, next) => {
  fs.appendFileSync(
    `log.txt`,
    `Request logged for: ${req.url} on ${timestamp}\n`
  );
  next();
};

app.use(myLogger); // (See line 2 for 'myLogger' definition)

// Serving files from ../public (See Line 14 for 'publicPath' definition)
app.use(express.static(publicPath));

// Do stuff with above stuff
app.use(bp.urlencoded({ extended: false }));

app.post(`/team-name-submitted`, (req, res, next) => {
  fs.readFile("team_names.json", function(err, data) {
    jsonData = JSON.parse(data);
    jsonData.push({ team_name: req.body.team_name, submitted_on: timestamp });
    fs.writeFileSync("team_names.json", JSON.stringify(jsonData));
  });

  res.send("Thank you for submitting your team name.");
  next();
});

app.get(`/formsubmissions`, (req, res, next) => {
  let obj = fs.readFileSync("team_names.json", "utf8");
  let parsedObj = JSON.parse(obj);
  let array = [];
  parsedObj.forEach(teamInfo => {
    array.push(`Team: ${teamInfo.team_name}`);
  });
  res.send(`${array}`);
  next();
});

// Log requests (req) to a text file

app.get("/", (req, res) => {
  res.sendStatus(451);
});

//Localhost Server Port is 3000
app.listen(3000);
