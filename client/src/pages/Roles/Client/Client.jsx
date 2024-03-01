import React from 'react'
import Navbar from '../../../components/Roles/Client/Navbar'
import MainContent from '../../../components/Roles/Client/mainContent'
import ContentCards from '../../../components/Roles/Client/ContentCards'

function Client() {
  return (
    <div>
      <Navbar />
      <MainContent />
      <ContentCards/>
    </div>
  )
}

export default Client