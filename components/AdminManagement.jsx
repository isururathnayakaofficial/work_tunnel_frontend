// AdminManagement.jsx
import React, { useState, useEffect } from 'react';
import './css/AdminManagement.css';

const BASE_URL = "http://localhost:8081/api/admin";

const AdminManagement = () => {

  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    id: null, // ✅ DB id
    adminName: '',
    email: '',
    contact: '',
    password: '',
    roleName: 'Admin',
  });
  const [editId, setEditId] = useState(null);

  // ✅ FETCH ADMINS
  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${BASE_URL}/getAll`);
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  // ✅ LOAD ON START
  useEffect(() => {
    fetchAdmins();
  }, []);

  // ✅ HANDLE INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      roleName: e.target.value
    }));
  };

  // ✅ RESET FORM
  const resetForm = () => {
    setFormData({
      id: null,
      adminName: '',
      email: '',
      contact: '',
      password: '',
      roleName: 'Admin',
    });
    setEditId(null);
  };

  // ✅ ROW CLICK → LOAD DATA + CHANGE BUTTON
  const handleRowClick = (admin) => {
    setFormData({
      id: admin.id, // ✅ important for update/delete
      adminName: admin.adminName || '',
      email: admin.email || '',
      contact: admin.contact || '',
      password: '', // do NOT load password
      roleName: admin.roleName || 'Admin',
    });
    setEditId(admin.id); // triggers Update mode
  };

  // ✅ SAVE / UPDATE
  const handleSave = async () => {
    if (!formData.adminName || !formData.email || !formData.contact) {
      alert('Please fill in all required fields.');
      return;
    }

    if (editId === null && !formData.password) {
      alert('Password is required for new admins.');
      return;
    }

    try {
      let response;
      const payload = { ...formData };

      // Remove empty password for update
      if (editId !== null && !formData.password) {
        delete payload.password;
      }

      if (editId === null) {
        // CREATE
        response = await fetch(`${BASE_URL}/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        // UPDATE
        response = await fetch(`${BASE_URL}/update/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        alert(editId !== null ? "Admin updated!" : "Admin saved!");
        fetchAdmins();
        resetForm();
      } else {
        const err = await response.text();
        console.error("Save/Update error:", err);
        alert("Operation failed!");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Server error!");
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Admin deleted!");
        fetchAdmins();
        if (editId === id) resetForm();
      } else {
        const err = await response.text();
        console.error("Delete error:", err);
        alert("Delete failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error!");
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="admin-management-container">
      <AdminNavbar />
      <h1 className="page-title">Admin Management</h1>

      <div className="form-card">
        <h2>{editId !== null ? 'Edit Admin' : 'Add New Admin'}</h2>

        <div className="form-grid">

          <div className="form-group">
            <label>Admin Name *</label>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Contact *</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Password {editId !== null ? '(optional)' : '*'}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={editId !== null ? 'New password (optional)' : ''}
            />
          </div>

          <div className="form-group">
            <label>Role Name *</label>
            <select value={formData.roleName} onChange={handleRoleChange}>
              <option value="Admin">Admin</option>
              <option value="SuperAdmin">SuperAdmin</option>
            </select>
          </div>

        </div>

        <div className="form-actions">
          <button className="btn-save" onClick={handleSave}>
            {editId !== null ? 'Update' : 'Save'}
          </button>

          {editId !== null && (
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <h2>Existing Admins</h2>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan="5">No admins found.</td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr
                  key={admin.id ?? admin.email} // ✅ safe unique key
                  onClick={() => handleRowClick(admin)}
                  className="clickable-row"
                >
                  <td>{admin.adminName}</td>
                  <td>{admin.email}</td>
                  <td>{admin.contact}</td>
                  <td>{admin.roleName}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(admin.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminManagement;