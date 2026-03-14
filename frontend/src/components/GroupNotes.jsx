import { Loader2 } from 'lucide-react';
import CreateNoteModal from './CreateNoteModal';
import NoteCard from './NoteCard';
import { usePrivateNotes, usePublicNotes } from '../hooks/useNoteQueries';

const GroupNotes = ({ teamId, member }) => {
    const { data: privateNotes = [], isLoading: loadingPrivate, error: privateError } = usePrivateNotes(teamId);
    const { data: publicNotes = [], isLoading: loadingPublic, error: publicError } = usePublicNotes(teamId);

    const notesToShow = member ? [...publicNotes, ...privateNotes] : publicNotes;
    const sortedNotes = [...notesToShow].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const isLeader = member?.teamRole === 'LEADER';

    if (loadingPrivate || loadingPublic) {
        return (
            <div className="flex justify-center items-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (privateError || publicError) {
        return (
            <div className="text-center text-error py-10">
                Failed to load notes. Please try again later.
            </div>
        );
    }

    return (
        <div className="px-4 py-4 border-2 border-base-300 rounded-box bg-base-200 relative min-h-50">
            {sortedNotes.length === 0 ? (
                <div className="text-center py-10">
                    {!member ? (
                        <span className="text-lg text-accent">
                            You are not a member. Only public notes would appear here, but there are none.
                        </span>
                    ) : (
                        <span className="text-lg text-base-content/70">No notes yet. Create your first note!</span>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {sortedNotes.map((note) => (
                        <NoteCard key={note._id} note={note} teamId={teamId} isLeader={isLeader} />
                    ))}
                </div>
            )}

            {isLeader && (
                <div className="sticky bottom-4 flex justify-end mt-4">
                    <CreateNoteModal teamId={teamId} />
                </div>
            )}
        </div>
    );
};

export default GroupNotes;