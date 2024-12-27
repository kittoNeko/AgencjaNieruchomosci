import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Ogloszenia from './Ogloszenie/Ogloszenia';
import OgloszenieDetails from './Ogloszenie/OgloszenieDetails';
import Navbar from './Navbar';
import DodajOgloszenie from './Ogloszenie/DodajOgloszenie';
import Logowanie from './Konta/Logowanie';
import { CookiesProvider, useCookies } from 'react-cookie';
import AddUser from './Konta/AddUser';

const App = () => {
  const [ogloszeniaList, setOgloszeniaList] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['konto']);

  useEffect(() => {
    console.log(cookies);
    axios.get('https://localhost:7093/api/Ogloszenia')
      .then(response => {
        console.log(response);
        setOgloszeniaList(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <CookiesProvider>
      <Router>
        <div className="App">
          <Navbar  cookies={cookies}  setCookie={setCookie}/>
          <Routes>
            <Route path="/" element={<Ogloszenia Ogloszenia={ogloszeniaList} />} />
            <Route path="/ogloszenie/:id" element={<OgloszenieDetails />} />
            <Route path='/dodawanie' element={<DodajOgloszenie />} />
            <Route path='/login' element={<Logowanie cookies={cookies}  setCookie={setCookie} />} />
            <Route path='/adduser' element={<AddUser cookies={cookies}  setCookie={setCookie} />} />
          </Routes>
        </div>
      </Router>
    </CookiesProvider>
  );
}

export default App;
