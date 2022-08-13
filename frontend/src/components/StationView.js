import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

//  { field: 'departure', headerName: 'Departure', valueGetter: (v) => v ? (new Date(v)).toISOString(): 'N/A' },
function getDateString(obj) {
  const v = obj.value;
  return v ? (new Date(v)).toISOString() : 'N/A';
}

const stationViewColumns = [
  { field: 'id', headerName: 'ID' },
  { field: 'departure', headerName: 'Departure', width: 200, valueGetter: getDateString },  
  { field: 'return', headerName: 'Return', width: 200, valueGetter: getDateString },
  { field: 'departure_station_name', headerName: 'Depareure Station', width: 150 },
  { field: 'return_station_name', headerName: 'Return Station', width: 150 }
];

const StationView = () => {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const urlStationView = `http://localhost:3000/api/station/view?id=${id}`;
  
  useEffect(() => {
    fetch(urlStationView)
    .then((response) => response.json())
    .then((data) => {
    console.log(data) 
    setStation(data)
    }
    )   
    .catch((err) => console.log(err))
  },[id]);
  
  useEffect(() => {
    console.log(station?.station?.name)
  }, [station]);

  return (
    <div>
      <Container maxWidth="sm" height="80vh">
        <Box sx={{ bgcolor: '#cfe8fc', height: '10vh' }}>Station Name:{station ? station?.station?.name : <div>Loading...</div>}</Box>
        <Box sx={{ bgcolor: '#ffc0cb', height: '10vh' }}>Address: {station ? station?.station?.osoite : <div>Loading...</div>}</Box>
      </Container>
    </div>
  );
};

export default StationView;
