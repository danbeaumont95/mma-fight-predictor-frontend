import React from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Landing from './Components/Landing';
import UpcomingEvents from './Components/UpcomingEvents';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<UpcomingEvents />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
