import React from 'react';
import { Link } from 'react-router-dom';

const Ogloszenie = (props) => {
    // Accessing props directly
    return(
        <div className='Ogloszenie'>
            <p>{props.klucz}</p>
            <Link to={`/ogloszenie/${props.klucz}`}>
                <h2>{props.Tytul}</h2>
            </Link>
            <p>{props.Opis}</p>
            <div className="zdjecia-container">
                {props.Zdjecia && props.Zdjecia.slice(0, 8).map((imageUrl, index) => (
                    <img key={index} src={`https://localhost:7093/Zdjecia/${imageUrl}`} alt={`Image ${index + 1}`} width={'200'} height={'200'}/>
                ))}
            </div>
            <p>Ulica: {props.Ulica}</p>
            <p>Cena: {props.Cena}</p>
        </div>
    );
}

export default Ogloszenie;
