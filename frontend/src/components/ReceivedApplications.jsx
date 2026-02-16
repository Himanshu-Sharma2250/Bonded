import { Loader2, Users } from 'lucide-react'
import React from 'react'
import Button from './Button'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useTeamStore } from '../store/useTeamStore'
import { useApplicationStore } from '../store/useApplicationStore'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast'

const ReceivedApplications = () => {
    const {getApplications, isGetting, applications, acceptApplication, rejectApplication} = useApplicationStore();
    const {getTeam, team} = useTeamStore();
    const {user} = useAuthStore();

    useEffect(() => {
        function fetchApplications() {
            getApplications();
        }
        fetchApplications();
    }, [])
        
    if (isGetting) {
        return <div className='m-auto'>
            <Loader2 className='w-5 animate-spin' />
        </div>
    }

    const onAcceptApplication = (applicationId) => {
        try {
            acceptApplication(applicationId)
            toast.success("Application accepted")
        } catch (error) {
            toast.success("Application accept failed")
        }
    }

    const onRejectApplication = (applicationId) => {
        try {
            rejectApplication(applicationId);
            toast.success("Application rejeced");
        } catch (error) {
            toast.error("Application rejected failed")
        }
    }

    const receivedApplications = applications.filter((application) => application.decidedBy === user._id);

    const createApplicationCards = (application) => {
        return <div className='flex flex-col px-2 py-2 border-2 w-full gap-3 justify-between'>
            {/* div 1 - contains user name and email and if applications is pending or rejected or approved */}
            <div className='flex items-center justify-between'>
                {/* contains user profile and name and email */}
                <div className='flex items-center gap-3'>
                    {/* profile photo */}
                    <div>
                        <span className='border-2 rounded-xs p-2'>
                            {application?.name.toUpperCase().slice(0,1)}
                        </span>
                    </div>

                    {/* user name and email */}
                    <div className='flex flex-col'>
                        <h1 className='text-xl'>
                            {application?.name}
                        </h1>

                        <span className='text-[11px]'>
                            {application?.email}
                        </span>
                    </div>
                </div>

                {/* contains if applications pending or rejected or approved */}
                <div>
                    <NavLink to={'/user/user-id'}>
                        <Button name={'View Profile'} bgColor={'#2A6E8C'} btnSize={'16px'} />
                    </NavLink>
                </div>
            </div>

            {/* div 2 - contains groups name and reason to join and application date and time */}
            <div className='flex flex-col'>
                {/* contains group name */}
                <span className='flex gap-1 items-center'>
                    <Users className='w-4.5'/>

                    <span className='font-bold text-[1.1rem]'>
                        Group: 
                    </span>

                    <span>
                        Group Name
                    </span>
                </span>

                {/* contains reason */}
                <span className='flex gap-1 items-center'>
                    <span className='font-bold text-[1.1rem]'>
                        Reason: 
                    </span>

                    <span>
                        {application?.reasonToJoin}
                    </span>
                </span>

                {/* contains application date and time */}
                <span className=' font-extralight text-[12px] text-gray-800'>
                    Applied on: {application?.appliedAt}
                </span>
            </div>

            {/* div 3 - contains withdraw button */}
            <div className='flex gap-3'>
                <Button name="Accept" bgColor="#FF7A59" btnSize="15px" />
                <Button name="Reject" bgColor="#FF7A59" btnSize="15px" />
            </div>
        </div>
    }

    return (
        <div>
            {receivedApplications.length == 0 ? (
                <span>
                    No application received
                </span>
            ) : (
                receivedApplications.map((application) => createApplicationCards(application))
            )}
        </div>
    )
}

export default ReceivedApplications
