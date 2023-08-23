import React from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Landing from './Components/Landing';
import UpcomingEvents from './Components/UpcomingEvents';
import Pricing from './Components/Pricing';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<UpcomingEvents />} />
          <Route path="/pricing" element={<Pricing />} />

        </Routes>

      </Router>
      {/* <Landing /> */}
    </div>
  );
}

export default App;
