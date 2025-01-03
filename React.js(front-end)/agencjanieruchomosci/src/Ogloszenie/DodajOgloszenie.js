import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DodajOgloszenie = () => {
  const navigate = useNavigate();
  
  // Form state
  const [tytul, setTytul] = useState('');
  const [opis, setOpis] = useState('');
  const [ulica, setUlica] = useState('');
  const [cena, setCena] = useState('');
  const [zdjecia, setZdjecia] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object
    const formData = new FormData();
    formData.append('tytul', tytul);
    formData.append('opis', opis);
    formData.append('ulica', ulica);
    formData.append('cena', cena);
  
    // Append images to the FormData
    zdjecia.forEach((zdjecie) => {
      formData.append('zdjecia', zdjecie);
    });
  
    try {
      // Make the POST request to the API without manually setting the Content-Type
      const response = await axios.post('https://localhost:7093/api/Ogloszenia', formData);
  
      // Log the response to see what we get
      console.log('Response:', response);
      
      // Handle successful response
      if (response.status >= 200 && response.status < 300) {
        console.log('Form submitted successfully');
        navigate('/'); // Redirect to homepage
        window.location.reload();
      } else {
        console.error('Failed to submit form, status:', response.status);
      }
    } catch (error) {
      // Handle error
      console.error('Error posting the form data:', error);
    }
  };

  return (
    <div className="shadow-xl m-10 mx-auto bg-gray-200 w-4/6 p-6">
      <h1 className="font-bold text-3xl text-center mb-6">Dodaj Ogloszenie</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
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

        {/* Description */}
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

        {/* Street */}
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

        {/* Price */}
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

        {/* Images */}
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

        {/* Submit Button */}
        <button type="submit" className="border-black border-2 p-2 rounded-md">Dodaj Ogloszenie</button>
      </form>
    </div>
  );
};

export default DodajOgloszenie;
