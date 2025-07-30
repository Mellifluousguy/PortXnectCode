import React, { useContext } from 'react'
import NavBar from '../NavBar'
import AboutHero from './AboutHero'
import Footer from '../Footer'
import VisionMission from './VisioMission'
import MeetCreator from './MeetCreator'
import Ribbon from './Ribbon'
import CoreFeatures from './CoreFeatures'
import { AppContent } from '../context/LoginContent'

const AboutUs = () => {
  const { userData } = useContext(AppContent)
  return (
    <>
      <NavBar />
      <AboutHero />
      <VisionMission />
      <CoreFeatures />
      <MeetCreator />
      {
        userData ? '':
          < Ribbon />
    }
      <Footer />
    </>
  )
}

export default AboutUs