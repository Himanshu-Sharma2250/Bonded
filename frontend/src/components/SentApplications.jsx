import { Loader2, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from './Button';
import { useSentApplications, useWithdrawApplication } from '../hooks/useApplicationQueries';
import { useQueries } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';

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

// Map application status to badge classes
const statusBadgeMap = {
    PENDING: 'badge badge-primary badge-outline',
    ACCEPTED: 'badge badge-success',
    REJECTED: 'badge badge-error',
    WITHDRAWN: 'badge badge-ghost',
};

const SentApplications = () => {
    const { data: applications = [], isLoading: appsLoading, error: appsError, isSuccess } = useSentApplications();
    const withdrawMutation = useWithdrawApplication();

    const teamIds = [...new Set(applications.map((app) => app.teamId).filter(Boolean))];

    const teamQueries = useQueries({
        queries: teamIds.map((id) => ({
            queryKey: ['team', id],
            queryFn: async () => {
                const { data } = await axiosInstance.get(`/team/get-team/${id}`);
                return data.team;
            },
            staleTime: 5 * 60 * 1000,
        })),
    });

    const teamsMap = {};
    teamQueries.forEach((query, index) => {
        if (query.data) {
            teamsMap[teamIds[index]] = query.data;
        }
    });

    const anyTeamLoading = teamQueries.some((q) => q.isLoading);

    const onWithdraw = async (applicationId) => {
        try {
            await withdrawMutation.mutateAsync(applicationId);
            toast.success('Application withdrawn');
        } catch (error) {
            toast.error('Application withdrawal failed');
        }
    };

    if (appsLoading || anyTeamLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isSuccess) {
        toast.success("Applications Loaded");
    }

    if (appsError) {
        return (
            <div className="text-center py-10 text-error">
                Failed to load sent applications.
            </div>
        );
    }

    if (applications.length === 0) {
        return (
            <div className="text-center py-10 text-base-content/70">No sent applications</div>
        );
    }

    const createApplicationCards = (application) => {
        const team = teamsMap[application.teamId];
        const badgeClass = statusBadgeMap[application.status] || 'badge badge-ghost';

        return (
            <div
                key={application._id}
                className="flex flex-col px-4 py-3 border border-base-300 rounded-box bg-base-100 shadow-sm hover:shadow-md transition-shadow"
            >
                {/* Header: group name and status badge */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-base-content/70" />
                        <h3 className="text-lg font-semibold text-base-content">
                            {team?.name || 'Unknown Group'}
                        </h3>
                    </div>
                    <span className={`${badgeClass} text-xs`}>
                        {application.status}
                    </span>
                </div>

                {/* Reason and applied date */}
                <div className="mt-2 space-y-1 text-sm">
                    <div className="flex gap-1">
                        <span className="font-medium text-base-content">Reason:</span>
                        <span className="text-base-content/80">{application.reasonToJoin}</span>
                    </div>
                    <div className="text-xs text-base-content/70">
                        Applied on: {formatDate(application.appliedAt)}
                    </div>
                </div>

                {/* Withdraw button (only if status is PENDING) */}
                {application.status === 'PENDING' && (
                    <div className="mt-4">
                        <Button
                            name={withdrawMutation.isPending ? 'Withdrawing...' : 'Withdraw'}
                            variant="error"
                            size="sm"
                            onClick={() => onWithdraw(application._id)}
                            disabled={withdrawMutation.isPending}
                        />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-3 px-2 py-4">
            {applications.map(createApplicationCards)}
        </div>
    );
};

export default SentApplications;