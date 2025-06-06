import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchRestaurants from './pages/SearchRestaurants';
import NewRestaurant from './pages/NewRestaurant';

function App() {
  return (
    <Router basename="/acti3">
      <Navbar />
      <div className="container mt-4"> {}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchRestaurants />} />
          <Route path="/new" element={<NewRestaurant />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;