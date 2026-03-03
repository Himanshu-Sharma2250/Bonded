import { Megaphone, Users } from 'lucide-react'
import { useTeamStore } from '../store/useTeamStore'
import { useEffect } from 'react';
import { useApplicationStore } from '../store/useApplicationStore';

const Dashboard = () => {
    const {teams, getAllTeams, myTeam, team} = useTeamStore();
    const {applications, getApplications, getAllReceivedApplications, receivedApplications} = useApplicationStore();

    useEffect(() => {
        async function fetchData() {
            await getAllTeams();
            await myTeam();
            await getApplications();
            await getAllReceivedApplications();
        }
        fetchData();
    }, [getAllTeams, getApplications])

    return (
        <div className='flex-1 flex-col gap-1'>
            {/* header */}
            <div className='flex flex-col gap-1 pb-1'>
                <h1 className='text-3xl font-bold'>
                    Dashboard
                </h1>

                <p>
                    Overview of your progress
                </p>
            </div>

            {/* dashboard hero */}
            <main className='flex w-full h-60 py-4 gap-3'>
                {/* div 1 - shows group detail */}
                <div className='flex flex-col border-2 w-[30%] px-2 py-3 justify-between rounded-xs'>
                    <div className='flex justify-between'>
                        <span className='text-xl'>
                            Groups
                        </span>

                        <Users className='w-5' />
                    </div>

                    <span className='text-4xl font-bold'>
                        {team === null ? '0' : '1'}
                    </span>

                    <div className='flex flex-col'>
                        <span className='text-[15px]'>{team === null ? '0' : '1'} Joined</span>
                        <span className='text-[15px]'>{teams?.length || 0} Available</span>
                    </div>
                </div>

                {/* div 2 - shows application detail */}
                <div className='flex flex-col border-2 w-[30%] px-2 py-3 justify-between rounded-xs'>
                    <div className='flex justify-between'>
                        <span className='text-xl'>
                            Applications
                        </span>

                        <Megaphone className='w-5' />
                    </div>

                    <span className='text-4xl font-bold'>
                        {receivedApplications?.length || 0}
                    </span>

                    <div className='flex flex-col'>
                        <span className='text-[15px]'>{receivedApplications?.length || 0} Received</span>
                        <span className='text-[15px]'>{applications?.length || 0} Applied</span>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
