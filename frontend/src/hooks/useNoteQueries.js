import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';

export const usePublicNotes = (teamId) => {
    return useQuery({
        queryKey: ['publicNotes', teamId],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get(`/note/get-public-notes/${teamId}`);
                return data.publicNotes; 
            } catch (error) {
                if (error.response?.status === 404) return null;
                throw error;
            }
        },
        enabled: !!teamId,
    });
};

export const usePrivateNotes = (teamId) => {
    return useQuery({
        queryKey: ['privateNotes', teamId],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get(`/note/get-private-notes/${teamId}`);
                return data.privateNotes;
            } catch (error) {
                if (error.response?.status === 404) return null;
                throw error;
            }
        },
        enabled: !!teamId,
    });
};

export const useCreateNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ teamId, noteData }) =>
            await axiosInstance.post(`/note/create/${teamId}`, noteData),
        onSuccess: (_, variables) => {
            // Invalidate both note lists for this team
            queryClient.invalidateQueries({ queryKey: ['publicNotes', variables.teamId] });
            queryClient.invalidateQueries({ queryKey: ['privateNotes', variables.teamId] });
        },
    });
};

export const useEditNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ noteId, noteData, teamId }) =>
            await axiosInstance.patch(`/note/edit/${noteId}`, noteData),
        onSuccess: (_, variables) => {
            // Invalidate notes for the team
            queryClient.invalidateQueries({ queryKey: ['publicNotes', variables.teamId] });
            queryClient.invalidateQueries({ queryKey: ['privateNotes', variables.teamId] });
        },
    });
};

export const useDeleteNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ noteId, teamId }) =>
            await axiosInstance.delete(`/note/delete/${noteId}`),
        onSuccess: (_, variables) => {
            // Invalidate notes for the team
            queryClient.invalidateQueries({ queryKey: ['publicNotes', variables.teamId] });
            queryClient.invalidateQueries({ queryKey: ['privateNotes', variables.teamId] });
        },
    });
};