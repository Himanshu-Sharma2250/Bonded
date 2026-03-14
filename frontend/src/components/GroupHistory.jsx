import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import { useTeamHistory } from '../hooks/useTeamHistoryQueries';

const actionColorMap = {
    CREATED: '#10b981',   // green
    JOINED: '#3b82f6',    // blue
    LEFT: '#ef4444',      // red
    KICKED_OUT: '#f97316', // orange
    DELETED: '#6b7280',   // gray
};

const GroupHistory = ({ teamId }) => {
    const { data: history = [], isLoading, error } = useTeamHistory(teamId);

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

    const sortedHistory = useMemo(() => {
        if (!history) return [];
        return [...history].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [history]);

    const createHistoryCard = (historyItem) => {
        const dotColor = actionColorMap[historyItem.teamAction] || '#64748B';

        return (
            <div
                key={historyItem._id}
                className="flex flex-col px-4 py-3 border border-base-300 rounded-box bg-base-100 shadow-sm hover:shadow-md transition-shadow w-full"
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span
                            className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                            style={{ backgroundColor: dotColor }}
                        />
                        <h3 className="text-base sm:text-lg font-semibold text-base-content wrap-break-words">
                            {historyItem.title}
                        </h3>
                    </div>
                    <span className="text-xs text-base-content/70 sm:text-right">
                        {formatDate(historyItem.createdAt)}
                    </span>
                </div>
                <p className="mt-2 text-sm text-base-content/80 wrap-break-words">
                    {historyItem.description}
                </p>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-10 text-error">
                Error loading History. Please retry
            </div>
        );
    }

    return (
        <div className="px-2 sm:px-4 py-4 border-2 border-base-300 rounded-box bg-base-200">
            {!sortedHistory || sortedHistory.length === 0 ? (
                <div className="text-center py-10">
                    <span className="text-lg text-base-content/70">No History</span>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {sortedHistory.map(createHistoryCard)}
                </div>
            )}
        </div>
    );
};

export default GroupHistory;