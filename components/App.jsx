import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import WorkTunnelHome from './userDashboard'
import AdminDashboard from './AdminDashboard'
import AdminHome from './adminHome'
import AdminManagement from './AdminManagement'
import AdminNavbar from "./AdminNavbar";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkTunnelHome />} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/adminNavbar" element={<AdminNavbar/>} />
        <Route path="/admin/admin" element={<AdminManagement/>} />
        <Route path="/admin/users" element={<Users/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
