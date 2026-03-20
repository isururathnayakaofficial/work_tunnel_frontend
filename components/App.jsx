import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import WorkTunnelHome from './userDashboard'
import AdminDashboard from './AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkTunnelHome />} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
