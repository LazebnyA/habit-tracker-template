import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from 'components/Welcome';
import MyHabits from 'components/MyHabits';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/habits" element={<MyHabits />} />
      </Routes>
    </Router>
  );
}


export default App;
