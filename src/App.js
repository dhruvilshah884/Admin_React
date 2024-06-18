import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import AdminForm from './AdminForm';
import User from './User';
import Navbar from './Navbar';
import Cart from './Cart';
import Success from './Success'
import Table from './AdminTable'
import EditForm from './AdminEdit'
import UserData from './UserData'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminForm />} />
        <Route path="/table" element={<Table />} />
        <Route path="/user" element={<User />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="/userData" element={<UserData />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
