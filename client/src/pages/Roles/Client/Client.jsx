import React from 'react'
import { Outlet } from 'react-router-dom';

import Navbar from '../../../components/Client/Navbar'
import Footer from '../../../components/Shared/Footer/Footer'

function Client() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Client