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
import MainLayout from './components/MainLayout';

import { SubscriptionProvider } from './context/SubscriptionContext';

function App() {
  return (
    <SubscriptionProvider>
      <Routes>
        <Route path="/" element={<MainLayout><Landing /></MainLayout>} />
        <Route path="/drive" element={<Dashboard />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/account" element={<MainLayout><Account /></MainLayout>} />
        
        {/* Expanded Pages */}
        <Route path="/security" element={<MainLayout><Security /></MainLayout>} />
        <Route path="/how-it-works" element={<MainLayout><HowItWorks /></MainLayout>} />
        <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
        <Route path="/docs" element={<MainLayout><Documentation /></MainLayout>} />
        <Route path="/api-reference" element={<MainLayout><Documentation /></MainLayout>} />
        <Route path="/community" element={<MainLayout><HowItWorks /></MainLayout>} />
        <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />
        <Route path="/terms" element={<MainLayout><Terms /></MainLayout>} />
        <Route path="/cookies" element={<MainLayout><Cookies /></MainLayout>} />
      </Routes>
    </SubscriptionProvider>
  );
}

export default App;
