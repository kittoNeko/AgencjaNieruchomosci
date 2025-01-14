import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Logowanie = (props) =>{
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.get('https://localhost:7093/api/Konta');
        const users = response.data;
        console.log(users);
        const user = users.find((user) => user.login === login);
        if (user) {
          console.log('Znaleziono login:', user);
          if (user.haslo === haslo) {
            console.log('Haslo sie zgadza');
            props.setCookie('konto', {
                login: user.login,
                haslo: user.haslo,
                email: user.email,
                rola: user.rola
            }, { path: '/' });
            navigate('/');
            window.location.reload();
          } else {
            console.log('Niepoprawne haslo');
          }
        } else {
          console.log('Nie znaleziono loginu');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    <div className="shadow-xl m-10 mx-auto bg-gray-200 w-4/6 p-6">
      <h1 className="font-bold text-3xl text-center mb-6">Zaloguj sie</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login" className="block text-lg">Login:</label>
          <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} className="w-full px-4 py-2 border rounded-md" required/>
        </div>
        <div>
          <label htmlFor="haslo" className="block text-lg">Haslo:</label>
          <input type='text' id="haslo" value={haslo} onChange={(e) => setHaslo(e.target.value)} className="w-full px-4 py-2 border rounded-md" required/>
        </div>
        <button type="submit" className="border-black border-2 p-2 rounded-md">Zaloguj sie</button>
      </form>
    </div>
  );
}
export default Logowanie