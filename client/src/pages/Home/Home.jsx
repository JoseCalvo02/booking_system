import React from 'react'

import Hero from '../../components/Home/Hero'
import Navbar from '../../components/Shared/Navbar/Navbar'
import AboutUs from '../../components/Home/AboutUs'
import Services from '../../components/Home/Services'
import ContactUs from '../../components/Home/ContactUs'
import Footer from '../../components/Shared/Footer/Footer'

export default function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Services />
            <section id="contact-us">
                <ContactUs />
            </section>
            <AboutUs />
            <Footer />
        </div>
    )
}
