import React from 'react';
import PasswordResetForm from '../../components/Auth/PasswordResetForm';
import Video3 from '../../assets/Video3.mp4';


export default function PasswordReset() {
    return (
        <div>
            <div className='flex justify-center items-center flex-col h-[100vh]'>
                <video autoPlay loop muted className="absolute inset-0 object-cover w-full h-full opacity-30 filter" src={Video3}></video>
                <div className='relative max-h-full overflow-hidden shadow-2xl bg-white rounded-xl min-h-[700px] w-[850px] hover:shadow-none'>
                    <div className='absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out'>
                        <PasswordResetForm/>
                    </div>
                </div>
            </div>
        </div>
    )
}

