import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo') || '{}');

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
};

export default AdminLayout;