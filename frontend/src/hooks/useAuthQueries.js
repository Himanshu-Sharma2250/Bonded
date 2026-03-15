import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

/**
 * Fetch the currently authenticated user's profile.
 * The query will only run if there is a user (i.e., after login).
 * Returns the user object or null if not authenticated.
 */
export const useProfile = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const { data } = await axiosInstance.get('/auth/profile');
                return data.user; // assume API returns { user }
            } catch (error) {
                // If 401, return null (no user)
                if (error.response?.status === 401) return null;
                throw error;
            }
        },
        retry: false, // Don't retry on 401
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

/**
 * Fetch another user's profile by ID.
 */
export const useGetUserProfile = (userId) => {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/auth/get-profile/${userId}`);
            return data.user;
        },
        enabled: !!userId,
        retry: false,
    });
};

/**
 * Register a new user.
 * On success, set the user data in the cache.
 */
export const useSignUp = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (signUpData) => axiosInstance.post('/auth/register', signUpData),
        onSuccess: (response) => {
            // Assume response.data.user contains the new user
            queryClient.setQueryData(['user'], response.data.user);
        },
    });
};

/**
 * Verify email with token.
 */
export const useVerifyEmail = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (token) => axiosInstance.get(`/auth/verify-email/${token}`),
        onSuccess: () => {
            // After verification, user becomes verified; refresh profile
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
};

/**
 * Log in a user.
 */
export const useSignIn = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (loginData) => axiosInstance.post('/auth/login', loginData),
        onSuccess: (response) => {
            queryClient.setQueryData(['user'], response.data.user);
        },
    });
};

/**
 * Log out the current user.
 * On success, remove the user from cache.
 */
export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => axiosInstance.post('/auth/logout'),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['user'] });
        },
    });
};

/**
 * Send a password reset email.
 */
export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (emailData) => axiosInstance.post('/auth/forgot-password', emailData),
    });
};

/**
 * Reset password with token.
 */
export const useResetPassword = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ token, passwordData }) =>
            axiosInstance.post(`/auth/reset-password/${token}`, passwordData),
        onSuccess: (response) => {
            // Optionally set user if the API returns it after reset
            if (response.data.user) {
                queryClient.setQueryData(['user'], response.data.user);
            }
        },
    });
};

/**
 * Edit the current user's profile.
 */
export const useEditProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => axiosInstance.patch('/auth/edit', data),
        onSuccess: (response) => {
            queryClient.setQueryData(['user'], response.data.user);
        },
    });
};

/**
 * Refresh the access token.
 * This is typically called when a request returns 401.
 * On success, update the user data.
 */
export const useRefreshToken = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => axiosInstance.post('/auth/refresh-token'),
        onSuccess: (response) => {
            queryClient.setQueryData(['user'], response.data.user);
        },
    });
};