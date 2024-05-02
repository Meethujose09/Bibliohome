// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Bibliohome';
import Booklist from '../pages/Booklist/Booklist';
import Wishlist from '../pages/Wishlist/Wishlist';

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booklist" element={<Booklist />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
