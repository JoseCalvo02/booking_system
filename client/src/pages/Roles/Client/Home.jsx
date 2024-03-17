import React from 'react'
import MainContent from '../../../components/Roles/Client/MainContent'
import ContactUs from '../../../components/Home/ContactUs'
import ServicesContent from '../../../components/Roles/Client/ServicesContent'
import Ubication from '../../../components/Roles/Client/Ubication'

function Client() {
    return (
        <>
            <MainContent />
            <ServicesContent />
            <ContactUs />
            <Ubication />
        </>
    )
}

export default Client