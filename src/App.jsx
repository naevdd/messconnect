import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/HomePage';
import HostPage from './pages/HostPages/HostPage'
import './App.css'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/host" element={<Navigate to="/host/orders" replace />} />
        <Route path='/host/*' element={<HostPage/>}/>
      </Routes>
    </Router>
    </>
  )
}
 
export default App
