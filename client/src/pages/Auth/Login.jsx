import React, { useState }  from 'react'

const customStyles = {
    ghostButton: "bg-transparent border-[#ffffff]",
};

export default function Login() {
    const [signIn, setSignIn] = React.useState(true);

    const toggleSignIn = () => {
        setSignIn(!signIn);
      };

    return (
        <section className='bg-[#f6f5f7] flex justify-center items-center flex-col h-screen mt-[-20px] mb-[50px]'>
            <div className='relative max-h-full overflow-hidden shadow-lg bg-white rounded-lg min-h-[400px] w-[678px]'>
                {/* SignUp container */}
                <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 ${signIn ? 'opacity-0 z-1' : 'opacity-100 z-5 transform translate-x-full'}`}>
                    <form action="">
                        <h1>Create account</h1>
                        <input type="text" placeholder='Name'/>
                        <input type="text" placeholder='Last Name'/>
                        <input type="phone" placeholder='Phone'/>
                        <input type="email" placeholder='Email'/>
                        <input type="password" placeholder='Password'/>
                        <input type="password" placeholder='Password again'/>
                        <button>Signup</button>
                    </form>
                </div>

                {/* LogIn container */}
                <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-2 ${signIn ? '' : 'transform translate-x-full'}`}>
                    <form action="">
                        <h1>Log into your account</h1>
                        <input type="email" placeholder='Email'/>
                        <input type="password" placeholder='Password'/>
                        <a href="#">Forgot your password?</a>
                        <button>Login</button>
                    </form>
                </div>

                {/* Overlay container */}
                <div className={`absolute top-0 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out left-1/2 z-[100] ${signIn ? '' : 'transform -translate-x-full'}`}>
                    <div>

                        {/* Left Overlay container */}
                        <div>
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button onClick={toggleSignIn}>Login</button>
                        </div>

                        {/* Right Overlay container */}
                        <div>
                            <h1>Hello, Friend!</h1>
                            <p>Enter Your personal details and start journey with us</p>
                            <button onClick={toggleSignIn}>SignUp</button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}