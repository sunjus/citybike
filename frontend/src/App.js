import { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './App.css';

//  { field: 'departure', headerName: 'Departure', valueGetter: (v) => v ? (new Date(v)).toISOString(): 'N/A' },
function getDateString(obj) {
  const v = obj.value;
  return v ? (new Date(v)).toISOString() : 'N/A';
}

const journeyColumns = [
  { field: 'id', headerName: 'ID' },
  { field: 'departure', headerName: 'Departure', valueGetter: getDateString },  
  { field: 'return', headerName: 'Return', valueGetter: getDateString },
  { field: 'departure_station_name', headerName: 'Depareure Station' },
  { field: 'return_station_name', headerName: 'Return Station' },
  { field: 'distance', headerName: 'Distance [m]' },
  { field: 'duration', headerName: 'Duration [s]' }
];

function App() {
  const [journeyList, setJourneyList] = useState(null);
  const url = "http://localhost:3000/api/journey/list";
  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((data) => setJourneyList(data))
    .catch((err) => console.log(err))
  },[])

  useEffect(() => {
    console.log(journeyList?.journey?.data);
  }, [journeyList])
  return (
    <div className="App">
      <header className="App-header">
        CITYBIKE
      </header>
      <main>
        <div style={{ height: 800, width: '100%' }}>
          <DataGrid rows={journeyList?.journey?.data || []} columns={journeyColumns} />
        </div>
      </main>
    </div>
  );
}

export default App;
