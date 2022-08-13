import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

//  { field: 'departure', headerName: 'Departure', valueGetter: (v) => v ? (new Date(v)).toISOString(): 'N/A' },  
const stationColumns = [
  { field: 'id', headerName: 'ID' },
  { field: 'fid', headerName: 'FID' },
  { field: 'nimi', headerName: 'Nimi' },  
  { field: 'osoite', headerName: 'Osoite', width: 200 },
  { field: 'kaupunki', headerName: 'Kaupunki', width: 100 },
  { field: 'stad', headerName: 'Stad', width: 100 },
  { field: 'operaattor', headerName: 'Operaattor', width: 150 },
  { field: 'kapasiteet', headerName: 'Kapasiteet' },
  { field: 'x', headerName: 'X', width: 100 },
  { field: 'y', headerName: 'Y', width: 100 }
];

function StationList() {
  const [stationList, setStationList] = useState([]);
  const urlStation = "http://localhost:3000/api/station/list";

  useEffect(() => {
    fetch(urlStation)
    .then((response) => response.json())
    .then((data) => setStationList(data))
    .catch((err) => console.log(err))
  },[]);

  useEffect(() => {
    console.log(stationList?.station?.data)
  }, [stationList]);

  return (
    <div style = {{width: '100%', height: '100vh'}}>
      <DataGrid rows={stationList?.station?.data || []} columns={stationColumns} />
    </div>
  );
}

export default StationList;