import { useEffect } from 'react';
import './App.css';

function App() {
  const url = "http://localhost:3000/api/journey/list";
  useEffect(() => {
    fetch(url)
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
  },[])
  return (
    <div className="App">
      <header className="App-header">
        CITYBIKE
      </header>
    </div>
  );
}

export default App;
