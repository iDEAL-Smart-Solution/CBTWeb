import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";

const Academic = (set, get) => ({
     academic: {
          academicSession: null,
          loading: false,
          setAcademicSession: (data) => set((state) => ({ ...state, academic: { ...state.academic, academicSession: data } })),
          setLoading: (value) => set((state) => ({ ...state, academic: { ...state.academic, loading: value } })),

     },
     getAcademicSession: async () => {
          const { setLoading, setAcademicSession } = get().academic;
          setLoading(true);
          try {
               const res = await axios.get(`${BASE_URL}/api/v1/Academic_Session/get`);
               setAcademicSession(res.data.data.Json());
          } catch (error) {

          }
     }
})