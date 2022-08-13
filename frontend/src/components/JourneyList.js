import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

//  { field: 'departure', headerName: 'Departure', valueGetter: (v) => v ? (new Date(v)).toISOString(): 'N/A' },
function getDateString(obj) {
  const v = obj.value;
  return v ? (new Date(v)).toISOString() : 'N/A';
}

function getDistanceString(obj) {
  const v = obj.value;
  if (!v) return 'N/A';
  return `${(v/1000).toFixed(2)} km`
}

const journeyColumns = [
  { field: 'id', headerName: 'ID' },
  { field: 'departure', headerName: 'Departure', width: 200, valueGetter: getDateString },  
  { field: 'return', headerName: 'Return', width: 200, valueGetter: getDateString },
  { field: 'departure_station_name', headerName: 'Depareure Station', width: 150 },
  { field: 'return_station_name', headerName: 'Return Station', width: 150 },
  { field: 'distance', headerName: 'Distance', valueGetter: getDistanceString },
  { field: 'duration', headerName: 'Duration [s]', valueGetter: (v) => `${v.value} s` }
];

function JourneyList() {
  const [journeyList, setJourneyList] = useState(null);
  const urlJourney = "http://localhost:3000/api/journey/list";

  useEffect(() => {
    fetch(urlJourney)
    .then((response) => response.json())
    .then((data) => setJourneyList(data))
    .catch((err) => console.log(err))
  },[]);

  useEffect(() => {
    console.log(journeyList?.journey?.data)
  }, [journeyList]);

  return (
    <div style = {{width: '100%', height: '100vh'}}>
      <DataGrid rows={journeyList?.journey?.data || []} columns={journeyColumns} />
    </div>
  );
}

export default JourneyList;