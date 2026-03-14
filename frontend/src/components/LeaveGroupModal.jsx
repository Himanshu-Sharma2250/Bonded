import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTeamLeft } from '../hooks/useTeamMemberQueries';
import { useMemberLeftHistory } from '../hooks/useTeamHistoryQueries';
import { useUserLeftTeam } from '../hooks/useUserHistoryQueries';
import { useAuthStore } from '../store/useAuthStore';
import Button from './Button';
import toast from 'react-hot-toast';

const LeaveGroupModal = ({ teamId }) => {
    const teamLeftMutation = useTeamLeft();
    const memberLeftHistoryMutation = useMemberLeftHistory();
    const userLeftTeamMutation = useUserLeftTeam();
    const { user } = useAuthStore();

    const { register, handleSubmit, reset } = useForm({
        defaultValues: { reason: '' },
    });

    const dialogRef = useRef(null);

    const openModal = () => dialogRef.current?.showModal();
    const closeModal = () => {
        dialogRef.current?.close();
        reset();
    };

    const handleLeft = async (data) => {
        try {
            await teamLeftMutation.mutateAsync({ teamId, userId: user._id });
            await memberLeftHistoryMutation.mutateAsync({
                teamId,
                data: { reason: data.reason, memberName: user?.fullName },
            });
            await userLeftTeamMutation.mutateAsync({ reason: data.reason });
            toast.success('You left the team');
            closeModal();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to leave team');
        }
    };

    const isPending =
        teamLeftMutation.isPending ||
        memberLeftHistoryMutation.isPending ||
        userLeftTeamMutation.isPending;

    return (
        <div>
            <Button name="Leave Group" variant="error" size="md" onClick={openModal} />

            <dialog ref={dialogRef} className="modal">
                <div className="modal-box bg-base-100">
                    <h3 className="font-bold text-lg text-center text-base-content">
                        Are you sure?
                        <span className="font-light text-base-content/60 text-xs block mt-1">
                            (If you leave, you cannot join the same team again)
                        </span>
                    </h3>
                    <form onSubmit={handleSubmit(handleLeft)} className="py-4">
                        <label className="form-control w-full">
                            <span className="label-text text-base-content/80">Confirm Group Name</span>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-base-100"
                                placeholder="Enter Group's Name to leave"
                                required
                            />
                        </label>

                        <label className="form-control w-full mt-2">
                            <span className="label-text text-base-content/80">Reason to leave</span>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-base-100"
                                placeholder="Reason to leave"
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
                                name={isPending ? 'Leaving...' : 'Leave'}
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

export default LeaveGroupModal;