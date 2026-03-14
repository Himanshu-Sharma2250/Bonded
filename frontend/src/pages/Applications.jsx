import { useState } from 'react';
import ReceivedApplications from '../components/ReceivedApplications';
import SentApplications from '../components/SentApplications';

const Applications = () => {
    const [selectedTab, setSelectedTab] = useState('Received');

    return (
        <div className='flex flex-col gap-4 px-2 sm:px-4'>
            {/* Header */}
            <div className='flex flex-col gap-1 pb-1'>
                <h1 className='text-2xl sm:text-3xl font-bold text-base-content'>
                    Applications
                </h1>
                <p className='text-sm sm:text-base text-base-content/70'>
                    View all your group submitted join applications
                </p>
            </div>

            {/* Tabs */}
            <div className='flex gap-5 mt-2 border-b border-base-300 pb-2 overflow-x-auto hide-scrollbar'>
                <span
                    className={`cursor-pointer text-sm sm:text-base pb-1 transition-colors whitespace-nowrap ${
                        selectedTab === 'Received'
                            ? 'text-primary font-bold border-b-2 border-accent'
                            : 'text-base-content/60 hover:text-base-content/80'
                    }`}
                    onClick={() => setSelectedTab('Received')}
                >
                    Received
                </span>

                <span
                    className={`cursor-pointer text-sm sm:text-base pb-1 transition-colors whitespace-nowrap ${
                        selectedTab === 'Sent'
                            ? 'text-primary font-bold border-b-2 border-accent'
                            : 'text-base-content/60 hover:text-base-content/80'
                    }`}
                    onClick={() => setSelectedTab('Sent')}
                >
                    Sent
                </span>
            </div>

            {/* Applications content */}
            <main className='flex flex-col w-full py-1 gap-3'>
                {selectedTab === "Received" ? (
                    <ReceivedApplications />
                ) : (
                    <SentApplications />
                )}
            </main>
        </div>
    );
};

export default Applications;