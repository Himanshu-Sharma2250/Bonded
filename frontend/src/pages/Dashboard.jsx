import { Megaphone, Users, ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button';
import { useAllTeams, useMyTeam } from '../hooks/useTeamQueries';
import {
    useSentApplications,
    useReceivedApplications,
    useAcceptApplication,
    useRejectApplication,
} from '../hooks/useApplicationQueries';
import { useTeamJoin } from '../hooks/useTeamMemberQueries';
import { useMemberJoinedHistory } from '../hooks/useTeamHistoryQueries';
import { useUserJoinTeam } from '../hooks/useUserHistoryQueries';
import toast from 'react-hot-toast';
import { useProfile } from '../hooks/useAuthQueries';

const Dashboard = () => {
    const { data: user } = useProfile(); 

    const { data: teams = [], isLoading: teamsLoading, error: teamsError } = useAllTeams();
    const { data: team, isLoading: myTeamLoading, error: myTeamError } = useMyTeam();
    const {
        data: sentApplications = [],
        isLoading: sentLoading,
        error: sentError,
    } = useSentApplications();
    const {
        data: receivedApplications = [],
        isLoading: receivedLoading,
        error: receivedError,
    } = useReceivedApplications();

    const acceptMutation = useAcceptApplication();
    const rejectMutation = useRejectApplication();
    const teamJoinMutation = useTeamJoin();
    const memberJoinedHistoryMutation = useMemberJoinedHistory();
    const userJoinTeamMutation = useUserJoinTeam();

    const [recommendedGroups, setRecommendedGroups] = useState([]);

    useEffect(() => {
        if (teams.length > 0) {
            const otherTeams = team ? teams.filter((t) => t._id !== team._id) : teams;
            const shuffled = [...otherTeams].sort(() => 0.5 - Math.random());
            setRecommendedGroups(shuffled.slice(0, 3));
        }
    }, [teams, team]);

    const handleAccept = async (application) => {
        try {
            await acceptMutation.mutateAsync(application._id);
            
            await teamJoinMutation.mutateAsync({
                teamId: application?.teamId,
                data: {
                    name: application?.name,
                    email: application?.email,
                    reasonToJoin: application?.reasonToJoin,
                },
            });
            
            await memberJoinedHistoryMutation.mutateAsync({
                teamId: application?.teamId,
                data: { memberName: application?.name },
            });
            
            await userJoinTeamMutation.mutateAsync();
            toast.success('Application accepted');
        } catch (error) {
            toast.error('Accept failed');
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectMutation.mutateAsync(id);
            toast.success('Application rejected');
        } catch (error) {
            toast.error('Reject failed');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isLoading = teamsLoading || myTeamLoading || sentLoading || receivedLoading;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-4 md:gap-6 px-2 sm:px-4 md:px-0">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Dashboard</h1>
                <p className="text-sm sm:text-base text-base-content/70">
                    Welcome back, {user?.fullName || user?.name}!
                </p>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                {/* Groups card */}
                <div className="flex flex-col border border-base-300 rounded-box bg-base-100 p-4 w-full sm:flex-1 min-w-50 shadow-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-base sm:text-lg font-semibold text-base-content">Groups</span>
                        <Users className="w-5 text-base-content/70" />
                    </div>
                    <div className="mt-2 text-2xl sm:text-3xl font-bold text-base-content">
                        {team ? 1 : 0}
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-base-content/70">
                        <div>{team ? '1 Joined' : '0 Joined'}</div>
                        <div>{teams?.length || 0} Available</div>
                    </div>
                </div>

                {/* Applications card */}
                <div className="flex flex-col border border-base-300 rounded-box bg-base-100 p-4 w-full sm:flex-1 min-w-50 shadow-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-base sm:text-lg font-semibold text-base-content">Applications</span>
                        <Megaphone className="w-5 text-base-content/70" />
                    </div>
                    {receivedError || sentError ? (
                        <div className="mt-2 text-xs sm:text-sm text-error">Error loading applications</div>
                    ) : (
                        <>
                            <div className="mt-2 text-2xl sm:text-3xl font-bold text-base-content">
                                {receivedApplications?.length || 0}
                            </div>
                            <div className="mt-2 text-xs sm:text-sm text-base-content/70">
                                <div>{receivedApplications?.length || 0} Received</div>
                                <div>{sentApplications?.length || 0} Sent</div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Conditional content based on whether user is in a group */}
            {team ? (
                // User has a group → show group summary and recent applications
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Your Group Card */}
                    <div className="border border-base-300 rounded-box bg-base-200 p-3 sm:p-4">
                        <h2 className="text-lg sm:text-xl font-bold text-base-content mb-3">Your Group</h2>
                        {myTeamError ? (
                            <p className="text-sm text-error">Failed to load group</p>
                        ) : (
                            <div className="bg-base-100 border border-base-300 rounded-box p-3 sm:p-4 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center text-white font-bold text-sm sm:text-base"
                                        style={{ backgroundColor: `hsl(${team.name.length * 30 % 360}, 70%, 60%)` }}
                                    >
                                        {team.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-base-content">{team.name}</h3>
                                        <p className="text-xs sm:text-sm text-base-content/70">{team.totalMembers} members</p>
                                    </div>
                                </div>
                                <NavLink to={`/groups/${team._id}`} className="mt-3 inline-block">
                                    <Button name="View Group" bgColor="primary" btnSize="12px sm:14px" />
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Recent Received Applications */}
                    <div className="border border-base-300 rounded-box bg-base-200 p-3 sm:p-4">
                        <h2 className="text-lg sm:text-xl font-bold text-base-content mb-3">Recent Applications</h2>
                        {receivedError ? (
                            <p className="text-sm text-error">Failed to load applications</p>
                        ) : receivedApplications.filter((app) => app.status === 'PENDING').length === 0 ? (
                            <p className="text-xs sm:text-sm text-base-content/70">No pending applications</p>
                        ) : (
                            <div className="space-y-3">
                                {receivedApplications
                                    .filter((app) => app.status === 'PENDING')
                                    .slice(0, 3)
                                    .map((app) => (
                                        <div key={app._id} className="bg-base-100 border border-base-300 rounded-box p-3 shadow-sm">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                                <div>
                                                    <p className="font-medium text-base-content">{app.name}</p>
                                                    <p className="text-xs text-base-content/70">{formatDate(app.appliedAt)}</p>
                                                </div>
                                                <div className="flex gap-2 self-end sm:self-auto">
                                                    <Button
                                                        name="✓"
                                                        bgColor="success"
                                                        btnSize="12px"
                                                        onClick={() => handleAccept(app)}
                                                        disabled={acceptMutation.isPending || rejectMutation.isPending}
                                                    />
                                                    <Button
                                                        name="✗"
                                                        bgColor="error"
                                                        btnSize="12px"
                                                        onClick={() => handleReject(app._id)}
                                                        disabled={acceptMutation.isPending || rejectMutation.isPending}
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-xs sm:text-sm text-base-content/80 mt-1 line-clamp-2">{app.reasonToJoin}</p>
                                        </div>
                                    ))}
                                {receivedApplications.filter((app) => app.status === 'PENDING').length > 3 && (
                                    <NavLink to="/applications?tab=received" className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1">
                                        View all <ArrowRight className="w-3 h-3" />
                                    </NavLink>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                // User has no group → show recommendations and recent sent applications
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Recommended Groups */}
                    <div className="border border-base-300 rounded-box bg-base-200 p-3 sm:p-4">
                        <h2 className="text-lg sm:text-xl font-bold text-base-content mb-3">Recommended Groups</h2>
                        {teamsError ? (
                            <p className="text-sm text-error">Failed to load groups</p>
                        ) : recommendedGroups.length === 0 ? (
                            <p className="text-xs sm:text-sm text-base-content/70">No groups available</p>
                        ) : (
                            <div className="space-y-3">
                                {recommendedGroups.map((group) => (
                                    <div key={group._id} className="bg-base-100 border border-base-300 rounded-box p-3 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div>
                                            <p className="font-medium text-base-content">{group.name}</p>
                                            <p className="text-xs text-base-content/70">{group.totalMembers} members</p>
                                        </div>
                                        <NavLink to={`/groups/${group._id}`} className="self-end sm:self-auto">
                                            <Button name="View" bgColor="primary" btnSize="12px" />
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent Sent Applications */}
                    <div className="border border-base-300 rounded-box bg-base-200 p-3 sm:p-4">
                        <h2 className="text-lg sm:text-xl font-bold text-base-content mb-3">Your Applications</h2>
                        {sentError ? (
                            <p className="text-sm text-error">Failed to load applications</p>
                        ) : sentApplications.length === 0 ? (
                            <p className="text-xs sm:text-sm text-base-content/70">No applications sent</p>
                        ) : (
                            <div className="space-y-3">
                                {sentApplications.slice(0, 3).map((app) => (
                                    <div key={app._id} className="bg-base-100 border border-base-300 rounded-box p-3 shadow-sm">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                            <div>
                                                <p className="font-medium text-base-content">{app.teamId?.name || 'Group'}</p>
                                                <p className="text-xs text-base-content/70">{formatDate(app.appliedAt)}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full self-end sm:self-auto ${app.status === 'PENDING'
                                                    ? 'bg-primary/10 text-primary'
                                                    : app.status === 'ACCEPTED'
                                                        ? 'bg-success/10 text-success'
                                                        : app.status === 'REJECTED'
                                                            ? 'bg-error/10 text-error'
                                                            : 'bg-base-300 text-base-content/70'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </div>
                                        <p className="text-xs sm:text-sm text-base-content/80 mt-1 line-clamp-2">{app.reasonToJoin}</p>
                                    </div>
                                ))}
                                {sentApplications.length > 3 && (
                                    <NavLink to="/applications?tab=sent" className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1">
                                        View all <ArrowRight className="w-3 h-3" />
                                    </NavLink>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;