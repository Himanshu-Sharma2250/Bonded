import { EllipsisVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import EditNoteModal from './EditNoteModal';
import { useDeleteNote } from '../hooks/useNoteQueries';

const NoteCard = ({ note, teamId, isLeader }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const menuRef = useRef(null);
    const deleteNote = useDeleteNote();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await deleteNote.mutateAsync({ noteId: note._id, teamId });
                toast.success('Note deleted');
            } catch (error) {
                toast.error('Failed to delete note');
            }
        }
        setShowMenu(false);
    };

    const handleEdit = () => {
        setShowEditModal(true);
        setShowMenu(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <>
            <div className="flex flex-col px-4 py-3 border border-base-300 rounded-box bg-base-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-base-content">{note.title}</h3>
                        <span className="text-xs text-base-content/70">{formatDate(note.createdAt)}</span>
                    </div>

                    {isLeader && (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="p-1 rounded-full hover:bg-base-200 transition-colors"
                            >
                                <EllipsisVertical className="w-5 text-base-content/70" />
                            </button>

                            {showMenu && (
                                <div className="absolute right-0 mt-1 w-32 bg-base-100 border border-base-300 rounded-box shadow-lg z-10">
                                    <button
                                        onClick={handleEdit}
                                        className="w-full text-left px-4 py-2 text-sm text-base-content hover:bg-base-200 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="w-full text-left px-4 py-2 text-sm text-error hover:bg-base-200 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <p className="mt-2 text-sm text-base-content/80">{note.description}</p>

                {note.isPrivate ? (
                    <span className="mt-2 self-start text-xs bg-base-300 text-base-content/70 px-2 py-0.5 rounded-full">
                        Private
                    </span>
                ) : (
                    <span className="mt-2 self-start text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Public
                    </span>
                )}
            </div>

            {showEditModal && (
                <EditNoteModal note={note} teamId={teamId} onClose={() => setShowEditModal(false)} />
            )}
        </>
    );
};

export default NoteCard;