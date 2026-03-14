import Searchbar from '../components/Searchbar';
import CreateGroupModal from '../components/CreateGroupModal';
import { useMemo, useState } from 'react';
import AllGroupsTab from '../components/AllGroupsTab';
import MyGroupTab from '../components/MyGroupTab';
import { useAllTeams } from '../hooks/useTeamQueries';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Groups = () => {
    const [selectedTab, setSelectedTab] = useState('All Groups');
    const [searchTerm, setSearchTerm] = useState('');
    const { data: teams = [], error, isLoading, isSuccess, isError } = useAllTeams();

    const filteredTeams = useMemo(() => {
        if (!searchTerm.trim()) return teams;
        const lowerTerm = searchTerm.toLowerCase();
        return teams.filter(
            (group) =>
                group.name.toLowerCase().includes(lowerTerm) ||
                group.description.toLowerCase().includes(lowerTerm) ||
                group.techUsed?.some((tag) => tag.toLowerCase().includes(lowerTerm))
        );
    }, [teams, searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    if (isLoading) {
        return (
            <div className='flex items-center justify-center h-full w-full'>
                <Loader2 className='w-8 h-8 animate-spin text-primary' />
            </div>
        );
    }

    if (isSuccess) {
        toast.success('Teams Loaded');
    }

    if (isError) {
        toast.error('Failed to load teams');
    }

    if (error) {
        return (
            <div className='text-center text-error py-10'>
                Failed to load groups. Please try again later.
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4 px-2 sm:px-4'>
            {/* Header */}
            <div className='flex justify-between items-center pb-1'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-base-content'>Groups</h1>
                    <p className='text-sm sm:text-base text-base-content/70'>
                        Full view of your groups and other groups.
                    </p>
                </div>

                <CreateGroupModal />
            </div>

            <Searchbar onSearch={handleSearch} />

            {/* Tabs */}
            <div className='flex gap-5 mt-2 border-b border-base-300 pb-2 overflow-x-auto hide-scrollbar'>
                <span
                    className={`cursor-pointer text-sm sm:text-base pb-1 transition-colors ${
                        selectedTab === 'All Groups'
                            ? 'text-primary font-bold border-b-2 border-accent'
                            : 'text-base-content/60 hover:text-base-content/80'
                    }`}
                    onClick={() => setSelectedTab('All Groups')}
                >
                    All Groups
                </span>

                <span
                    className={`cursor-pointer text-sm sm:text-base pb-1 transition-colors ${
                        selectedTab === 'My Group'
                            ? 'text-primary font-bold border-b-2 border-accent'
                            : 'text-base-content/60 hover:text-base-content/80'
                    }`}
                    onClick={() => setSelectedTab('My Group')}
                >
                    My Group
                </span>
            </div>

            {/* Content */}
            <main className='flex flex-wrap w-full py-1 gap-3'>
                {selectedTab === 'My Group' ? (
                    <MyGroupTab />
                ) : (
                    <AllGroupsTab teams={filteredTeams} loading={isLoading} />
                )}
            </main>
        </div>
    );
};

export default Groups;