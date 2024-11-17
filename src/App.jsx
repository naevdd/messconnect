import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import Messpage from './pages/MessPage'
import './App.css'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/mess' element={<Messpage/>}/>
      </Routes>
    </Router>
    </>
  )
}
 
export default App
