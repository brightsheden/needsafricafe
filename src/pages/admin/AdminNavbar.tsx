import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/logo.png"


const AdminNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-white text-black px-6 py-3 flex justify-between items-center shadow-lg rounded-b-xl relative">
      {/* Left: Logo + Desktop Nav */}
      <div className="flex items-center gap-8">
        <Link to="/admin" className="flex items-center gap-3">
          <img src={Logo} alt="Logo" className="h-10 w-10 rounded-full shadow-md border-2 border-white" />
          <span className="font-bold text-xl hover:underline hidden md:inline">Admin Dashboard</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/admin/projects" className="hover:underline">Projects</Link>
          <Link to="/admin/donations" className="hover:underline">Donations</Link>
          {/* <Link to="/admin/team" className="hover:underline">Team</Link> */}
        </div>
      </div>
      {/* Mobile Hamburger */}
      <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-white text-black flex flex-col items-center gap-6 py-6 z-50 shadow-lg rounded-b-xl md:hidden">
          <Link to="/admin" className="font-bold text-xl hover:underline flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <img src={Logo} alt="Logo" className="h-10 w-10 rounded-full shadow-md border-2 border-white" />
            Admin Dashboard
          </Link>
          <Link to="/admin/projects" className="hover:underline" onClick={() => setMobileOpen(false)}>Projects</Link>
          <Link to="/admin/donations" className="hover:underline" onClick={() => setMobileOpen(false)}>Donations</Link>
          {/* <Link to="/admin/team" className="hover:underline" onClick={() => setMobileOpen(false)}>Team</Link> */}
          <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="bg-primary text-white px-4 py-2 rounded hover:bg-gray-100 font-semibold">Logout</button>
        </div>
      )}
      {/* Desktop Logout */}
      <button onClick={handleLogout} className="bg-primary text-white px-4 py-2 rounded hover:bg-gray-100 font-semibold hidden md:block">Logout</button>
    </nav>
  );
};

export default AdminNavbar;