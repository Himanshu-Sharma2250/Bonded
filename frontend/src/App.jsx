import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import Navbar from './components/Navbar'

function App() {

    return (
        <>
            <Navbar />

            {/* hero section */}
            <main className='flex items-center px-7 py-10 '>
                {/* div - contains the texts and buttons */}
                <div className='flex flex-col gap-2 justify-center h-86'>
                    <h1 className='text-4xl w-87.5'>
                        Create Amazing <span className='font-bold text-[#FF7A59]'>Projects</span> Together
                    </h1>

                    <p className='text-xl'>
                        Find teammates you can actually rely on. Bonded matches you with verified developers, designers & creators who share your work style and values.
                    </p>

                    <Button name="Get Started Now" bgColor="2A6E8C" btnSize="110px"/>
                </div>

                {/* div - contains image */}
                <div className='w-4xl'>
                    <img src="../public/photo-1552664730-d307ca884978.jpeg" alt="team-image" srcset="" />
                </div>
            </main>
        </>
    )
}

export default App
