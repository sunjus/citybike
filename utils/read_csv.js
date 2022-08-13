const fs = require("fs");
const csv = require("csv");

async function readCSVStations(csvPath) {
  const parser = fs
    .createReadStream(csvPath)
    .pipe(csv.parse({ from: 2 }))

  return parser;
  /*
  for await (const record of parser) {
    console.log(record)
    break;
  }
  */
}

// readCSVStations('../data/726277c507ef4914b0aec3cbcfcbfafc_0.csv');

module.exports = {
  readCSVStations
}
