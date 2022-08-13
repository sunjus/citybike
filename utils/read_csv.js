const fs = require("fs");
const csv = require("csv");

function readCSVStations(csvPath) {
  const parser = fs
    .createReadStream(csvPath)
    .pipe(csv.parse({ from: 2 }))

  return parser;
}

module.exports = {
  readCSVStations
}
