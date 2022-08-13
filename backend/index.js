const express = require('express');
const Database = require('better-sqlite3');
const dbPath = '../database/data.db';
const db = new Database(dbPath);

const app = express();
const port = 3000;

app.get('/api/journey/list', (req, res) => {
  let page = Number(req.query.page);
  if (isNaN(page) || !Number.isInteger(page) || page <= 0) {
    page =1;
  }
  let limit = Number(req.query.limit);
  if (isNaN(limit) || !Number.isInteger(limit) || limit <= 0) {
    limit = 100;
  }
  const prepare = db.prepare('SELECT * FROM journey ORDER BY departure ASC LIMIT ?, ?');
  const journeyList = prepare.all((page - 1) * limit, limit);
  res.json({
    ok: true,
    journey: {
        page: page,
        limit: limit,
        data: journeyList
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
