import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import "./index.css";
import Register from './pages/register';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />

      </Routes>
    </BrowserRouter>
  )
}
