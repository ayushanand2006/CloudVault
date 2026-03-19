import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Security from './pages/Security';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import Documentation from './pages/Documentation';
import { Privacy, Terms, Cookies } from './pages/LegalPages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/drive" element={<Dashboard />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/register/*" element={<Register />} />
      <Route path="/account" element={<Account />} />
      
      {/* Expanded Pages */}
      <Route path="/security" element={<Security />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="/api-reference" element={<Documentation />} />
      <Route path="/community" element={<HowItWorks />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/cookies" element={<Cookies />} />
    </Routes>
  );
}

export default App;
