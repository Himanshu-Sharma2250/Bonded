import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import SideMenu from './components/SideMenu'

function App() {

    return (
        <>
            <div className='h-screen w-screen'>
                <SideMenu />
            </div>
        </>
    )
}

export default App
