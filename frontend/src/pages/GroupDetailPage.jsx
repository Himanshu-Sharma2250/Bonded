import React, { useState } from 'react'
import Button from '../components/Button'
import GroupOverview from '../components/GroupOverview';
import GroupMembers from '../components/GroupMembers';
import GroupHistory from '../components/GroupHistory';
import ApplyToGroupModal from '../components/ApplyToGroupModal';

const GroupDetailPage = () => {
    const [selectedTab, setSelectedTab] = useState('Overview');

    return (
        <div className='flex flex-col gap-1 px-5'>
            {/* div 1 - shows group info like group image, name, members number and button to apply */}
            <div className='flex justify-between items-center py-2 px-3 border-2'>
                {/* contains group info */}
                <div className='flex gap-1 items-center'>
                    <div>
                        <span className='p-4 bg-cyan-600 rounded-xs'>
                            GN
                        </span>
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='text-2xl'>
                            Group Name
                        </h1>

                        <span>
                            [number] members
                        </span>
                    </div>
                </div>

                {/* contains apply btn and dialog that pop up */}
                <div>
                    <ApplyToGroupModal />
                </div>
            </div>

            {/* div 2 - shows the btns to navigate between Group Overview - Members - Group History */}
            <div className='flex gap-5 py-2 px-2'>
                <span 
                    className={`text-xl cursor-pointer ${selectedTab === 'Overview' ? 'text-[#2A6E8C] font-bold border-b-2 border-b-[#FF7A59]' : 'text-[#64748B] hover:text-[#475569]'}`}
                    onClick={() => setSelectedTab('Overview')}    
                >
                    Overview
                </span>

                <span 
                    className={`text-xl cursor-pointer ${selectedTab === 'Members' ? 'text-[#2A6E8C] font-bold border-b-2 border-b-[#FF7A59]' : 'text-[#64748B] hover:text-[#475569]'}`}
                    onClick={() => setSelectedTab('Members')}    
                >
                    Members
                </span>

                <span 
                    className={`text-xl cursor-pointer ${selectedTab === 'History' ? 'text-[#2A6E8C] font-bold border-b-2 border-b-[#FF7A59]' : 'text-[#64748B] hover:text-[#475569]'}`}
                    onClick={() => setSelectedTab('History')}    
                >
                    Group History
                </span>
            </div>

            {/* div 2 - shows the respective detail of above navigation btns */}
            <GroupHistory />
        </div>
    )
}

export default GroupDetailPage
