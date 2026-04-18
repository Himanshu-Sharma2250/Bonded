import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useKickOut } from '../hooks/useTeamMemberQueries';
import { useMemberKickedOutHistory } from '../hooks/useTeamHistoryQueries';
import { useUserKickedOutOfTeam } from '../hooks/useUserHistoryQueries';
import Button from './Button';
import toast from 'react-hot-toast';

const KickOutModal = ({ teamId, memberId, memberName }) => {
    const kickOutMutation = useKickOut();
    const memberKickedOutHistoryMutation = useMemberKickedOutHistory();
    const userKickedOutMutation = useUserKickedOutOfTeam();

    const { register, handleSubmit, reset } = useForm({
        defaultValues: { reason: '' },
    });

    const dialogRef = useRef(null);

    const openModal = () => dialogRef.current?.showModal();
    const closeModal = () => {
        dialogRef.current?.close();
        reset();
    };

    const handleKickOut = async (data) => {
        try {
            await kickOutMutation.mutateAsync({ teamId, memberId });
            await memberKickedOutHistoryMutation.mutateAsync({
                teamId,
                data: { memberName, reason: data.reason },
            });
            await userKickedOutMutation.mutateAsync({name: memberName, data: { reason: data.reason }});
            toast.success('Member kicked out');
            closeModal();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to kick member');
        }
    };

    const isPending =
        kickOutMutation.isPending ||
        memberKickedOutHistoryMutation.isPending ||
        userKickedOutMutation.isPending;

    return (
        <div>
            <Button name="Kick Out" variant="error" size="md" onClick={openModal} />

            <dialog ref={dialogRef} className="modal">
                <div className="modal-box bg-base-100">
                    <h3 className="font-bold text-lg text-center text-base-content">Kick {memberName}?</h3>
                    <form onSubmit={handleSubmit(handleKickOut)} className="py-4">
                        <label className="form-control w-full">
                            <span className="label-text text-base-content/80">Reason for kicking</span>
                            <input
                                type="text"
                                className="input input-bordered w-full bg-base-100"
                                placeholder="Reason for kicking"
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
                                name={isPending ? 'Kicking...' : 'Kick Out'}
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

export default KickOutModal;