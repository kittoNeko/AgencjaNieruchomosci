import React from 'react';

const Ogloszenie = (props) => {
    // Accessing props directly
    return(
        <div className='Ogloszenie'>
            <h2>{props.Tytul}</h2>
            <p>{props.Opis}</p>
            <p>Ulica: {props.Ulica}</p>
            <p>Cena: {props.Cena}</p>
        </div>
    );
}

export default Ogloszenie;
