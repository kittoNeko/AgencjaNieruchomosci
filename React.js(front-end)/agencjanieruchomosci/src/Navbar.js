import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Navbar = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['konto']);
  const [isOpen, setIsOpen] = useState(false);

  const Logout = () => {
    removeCookie('konto');
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const menu = [
    { nazwa: 'Dodaj ogłoszenie', link: '/dodawanie', permisja: 'DodawanieOgloszen' },
    { nazwa: 'Dodaj nowe konto', link: '/adduser', permisja: 'ZarzadzanieKontami' }
  ];

  return (
    <nav className="bg-green-600 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Agencja Nieruchomości</Link>
        </div>
        <div className="relative">
        <div className="flex items-center">
          {cookies.konto && cookies.konto.login ? (
            <div>
              <span className="text-white">Witaj {cookies.konto.login}</span>
              <button onClick={Logout} className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-200 transition ml-5">
                Wyloguj się
              </button>
              </div>
          ) : (
            <Link to="/login" className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-200 transition">
              Zaloguj się
            </Link>
          )}
          <button onClick={toggleDropdown} className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-200 transition mx-5">Menu</button>
          </div>
          {isOpen && (
            <div className="absolute left-40 mt-4 w-48 bg-white text-green-600 shadow-lg z-10">
              <div className="">
                {menu.map(
                  (item) =>
                    cookies.konto?.rola.pozwolenia.includes(item.permisja) && (
                      <Link key={item.nazwa} to={item.link} className="block px-4 py-2 text-sm border- hover:bg-green-600 hover:text-white transition">{item.nazwa}</Link>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;