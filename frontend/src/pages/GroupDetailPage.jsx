import { useState } from 'react';
import { Loader2, MoveLeft } from 'lucide-react';
import { NavLink, useParams } from 'react-router-dom';
import GroupOverview from '../components/GroupOverview';
import GroupMembers from '../components/GroupMembers';
import GroupHistory from '../components/GroupHistory';
import GroupNotes from '../components/GroupNotes';
import ApplyToGroupModal from '../components/ApplyToGroupModal';
import DeleteGroupPopUp from '../components/DeleteGroupPopUp';
import LeaveGroupModal from '../components/LeaveGroupModal';
import { useAuthStore } from '../store/useAuthStore';
import { useTeam } from '../hooks/useTeamQueries';
import { useTeamMember } from '../hooks/useTeamMemberQueries';
import toast from 'react-hot-toast';

const getAvatarColor = (name) => {
    if (!name) return '#6b7280';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 80%, 60%)`;
};

const GroupDetailPage = () => {
    const [selectedTab, setSelectedTab] = useState('Overview');
    const { teamId } = useParams();
    const { user } = useAuthStore();

    const { data: team, isLoading: teamLoading, error: teamError, isSuccess: isTeamFetched } = useTeam(teamId);
    const { data: member, isLoading: memberLoading, error: memberError, isSuccess: isMembersFetched } = useTeamMember(
        teamId,
        user?._id
    );

    if (teamLoading || memberLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isMembersFetched && isTeamFetched) {
        toast.success("Team Fetched");
    }

    if (teamError || !team) {
        return (
            <div className="text-center py-20 text-error">
                <p>Failed to load group details.</p>
                <NavLink to="/groups" className="text-primary hover:underline mt-4 inline-block">
                    Back to Groups
                </NavLink>
            </div>
        );
    }

    return (
        <div className="pb-1 flex flex-col gap-1 px-2 sm:px-4">
            {/* Back button */}
            <div className="flex justify-start items-center py-2">
                <NavLink
                    to="/groups"
                    className="cursor-pointer border border-base-300 px-3 py-1.5 rounded-md flex items-center gap-2 hover:gap-3 transition-all text-sm sm:text-base text-base-content/70 hover:text-primary hover:border-primary"
                >
                    <MoveLeft className="w-4 sm:w-5" />
                    <span>Back</span>
                </NavLink>
            </div>

            {/* Group header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2">
                <div className="flex gap-3 items-center w-full sm:w-auto">
                    <div className="flex items-center justify-center">
                        <span
                            className="p-3 sm:p-4 rounded-md text-white font-bold text-lg sm:text-xl"
                            style={{ backgroundColor: getAvatarColor(team?.name) }}
                        >
                            {team?.name?.toUpperCase().slice(0, 1) || 'G'}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl sm:text-2xl font-semibold text-base-content">{team?.name}</h1>
                        <span className="text-sm text-base-content/70">{team?.totalMembers} members</span>
                    </div>
                </div>

                {/* Action button */}
                <div className="w-full sm:w-auto">
                    {!member && <ApplyToGroupModal teamId={teamId} />}
                    {member?.teamRole === 'MEMBER' && <LeaveGroupModal teamId={teamId} />}
                    {member?.teamRole === 'LEADER' && <DeleteGroupPopUp teamId={teamId} />}
                </div>
            </div>

            {/* Tab navigation */}
            <div className="overflow-x-auto hide-scrollbar pb-2">
                <div className="flex gap-5 py-2 border-b border-base-300 min-w-max">
                    {['Overview', 'Members', 'Notes', 'History'].map((tab) => (
                        <span
                            key={tab}
                            className={`text-base sm:text-lg cursor-pointer pb-1 transition-colors whitespace-nowrap ${
                                selectedTab === tab
                                    ? 'text-primary font-semibold border-b-2 border-accent'
                                    : 'text-base-content/60 hover:text-base-content/80'
                            }`}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab === 'History' ? 'Group History' : tab}
                        </span>
                    ))}
                </div>
            </div>

            {/* Tab content */}
            <div className="py-2">
                {selectedTab === 'Overview' && (
                    <GroupOverview team={team} members={team?.members || []} />
                )}
                {selectedTab === 'Members' && (
                    <GroupMembers
                        teamId={team?._id}
                        teamRole={member?.teamRole}
                        members={team?.members || []}
                        loading={memberLoading}
                    />
                )}
                {selectedTab === 'Notes' && <GroupNotes teamId={teamId} member={member} />}
                {selectedTab === 'History' && <GroupHistory teamId={team?._id} />}
            </div>
        </div>
    );
};

export default GroupDetailPage;