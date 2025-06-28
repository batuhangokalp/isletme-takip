import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="bg-primary text-white shadow-md w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/dashboard"
          className="text-2xl font-extrabold tracking-wide select-none"
          onClick={() => setMenuOpen(false)}
        >
          Ürün Takip
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-10 text-sm font-semibold">
          <Link
            to="/dashboard"
            className="hover:text-gray-300 transition duration-200"
          >
            Ana Sayfa
          </Link>
          <Link
            to="/urun-ekle"
            className="hover:text-gray-300 transition duration-200"
          >
            Ürün Ekle
          </Link>
          <Link
            to="/kayitlar"
            className="hover:text-gray-300 transition duration-200"
          >
            Kayıtlar
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-red-400 transition duration-200 font-semibold"
          >
            Çıkış Yap
          </button>
        </nav>

        {/* Hamburger Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition"
          aria-label="Menüyü aç/kapat"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <HiOutlineX className="w-7 h-7" />
          ) : (
            <HiOutlineMenu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-72 bg-primary bg-opacity-95 backdrop-blur-md shadow-2xl rounded-l-lg transform transition-transform duration-300 ease-in-out z-50
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <nav className="flex flex-col mt-20 px-6 space-y-8 text-lg font-semibold text-white select-none">
          {[
            { to: "/dashboard", label: "Ana Sayfa" },
            { to: "/urun-ekle", label: "Ürün Ekle" },
            { to: "/kayitlar", label: "Kayıtlar" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-4 rounded-md hover:bg-white/20 hover:text-white transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="mt-auto py-3 px-4 rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-200 font-semibold"
          >
            Çıkış Yap
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
