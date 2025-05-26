import axios from "axios";
import { BASE_URL } from '../Constant/index';   
import { create } from "zustand";

const Auth = (set, get) => ({
    auth: {
        token: sessionStorage.getItem('token') || '',
        user: JSON.parse(sessionStorage.getItem('user')) ? JSON.parse(sessionStorage.getItem('user')) : null,
        isAuthenticated: !!sessionStorage.getItem('token'),
        academicSession: JSON.parse(sessionStorage.getItem('academicSession')) ? JSON.parse(sessionStorage.getItem('academicSession')) : null,
        loading: false,
        error: null,
        message: null,
        setLoading: (value) => set((state) => ({ ...state, auth: { ...state.auth, loading: value } })),
        clearError: () => set((state) => ({ ...state, auth: { ...state.auth, error: null } })),
        setMessage: (value) => set((state) => ({ ...state, auth: { ...state.auth, message: value } })),
        clearMessage: () => set((state) => ({ ...state, auth: { ...state.auth, message: null } })),
    },
    login: async (formData) => {
        const { setLoading } = get().auth;
        setLoading(true);

        try {
            const res = await axios.post(`${BASE_URL}/api/v1/User/Login?email=${formData.email}&password=${formData.password}`);
            const { message, data } = res.data;
            const { user, token, academicSession } = data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('SchoolId', user.schoolId);
            sessionStorage.setItem('academicSession', JSON.stringify(academicSession));
            set((state) => ({
                ...state,
                auth: {
                    ...state.auth,
                    token,
                    user,
                    academicSession,
                    isAuthenticated: true,
                    loading: false,
                    message,
                    error: null,
                },
            }));
            return { success: true, message: message }

        } catch (error) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('academicSession');
            set((state) => ({
                ...state,
                auth: {
                    ...state.auth,
                    error: error.response.data.message || 'Login failed',
                    isAuthenticated: false,
                    token: null,
                    user: null,
                    loading: false,
                },
            }));
            return { success: false, message: error.response.data.message || 'Login failed' }

        }
    },
    logout: async () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('academicSession');
        sessionStorage.removeItem('SchoolId');
    
        set((state) => ({
            ...state,
          auth: {
            ...state.auth,
            isAuthenticated: false,
            token: null,
            user: null,
            loading: false,
          },
        }));
    }
});

export const useAuth = create(Auth);
