import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import MessGallery from './pages/MessGallery';
import './App.css'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/messgallery' element={<MessGallery/>}/>
      </Routes>
    </Router>
    </>
  )
}
 
export default App
