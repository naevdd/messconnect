import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import MessGallery from './pages/MessGallery';
import IndMessPage from './pages/IndMessPage';
import './App.css'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/messgallery' element={<MessGallery/>}/>
        <Route path='/indmess/:messname' element={<IndMessPage/>}/>
      </Routes>
    </Router>
    </>
  )
}
 
export default App
