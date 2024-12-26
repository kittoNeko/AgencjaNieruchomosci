import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Navbar = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['konto']);
  const Logout = () =>{
    removeCookie('konto');
    window.location.reload();
  }
  return (
    <nav className="bg-green-600 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Agencja Nieruchomości</Link>
        </div>
        <div>
          {cookies.konto && cookies.konto.login ? (
            <span className='m-5'>
              <span className="m-5 text-white">Witaj {cookies.konto.login}</span>
              <button onClick={() => Logout()}  className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-200 transition">Wyloguj sie</button>
            </span>
          ) : (
            <Link to="/login" className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-gray-200 transition m-5">
              Zaloguj się
            </Link>
          )}
          {cookies.konto && cookies.konto.rola.pozwolenia.includes("DodawanieOgloszen") ? (
          <Link to="/dodawanie" className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-400 hover:text-white transition m-5">
            Dodaj ogłoszenie
          </Link>):(<div></div>)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
