import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Search from "./components/Search.jsx";
import Profile from "./components/Profile.jsx";
import Contact from "./components/Contact.jsx";

const App = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <div className='relative z-0 bg-primary'>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
              <Navbar/>
              <Hero/>
            </div>
            <About/>
            <Search/>
            <Profile/>
            <Contact/>
          </div>
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default App;