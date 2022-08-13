const fs = require("fs");
const csv = require("csv");

function readCSVStations(csvPath) {
  const parser = fs
    .createReadStream(csvPath)
    .pipe(csv.parse({ from: 2 }))
    .pipe(csv.transform((record) => {
      return record.map((field) => field.trim())
    }))

  return parser;
}

function readCSVJourney(csvPath) {
  const parser = fs
    .createReadStream(csvPath)
    .pipe(csv.parse({ from: 2 }))
    .pipe(csv.transform((record) => {
      // record[6] : distance
      // record[7] : duration
      if (record[6] < 10 || record[7] < 10) return null;
      // trim each field.
      const record_trim = record.map((field) => field.trim());
      // convert datetime string to epoch time(milisecond/integer)
      record_trim[0] = new Date(record_trim[0] + '+0300').getTime();
      record_trim[1] = new Date(record_trim[1] + '+0300').getTime();
      return record_trim;
    }))

  return parser;
}

module.exports = {
  readCSVStations,
  readCSVJourney
}
