import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';

// Fetch sent applications
export const useSentApplications = () => {
    return useQuery({
        queryKey: ['sentApplications'],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get('/application/all-applications');
                return data.applications;
            } catch (error) {
                if (error.response?.status === 404) return null;
                throw error;
            }
        },
    });
};

// Fetch received applications
export const useReceivedApplications = () => {
    return useQuery({
        queryKey: ['receivedApplications'],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get('/application/all-received-applications');
                return data.applications; 
            } catch (error) {
                if (error.response?.status === 404) return null;
                throw error;
            }
        },
    });
};

// Apply for a team
export const useApplyApplication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ teamId, data }) =>
            axiosInstance.post(`/application/${teamId}/apply`, data),
        onSuccess: () => {
            // Invalidate sent applications so they refetch
            queryClient.invalidateQueries({ queryKey: ['sentApplications'] });
        },
    });
};

// Accept an application
export const useAcceptApplication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (applicationId) =>
            axiosInstance.patch(`/application/accept/${applicationId}`),
        onSuccess: () => {
            // Invalidate both lists, and optionally team data if needed
            queryClient.invalidateQueries({ queryKey: ['receivedApplications'] });
            queryClient.invalidateQueries({ queryKey: ['sentApplications'] });
            // accepted application leads to a new team member, invalidate team queries
            queryClient.invalidateQueries({ queryKey: ['team'] });
        },
    });
};

// Reject an application
export const useRejectApplication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (applicationId) =>
            axiosInstance.patch(`/application/reject/${applicationId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['receivedApplications'] });
            queryClient.invalidateQueries({ queryKey: ['sentApplications'] });
        },
    });
};

// Withdraw an application
export const useWithdrawApplication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (applicationId) =>
            axiosInstance.patch(`/application/withdraw/${applicationId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sentApplications'] });
        },
    });
};