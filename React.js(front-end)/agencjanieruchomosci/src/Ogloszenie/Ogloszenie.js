import React from 'react';
import { Link } from 'react-router-dom';
  
const Ogloszenie = (props) => {
    return (
        <div className="shadow-xl m-10 mx-auto bg-gray-300 w-4/6 p-6">
        <div className="text-center mb-6">
          <Link to={`/ogloszenie/${props.klucz}`}>
            <h2 className="font-bold text-3xl text-left">{props.Tytul}</h2>
          </Link>
        </div>
        <div className="flex space-x-6">
          <div className="w-3/6">
            <img
              className="w-full h-60 object-cover"
              src={`https://localhost:7093/Zdjecia/${props.Zdjecia[0]}`}
              alt="Ogloszenie"
            />
          </div>
          <div className="w-2/3 max-h-60 overflow-hidden">
            <p className="line-clamp-6  mb-4 text-lg">{props.Opis}</p>
            <Link to={`/ogloszenie/${props.klucz}`}>
                <button className='border-black border-2 p-2 rounded-md'>Zobacz więcej</button>
            </Link>
          </div>
          <div className="w-1/6">
            <p><strong>Ulica:</strong> {props.Ulica}</p>
            <p><strong>Cena:</strong> {props.Cena}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Ogloszenie;
