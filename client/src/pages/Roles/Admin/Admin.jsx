import React from 'react'
import Sidebar from '../../../components/Shared/Sidebar/Sidebar'
import MainContent from '../../../components/Roles/Admin/MainContent'

export default function Admin() {
    return (
        <div className='grid h-screen grid-cols-6 bg-[#f6f6f9]'>
            <Sidebar />
            <MainContent />
        </div>
    )
}