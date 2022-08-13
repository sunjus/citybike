import { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JourneyList from './components/JourneyList';
import StationList from './components/StationList';
import StationView from './components/StationView';
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
          <Route path = '/station' element = {<StationList />} />
          <Route path = '/station/:id' element = {<StationView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
