import React from 'react'
import Navbar from '../../../components/Roles/Client/Navbar'
import MainContent from '../../../components/Roles/Client/mainContent'
import Footer from '../../../components/Shared/Footer/Footer'
import ContactUs from '../../../components/Home/ContactUs'
import ServicesContent from '../../../components/Roles/Client/ServicesContent'
import Ubication from '../../../components/Roles/Client/Ubication'

function Client() {
  return (
    <div>
      <Navbar />
      <MainContent />
      <ServicesContent />
      <ContactUs />
      <Ubication />
      <Footer />
    </div>
  )
}

export default Client