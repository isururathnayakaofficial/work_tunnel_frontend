// Users.jsx
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../AdminNavbar';
import '../css/Users.css';

const BASE_URL = "http://localhost:8081/auth";

const Users = () => {
  const [users, setUsers] = useState([]);

  // ✅ FETCH USERS FROM BACKEND
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAll`);
      const data = await response.json();

      console.log("Fetched Users:", data);

      setUsers(data); // assuming backend returns List<UserDTO>
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // ✅ LOAD DATA ON PAGE LOAD
  useEffect(() => {
    (async () => {
      await fetchUsers();
    })();
  }, []);

  // ✅ DELETE USER
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // remove from UI without reloading
        setUsers(users.filter(user => user.id !== id));
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users-container">
      <AdminNavbar />

      <div className="stats-card">
        <h3>Total Users</h3>
        <p className="stats-number">{users.length}</p>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Profession</th>
              <th>Contacts</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Profession">{user.profession}</td>
                <td data-label="Contacts">{user.contacts}</td>
                <td data-label="Action">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-message">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Users;