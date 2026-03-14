import React, { useEffect } from 'react';
import EditProfileModal from '../components/EditProfileModal';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';
import { useMemo } from 'react';
import { useUserHistory } from '../hooks/useUserHistoryQueries';
import toast from 'react-hot-toast';

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

const MyProfile = () => {
    const { profile, user } = useAuthStore();
    const { data: userHistory = [], isLoading } = useUserHistory();

    useEffect(() => {
        async function getProfile() {
            await profile();
            toast.success("Profile fetched");
        }
        getProfile();
    }, [profile]);

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

    // Sort history from latest to oldest
    const sortedHistory = useMemo(() => {
        if (!userHistory) return [];
        return [...userHistory].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }, [userHistory]);

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
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl sm:text-3xl font-bold">My Profile</h1>
                <p className="text-sm sm:text-base text-[#64748B]">
                    Manage your account and settings
                </p>
            </div>

            {/* Profile card */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-[#CBD5E1] rounded-md p-4 shadow-sm">
                <div className="flex gap-3 items-center">
                    <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-md flex items-center justify-center text-white font-bold text-xl sm:text-2xl"
                        style={{ backgroundColor: getAvatarColor(user?.name) }}
                    >
                        {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg sm:text-xl font-semibold text-[#0F172A]">
                            {user?.fullName}
                        </h2>
                        <span className="text-sm text-[#64748B]">{user?.name}</span>
                        <span className="text-sm text-[#64748B]">{user?.email}</span>
                    </div>
                </div>
                <EditProfileModal initialValue={user} />
            </div>

            {/* Personal Information */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Personal Information</h2>
                <div className="flex flex-col gap-4 p-4 border border-[#CBD5E1] rounded-md bg-white shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Full Name</p>
                            <p className="text-sm text-[#0F172A]">{user?.fullName || 'NA'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Username</p>
                            <p className="text-sm text-[#0F172A]">{user?.name || 'NA'}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Email</p>
                            <p className="text-sm text-[#0F172A]">{user?.email || 'NA'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Role</p>
                            <p className="text-sm text-[#0F172A]">{user?.role || 'NA'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Information */}
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Social Information</h2>
                <div className="flex flex-col gap-4 p-4 border border-[#CBD5E1] rounded-md bg-white shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Bio</p>
                            <p className="text-sm text-[#0F172A]">{user?.bio || 'NA'}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Website</p>
                            {user?.website ? (
                                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {user.website}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">LinkedIn</p>
                            {user?.linkedln ? (
                                <a href={user.linkedln} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {user.linkedln}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">GitHub</p>
                            {user?.github ? (
                                <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {user.github}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Twitter/X</p>
                            {user?.twitter ? (
                                <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {user.twitter}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Hashnode</p>
                            {user?.hashnode ? (
                                <a href={user.hashnode} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {user.hashnode}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">Medium</p>
                            {user?.medium ? (
                                <a href={user.medium} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {user.medium}
                                </a>
                            ) : (
                                <p className="text-sm text-[#0F172A]">NA</p>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-[#64748B]">LeetCode</p>
                            {user?.leetcode ? (
                                <a href={user.leetcode} target="_blank" rel="noopener noreferrer" className="text-sm text-[#2A6E8C] hover:underline">
                                    {user.leetcode}
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
                    {isLoading ? (
                        <div className="flex justify-center items-center py-10">
                            <Loader2 className="w-8 h-8 animate-spin text-[#2A6E8C]" />
                        </div>
                    ) : !sortedHistory || sortedHistory.length === 0 ? (
                        <div className="text-center py-10">
                            <span className="text-lg text-[#64748B]">No History</span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {sortedHistory.map(createHistoryCard)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;