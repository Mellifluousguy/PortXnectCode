import React, { useContext } from 'react'
import HeroSection from './HeroSection'
import NavBar from '../NavBar'
import WhyChose from './WhyChose';
import FeaturedProjects from './FeaturedProjects';
import Slogan from './Slogan';
import Footer from '../Footer';
import { AppContent } from '../context/LoginContent';

const FrontPage = () => {
  const { userData } = useContext(AppContent);
  return (
    <div className='LandingPage'>
      <NavBar />
      <HeroSection />
      <WhyChose />
      <FeaturedProjects />
      {
        userData ?
          '' :
          <Slogan />

      }
      <Footer />
    </div>
  )
}

export default FrontPage