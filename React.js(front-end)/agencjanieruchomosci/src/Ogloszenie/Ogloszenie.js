import React from 'react';

const Ogloszenie = (props) => {
    // Accessing props directly
    return(
        <div className='Ogloszenie'>
            <p>{props.klucz}</p>
            <h2>{props.Tytul}</h2>
            <p>{props.Opis}</p>
            <div className="zdjecia-container">
                {props.Zdjecia && props.Zdjecia.slice(0, 8).map((imageUrl, index) => (
                    <img key={index} src={`Zdj/${imageUrl}`} alt={`Image ${index + 1}`} width={'200'} height={'200'}/>
                ))}
            </div>
            <p>Ulica: {props.Ulica}</p>
            <p>Cena: {props.Cena}</p>
        </div>
    );
}

export default Ogloszenie;
