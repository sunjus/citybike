import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const stationColumns = [
  { field: 'id', headerName: 'ID' },
  { field: 'fid', headerName: 'FID' },
  { field: 'nimi', headerName: 'Nimi', 
    renderCell: (props) => (<Link to={`/station/${props.row.id}`}>{props.value}</Link>)  
  },  
  { field: 'osoite', headerName: 'Osoite', width: 200 },
  { field: 'kaupunki', headerName: 'Kaupunki', width: 100 },
  { field: 'stad', headerName: 'Stad', width: 100 },
  { field: 'operaattor', headerName: 'Operaattor', width: 150 },
  { field: 'kapasiteet', headerName: 'Kapasiteet' },
  { field: 'x', headerName: 'X', width: 100 },
  { field: 'y', headerName: 'Y', width: 100 }
];

function usePagedData(url, setData) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  
  useEffect(() => {
    console.log('DEBUG: ', `${url}?page=${page+1}&limit=${pageSize}`);
    fetch(`${url}?page=${page}&limit=${pageSize}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err))
  }, [page, pageSize]);
  return {page, pageSize, setPage, setPageSize}
}

function StationList() {
  const [stationList, setStationList] = useState([]);
  const baseUrl = "http://localhost:3000/api"
  const urlStation = `${baseUrl}/station/list`;
  const {page, pageSize, setPage, setPageSize} = usePagedData(urlStation, setStationList);
  
  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={stationList?.station?.data || []}
          rowCount={stationList?.station?.count || 0}
          columns={stationColumns}
          pagination
          paginationMode="server"
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
        </div>
      </div>
    </div>
  )
}

export default StationList;