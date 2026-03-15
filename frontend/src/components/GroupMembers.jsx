import { NavLink } from 'react-router-dom';
import Button from './Button';
import { Loader2 } from 'lucide-react';
import KickOutModal from './KickOutModal';

const getAvatarColor = (name) => {
    if (!name) return '#6b7280';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 80%, 60%)`;
};

const GroupMembers = ({ teamId, teamRole, members, loading }) => {
    const teamLeader = members?.find((member) => member.teamRole === 'LEADER');
    const teamMembers = members?.filter((member) => member.teamRole === 'MEMBER');

    const createLeaderCard = () => (
        <div
            key={teamLeader?._id}
            className="flex items-center justify-between px-4 py-3 border border-base-300 rounded-box bg-base-100 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex gap-3 items-center">
                <div>
                    <span
                        className="p-3 rounded-md text-white font-bold"
                        style={{ backgroundColor: getAvatarColor(teamLeader?.name) }}
                    >
                        {teamLeader?.name?.toUpperCase().slice(0, 1) || 'L'}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-semibold text-base-content">
                        {teamLeader?.name || 'Leader name'}
                    </span>
                    <span className="text-sm text-base-content/70">{teamLeader?.email || 'leader@example.com'}</span>
                </div>
            </div>
            <span className="badge badge-accent badge-sm">Leader</span>
        </div>
    );

    const createMemberCards = (member) => (
        <div
            key={member?._id}
            className="flex items-center justify-between px-4 py-3 border border-base-300 rounded-box bg-base-100 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex gap-3 items-center">
                <div>
                    <span
                        className="p-3 rounded-md text-white font-bold"
                        style={{ backgroundColor: getAvatarColor(member?.name) }}
                    >
                        {member?.name?.toUpperCase().slice(1, 2) || 'M'}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-semibold text-base-content">{member?.name || 'Member name'}</span>
                    <span className="text-sm text-base-content/70">{member?.email || 'member@example.com'}</span>
                </div>
            </div>
            <div className="flex gap-2">
                {teamRole === 'LEADER' && (
                    <KickOutModal teamId={teamId} memberId={member._id} memberName={member.name} />
                )}
                {teamRole === 'MEMBER' && (
                    <NavLink to={`/user/${member?.name}`}>
                        <Button name="View Profile" variant="primary" size="sm" />
                    </NavLink>
                )}
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="px-2 py-4 border-2 border-base-300 rounded-box bg-base-200 flex justify-center items-center min-h-50">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="px-4 py-4 border-2 border-base-300 rounded-box bg-base-200">
            <div className="flex flex-col gap-4">
                {/* Leader Section */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-base-content">Group Leader</h2>
                    {teamLeader ? createLeaderCard() : <p className="text-base-content/70">No leader assigned</p>}
                </div>

                {/* Members Section */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-base-content">
                        Members {teamMembers?.length ? `(${teamMembers.length})` : ''}
                    </h2>
                    {teamMembers?.length === 0 ? (
                        <p className="text-base-content/70">No members joined yet</p>
                    ) : (
                        <div className="flex flex-col gap-3">{teamMembers?.map(createMemberCards)}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupMembers;