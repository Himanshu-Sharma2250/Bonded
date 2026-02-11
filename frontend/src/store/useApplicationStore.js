import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useApplicationStore = create((set) => ({
    applications: [],
    isApplying: false,
    isAccepting: false,
    isRejecting: false,
    isWithdrawing: false,
    isGetting: false,

    applyApplication: async (teamId, data) => {
        set({isApplying: true});

        try {
            await axiosInstance.post(`/application/${teamId}/apply`);
        } catch (error) {
            console.error("Error applying for team: ", error);
        } finally {
            set({isApplying: false});
        }
    },

    getApplications: async () => {
        set({isGetting: true});

        try {
            const res = await axiosInstance.get(`/application/all-applications`);
            set({applications: res.data.applications});
        } catch (error) {
            console.error("Error fetching applications: ", error);
        } finally {
            set({isGetting: false});
        }
    },

    acceptApplication: async (applicationId) => {
        set({isAccepting: true});

        try {
            await axiosInstance.patch(`/application/accept/${applicationId}`);
        } catch (error) {
            console.error("Error accepting application: ", error);
        } finally {
            set({isAccepting: false});
        }
    },

    rejectApplication: async (applicationId) => {
        set({isRejecting: true});

        try {
            await axiosInstance.patch(`/application/reject/${applicationId}`);
        } catch (error) {
            console.error("Error rejecting application: ", error);
        } finally {
            set({isRejecting: false});
        }
    },

    withdrawApplication: async (applicationId) => {
        set({isWithdrawing: true});

        try {
            await axiosInstance.patch(`/application/withdraw/${applicationId}`);
        } catch (error) {
            console.error("Error withdrawing application: ", error);
        } finally {
            set({isWithdrawing: false});
        }
    }
}))