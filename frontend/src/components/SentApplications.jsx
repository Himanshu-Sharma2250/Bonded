import { Loader2, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from './Button'
import { useApplicationStore } from '../store/useApplicationStore'
import { useEffect } from 'react'
import { useTeamStore } from '../store/useTeamStore'

const SentApplications = () => {
    const {getApplications, isGetting, applications, withdrawApplication} = useApplicationStore();
    const {getTeam, team} = useTeamStore();

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
    console.log(applications)

    const onWithdraw = (applicationId) => {
        try {
            withdrawApplication(applicationId)
            toast.success("Application Withdraw")
        } catch (error) {
            toast.error("Application Withdrawal failed")            
        }
    }

    const createApplicationCards = (application) => {
        // (async () => { await getTeam(application.teamId); })();
        console.log(team)

        return <div className='flex flex-col px-2 py-2 border-2 w-full gap-3 justify-between' key={application?._id}>
            {/* div 1 - contains group name and if applications is pending or rejected or approved */}
            <div className='flex items-center justify-between'>
                {/* contains group name */}
                <div className='flex items-center gap-1'>
                    <Users className='w-4.5'/>

                    <span className='font-bold text-[1.1rem]'>
                        Group: 
                    </span>

                    <span>
                        {team?.name}
                    </span>
                </div>

                {/* contains if applications pending or rejected or approved */}
                <div>
                    <span className='bg-[#E9F1F5] px-1 py-0.5 rounded-2xl'>
                        {application?.status}
                    </span>
                </div>
            </div>

            {/* div 2 - contains groups name and reason to join and application date and time */}
            <div className='flex flex-col'>
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
            <div>
                <Button name="Withdraw" bgColor="#FF7A59" btnSize="15px" onClick={() => onWithdraw(application?._id)} />
            </div>
        </div>
    }

    return (
        <div>
            {applications.length === 0 ? (
                "No sent application"
            ) : (
                applications.map((application) => createApplicationCards(application))
            )}
        </div>
    )
}

export default SentApplications
