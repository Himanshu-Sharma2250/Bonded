import {create} from "zustand"
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    isEditing: false,

    signUp: async (signUpData) => {
        set({loading: true});

        try {
            const res = await axiosInstance.post("/auth/register", signUpData);
            return {res}
        } catch (error) {
            console.error("Error registering user: ", error);
            return error
        } finally {
            set({loading: false});
        }
    },

    verifyEmail: async (token) => {
        try {
            await axiosInstance.get(`/auth/verify-email/${token}`);
        } catch (error) {
            console.error("Error verifying user: ", error);
        }
    },

    login: async (loginData) => {
        set({loading: true});

        try {
            const res = await axiosInstance.post("/auth/login", loginData);
            const data = res.data;

            set({user: data.user});
            return data.message
        } catch (error) {
            console.error("Error during user login: ", error);
        } finally {
            set({loading: false});
        }
    },

    profile: async () => {
        try {
            const res = await axiosInstance.get(`/auth/profile`);
            
            set({user: res.data.user})
        } catch (error) {
            console.error("Error accessing user's profile: ", error);
            return false;
        }
    },

    logout: async () => {
        set({loading: true});

        try {
            await axiosInstance.post("/auth/logout");

            set({user: null});
        } catch (error) {
            console.error("Error during user logout: ", error);
        } finally {
            set({loading: false});
        }
    },

    forgotPassword: async (emailData) => {
        try {
            await axiosInstance.post("/auth/forgot-password", emailData);
            return true;
        } catch (error) {
            console.error("Error during forgotPassword");
            return false;
        }
    },

    resetPassword: async (token, passwordData) => {
        set({loading: true});

        try {
            const res = await axiosInstance.post(`/auth/reset-password/${token}`, passwordData);
            const data = res.data;

            set({user: data.user});
        } catch (error) {
            console.error("Error reseting password: ", error);
        } finally {
            set({loading: false})
        }
    },

    refreshToken: async () => {
        try {
            const res = await axiosInstance.post("/auth/refresh-token");
            
            set({user: res.data.user});
        } catch (error) {
            console.error("Error refreshing token: ", error);
        }
    },

    editProfile: async (data) => {
        set({isEditing: true});

        try {
            const res = await axiosInstance.patch("/auth/edit", data);
            set({user: res.data.user});
        } catch (error) {
            console.error("Error updating profile: ", error)
        } finally {
            set({isEditing: false});
        }
    }
}))