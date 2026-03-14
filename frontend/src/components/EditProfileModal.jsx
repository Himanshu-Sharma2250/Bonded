import { useRef } from 'react';
import Button from './Button';
import { Loader2, Pencil } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const editProfileSchema = z.object({
    name: z.string().trim(),
    fullName: z.string().trim(),
    bio: z.string().trim(),
    website: z.string().trim(),
    linkedln: z.string().trim(),
    twitter: z.string().trim(),
    hashnode: z.string().trim(),
    medium: z.string().trim(),
    leetcode: z.string().trim(),
    github: z.string().trim(),
});

const EditProfileModal = ({ initialValue }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            fullName: initialValue.fullName || '',
            name: initialValue.name || '',
            bio: initialValue.bio || '',
            github: initialValue.github || '',
            hashnode: initialValue.hashnode || '',
            leetcode: initialValue.leetcode || '',
            linkedln: initialValue.linkedln || '',
            medium: initialValue.medium || '',
            twitter: initialValue.twitter || '',
            website: initialValue.website || '',
        },
    });

    const { editProfile, isEditing } = useAuthStore();

    const dialogRef = useRef(null);

    const openModal = () => {
        dialogRef.current?.showModal();
    };

    const closeModal = () => {
        dialogRef.current?.close();
    };

    const onEditProfile = async (data) => {
        await editProfile(data);
        toast.success('Profile Updated');
        closeModal();
    };

    return (
        <div>
            <Button
                name={
                    <span className="flex gap-2 items-center">
                        <Pencil className="w-4 h-4" />
                        Edit
                    </span>
                }
                variant="primary"
                size="md"
                onClick={openModal}
            />

            <dialog ref={dialogRef} className="modal">
                <div className="modal-box bg-base-100 max-w-3xl">
                    <h3 className="font-bold text-lg text-center text-base-content">Edit Profile</h3>
                    <form onSubmit={handleSubmit(onEditProfile)} className="py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <label className="form-control">
                                <span className="label-text text-base-content/80">Full Name</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100"
                                    placeholder="Full Name"
                                    {...register('fullName')}
                                />
                            </label>

                            {/* Username */}
                            <label className="form-control">
                                <span className="label-text text-base-content/80">Username</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100"
                                    placeholder="Username"
                                    {...register('name')}
                                />
                            </label>

                            {/* Bio */}
                            <label className="form-control">
                                <span className="label-text text-base-content/80">Bio</span>
                                <textarea
                                    className="textarea textarea-bordered w-full bg-base-100 h-24"
                                    placeholder="Tell us about yourself"
                                    {...register('bio')}
                                />
                            </label>

                            {/* Website */}
                            <label className="form-control">
                                <span className="label-text text-base-content/80">Website</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100"
                                    placeholder="www.yoursite.com"
                                    {...register('website')}
                                />
                            </label>

                            {/* Leetcode */}
                            <label className="form-control">
                                <span className="label-text text-base-content/80">Leetcode</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100"
                                    placeholder="www.leetcode.com"
                                    {...register('leetcode')}
                                />
                            </label>

                            {/* Github */}
                            <label className="form-control">
                                <span className="label-text text-base-content/80">Github</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100"
                                    placeholder="www.github.com/username"
                                    {...register('github')}
                                />
                            </label>

                            {/* LinkedIn */}
                            <label className="form-control">
                                <span className="label-text text-base-content/80">LinkedIn</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100"
                                    placeholder="www.linkedin.com/username"
                                    {...register('linkedln')}
                                />
                            </label>

                            {/* Twitter/X */}
                            <label className="form-control">
                                <span className="label-text text-base-content/80">Twitter/X</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100"
                                    placeholder="www.x.com/username"
                                    {...register('twitter')}
                                />
                            </label>

                            {/* Hashnode */}
                            <label className="form-control">
                                <span className="label-text text-base-content/80">Hashnode</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100"
                                    placeholder="www.hashnode.com/username"
                                    {...register('hashnode')}
                                />
                            </label>

                            {/* Medium */}
                            <label className="form-control">
                                <span className="label-text text-base-content/80">Medium</span>
                                <input
                                    type="text"
                                    className="input input-bordered w-full bg-base-100"
                                    placeholder="www.medium.com/username"
                                    {...register('medium')}
                                />
                            </label>
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
                                name={isEditing ? <Loader2 className="w-4 animate-spin" /> : 'Save Changes'}
                                variant="primary"
                                size="md"
                                type="submit"
                                disabled={isEditing}
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

export default EditProfileModal;