import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OgloszenieDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the dynamic `id` from the URL
    const [ogloszenie, setOgloszenie] = useState(null);
  
    useEffect(() => {
      // Fetch the specific "Ogloszenie" by ID
      axios.get(`https://localhost:7093/api/Ogloszenia/${id}`)
        .then(response => {
          setOgloszenie(response.data);
        })
        .catch(error => {
          console.error('Error fetching details:', error);
        });
    }, [id]);
  
    // Handle loading state
    if (!ogloszenie) {
      return <p>Loading...</p>;
    }
  
    return (
      <div>
        <h1>{ogloszenie.tytuł}</h1>
        <p>{ogloszenie.opis}</p>
        <p>Ulica: {ogloszenie.ulica}</p>
        <p>Cena: {ogloszenie.cena}</p>
        <div className="zdjecia-container">
          {ogloszenie.zdjecia && ogloszenie.zdjecia.map((imageUrl, index) => (
            <img 
              key={index} 
              src={`https://localhost:7093/Zdjecia/${imageUrl}`} 
              alt={`Image ${index + 1}`} 
              width="200" 
              height="200" 
            />
          ))}
        </div>
        <button onClick={() => navigate(-1)}>Strona Główna</button>
      </div>
    );
  };
  
  export default OgloszenieDetails;