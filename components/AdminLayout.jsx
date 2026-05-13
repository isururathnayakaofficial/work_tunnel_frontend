import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import './css/AdminLayout.css'; // optional styling

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminNavbar /> {/* Always visible */}
      <div className="admin-content">
        <Outlet /> {/* All nested admin pages will render here */}
      </div>
    </div>
  );
};

export default AdminLayout;