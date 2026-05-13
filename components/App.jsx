import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import WorkTunnelHome from './WorkTunnelHome';
import AdminDashboard from './AdminDashboard';
import AdminHome from './AdminHome';
import AdminManagement from './AdminManagement';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import AdminLayout from './AdminLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<WorkTunnelHome />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/todo" element={<WorkTunnelHome />} />
        <Route path="/extensions" element={<WorkTunnelHome />} />
        <Route path="/feature" element={<WorkTunnelHome />} />
        

        {/* Admin pages with persistent navbar */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> {/* /admin */}
          <Route path="home" element={<AdminHome />} /> {/* /admin/home */}
          <Route path="admin" element={<AdminManagement />} /> {/* /admin/admin */}
          <Route path="users" element={<Users />} /> {/* /admin/users */}
          <Route path="dashboard" element={<Dashboard />} /> {/* /admin/dashboard */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;