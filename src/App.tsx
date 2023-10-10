import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Headercomp/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import Slider from './slider/Slider';
import About from './components/AboutUs/About';
import Contact from './components/ContactPage/Contact';
import MainCompo from './components/FilmShowCase/MainCompo';
import Detail from './components/FilmDetail/Detail';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import Add from './components/Dashboard/AddFilm/Add';
import Update from './components/Dashboard/UpdateFilm/Update';
import Protected from './components/firebase/ProtectedComp';

function App() {
  const location = useLocation();
  const showSlider = location.pathname === '/';
  return (
    <div className="App">
      <Header />
      {showSlider && <Slider />}
      <Routes>
        <Route path="/" element={<MainCompo />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Add" element={<Protected><Add /></Protected>} />
        <Route path="/Update/:id" element={<Protected><Update /></Protected>} />

        {/* <Route path="/Add" element={<Protected><Add /></Protected>} />
        <Route path='/Dashboard' element={<Protected><Dashboard /></Protected>} />
        <Route path='/Update/:id' element={<Protected><Update /></Protected>} />
        <Route path='/Login' element={<Login />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
