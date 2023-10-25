import React from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Landing from './Components/Landing';
import UpcomingEvents from './Components/UpcomingEvents';
import UserAuthentication from './Components/UserAuthentication';
// import WebSocketComponent from './Components/WebSocketComponent';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<UpcomingEvents />} />
          <Route path="/signup" element={<UserAuthentication />} />
          {/* <Route path="/success" element={<WebSocketComponent />} /> */}
        </Routes>

      </Router>
    </div>
  );
}

export default App;
