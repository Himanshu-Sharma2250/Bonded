import { Users } from 'lucide-react'
import Button from '../components/Button'
import { useState } from 'react';
import ReceivedApplications from '../components/ReceivedApplications';
import SentApplications from '../components/SentApplications';

const Applications = () => {
    const [selectedTab, setSelectedTab] = useState('Received');

    return (
        <div className='flex flex-col gap-1 '>
            {/* header */}
            <div className='flex flex-col gap-1 pb-1'>
                <h1 className='text-3xl font-bold'>
                    Applications
                </h1>

                <p>
                    View all your group submitted join applications
                </p>
            </div>

            {/* tab - sent and received applications */}
            <div className='flex gap-5 mt-3'>
                <span
                    className={`cursor-pointer ${selectedTab === 'Received' ? 'text-[#2A6E8C] font-bold' : 'text-[#64748B] hover:text-[#475569]'}`}
                    onClick={() => setSelectedTab('Received')}
                >
                    Received
                </span>

                <span
                    className={`cursor-pointer ${selectedTab === 'Sent' ? 'text-[#2A6E8C] font-bold' : 'text-[#64748B] hover:text-[#475569]'}`}
                    onClick={() => setSelectedTab('Sent')}
                >
                    Sent
                </span>
            </div>

            {/* applications hero */}
            <main className='flex flex-col w-full py-1 gap-3'>
                {selectedTab === "Received" ? (
                    <ReceivedApplications />
                ) : (
                    <SentApplications />
                )}
                                 
            </main>
        </div>
    )
}

export default Applications
