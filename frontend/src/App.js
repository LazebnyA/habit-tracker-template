import React from 'react';
import './App.css';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from 'components/Welcome/Welcome';
import UserGuide from 'components/Welcome/UserGuide'
import MyHabits from 'components/MyHabits';
import Register from "components/User/Register";
import Signin from "components/User/Signin";
import News from "./components/News/News";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} exact={true}/>
        <Route path="/userGuide" element={<UserGuide />} exact={true}/>
        <Route path="/news" element={<News />} exact={true}/>
        <Route path="/habits" element={<MyHabits />} exact={true} />
        <Route path="/register" element={<Register />} exact={true} />
        <Route path="/signin" element={<Signin />} exact={true} />
      </Routes>
    </Router>
  );
}


export default App;
