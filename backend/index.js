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

app.get('/api/journey/list', (req, res) => {
  let page = Number(req.query.page);
  if (isNaN(page) || !Number.isInteger(page) || page <= 0) {
    page =1;
  }
  let limit = Number(req.query.limit);
  if (isNaN(limit) || !Number.isInteger(limit) || limit <= 0) {
    limit = 100;
  }

  let orderBy = req.query.orderby;
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
