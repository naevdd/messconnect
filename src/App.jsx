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
import StudP from './pages/StudentProfile'
import IndMessPage from './pages/IndMessPage';
import './App.css'



function App() {

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/host/messLogin" />;
  };

  const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/host/orders" replace /> : children;
  };

  return (
    <>
    <Router>
      <Routes>
        <Route 
          path="/"
          element={
            localStorage.getItem('token') 
              ? <Navigate to="/host/orders" />
              : <Homepage/>
          }
        />
        <Route path="/host" element={<Navigate to="/host/orders" replace />} />
        <Route path='/host/*' element={<ProtectedRoute><HostPage/></ProtectedRoute>}/>
        <Route path='/host/messRegistration' element={<PublicRoute><Mpage/></PublicRoute>}/>
        <Route path='/host/messLogin' element={<PublicRoute><Mlogin/></PublicRoute>}/>
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
