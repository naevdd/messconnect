import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/HomePage';
import HostPage from './pages/HostPages/HostPage';
import Mpage from './pages/Messform';
import Mlogin from './pages/MessLogin';
import Spage from './pages/Studentform';
import Slogin from './pages/StudentLogin';
import MessGallery from './pages/MessGallery';
import StudP from './pages/StudentProfile'
import IndMessPage from './pages/IndMessPage';
import './App.css'

function App() {

  const ProtectedMessRoute = ({ children }) => {
    const token = localStorage.getItem('messtoken');
    return token ? children : <Navigate to="/" />;
  };

  const PublicMessRoute = ({ children }) => {
    const token = localStorage.getItem('messtoken');
    return token ? <Navigate to="/host/orders" replace /> : children;
  };

  const ProtectedStudRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/" />;
  };

  const PublicStudRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/mess" replace /> : children;
  };

  return (
    <>
    <Router>
      <Routes>
        <Route 
          path="/"
          element={
            localStorage.getItem('messtoken') 
              ? <Navigate to="/host/orders" />
              : localStorage.getItem('token') 
              ? <Navigate to="/mess" />
              : <Homepage/>
          }
        />
        <Route path="/host" element={<Navigate to="/host/orders" replace />} />
        <Route path='/host/*' element={<ProtectedMessRoute><HostPage/></ProtectedMessRoute>}/>
        <Route path='/host/messRegistration' element={<PublicMessRoute><Mpage/></PublicMessRoute>}/>
        <Route path='/host/messLogin' element={<PublicMessRoute><Mlogin/></PublicMessRoute>}/>
        <Route path='/studentRegistration' element={<PublicStudRoute><Spage/></PublicStudRoute>}/>
        <Route path='/studentLogin' element={<PublicStudRoute><Slogin/></PublicStudRoute>}/>
        <Route path='/studentprofile' element={<ProtectedStudRoute><StudP/></ProtectedStudRoute>}/>
        <Route path='/mess' element={<ProtectedStudRoute><MessGallery/></ProtectedStudRoute>}/>
        <Route path='/indmess/:id' element={<ProtectedStudRoute><IndMessPage/></ProtectedStudRoute>}/>
      </Routes>
    </Router>
    </>
  )
}
 
export default App
