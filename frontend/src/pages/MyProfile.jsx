import React from 'react'

const MyProfile = () => {
    const createHistories = () => {
        return <div className='flex items-center justify-between px-2 py-1 shadow-gray-800 shadow-xs rounded-xs'>
            {/* history's title and reason */}
            <div className='flex gap-2 items-center'>
                <span className='text-4xl text-fuchsia-700'>
                    •
                </span>

                <div className='flex flex-col'>
                    <span className='font-bold'>
                        History Title
                    </span>

                    <span className='text-sm text-gray-700'>
                        History Reason
                    </span>
                </div>
            </div>

            <div>
                <span className='text-sm text-gray-700'>
                    [date - time]
                </span>
            </div>
        </div>
    }

    return (
        <div className='py-2 flex flex-col gap-10'>
            {/* shows page's header */}
            <div className='flex flex-col'>
                <h1 className='text-2xl font-bold'>
                    My Profile
                </h1>

                <span>
                    Manage your account and settings
                </span>
            </div>

            {/* shows user profile , name and role */}
            <div className='flex gap-2 items-center'>
                {/* user profile image */}
                <div className='flex items-center'>
                    <span className='p-4 bg-cyan-800'>
                        U
                    </span>
                </div>

                {/* page header */}
                <div>
                    <h1 className='text-2xl '>
                        User Name
                    </h1>

                    <span className='text-lime-700'>
                        USER
                    </span>
                </div>
            </div>

            {/* personal info - username, email, role and date of joining team */}
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>
                    Personal Information
                </h1>

                <div className='flex flex-col gap-2 px-2 py-1 rounded-xs shadow'>
                    {/* shows username and user email */}
                    <div className='flex items-center justify-between'>
                        {/* username */}
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs text-gray-600'>
                                Username
                            </span>

                            <span className=''>
                                [Username]
                            </span>
                        </div>

                        {/* user email */}
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs text-gray-600'>
                                Email
                            </span>

                            <span>
                                [User email]
                            </span>
                        </div>
                    </div>

                    {/* shows user role and date of joining team */}
                    <div className='flex items-center justify-between'>
                        {/* user role */}
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs text-gray-600'>
                                Role
                            </span>

                            <span className=''>
                                USER
                            </span>
                        </div>

                        {/* user date of joining bonded */}
                        <div className='flex flex-col gap-1'>
                            <span className='text-xs text-gray-600'>
                                User Since
                            </span>

                            <span>
                                [date - time]
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* user history */}
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>
                    User History
                </h1>

                <div className='flex flex-col px-5 py-4 gap-2  shadow rounded-xs border-gray-600'>
                    {createHistories()}
                </div>
            </div>
        </div>
    )
}

export default MyProfile
