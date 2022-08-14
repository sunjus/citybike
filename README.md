# City Bike App

### Description
This app gives you service for displaying data from journeys made with city bikes in the Helsinki Capital area.

For the exercise download three datasets of journey data. The data is owned by City Bike Finland.

* https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
* https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
* https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv

Also, there is a dataset that has information about Helsinki Region Transport’s (HSL) city bicycle stations.

* Dataset: https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
* License and information: https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902

### Installation
 - Clone the repository git clone https://github.com/sunjus/citybike.git
 - Batch downloads in the data folder
```
cd data
wget https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv
wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv
wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
wget https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv
```
 - Navigate into the directory cd backend
 - Install dependencies `npm install` & `node index.js`
 - Navigate into the directory cd utils
 - Install dependencies `npm install` & `node import_to_sqlite3.js`
 - Navigate into the directory cd frontend
 - Install dependencies `npm install`
 - Start the project with `npm start`

### Technologies, concept used
 - React
 - Better-sqlite3
 - Express.js
 - MaterialUI
 
### Features
#### Data import
* Import data from the CSV files to a database or in-memory storage
* Validate data before importing
* Don't import journeys that lasted for less than ten seconds
* Don't import journeys that covered distances shorter than 10 meters
#### Journey List
* List journeys
* For each journey show departure and return stations, covered distance in kilometers and duration in minutes
<img width="1437" alt="journeylist" src="https://user-images.githubusercontent.com/57226409/184528554-2207ebb9-106f-41e6-af6b-f10f3b06d784.png">

#### Station List
* List all the stations
* Link at the station name to go to Single station view
<img width="1440" alt="stationlist" src="https://user-images.githubusercontent.com/57226409/184528515-e46247d2-06ab-45c2-849e-7616eb3703e1.png">

#### Single station view
* Station name
* Station address
* Total number of journeys starting from the station
* Total number of journeys ending at the station
<img width="1435" alt="stationview" src="https://user-images.githubusercontent.com/57226409/184534246-b3b266e5-fe13-47e5-8c56-786104428662.png">
 
