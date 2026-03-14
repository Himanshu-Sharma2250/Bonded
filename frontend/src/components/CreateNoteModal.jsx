import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Button from './Button';
import { CirclePlus } from 'lucide-react';
import { useCreateNote } from '../hooks/useNoteQueries';

const noteSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    isPrivate: z.boolean().default(false),
});

const CreateNoteModal = ({ teamId }) => {
    const dialogRef = useRef(null);
    const createNote = useCreateNote();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(noteSchema),
        defaultValues: {
            title: '',
            description: '',
            isPrivate: false,
        },
    });

    const openModal = () => {
        dialogRef.current?.showModal();
    };

    const closeModal = () => {
        dialogRef.current?.close();
        reset();
    };

    const onSubmit = async (data) => {
        try {
            await createNote.mutateAsync({ teamId, noteData: data });
            toast.success('Note created successfully');
            closeModal();
        } catch (error) {
            console.error('Failed to create note:', error);
            toast.error('Failed to create note. Please try again.');
        }
    };

    return (
        <div>
            <Button
                name={<CirclePlus className="w-6 h-6" />}
                variant="ghost"
                size="md"
                onClick={openModal}
                className="p-2"
            />

            <dialog ref={dialogRef} className="modal">
                <div className="modal-box bg-base-100">
                    <h3 className="font-bold text-lg text-center text-base-content">Create Note</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="py-4">
                        <label className="form-control w-full">
                            <span className="label-text text-base-content/80">Title</span>
                            <input
                                type="text"
                                className={`input input-bordered w-full bg-base-100 ${
                                    errors.title ? 'input-error' : ''
                                }`}
                                placeholder="Note's Title"
                                {...register('title')}
                            />
                            {errors.title && (
                                <span className="text-error text-xs mt-1">{errors.title.message}</span>
                            )}
                        </label>

                        <label className="form-control w-full mt-2">
                            <span className="label-text text-base-content/80">Description</span>
                            <textarea
                                className={`textarea textarea-bordered w-full bg-base-100 h-24 ${
                                    errors.description ? 'textarea-error' : ''
                                }`}
                                placeholder="Note's Description"
                                {...register('description')}
                            />
                            {errors.description && (
                                <span className="text-error text-xs mt-1">{errors.description.message}</span>
                            )}
                        </label>

                        <div className="flex flex-col gap-1 mt-2">
                            <span className="text-sm font-medium text-base-content/80">Who can see this note?</span>
                            <Controller
                                name="isPrivate"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                className="radio radio-primary"
                                                value="false"
                                                checked={field.value === false}
                                                onChange={() => field.onChange(false)}
                                            />
                                            <span className="text-sm text-base-content/80">Public</span>
                                        </label>
                                        <label className="flex items-center gap-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                className="radio radio-primary"
                                                value="true"
                                                checked={field.value === true}
                                                onChange={() => field.onChange(true)}
                                            />
                                            <span className="text-sm text-base-content/80">Private</span>
                                        </label>
                                    </div>
                                )}
                            />
                        </div>

                        <div className="modal-action flex gap-2 justify-center mt-6">
                            <Button
                                name="Cancel"
                                variant="ghost"
                                size="md"
                                type="button"
                                onClick={closeModal}
                            />
                            <Button
                                name={createNote.isPending ? 'Creating...' : 'Create'}
                                variant="primary"
                                size="md"
                                type="submit"
                                disabled={createNote.isPending}
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

export default CreateNoteModal;