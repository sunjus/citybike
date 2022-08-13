const express = require('express');
const Database = require('better-sqlite3');
const dbPath = '../database/data.db';
const db = new Database(dbPath);

const app = express();
const port = 3000;
const columnJourney = [
  "departure",
  "return",
  "departure_station_id",
  "departure_station_name",
  "return_station_id",
  "return_station_name",
  "distance",
  "duration"
]
const columnStation = [
  "fid",
  "id",
  "nimi",
  "namn",
  "name",
  "osoite",
  "adress",
  "kaupunki",
  "stad",
  "operaattor",
  "kapasiteet",
  "x",
  "y"
]

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/journey/list', (req, res) => {
  let page = Number(req.query.page);
  if (isNaN(page) || !Number.isInteger(page) || page <= 0) {
    page = 1;
  }
  let limit = Number(req.query.limit);
  if (isNaN(limit) || !Number.isInteger(limit) || limit <= 0) {
    limit = 100;
  }

  let orderBy = req.query.order_by;
  if (!columnJourney.includes(orderBy)) {
    orderBy = 'departure';
  }
  const prepare = db.prepare(`SELECT * FROM journey ORDER BY ${orderBy} ASC LIMIT ?, ?`);
  const journeyList = prepare.all((page - 1) * limit, limit);
  res.json({
    ok: true,
    journey: {
        page: page,
        limit: limit,
        order_by: orderBy,
        data: journeyList
    }
  });
});

app.get('/api/station/list', (req, res) => {
  let page = Number(req.query.page);
  if (isNaN(page) || !Number.isInteger(page) || page <= 0) {
    page = 1;
  }
  let limit = Number(req.query.limit);
  if (isNaN(limit) || !Number.isInteger(limit) || limit <= 0) {
    limit = 100;
  }
  let orderBy = req.query.order_by;
  if (!columnStation.includes(orderBy)) {
    orderBy = 'id';
  }
  let prepare = db.prepare(`SELECT count(*) as count FROM station`);
  const {count} = prepare.get();

  prepare = db.prepare(`SELECT * FROM station ORDER BY ${orderBy} ASC LIMIT ?, ?`);
  const stationList = prepare.all((page - 1) * limit, limit);
  res.json({
    ok: true,
    station: {
      count,
      page,
      limit,
      order_by: orderBy,
      data: stationList
    }
  });
});

app.get('/api/station/count', (req, res) => {
  const prepare = db.prepare(`SELECT count(*) as count FROM station`);
  const {count} = prepare.get()
  res.json({
    ok: true,
    count
  })
})

app.get('/api/station/view', (req, res) => {
  const id = req.query.id;
  const station = db.prepare('SELECT * FROM station WHERE id = ?').get(id);
  const nDepartures = db.prepare('SELECT count(*) as count FROM journey WHERE departure_station_id = ?').get(id)?.count || 0;
  const nReturns = db.prepare('SELECT count(*) as count FROM journey WHERE return_station_id = ?').get(id)?.count || 0;
  res.json({
    ok: true,
    station: station,
    number_of_departure: nDepartures,
    number_of_return: nReturns
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
