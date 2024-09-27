import axios from "axios";
import { BASE_URL } from '../Constant/index';   
import { create } from "zustand";

const Auth = (set, get) => ({
    auth: {
        token: sessionStorage.getItem('token'),
        user: JSON.parse(sessionStorage.getItem('user')),
        isAuthenticated: !!sessionStorage.getItem('token'),
        academicSession: JSON.parse(sessionStorage.getItem('academicSession')),
        loading: false,
        error: null,
        message: null,
        setLoading: (value) => set((state) => ({ ...state, auth: { ...state.auth, loading: value } })),
        clearError: () => set((state) => ({ ...state, auth: { ...state.auth, error: null } })),
        setMessage: (value) => set((state) => ({ ...state, auth: { ...state.auth, message: value } })),
        clearMessage: () => set((state) => ({ ...state, auth: { ...state.auth, message: null } })),
    },
    login: async (formData) => {
        const { setLoading, setMessage } = get().auth;
        setLoading(true);

        try {
            const res = await axios.post(`${BASE_URL}/api/v1/User/Login?email=${formData.email}&password=${formData.password}`);
            const { message, data } = res.data;
            const { user, token, academicSession } = data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
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
        }
    },
    logout: async () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('academicSession');
    
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
        window.location.reload();
    }
});

export const useAuth = create(Auth);
