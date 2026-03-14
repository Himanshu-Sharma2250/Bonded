import { MoveLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useUserHistoryStore } from '../store/useUserHistoryStore';

const actionColorMap = {
    CREATED: '#10b981',   // green
    JOINED: '#3b82f6',    // blue
    LEFT: '#ef4444',      // red
    KICKED_OUT: '#f97316', // orange
    DELETED: '#6b7280',   // gray
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
    const { userId } = useParams();
    const navigate = useNavigate();
    const { getUserProfile, loading, otherUser } = useAuthStore();
    const { getUserHistories, userHistory, loading: historyLoading } = useUserHistoryStore();
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchUserProfile = async () => {
            try {
                setError(null);
                await getUserProfile(userId);
                await getUserHistories(); // change this
            } catch (err) {
                setError('User not found or failed to load.');
            }
        };

        if (userId) {
            fetchUserProfile();
        }

        return () => abortController.abort();
    }, [userId, getUserProfile, getUserHistories]);

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

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#2A6E8C]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-[#FF7A59]">
                {error}
            </div>
        );
    }

    const createHistoryCard = (historyItem) => {
        const dotColor = actionColorMap[historyItem.userAction] || '#64748B';

        return (
            <div
                key={historyItem._id}
                className="flex flex-col px-4 py-3 border border-[#CBD5E1] rounded-md bg-white shadow-sm hover:shadow-md transition-shadow w-full"
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span
                            className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                            style={{ backgroundColor: dotColor }}
                        />
                        <h3 className="text-base sm:text-lg font-semibold text-[#0F172A] wrap-break-words">
                            {historyItem.title}
                        </h3>
                    </div>
                    <span className="text-xs text-[#64748B] sm:text-right">
                        {formatDate(historyItem.createdAt)}
                    </span>
                </div>
                <p className="mt-2 text-sm text-[#334155] wrap-break-words">
                    {historyItem.description}
                </p>
            </div>
        );
    };

    return (
        <div className="py-2 flex flex-col gap-6 px-2 sm:px-4">
            {/* Back button and header */}
            <div className="flex gap-3 items-center">
                <button onClick={() => navigate(-1)} className="p-2 rounded-md hover:bg-gray-100">
                    <MoveLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold">User Profile</h1>
                    <p className="text-sm text-[#64748B]">
                        Viewing {otherUser?.fullName || otherUser?.name}'s profile
                    </p>
                </div>
            </div>

            {/* User avatar and basic info */}
            <div className="flex gap-4 items-center bg-white border border-[#CBD5E1] rounded-md p-4 shadow-sm">
                <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-md flex items-center justify-center text-white font-bold text-xl sm:text-2xl"
                    style={{ backgroundColor: getAvatarColor(otherUser?.name) }}
                >
                    {otherUser?.fullName?.charAt(0).toUpperCase() || otherUser?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex flex-col">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#0F172A]">
                        {otherUser?.fullName || otherUser?.name}
                    </h2>
                    <span className="text-sm text-[#64748B]">@{otherUser?.name}</span>
                    <span className="text-sm text-[#64748B]">{otherUser?.email}</span>
                </div>
            </div>

            {/* Personal Information */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Personal Information</h2>
                <div className="flex flex-col gap-4 p-4 border border-[#CBD5E1] rounded-md bg-white shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Username</p>
                            <p className="text-sm text-[#0F172A]">{otherUser?.name || 'NA'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Email</p>
                            <p className="text-sm text-[#0F172A]">{otherUser?.email || 'NA'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Role</p>
                            <p className="text-sm text-[#0F172A]">{otherUser?.role || 'NA'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Member Since</p>
                            <p className="text-sm text-[#0F172A]">{formatDate(otherUser?.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Information */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Social Information</h2>
                <div className="flex flex-col gap-4 p-4 border border-[#CBD5E1] rounded-md bg-white shadow-sm">
                    {/* Bio and Website */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Bio</p>
                            <p className="text-sm text-[#0F172A]">{otherUser?.bio || 'NA'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Website</p>
                            {otherUser?.website ? (
                                <a href={otherUser.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {otherUser.website}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                    </div>

                    {/* LinkedIn and GitHub */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">LinkedIn</p>
                            {otherUser?.linkedln ? (
                                <a href={otherUser.linkedln} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {otherUser.linkedln}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">GitHub</p>
                            {otherUser?.github ? (
                                <a href={otherUser.github} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {otherUser.github}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                    </div>

                    {/* Twitter and Hashnode */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Twitter/X</p>
                            {otherUser?.twitter ? (
                                <a href={otherUser.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {otherUser.twitter}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Hashnode</p>
                            {otherUser?.hashnode ? (
                                <a href={otherUser.hashnode} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {otherUser.hashnode}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                    </div>

                    {/* Medium and LeetCode */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Medium</p>
                            {otherUser?.medium ? (
                                <a href={otherUser.medium} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {otherUser.medium}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">LeetCode</p>
                            {otherUser?.leetcode ? (
                                <a href={otherUser.leetcode} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {otherUser.leetcode}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* User History */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">User History</h2>
                <div className="px-4 py-4 border-2 border-[#CBD5E1] rounded-md bg-[#F8FAFC]">
                    {historyLoading ? (
                        <div className="flex justify-center items-center py-10">
                            <Loader2 className="w-8 h-8 animate-spin text-[#2A6E8C]" />
                        </div>
                    ) : !userHistory || userHistory.length === 0 ? (
                        <div className="text-center py-10">
                            <span className="text-lg text-[#64748B]">No History</span>
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