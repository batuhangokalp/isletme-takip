import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold">
          Ürün Takip
        </Link>

        <nav className="flex space-x-6 text-sm font-semibold">
          <Link to="/dashboard" className="hover:underline">
            Ana Sayfa
          </Link>
          <Link to="/urun-ekle" className="hover:underline">
            Ürün Ekle
          </Link>
          <Link to="/kayitlar" className="hover:underline">
            Kayıtlar
          </Link>
          <button onClick={handleLogout} className="hover:underline">
            Çıkış Yap
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
