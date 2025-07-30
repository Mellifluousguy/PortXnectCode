import React, { useContext } from 'react'
import Footer from '../Footer'
import NavBar from '../NavBar'
import FeaturesHero from './FeaturesHero'
import PowerFeatures from './PowerFeatures'
import ActionFeatures from './ActionFeatures'
import TrustedDevelopers from './TrustedDevelopers'
import Strip from './Strip'
import { AppContent } from '../context/LoginContent'

const Features = () => {
    const { userData } = useContext(AppContent);
    return (
        <>
            <NavBar />
            <FeaturesHero />
            <PowerFeatures />
            <ActionFeatures />
            <TrustedDevelopers />
            {
                userData ? '' :
                    <Strip />
            }
            <Footer />
        </>
    )
}

export default Features