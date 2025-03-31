import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";
import axiosInstance from "../Constant/axiosInstance";

const Acad = (set, get) => ({
     acad: {
          loading: false,
          message: "",
          setLoading: (value) => set((state) => ({ ...state, acad: { ...state.acad, loading: value } })),
          setMessage: (value) => set((state) => ({ ...state, acad: { ...state.acad, message: value } })),
     },
     editAcadSession: async (term, session) => {
          const { setLoading, setMessage } = get().acad;
          setLoading(true);
          try {
               var res = await axiosInstance.post(`${BASE_URL}/api/v1/Academic_Session/adjust-calendar?newTerm=${term}&newSession=${session}`);
               const messg = res.data.message;
               return {success: true, message: `${messg}, \n Kindly log out and login again to reflect your changes`}
          } catch (error) {
               console.error(`Error occured while deleting class.`, error);
               return { success: false, message: error.response?.data?.message || 'An error occurred, class cant be deleted' }
          } finally {
               setLoading(false);
          }
     },
     addNameAndLogo: async (formData) => {
          const { setLoading } = get().acad;
          setLoading(true);
          try {
               const formDataToSend = new FormData();
               Object.entries(formData).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                         formDataToSend.append(key, value[0]);
                    } else {
                         formDataToSend.append(key, value);
                    }
               });
               var res = await axiosInstance.post(`${BASE_URL}/api/v1/Academic_Session/add-name-and-logo`, formDataToSend);
               const messg = res.data.message;
               return { success: true, message: messg }
          } catch (error) {
               console.error(`Error occured while updating name and logo:`, error);
               return { success: true, message: error.response?.data?.message || 'An error occurred' };
          } finally {
               setLoading(false);
          }
     },
     nextSession: async () => {
          const { setLoading } = get().acad;
          setLoading(true);
          try {
               var res = await axiosInstance.post('');
               return { success: true, message: res.data.message}
          } catch (error) {
               console.error(`An error occurred: ${error}`)
               return { success: false, message: error.response?.data?.message || 'An error occurred'}               
          }
     }
});


export const useAcad = create(Acad);
