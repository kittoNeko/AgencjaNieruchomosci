import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Karuzela from './Karuzela';

const OgloszenieDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ogloszenie, setOgloszenie] = useState(null);
  
    useEffect(() => {
      axios.get(`https://localhost:7093/api/Ogloszenia/${id}`)
        .then(response => {
          setOgloszenie(response.data);
        })
        .catch(error => {
          console.error('Error fetching details:', error);
        });
    }, [id]);
    if (!ogloszenie) {
      return <p>Loading...</p>;
    }
  
    return (
        <div className="shadow-xl m-10 mx-auto bg-gray-300 w-4/6 p-6 rounded-md">
        <h1 className="font-bold text-3xl text-left">{ogloszenie.tytuł}</h1>
  
        {/* Row for Karuzela and Ulica/Cena */}
        <div className="flex space-x-6 mt-6">
          {/* Karuzela */}
          <div className="w-1/2">
            <Karuzela className='w-full h-full' images={ogloszenie.zdjecia} />
          </div>
  
          {/* Ulica and Cena */}
          <div className="w-1/2 flex flex-col space-y-4">
            <p className='text-xl'><strong>Ulica:</strong> {ogloszenie.ulica}</p>
            <p className='text-xl'><strong>Cena:</strong> {ogloszenie.cena}</p>
          </div>
        </div>
  
        {/* Description */}
        <div className="mt-6">
          <p className='text-lg'>{ogloszenie.opis}</p>
        </div>
  
        {/* Back button */}
        <div className="mt-6">
          <button onClick={() => navigate(-1)} className="border-black border-2 p-2 rounded-md">
            Strona Główna
          </button>
        </div>
      </div>
    );
  };
  
  export default OgloszenieDetails;