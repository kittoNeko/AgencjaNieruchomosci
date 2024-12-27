import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DodajOgloszenie = () => {
  const navigate = useNavigate();
  const [tytul, setTytul] = useState('');
  const [opis, setOpis] = useState('');
  const [ulica, setUlica] = useState('');
  const [cena, setCena] = useState(0);
  const [zdjecia, setZdjecia] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('tytul', tytul);
    formData.append('opis', opis);
    formData.append('ulica', ulica);
    formData.append('cena', cena);
    zdjecia.forEach((zdjecie) => {
      formData.append('zdjecia', zdjecie);
    });
  
    try {
      const response = await axios.post('https://localhost:7093/api/Ogloszenia', formData);
      console.log('Response:', response);
      if (response.status >= 200 && response.status < 300) {
        console.log('Form submitted successfully');
        navigate('/');
        window.location.reload();
      } else {
        console.error('Failed to submit form, status:', response.status);
      }
    } catch (error) {
      console.error('Error posting the form data:', error);
    }
  };
return(
<div className="shadow-xl m-10 mx-auto bg-gray-200 w-4/6 p-6">
  <h1 className="font-bold text-3xl text-center mb-6">Dodaj Ogłoszenie</h1>
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="tytul" className="block text-lg">Tytul:</label>
      <input
        type="text"
        id="tytul"
        value={tytul}
        onChange={(e) => setTytul(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
    </div>
    <div>
      <label htmlFor="opis" className="block text-lg">Opis:</label>
      <textarea
        id="opis"
        value={opis}
        onChange={(e) => setOpis(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
    </div>
    <div>
      <label htmlFor="ulica" className="block text-lg">Ulica:</label>
      <input
        type="text"
        id="ulica"
        value={ulica}
        onChange={(e) => setUlica(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
    </div>
    <div>
      <label htmlFor="cena" className="block text-lg">Cena:</label>
      <input
        type="number"
        id="cena"
        value={cena}
        onChange={(e) => setCena(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
        required
      />
    </div>
    <div>
      <label htmlFor="zdjecia" className="block text-lg">Zdjecia:</label>
      <input
        type="file"
        id="zdjecia"
        onChange={(e) => setZdjecia([...zdjecia, ...Array.from(e.target.files)])}
        className="w-full px-4 py-2 border rounded-md"
        multiple
      />
    </div>
    <button type="submit" className="border-black border-2 p-2 rounded-md">Dodaj Ogloszenie</button>
  </form>
</div>);
};

export default DodajOgloszenie;
