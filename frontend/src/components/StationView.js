import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const StationView = () => {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [nDepartures, setNDepartures] = useState(0);
  const [nReturns, setNReturns] = useState(0);
  const urlStationView = `http://localhost:3000/api/station/view?id=${id}`;
  
  useEffect(() => {
    fetch(urlStationView)
    .then((response) => response.json())
    .then((data) => {
    console.log(data) 
    setStation(data)
    setNDepartures(data)
    setNReturns(data)
    })   
    .catch((err) => console.log(err))
  },[id]);
  
  useEffect(() => {
    console.log(station?.station?.name, station?.number_of_departure)
  }, [station]);

  return (
    <div>
      <Container maxWidth="sm" height="80vh">
        <Box sx={{ bgcolor: '#ffa4b3', height: '10vh' }}>Station Name:{station ? station?.station?.name : <div>Loading...</div>}</Box>
        <Box sx={{ bgcolor: '#ffb1be', height: '10vh' }}>Address: {station ? station?.station?.osoite : <div>Loading...</div>}</Box>
        <Box sx={{ bgcolor: '#ffc0cb', height: '10vh' }}>Total number of journeys starting from the station: {station ? station?.number_of_departure : <div>Loading...</div>}</Box>
        <Box sx={{ bgcolor: '#ffd2d7', height: '10vh' }}>Total number of journeys ending at the station: {station ? station?.number_of_return : <div>Loading...</div>}</Box>
      </Container>
    </div>
  );
};

export default StationView;
