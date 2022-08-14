import { Link } from 'react-router-dom';
  
export default function NavBar() {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <Link to='/journey' style={{textDecorationLine: 'none', color: 'white'}}>CITYBIKE</Link>
      </div>
      <div>
        <Link to='/journey' style={{textDecorationLine: 'none', color: 'white', padding: '10px', fontSize: 'calc(5px + 2vmin)'}}>journey</Link>
        <Link to='/station' style={{textDecorationLine: 'none', color: 'white', fontSize: 'calc(5px + 2vmin)'}}>station</Link>
      </div>
    </div>
  );
}