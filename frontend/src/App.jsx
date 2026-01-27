import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import SideMenu from './components/SideMenu'
import Dashboard from './pages/Dashboard'
import Announcement from './pages/Announcement'
import Groups from './pages/Groups'
import Applications from './pages/Applications'

function App() {

    return (
        <>
            <div className='h-screen w-screen'>
                <Applications />
            </div>
        </>
    )
}

export default App
