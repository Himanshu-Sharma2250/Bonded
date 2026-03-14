import { useRef } from 'react';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { useDeleteTeam } from '../hooks/useTeamQueries';
import { useTeamDeleteHistory } from '../hooks/useTeamHistoryQueries';
import { useUserDeleteTeam } from '../hooks/useUserHistoryQueries';
import toast from 'react-hot-toast';

const DeleteGroupPopUp = ({ teamId }) => {
    const deleteTeamMutation = useDeleteTeam();
    const teamDeleteHistoryMutation = useTeamDeleteHistory();
    const userDeleteTeamMutation = useUserDeleteTeam();

    const { register, handleSubmit, reset } = useForm();

    const dialogRef = useRef(null);

    const openModal = () => dialogRef.current?.showModal();
    const closeModal = () => {
        dialogRef.current?.close();
        reset();
    };

    const handleDelete = async (data) => {
        try {
            await deleteTeamMutation.mutateAsync(teamId);
            await teamDeleteHistoryMutation.mutateAsync({ teamId, data: { reason: data.reason } });
            await userDeleteTeamMutation.mutateAsync({ reason: data.reason });
            toast.success('Team Deleted');
            closeModal();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error deleting team');
        }
    };

    const isPending =
        deleteTeamMutation.isPending ||
        teamDeleteHistoryMutation.isPending ||
        userDeleteTeamMutation.isPending;

    return (
        <div>
            <Button name="Delete Group" variant="accent" size="md" onClick={openModal} />

            <dialog ref={dialogRef} className="modal">
                <div className="modal-box bg-base-100">
                    <h3 className="font-bold text-lg text-center text-base-content">Are you sure?</h3>
                    <form onSubmit={handleSubmit(handleDelete)} className="py-4">
                        <label className="form-control w-full">
                            <span className="label-text text-base-content/80">Confirm Group Name</span>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-base-100"
                                placeholder="Enter Group's Name to delete"
                                required
                            />
                        </label>

                        <label className="form-control w-full mt-2">
                            <span className="label-text text-base-content/80">Reason to delete team</span>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-base-100"
                                placeholder="Reason to delete team"
                                required
                                {...register('reason')}
                            />
                        </label>

                        <div className="modal-action flex gap-2 justify-center mt-6">
                            <Button
                                name="Cancel"
                                variant="ghost"
                                size="md"
                                type="button"
                                onClick={closeModal}
                            />
                            <Button
                                name={isPending ? 'Deleting...' : 'Delete'}
                                variant="error"
                                size="md"
                                type="submit"
                                disabled={isPending}
                            />
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeModal}>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default DeleteGroupPopUp;