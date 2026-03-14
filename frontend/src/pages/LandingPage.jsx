import Button from '../components/Button'
import Navbar from '../components/Navbar'

const LandingPage = () => {
    return (
        <div className='flex flex-col h-screen w-screen overflow-y-auto hide-scrollbar'>
            <Navbar />

            {/* Hero Section */}
            <main className='flex flex-col lg:flex-row items-center px-4 sm:px-8 md:px-12 lg:px-20 py-10 gap-8 lg:gap-4'>
                {/* Text Content */}
                <div className='flex flex-col gap-4 w-full lg:w-1/2 text-center lg:text-left'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
                        Create Amazing{' '}
                        <span className='text-[#FF7A59]'>Projects</span> Together
                    </h1>
                    <p className='text-base sm:text-lg md:text-xl text-gray-600'>
                        Find teammates you can actually rely on. Bonded matches you with verified developers,
                        designers & creators who share your work style and values.
                    </p>
                    <div className='flex justify-center lg:justify-start'>
                        <Button name="Get Started Now" bgColor="#2A6E8C" btnSize="20px" />
                    </div>
                </div>

                {/* Image */}
                <div className='w-full lg:w-1/2 flex justify-center'>
                    <img
                        src="/photo-1552664730-d307ca884978.jpeg"
                        alt="team collaborating"
                        className='w-full max-w-md lg:max-w-full rounded-lg shadow-xl'
                    />
                </div>
            </main>

            {/* Features Section */}
            <section className='py-12 px-4 sm:px-8 md:px-12 lg:px-20 bg-gray-50'>
                <div className='text-center mb-10'>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-2'>Features</h2>
                    <p className='text-lg text-gray-600'>
                        Contains all essential features that you need
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
                    {/* Row 1 - 3 features */}
                    <div className='flex flex-col gap-6 md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-3 lg:gap-6'>
                        {/* Collaborative */}
                        <div className='flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 duration-300'>
                            <span className='w-fit px-3 py-1 rounded-full bg-sky-100 text-sky-700 font-medium'>
                                Collaborative
                            </span>
                            <p className='text-gray-700'>
                                Create or join Teams of your batches, compete with other teams and build network.
                            </p>
                        </div>

                        {/* Focused Work */}
                        <div className='flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 duration-300'>
                            <span className='w-fit px-3 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 font-medium'>
                                Focused Work
                            </span>
                            <p className='text-gray-700'>
                                Team members focus on a single task at a time, reducing distractions and increasing productivity.
                            </p>
                        </div>

                        {/* Leadership Skills */}
                        <div className='flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 duration-300'>
                            <span className='w-fit px-3 py-1 rounded-full bg-lime-100 text-lime-700 font-medium'>
                                Leadership Skills
                            </span>
                            <p className='text-gray-700'>
                                Enhance the Leadership and management skills by leading a Team which build job-ready skills.
                            </p>
                        </div>
                    </div>

                    {/* Row 2 - 4 features */}
                    <div className='flex flex-col gap-6 md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-4 lg:gap-6'>
                        {/* Peer Reviews */}
                        <div className='flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 duration-300'>
                            <span className='w-fit px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium'>
                                Peer Reviews
                            </span>
                            <p className='text-gray-700'>
                                Give and receive constructive feedback and learn by collaboration.
                            </p>
                        </div>

                        {/* Join Request */}
                        <div className='flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 duration-300'>
                            <span className='w-fit px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium'>
                                Join Request
                            </span>
                            <p className='text-gray-700'>
                                Request multiple teams to join with transparent application tracking.
                            </p>
                        </div>

                        {/* Management */}
                        <div className='flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 duration-300'>
                            <span className='w-fit px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-medium'>
                                Management
                            </span>
                            <p className='text-gray-700'>
                                Leader review application and add member base on skills and requirements.
                            </p>
                        </div>

                        {/* Activity History */}
                        <div className='flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 duration-300'>
                            <span className='w-fit px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium'>
                                Activity History
                            </span>
                            <p className='text-gray-700'>
                                All Users and Teams activity stored for future word and collaboration.
                            </p>
                        </div>
                    </div>

                    {/* Row 3 - 2 features */}
                    <div className='flex flex-col gap-6 md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-2 lg:gap-6 lg:max-w-2xl lg:mx-auto'>
                        {/* Proof of work */}
                        <div className='flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 duration-300'>
                            <span className='w-fit px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium'>
                                Proof of work
                            </span>
                            <p className='text-gray-700'>
                                Everything you create builds a public portfolio you can proudly share with others.
                            </p>
                        </div>

                        {/* Recommendation */}
                        <div className='flex flex-col gap-3 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow hover:scale-105 duration-300'>
                            <span className='w-fit px-3 py-1 rounded-full bg-teal-100 text-teal-700 font-medium'>
                                Recommendation
                            </span>
                            <p className='text-gray-700'>
                                Work hard and get recommended by your Batch Teachers and stand out from crowd.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='bg-slate-900 text-white py-12 px-4 text-center'>
                <h2 className='text-3xl font-bold mb-2'>Bonded</h2>
                <p className='text-gray-400'>Thanks for using 😸</p>
            </footer>
        </div>
    )
}

export default LandingPage