import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Spage from './pages/Studentform'
import Mpage from './pages/Messform'
import Slogin from './pages/StudentLogin'
import Mlogin from './pages/MessLogin'
import ProtectedPage from './pages/protected'
import ProtectedPage2 from './pages/protected2'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/studentRegistration' element = {<Spage/>}/>
        <Route path = '/messRegistration' element = {<Mpage/>}/>
        <Route path = '/studentLogin' element = {<Slogin/>}/>
        <Route path = '/messLogin' element = {<Mlogin/>}/>
        <Route path = '/protected' element = {<ProtectedPage/>}/>
        <Route path = '/protected2' element = {<ProtectedPage2/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
