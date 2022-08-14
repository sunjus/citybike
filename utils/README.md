# Utils
* scripts to read csv and import to the database
* sqlite3 for DB

## Setup
```
cd utils
npm install
```

# Import all csv to DB
```
cd utils
rm ../database/data.db
node import_to_sqlite3.js
```
* NOTE:
  * if you run it two times without removing data.db
    * import of station cause error because of duplication.
    * Journeys are imported twice sliently.
