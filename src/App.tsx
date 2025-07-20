import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Competitions } from './pages/Competitions';
import { Achievements } from './pages/Achievements';
import { Portfolio } from './pages/Portfolio';
import { Analytics } from './pages/Analytics';
import { Profile } from './pages/Profile';
import { PublicPortfolio } from './pages/PublicPortfolio';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthCallback } from './components/auth/AuthCallback';
import { TwentyFirstToolbar } from '@21st-extension/toolbar-react';
import { ReactPlugin } from '@21st-extension/react';

function App() {
  return (
    <AuthProvider>
      <TwentyFirstToolbar
        config={{
          plugins: [ReactPlugin],
        }}
      />
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portfolio/:slug" element={<PublicPortfolio />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* Protected routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="competitions" element={<Competitions />} />
            <Route path="achievements" element={<Achievements />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;