import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useUserHistoryStore = create((set) => ({
    userHistories: [],
    loading: false,

    getUserHistories: async () => {
        set({loading: true});

        try {
            const res = await axiosInstance.get("/userHistory");
            
            set({userHistories: res.data.histories});
        } catch (error) {
            console.error("Error fetching user histories: ", error);
        } finally {
            set({loading: false});
        }
    },

    userJoinedTeam: async (data) => {
        try {
            await axiosInstance.post("/userHistory/user-joined-team", data);
        } catch (error) {
            console.error("Error creating user history(joined team): ", error);
        }
    },

    userCreatedTeam: async (data) => {
        try {
            await axiosInstance.post("/userHistory/user-created-team", data);
        } catch (error) {
            console.error("Error creating user history(create team): ", error);
        }
    },

    userLeftTeam: async (data) => {
        try {
            await axiosInstance.post("/userHistory/user-left-team", data);
        } catch (error) {
            console.error("Error creating user history(left team): ", error);
        }
    },

    userKickedOutOfTeam: async (data) => {
        try {
            await axiosInstance.post("/userHistory/user-kicked-out-team", data);
        } catch (error) {
            console.error("Error creating user history(kicked out team): ", error);
        }
    },

    userDeletedTeam: async (data) => {
        try {
            await axiosInstance.post("/userHistory/user-delete-team", data);
        } catch (error) {
            console.error("Error creating user history(delete team): ", error);
        }
    },
}))