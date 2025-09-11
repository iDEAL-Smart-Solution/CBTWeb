import { BASE_URL } from '../Constant/index';
import { create } from "zustand";
import axiosInstance from "../Constant/axiosInstance";

const useSchoolStore = create((set, get) => ({
     schools: [],
     loading: false,
     schoolDetails: {},
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
     fetchSchoolDetails: async (id) => {
          set({ loading: true })
          try {
               const res = await axiosInstance.get(`${BASE_URL}/api/v1/School/get-school-detail?id=${id}`);
               set({ schoolDetails: res.data.data})
          } catch (error) {
               console.error("Error fetching school details:", error);
          } finally {
               set({ loading : false })
          }
     },
     updateSubscription: async (formData) => {
          console.log(formData)
          set({ loading: true })
          try {
               const res = await axiosInstance.put(`${BASE_URL}/api/v1/Subscription/update-subscriptions`, formData)
               return { success: res.data.success, message: res.data.message}
          } catch (error) {
               console.error("Error updating school subscription:", error);
               return { success: false, message:`Error updating school subscription` || error.data.message}
          } finally {
               set({ loading : false })
          }
     },
     generateUpdateToken: async (schoolName) => {
          set({ loading: true })
          try {
               const res = await axiosInstance.get(`${BASE_URL}/api/v1/Subscription/generate-update-token?schoolName=${encodeURIComponent(schoolName)}`)
               return { success: res.data.success, message: res.data.message}
          } catch (error) {
               console.error("Error generating update token:", error);
               return { success: false, message: "Error generating update token"}
          } finally {
               set({ loading : false })
          }
     }
}))

export default useSchoolStore;