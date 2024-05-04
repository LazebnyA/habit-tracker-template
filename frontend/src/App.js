import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from 'components/Welcome';
import MyHabits from 'components/MyHabits';
import Register from "./components/User/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/habits" element={<MyHabits />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}


export default App;
