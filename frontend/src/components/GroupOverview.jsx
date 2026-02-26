
const GroupOverview = ({ team, members }) => {
    const leader = members?.find((member) => member?.teamRole === 'LEADER');

    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="px-4 py-4 border-2 border-[#CBD5E1] rounded-md bg-[#F8FAFC]">
            <div className="flex flex-col gap-6">
                {/* About */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-[#0F172A]">About</h2>
                    <p className="text-sm text-[#334155]">
                        {team?.description || 'No description provided.'}
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-[#0F172A]">Categories</h2>
                    <div className="flex flex-wrap gap-2">
                        {team?.techUsed?.length > 0 ? (
                            team.techUsed.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 text-xs bg-[#E2E8F0] text-[#475569] rounded-full"
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-[#64748B]">No categories listed</span>
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-[#0F172A]">Details</h2>
                    <div className="flex flex-col gap-1 text-sm border border-[#CBD5E1] rounded-md p-3 bg-white">
                        <div className="flex justify-between">
                            <span className="text-[#64748B]">Leader</span>
                            <span className="text-[#0F172A] font-medium">
                                {leader?.name || 'Unknown'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#64748B]">Total Members</span>
                            <span className="text-[#0F172A] font-medium">
                                {team?.totalMembers ? team.totalMembers - 1 : 0}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#64748B]">Last Updated</span>
                            <span className="text-[#0F172A] font-medium">
                                {formatDate(team?.updatedAt)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[#64748B]">Group ID</span>
                            <span className="text-[#0F172A] font-medium font-mono text-xs">
                                {team?._id || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupOverview;