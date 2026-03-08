import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

export const useTeamHistory = (teamId) => {
    return useQuery({
        queryKey: ['teamHistory', teamId],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get(`/teamHistory/history/${teamId}`);
                return data.history;
            } catch (error) {
                if (error.response?.status === 404) return null;
                throw error;
            }
        },
        enabled: !!teamId
    })
}

export const useTeamCreateHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({teamId}) => await axiosInstance.post(`/teamHistory/create-team/${teamId}`),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['teamHistory', variables.teamId] })
        }
    })
}

export const useMemberLeftHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({teamId, data}) => await axiosInstance.post(`/teamHistory/member-left/${teamId}`, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['teamHistory', variables.teamId] })
        }
    })
}

export const useMemberKickedOutHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({teamId, data}) => await axiosInstance.post(`/teamHistory/member-kicked-out/${teamId}`, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['teamHistory', variables.teamId] })
        }
    })
}

export const useMemberJoinedHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({teamId, data}) => await axiosInstance.post(`/teamHistory/member-joined/${teamId}`, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['teamHistory', variables.teamId] })
        }
    })
}

export const useTeamDeleteHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({teamId, data}) => await axiosInstance.post(`/teamHistory/team-delete/${teamId}`, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['teamHistory', variables.teamId] })
        }
    })
}