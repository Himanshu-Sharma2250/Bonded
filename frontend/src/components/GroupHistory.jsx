import React, { useEffect } from 'react'
import { useTeamHistoryStore } from '../store/useTeamHistoryStore'
import { Loader2 } from 'lucide-react';

const actionColorMap = {
    CREATED: '#10b981',   // green
    JOINED: '#3b82f6',    // blue
    LEFT: '#ef4444',      // red
    KICKED_OUT: '#f97316', // orange
    DELETED: '#6b7280',   // gray
};

const GroupHistory = ({teamId}) => {
    const {getHistory, loading, history} = useTeamHistoryStore();

    useEffect(() => {
        async function fetchHistory() {
            if (teamId) {
                await getHistory(teamId);
            }
        }
        fetchHistory();
    }, [teamId, getHistory])

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const createHistoryCard = (historyItem) => {
        const dotColor = actionColorMap[historyItem.teamAction] || '#64748B'; // default slate

        return (
            <div
                key={historyItem._id}
                className="flex flex-col px-4 py-3 border border-[#CBD5E1] rounded-md bg-white shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Colored dot */}
                        <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: dotColor }}
                        />
                        <h3 className="text-lg font-semibold text-[#0F172A]">
                            {historyItem.title}
                        </h3>
                    </div>
                    <span className="text-xs text-[#64748B]">
                        {formatDate(historyItem.createdAt)}
                    </span>
                </div>
                <p className="mt-2 text-sm text-[#334155]">
                    {historyItem.description}
                </p>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-[#2A6E8C]" />
            </div>
        );
    }
    console.log("team id ", teamId);
    console.log("history: ", history)

    return (
        <div className='flex flex-col px-5 py-4 gap-2 border-2 rounded-xs border-gray-600'>
            {/* histories */}
            {!history || history.length === 0 ? (
                <div className="text-center py-10">
                    <span className="text-lg text-[#64748B]">No History</span>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {history.map(createHistoryCard)}
                </div>
            )}
        </div>
    )
}

export default GroupHistory
