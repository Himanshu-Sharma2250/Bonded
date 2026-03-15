import { MoveLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserProfile } from '../hooks/useAuthQueries';
import { useOtherUserHistory } from '../hooks/useUserHistoryQueries';

const actionColorMap = {
    CREATED: '#10b981',
    JOINED: '#3b82f6',
    LEFT: '#ef4444',
    KICKED_OUT: '#f97316',
    DELETED: '#6b7280',
};

const getAvatarColor = (name) => {
    if (!name) return '#6b7280';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 80%, 60%)`;
};

const UserProfilePage = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const { data: otherUser, isLoading, error } = useGetUserProfile(name);
    const { data: userHistory, error: historyError, isLoading: historyLoading } = useOtherUserHistory(otherUser?._id);
    console.log("other user", otherUser )
    console.log("name in paramas ", name)

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

    if (isLoading || historyLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !otherUser) {
        return (
            <div className="text-center py-20 text-error">
                User not found or failed to load.
            </div>
        );
    }

    const createHistoryCard = (historyItem) => {
        const dotColor = actionColorMap[historyItem.userAction] || '#64748B';

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

    return (
        <div className="py-2 flex flex-col gap-6 px-2 sm:px-4">
            {/* Back button and header */}
            <div className="flex gap-3 items-center">
                <button onClick={() => navigate(-1)} className="p-2 rounded-md hover:bg-base-200">
                    <MoveLeft className="w-5 h-5 text-base-content" />
                </button>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-base-content">User Profile</h1>
                    <p className="text-sm text-base-content/70">
                        Viewing {otherUser?.fullName || otherUser?.name}'s profile
                    </p>
                </div>
            </div>

            {/* User avatar and basic info */}
            <div className="flex gap-4 items-center bg-base-100 border border-base-300 rounded-box p-4 shadow-sm">
                <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-md flex items-center justify-center text-white font-bold text-xl sm:text-2xl"
                    style={{ backgroundColor: getAvatarColor(otherUser?.name) }}
                >
                    {otherUser?.fullName?.charAt(0).toUpperCase() || otherUser?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex flex-col">
                    <h2 className="text-lg sm:text-xl font-semibold text-base-content">
                        {otherUser?.fullName || otherUser?.name}
                    </h2>
                    <span className="text-sm text-base-content/70">{otherUser?.name}</span>
                    <span className="text-sm text-base-content/70">{otherUser?.email}</span>
                </div>
            </div>

            {/* Personal Information */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-base-content">Personal Information</h2>
                <div className="flex flex-col gap-4 p-4 border border-base-300 rounded-box bg-base-100 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">Username</p>
                            <p className="text-sm text-base-content">{otherUser?.name || 'NA'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">Email</p>
                            <p className="text-sm text-base-content">{otherUser?.email || 'NA'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">Role</p>
                            <p className="text-sm text-base-content">{otherUser?.role || 'NA'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">Member Since</p>
                            <p className="text-sm text-base-content">{formatDate(otherUser?.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Information */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-base-content">Social Information</h2>
                <div className="flex flex-col gap-4 p-4 border border-base-300 rounded-box bg-base-100 shadow-sm">
                    {/* Bio and Website */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">Bio</p>
                            <p className="text-sm text-base-content">{otherUser?.bio || 'NA'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">Website</p>
                            {otherUser?.website ? (
                                <a href={otherUser.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                    {otherUser.website}
                                </a>
                            ) : (
                                <p className="text-sm text-base-content">NA</p>
                            )}
                        </div>
                    </div>
                    {/* LinkedIn and GitHub */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">LinkedIn</p>
                            {otherUser?.linkedln ? (
                                <a href={otherUser.linkedln} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                    {otherUser.linkedln}
                                </a>
                            ) : (
                                <p className="text-sm text-base-content">NA</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">GitHub</p>
                            {otherUser?.github ? (
                                <a href={otherUser.github} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                    {otherUser.github}
                                </a>
                            ) : (
                                <p className="text-sm text-base-content">NA</p>
                            )}
                        </div>
                    </div>
                    {/* Twitter and Hashnode */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">Twitter/X</p>
                            {otherUser?.twitter ? (
                                <a href={otherUser.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                    {otherUser.twitter}
                                </a>
                            ) : (
                                <p className="text-sm text-base-content">NA</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">Hashnode</p>
                            {otherUser?.hashnode ? (
                                <a href={otherUser.hashnode} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                    {otherUser.hashnode}
                                </a>
                            ) : (
                                <p className="text-sm text-base-content">NA</p>
                            )}
                        </div>
                    </div>
                    {/* Medium and LeetCode */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">Medium</p>
                            {otherUser?.medium ? (
                                <a href={otherUser.medium} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                    {otherUser.medium}
                                </a>
                            ) : (
                                <p className="text-sm text-base-content">NA</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-base-content/70">LeetCode</p>
                            {otherUser?.leetcode ? (
                                <a href={otherUser.leetcode} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                    {otherUser.leetcode}
                                </a>
                            ) : (
                                <p className="text-sm text-base-content">NA</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* User History */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-base-content">User History</h2>
                <div className="px-4 py-4 border-2 border-base-300 rounded-box bg-base-200">
                    {historyError && <div>
                        Error getting User's History
                    </div>}
                    {historyLoading ? (
                        <div className="flex justify-center items-center py-10">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : !userHistory || userHistory.length === 0 ? (
                        <div className="text-center py-10">
                            <span className="text-lg text-base-content/70">No History</span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {userHistory.map(createHistoryCard)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;