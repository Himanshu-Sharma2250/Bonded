import Searchbar from '../components/Searchbar'
import CreateGroupModal from '../components/CreateGroupModal'
import { useEffect, useState } from 'react';
import AllGroupsTab from '../components/AllGroupsTab';
import MyGroupTab from '../components/MyGroupTab';
import { useTeamStore } from '../store/useTeamStore';

const Groups = () => {
    const [selectedTab, setSelectedTab] = useState('All Groups');
    const { loading, getAllTeams, teams } = useTeamStore();
    const [filteredTeams, setFilteredTeams] = useState([]);

    useEffect(() => {
        getAllTeams();
    }, [getAllTeams]);

    useEffect(() => {
        setFilteredTeams(teams); // initially show all
    }, [teams]);

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredTeams(teams);
            return;
        }
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = teams.filter((group) =>
            group.name.toLowerCase().includes(lowerTerm) ||
            group.description.toLowerCase().includes(lowerTerm) ||
            group.techUsed?.some(tag => tag.toLowerCase().includes(lowerTerm))
        );
        setFilteredTeams(filtered);
    };

    return (
        <div className='flex flex-col gap-1'>
            {/* header */}
            <div className='flex justify-between items-center pb-1'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-3xl font-bold'>
                        Groups
                    </h1>

                    <p>
                        Full view of your groups and other groups.
                    </p>
                </div>

                <div>
                    {/* for the create group button to open a dialog */}
                    <CreateGroupModal />
                </div>
            </div>

            <Searchbar onSearch={handleSearch} />

            {/* tab - seperate my group and all groups */}
            <div className='flex gap-5 mt-3'>
                <span 
                    className={`cursor-pointer ${selectedTab === 'All Groups' ? 'text-[#2A6E8C] font-bold' : 'text-[#64748B] hover:text-[#475569]'}`}
                    onClick={() => setSelectedTab("All Groups")}
                >
                    All Groups
                </span>

                <span 
                    className={`cursor-pointer ${selectedTab === 'My Group' ? 'text-[#2A6E8C] font-bold' : 'text-[#64748B] hover:text-[#475569]'}`}
                    onClick={() => setSelectedTab("My Group")}
                >
                    My Group
                </span>
            </div>

            {/* announcement hero */}
            <main className='flex flex-wrap w-full py-1 gap-3'>
                {selectedTab === "My Group" ? (
                    <MyGroupTab />
                ) : (
                    <AllGroupsTab teams={filteredTeams} loading={loading} />
                )}
            </main>
        </div>
    )
}

export default Groups
