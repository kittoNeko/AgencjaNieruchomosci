import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Rejestracja = (props) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const [email, setEmail] = useState('');
  const [rola,setRola] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const validationResponse = await axios.get(
          `https://localhost:7093/api/Konta/check?login=${login}&email=${email}`
        );
  
        if (validationResponse.data.exists) {
          alert("taki uzytkownik istnieje");
          return;
        }

        const userData = {
          id: 0,
          login,
          haslo,
          email,
          rola: {
            id: 3,
            nazwa: "Uzytkownik",
            pozwolenia: []
          }
        };
        const response = await axios.post('https://localhost:7093/api/Konta', userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        console.log('User added successfully:', response.data);
        navigate('/');
      } catch (error) {
        console.error('Error:', error);
        setError('Wystąpił błąd podczas tworzenia użytkownika.');
      }
  };

  return (
    <div className="shadow-xl m-10 mx-auto bg-gray-200 w-4/6 p-6">
      <h1 className="font-bold text-3xl text-center mb-6">Zarejestruj sie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login" className="block text-lg">Login:</label>
          <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} className="w-full px-4 py-2 border rounded-md" required />
        </div>
        <div>
          <label htmlFor="haslo" className="block text-lg">Haslo:</label>
          <input type='text' id="haslo" value={haslo} onChange={(e) => setHaslo(e.target.value)} className="w-full px-4 py-2 border rounded-md" required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg">Email:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md" required />
        </div>
        <button type="submit" className="border-black border-2 p-2 rounded-md">Zarejestruj się</button>
      </form>
    </div>);
};

export default Rejestracja;
