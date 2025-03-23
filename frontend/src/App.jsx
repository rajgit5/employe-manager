import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import MyProfile from './components/Profile';

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<MyProfile />} />
            </Routes>
        </Router>
    );
};

export default App;