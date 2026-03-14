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
        <div className="px-4 py-4 border-2 border-base-300 rounded-box bg-base-200">
            <div className="flex flex-col gap-6">
                {/* About */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-base-content">About</h2>
                    <p className="text-sm text-base-content/80">
                        {team?.description || 'No description provided.'}
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-base-content">Categories</h2>
                    <div className="flex flex-wrap gap-2">
                        {team?.techUsed?.length > 0 ? (
                            team.techUsed.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-0.5 text-xs bg-base-300 text-base-content/70 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-base-content/70">No categories listed</span>
                        )}
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-base-content">Details</h2>
                    <div className="flex flex-col gap-1 text-sm border border-base-300 rounded-box p-3 bg-base-100">
                        <div className="flex justify-between">
                            <span className="text-base-content/70">Leader</span>
                            <span className="text-base-content font-medium">
                                {leader?.name || 'Unknown'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-base-content/70">Total Members</span>
                            <span className="text-base-content font-medium">
                                {team?.totalMembers ? team.totalMembers - 1 : 0}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-base-content/70">Last Updated</span>
                            <span className="text-base-content font-medium">
                                {formatDate(team?.updatedAt)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-base-content/70">Group ID</span>
                            <span className="text-base-content font-medium font-mono text-xs">
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