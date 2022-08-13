import { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JourneyList from './components/JourneyList';
import StationList from './components/StationList';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-header">
          Citybike
        </div>
        <Routes>
          <Route path = '/journey' element = {<JourneyList />} />
          <Route path = '/stations' element = {<StationList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
