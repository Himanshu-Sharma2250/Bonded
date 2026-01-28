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
import GroupDetailPage from './pages/GroupDetailPage'
import UserProfilePage from './pages/UserProfilePage'

function App() {

    return (
        <>
            <div className='h-screen w-screen'>
                <UserProfilePage />
            </div>
        </>
    )
}

export default App
