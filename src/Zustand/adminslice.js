import { BASE_URL } from '../Constant/index';
import { create } from "zustand";
import axiosInstance from "../Constant/axiosInstance";

const useAdminStore = create((set, get) => ({ 
     loading: false,
     adminUsers: [],
     CreateAdminUser: async (formData) => {
          set({ loading: true });
          try{
               const formDataToSend = new FormData();
               Object.entries(formData).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                         formDataToSend.append(key, value[0]);
                    } else {
                         formDataToSend.append(key, value);
                    }
               });
          const res = await axiosInstance.post(`${BASE_URL}/api/v1/User/create-admin-user`, formDataToSend);
          const messg = res.data.message;
          return {success: true, message: messg}
           } catch (error) {
               console.error(`Error occured creating admin user.`, error);
               return {success: false, message: error.response?.data?.message || 'Error occured creating admin user'}
          } finally {
               set({ loading: false });
          }
     },
     fetchAdminUsers: async () => {
          set({ loading: true });
          try {
               const res = await axiosInstance.get(`${BASE_URL}/api/v1/User/get-admin-users`);
               set({ adminUsers: res.data });
          } catch (error) {
               console.error(`Error fetching list of admin users.`, error);
               return {success: false, message: error.response?.data?.message || 'Error occured creating admin user'}
          } finally {
               set({ loading: false });
          }
     }
}));


export default useAdminStore;