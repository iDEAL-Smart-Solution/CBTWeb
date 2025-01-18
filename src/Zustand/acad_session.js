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
          nameAndLogo: JSON.parse(sessionStorage.getItem('name_and_logo')) ? JSON.parse(sessionStorage.getItem('name_and_logo')) : null,
     },
     editAcadSession: async (term, session) => {
          const { setLoading, setMessage } = get().acad;
          setLoading(true);
          try {
               var res = await axiosInstance.post(`${BASE_URL}/api/v1/Academic_Session/adjust-calendar?newTerm=${term}&newSession=${session}`);
               const messg = res.data.message;
               setMessage(`${messg}, \n Kindly log out and login again to reflect your changes`);
          } catch (error) {
               console.error(`Error occured while deleting class.`, error);
               setMessage(error.response?.data?.message || 'An error occurred, class cant be deleted');
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
     getNameAndLogo: async () => {
          const { setLoading } = get().acad;
          setLoading(true);
          try {
               var res = await axiosInstance.get(`${BASE_URL}/api/v1/Academic_Session/get`);
               const incoming = res.data.data;
               const nameAndLogo = {
                    name: incoming.schoolName,
                    logo: incoming.schoolLogoFilePath,
               }
               sessionStorage.setItem('name_and_logo', JSON.stringify(nameAndLogo));

          } catch (error) {
               sessionStorage.removeItem('name_and_logo');
          } finally {
               setLoading(false);
          }
     }
});


export const useAcad = create(Acad);
