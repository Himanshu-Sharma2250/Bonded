import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useTeamHistoryStore = create((set) => ({
    history: [],
    loading: false,

    createTeamHistory: async (teamId, data) => {
        set({loading: true})

        try {
            await axiosInstance.post(`/teamHistory/create-team/${teamId}`, data);
        } catch (error) {
            console.error("Error in createTeam history: ", error);
        } finally {
            set({loading: true})
        }
    },

    memberLeftHistory: async (teamId, data) => {
        set({loading: true})

        try {
            await axiosInstance.post(`/teamHistory/member-left/${teamId}`, data);
        } catch (error) {
            console.error("Error in memberLeft history: ", error);
        } finally {
            set({loading: true})
        }
    },

    memberKickedOutHistory: async (teamId, data) => {
        set({loading: true})

        try {
            await axiosInstance.post(`/teamHistory/member-kicked-out/${teamId}`, data);
        } catch (error) {
            console.error("Error in memberKickedOut history: ", error);
        } finally {
            set({loading: true})
        }
    },

    memberJoinedHistory: async (teamId, data) => {
        set({loading: true})

        try {
            await axiosInstance.post(`/teamHistory/member-joined/${teamId}`, data);
        } catch (error) {
            console.error("Error in memberJoined history: ", error);
        } finally {
            set({loading: true})
        }
    },

    teamDeleteHistory: async (teamId, data) => {
        set({loading: true})

        try {
            await axiosInstance.post(`/teamHistory/team-delete/${teamId}`, data);
        } catch (error) {
            console.error("Error in teamDelete history: ", error);
        } finally {
            set({loading: true})
        }
    },

    getHistory: async (teamId) => {
        set({loading: true})

        try {
            const res = await axiosInstance.get(`/teamHistory/history/${teamId}`);
            set({history: res.data.history})
        } catch (error) {
            console.error("Error in fetching team history: ", error);
        } finally {
            set({loading: true})
        }
    }
}))