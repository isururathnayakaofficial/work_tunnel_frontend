import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import WorkTunnelHome from './WorkTunnelHome';
import AdminDashboard from './AdminDashboard';
import AdminHome from './AdminHome';
import AdminManagement from './AdminManagement';
import AdminNavbar from './AdminNavbar';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkTunnelHome />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/todo" element={<WorkTunnelHome />} />
        <Route path="/extensions" element={<WorkTunnelHome />} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/home" element={<AdminHome/>} />
        <Route path="/adminNavbar" element={<AdminNavbar/>} />
        <Route path="/admin/admin" element={<AdminManagement/>} />
        <Route path="/admin/users" element={<Users/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
