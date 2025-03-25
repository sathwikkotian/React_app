import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Import CSS file

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <h1 className="admin-heading">Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage products, users, and orders.</p>

      <div className="admin-button-container">
        <Link to="/admin/add-product">
          <button className="admin-button">➕ Add New Product</button>
        </Link>
        <Link to="/admin/manage-products">
          <button className="admin-button">📦 Manage Products</button>
        </Link>
        <Link to="/admin/manage-orders">
          <button className="admin-button">📜 Manage Orders</button>
        </Link>
        <Link to="/admin/manage-users">
          <button className="admin-button">👥 Manage Users</button>
        </Link>
      </div>

      <button className="admin-logout-button" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}

export default AdminDashboard;
