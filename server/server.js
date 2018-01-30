// Node Dependencies
const express = require("express");
const path = require("path");
const bp = require("body-parser");
const fs = require("fs");
let app = express();

let timestamp = new Date(Date.now());

let teamJson = () => {
  return fs.readFile(
    path.join(__dirname, `../team_names.json`),
    {
      encoding: "UTF-8"
    },
    (err, res) => {
      let teams = JSON.parse(res);
      return teams;
    }
  );
};

let teamSubmits = teamJson;

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
    // console.log('data = ', data)
    jsonData = JSON.parse(data);
    // console.log('parsed data =', jsonData)
    jsonData.push({ team_name: req.body.team_name, submitted_on: timestamp });
    fs.writeFileSync("team_names.json", JSON.stringify(jsonData));
  });

  // console.log(req.body.team_name);
  // teamSubmits.push({
  //         team_name: req.body.team_name,
  //         submitted_on: timestamp
  //     })

  //     console.log(teamSubmits);
  //   fs.appendFileSync(`team_names.json`, `${JSON.stringify({
  //       team_name: req.body.team_name,
  //       submitted_on: timestamp
  //   })},\n`);
  res.send("Thank you for submitting your team name.");
  next();
});

app.get(`/formsubmissions`, (req, res, next) => {
  let obj = fs.readFileSync("team_names.json", 'utf8');
    console.log(obj);
  //       fs.readFile(`team_names.json`,
  //     {
  //       encoding: "UTF-8"
  //     },
  //     (err, res) => {
  //        res.send(`${JSON.parse(res)}`);
  //     //   res.send(`${teams}`);
  //     }
  //   )

  // let info = obj.map(team => {
  //     return (
  //         `Team: ${team.team_name} Submitted On: ${team.submitted_on}`
  //     )
  // })
//   let array = [];
//   obj.map(teamInfo => {
//     array.push(`Team: ${teamInfo}`);
//   });

//   console.log(array)
  res.send(`${obj}`);
  next();
});

// Log requests (req) to a text file

app.get("/", (req, res) => {
  res.sendStatus(451);
});

//Localhost Server Port is 3000
app.listen(3000);
