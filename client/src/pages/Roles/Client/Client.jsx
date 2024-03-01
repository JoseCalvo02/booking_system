import React from 'react'
import Navbar from '../../../components/Roles/Client/Navbar'
import MainContent from '../../../components/Roles/Client/mainContent'
import ContentCards from '../../../components/Roles/Client/ContentCards'
import Footer from '../../../components/Shared/Footer/Footer'
import ContactUs from '../../../components/Home/ContactUs'

function Client() {
  return (
    <div>
      <Navbar />
      <MainContent />
      <ContentCards/>
      <ContactUs />
      <Footer />
    </div>
  )
}

export default Client