import { useRef } from 'react';
import Button from './Button';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useApplyApplication } from '../hooks/useApplicationQueries';
import { useProfile } from '../hooks/useAuthQueries';
import toast from 'react-hot-toast';

const applySchema = z.object({
    reasonToJoin: z.string().trim().min(1, 'Reason is required'),
});

const ApplyToGroupModal = ({ teamId }) => {
    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(applySchema),
    });
    const applyMutation = useApplyApplication();
    const { data: user } = useProfile();

    const dialogRef = useRef(null);

    const openModal = () => dialogRef.current?.showModal();
    const closeModal = () => {
        dialogRef.current?.close();
        reset();
    };

    const onApplyToJoin = async (data) => {
        try {
            await applyMutation.mutateAsync({
                teamId,
                data: {
                    name: user.name,
                    email: user.email,
                    reasonToJoin: data.reasonToJoin,
                },
            });
            toast.success('Application submitted');
            closeModal();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to apply');
        }
    };

    return (
        <div>
            <Button name="Apply" bgColor="primary" btnSize="16px" onClick={openModal} />

            <dialog
                ref={dialogRef}
                className="modal modal-bottom sm:modal-middle"
                onClose={closeModal}
            >
                <div className="modal-box bg-base-100">
                    <h3 className="font-bold text-lg text-center text-base-content">Want to join?</h3>
                    <form method="dialog" onSubmit={handleSubmit(onApplyToJoin)} className="mt-4">
                        <label className="form-control">
                            <span className="label-text text-base-content/80">Why should we add you to our team?</span>
                            <textarea
                                className="textarea textarea-bordered h-24 bg-base-100 w-full"
                                placeholder="Give us reason"
                                {...register('reasonToJoin')}
                            ></textarea>
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
                                name={applyMutation.isPending ? <Loader2 className="w-4 animate-spin" /> : 'Apply'}
                                bgColor="primary"
                                btnSize="16px"
                                type="submit"
                                disabled={applyMutation.isPending}
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

export default ApplyToGroupModal;