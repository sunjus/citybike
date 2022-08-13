# Utils
* scripts to read csv and import to the database
* sqlite3 for DB

# Import all csv to DB
```
rm ../database/data.db
node import_to_sqlite3.js
```
* NOTE:
  * if you run it two times without removing data.db
    * import of station will get error becaise of duplication
    * Journeys will be imported twiced sliently
