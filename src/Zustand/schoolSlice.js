import { BASE_URL } from '../Constant/index';
import { create } from "zustand";
import axiosInstance from "../Constant/axiosInstance";

const useSchoolStore = create((set, get) => ({
     schools: [],
     loading: false,
     createSchool: async (formData) => {
          set({ loading: true });
          try{
          const res = await axiosInstance.post(`${BASE_URL}/api/v1/School/create`, formData);
          const messg = res.data.message;
          return {success: true, message: messg}
           } catch (error) {
               console.error(`Error occured creating new school.`, error);
               return {success: false, message: error.response?.data?.message || 'Error occured creating new school'}
          } finally {
               set({ loading: false });
          }
     },
     fetchSchools: async () => {
          set({ loading : true })
          try {
               const res = await axiosInstance.get(`${BASE_URL}/api/v1/School/get-all`);
               set({ schools: res.data });
          } catch (error) {
               console.error("Error fetching school lists:", error);
          } finally {
               set({ loading : false })
          }
     },
     fetchSchoolsLight: async () => {
          set({ loading : true })
          try {
               const res = await axiosInstance.get(`${BASE_URL}/api/v1/School/get-schools-light`);
               set({ schools: res.data });
          } catch (error) {
               console.error("Error fetching school lists:", error);
          } finally {
               set({ loading : false })
          }
     },
}))

export default useSchoolStore;