import React from 'react'

import Hero from '../../components/Home/Hero'
import Navbar from '../../components/Shared/Navbar/Navbar'
import Services from '../../components/Home/Services'

export default function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Services />
        </div>
    )
}
