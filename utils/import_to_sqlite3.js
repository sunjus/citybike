const Database = require('better-sqlite3');
const { readCSVStations, readCSVJourney } = require('./read_csv');
const dbPath = '../database/data.db';
const db = new Database(dbPath);

function createTables() {
  console.log(`== Import Tables: ${dbPath}`);
  db.exec(`CREATE TABLE IF NOT EXISTS station (
    fid INTEGER NOT NULL PRIMARY KEY,
    id INTEGER NOT NULL UNIQUE,
    nimi TEXT,
    namn TEXT,
    name TEXT,
    osoite TEXT,
    adress TEXT,
    kaupunki TEXT,
    stad TEXT,
    operaattor TEXT,
    kapasiteet INTEGER,
    x TEXT,
    y TEXT
  )`);
  db.exec(`CREATE TABLE IF NOT EXISTS journey (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    departure INTEGER,
    return INTEGER,
    departure_station_id INTEGER,
    departure_station_name TEXT,
    return_station_id INTEGER,
    return_station_name TEXT,
    distance INTEGER,
    duration INTEGER
  )`);
}

async function importStations(csvPath) {
  console.log(`== Import Stations: ${csvPath}`);
  const records = readCSVStations(csvPath);
  const prepare = db.prepare('INSERT INTO station VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
  let count = 0;
  for await (const record of records) {
    prepare.run(record)
    count++;
  }
  const countDB = db.prepare('SELECT count(*) as counst FROM station').get();
  console.log("count = ", count, countDB);
}

async function importJourney(csvPath) {
  console.log(`== Import Journey: ${csvPath}`);
  const records = readCSVJourney(csvPath);
  const prepare = db.prepare(`INSERT INTO journey
    (departure,
    return,
    departure_station_id,
    departure_station_name,
    return_station_id,
    return_station_name,
    distance,
    duration)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const transaction = db.transaction(records => records.forEach((record) => prepare.run(record)))
  let recordsSub = [];
  let count = 0;
  for await (const record of records) {
    recordsSub.push(record);
    count++;
    if (count % 100000 === 0) {
      console.log(`processing ... ${count} ...`);
      if (recordsSub.length > 0) transaction(recordsSub);
      recordsSub = [];
    } 
  }
  if (recordsSub.length > 0) transaction(recordsSub);

  const countDB = db.prepare('SELECT count(*) as counst FROM journey').get();
  console.log("count = ", count, countDB);
}
  
async function importToDatabase() {
  createTables();
  await importStations('../data/726277c507ef4914b0aec3cbcfcbfafc_0.csv');
  await importJourney('../data/2021-05.csv');
  await importJourney('../data/2021-06.csv');
  await importJourney('../data/2021-06.csv');
}
  
importToDatabase();
