import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/HomePage';
import HostPage from './pages/HostPages/HostPage';
import Mpage from './pages/Messform';
import Mlogin from './pages/MessLogin';
import Spage from './pages/Studentform';
import Slogin from './pages/StudentLogin';
import ProtectedPage from './pages/protected';
import ProtectedPage2 from './pages/protected2'
import MessGallery from './pages/MessGallery';
import IndMessPage from './pages/IndMessPage';
import StudP from './pages/StudentProfile'
import './App.css'



function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/host" element={<Navigate to="/host/orders" replace />} />
        <Route path='/host/*' element={<HostPage/>}/>
        <Route path='/host/messRegistration' element={<Mpage/>}/>
        <Route path='/host/messLogin' element={<Mlogin/>}/>
        <Route path='/studentRegistration' element={<Spage/>}/>
        <Route path='/studentLogin' element={<Slogin/>}/>
        <Route path='/studentprofile' element={<StudP/>}/>
        <Route path='/protected' element={<ProtectedPage/>}/>
        <Route path='/host/protected2' element={<ProtectedPage2/>}/>
        <Route path='/mess' element={<MessGallery/>}/>
        <Route path='/indmess/:id' element={<IndMessPage/>}/>
      </Routes>
    </Router>
    </>
  )
}
 
export default App
