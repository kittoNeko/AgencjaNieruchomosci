import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Agencja Nieruchomości</Link>
        </div>
        <div>
          <Link to="/dodawanie" className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-200 transition">
            Dodaj ogłoszenie
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;