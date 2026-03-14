import { Loader2, User, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Generate a consistent HSL color from a string (team name)
const getAvatarColor = (name) => {
    if (!name) return '#6b7280';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 60%)`;
};

const AllGroupsTab = ({ teams, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 w-full h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (teams.length === 0) {
        return (
            <div className="text-2xl text-base-content/60 m-auto text-center py-10 h-full w-full">
                No teams found
            </div>
        );
    }

    return (
        <div className="flex flex-wrap gap-4">
            {teams.map((team) => (
                <NavLink
                    to={`/groups/${team._id}`}
                    key={team._id}
                    className="flex flex-col w-72 border border-base-300 rounded-box bg-base-100 shadow-sm hover:shadow-md transition-shadow p-4"
                >
                    {/* Header with avatar and name */}
                    <div className="flex items-start gap-3">
                        <div
                            className="w-12 h-12 rounded-md flex items-center justify-center text-white font-bold text-xl shrink-0"
                            style={{ backgroundColor: getAvatarColor(team.name) }}
                        >
                            {team.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-base-content truncate">{team.name}</h3>
                            <p className="text-sm text-base-content/80 line-clamp-2">{team.description}</p>
                        </div>
                    </div>

                    {/* Tech tags */}
                    {team.techUsed?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                            {team.techUsed.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-0.5 text-xs bg-base-300 text-base-content/70 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="flex flex-col gap-2 mt-4 text-xs text-base-content/70">
                        <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {team.members?.find((m) => m.teamRole === 'LEADER')?.name || 'Unknown'}
                        </span>
                        <span className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {team.totalMembers - 1} members
                        </span>
                    </div>

                    {/* Active status badge */}
                    <div className="mt-3 text-right">
                        <span
                            className={`badge badge-sm ${
                                team.isDeleted ? 'badge-error' : 'badge-success'
                            }`}
                        >
                            {team.isDeleted ? 'Inactive' : 'Active'}
                        </span>
                    </div>
                </NavLink>
            ))}
        </div>
    );
};

export default AllGroupsTab;