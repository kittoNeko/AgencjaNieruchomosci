import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Karuzela from './Karuzela';

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
        <Karuzela images={ogloszenie.zdjecia}/>
        <button onClick={() => navigate(-1)}>Strona Główna</button>
      </div>
    );
  };
  
  export default OgloszenieDetails;