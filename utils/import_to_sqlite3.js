const Database = require('better-sqlite3');
const { readCSVStations } = require('./read_csv');
const db = new Database('../database/data.db');

function createTables() {
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
    )
  `);
}

async function importStations() {
  const records = readCSVStations('../data/726277c507ef4914b0aec3cbcfcbfafc_0.csv');
  const prepare = db.prepare('INSERT INTO station VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
  let count = 0;
  for await (const record of records) {
    prepare.run(record)
    count++;
  }
  const countDB = db.prepare('SELECT count(*) as counst FROM station').get();
  console.log("count = ", count, countDB);
}

createTables();
importStations();
