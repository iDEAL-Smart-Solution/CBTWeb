import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";
import axiosInstance from "../Constant/axiosInstance";

const Staff = (set, get) => ({
     staff: {
          staffs: [],
          staffsUsernames: [],
          message: "",
          errorMessage: "",
          loading: false,
          setStaffs: (datas) => set((state) => ({ ...state, staff: { ...state.staff, staffs: datas } })),
          setStaffsUsernames: (datas) => set((state) => ({ ...state, staff: { ...state.staff, staffsUsernames: datas } })),
          setMessage: (value) => set((state) => ({ ...state, staff: { ...state.staff, message: value } })),
          setErrorMessage: (value) => set((state) => ({ ...state, staff: { ...state.staff, errorMessage: value } })),
          setLoading: (value) => set((state) => ({ ...state, staff: { ...state.staff, loading: value } })),
     },
     createSaff: async (formData) => {
          const { setLoading } = get().staff;
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
               const res = await axiosInstance.post(`${BASE_URL}/api/v1/Staff/Create`, formDataToSend);
               const messg = res.data.message;
               return {success: true, message: messg}
          } catch (error) {
               console.error(`Error occured registering new staff.`, error);
               return {success: false, message: error.response?.data?.message || 'An error occurred: kindly fill out all the required spaces'}
          } finally {
               setLoading(false);
          }
     },
     fetchAllStaffs: async () => {
          const { setLoading, setStaffs, setErrorMessage } = get().staff;
          setLoading(true);
          try {
               const res = await axiosInstance.get(`${BASE_URL}/api/v1/Staff/get-all`);
               const allStaffs = res.data.map((list) => ({
                    userId: list.userId,
                    userName: list.userName,
                    gender: list.gender,
                    profilePicture: list.profilePicture,
                    uin: list.uin,
               }));
               setStaffs(allStaffs);
          } catch (error) {
               console.error("Error fetching schClass list:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred, please confrim your server is up and running');
          } finally {
               setLoading(false);
          }
     },
     filterAllStaff: async (param) => {
          const { setLoading, setStaffs } = get().staff;
          setLoading(true);
          try {
               var res = await axiosInstance.get(`${BASE_URL}/api/v1/staff/get-by-any?param=${param}`);
               const filteredStaff = res.data.map((list) => ({
                    userId: list.userId,
                    userName: list.userName,
                    gender: list.gender,
                    profilePicture: list.profilePicture,
               }));

            setStaffs(filteredStaff);
          } catch (error) {
            console.error("Error filtering staff:", error);
          } finally {
            setLoading(false);
          }
        },
     deleteStaff: async (id) => {
          const { setLoading } = get().staff;
          setLoading(true);
          try {
               var res = await axiosInstance.delete(`${BASE_URL}/api/v1/Staff/delete?id=${id}`);
               const messg = res.data;
               return {success: true, message: messg}
          } catch (error) {
               console.error(`Error occured deleting staff.`, error);s
               return {success: false, message: error.response?.data?.message || 'An error occurred while trying to delete the staff'}
          } finally {
               setLoading(false);
             }
     },
     fetchAllStaffsUsername: async () => {
          const { setLoading, setStaffsUsernames, setErrorMessage } = get().staff;
          setLoading(true);
          try {
               const res = await axiosInstance.get(`${BASE_URL}/api/v1/Staff/get-all`);
               const allStaffs = res.data.map((list) => ({
                    userName: list.userName,
                    profilePicture: list.profilePicture,
                    id: list.id,
               }));
               setStaffsUsernames(allStaffs);
          } catch (error) {
               console.error("Error fetching schClass list:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred, please confrim your server is up and running');
          } finally {
               setLoading(false);
          }
     },
        
})

export const useStaff = create(Staff);
