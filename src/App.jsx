import { useState } from 'react'
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Sets from './pages/Sets/Sets'
import Cards from './pages/Cards/Cards'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/Sets' element={ <Sets /> } />
      <Route path='/Cards' element={ <Cards /> } />
    </Routes>
    <Footer />
    </>
  )
}

export default App
