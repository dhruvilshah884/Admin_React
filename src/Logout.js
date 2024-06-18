import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then(response => {
        console.log(response.data); 
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
