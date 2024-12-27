import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = (props) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const [email, setEmail] = useState('');
  const [rola,setRola] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(rola==""){
      return;
    }
    const userData = {
      id: 0,
      login,
      haslo,
      email,
      rola: {
        id: 0,
        nazwa: rola,
        pozwolenia: []
      }
    };

    try {
      const response = await axios.post('https://localhost:7093/api/Konta', userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('User added successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="shadow-xl m-10 mx-auto bg-gray-200 w-4/6 p-6">
      <h1 className="font-bold text-3xl text-center mb-6">Zaloguj sie</h1>
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
        <div>
          <label htmlFor="rola" className="block text-lg">Rola:</label>
          <select id="rola" value={rola} onChange={(e) => setRola(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="Pracownik">Pracownik</option>
            <option value="Uzytkownik">Użytkownik</option>
          </select>
        </div>
        <button type="submit" className="border-black border-2 p-2 rounded-md">Stworz konto</button>
      </form>
    </div>);
};

export default AddUser;
