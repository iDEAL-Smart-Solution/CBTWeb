import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";
import axiosInstance from "../Constant/axiosInstance";

const Subject = (set, get) => ({
     subject: {
          subjects: [],
          message: "",
          errorMessage: "",
          loading: false,
          singleSubject: null,
          setSubjects: (datas) => set((state) => ({ ...state, subject: { ...state.subject, subjects: datas } })),
          setMessage: (data) => set((state) => ({ ...state, subject: { ...state.subject, message: data } })),
          setErrorMessage: (data) => set((state) => ({ ...state, subject: { ...state.subject, errorMessage: data } })),
          setLoading: (value) => set((state) => ({ ...state, subject: { ...state.subject, loading: value } })),
          setSingleSubject: (data) => set((state) => ({ ...state, subject: { ...state.subject, singleSubject: data } })), 

     },
     createSubject: async (formData) => {
          const { setLoading } = get().subject;
          setLoading(true);
          try {
               const formDataToSend = new FormData();
               Object.entries(formData).forEach(([key, value]) => {
                    formDataToSend.append(key, value);
               });
               var res = await axiosInstance.post(`${BASE_URL}/api/v1/Subject/create`, formDataToSend);
               const messg = res.data.message;
               return {success: true, message: messg}
          } catch (error) {
               console.error(`Error occured creating new subject.`, error);
               return {success: false, message: error.response?.data?.message || 'An error occurred: make sure form was filled appropriately'}
          } finally {
               setLoading(false);
          }
     },
     fetchSubjectsLight: async () => {
          const { setLoading, setSubjects } = get().subject;
          setLoading(true);
          try {
               var res = await axiosInstance.get(`${BASE_URL}/api/v1/Subject/get-all`);
               const fetchedSubjects = res.data.map((list) => ({
                    id: list.id,
                    name: list.name,
                    code: list.code,
                    description: list.description,
                    numberOfExam: list.numberOfExam,
                    className: list.className,
               }));
               setSubjects(fetchedSubjects)
               return { success: true, message: 'retrieved successfully'}
          } catch (error) {
               console.error("Error fetching list of subjects:", error);
               return { success: false, message: 'Error fetching list of subjects'}
          } finally {
               setLoading(false);
          }
     },
     fetchStaffSubjects: async (id) => {
          const { setLoading, setSubjects } = get().subject;
          setLoading(true);
          try {
               var res = await axiosInstance.get(`${BASE_URL}/api/v1/Subject/get-staff-subjects?id=${id}`);
               const fetchedSubjects = res.data.map((list) => ({
                    id: list.id,
                    name: list.name,
                    code: list.code,
                    description: list.description,
                    numberOfExam: list.numberOfExam,
                    className: list.className,
               }));
               setSubjects(fetchedSubjects)
               return { success: true, message: ''}
          } catch (error) {
               console.error("Error fetching list of subjects:", error);
               return { success: false, message: `${error.response?.data?.message}` || 'An error occurred make sure your server is up and running'}
          } finally {
               setLoading(false);
          }
     },
     filterStaffSubjecs: async (param, id) => {
          const { setLoading, setErrorMessage, setSubjects } = get().subject;
          setLoading(true);

          try {
               var res = await axiosInstance.get(`${BASE_URL}/api/v1/Subject/filter-staff-subjects?param=${param}&id=${id}`);
               const fetchedSubjects = res.data.map((list) => ({
                    id: list.id,
                    name: list.name,
                    code: list.code,    
                    description: list.description,
                    numberOfExam: list.numberOfExam,
                    className: list.className,

               }));
               setSubjects(fetchedSubjects)
          } catch (error) {
               console.error("Error fetching list of subjects:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred make sure your server is up and running');
          } finally {
               setLoading(false);
          }
     },
     filterList: async (param) => {
          const { setLoading, setErrorMessage, setSubjects } = get().subject;
          setLoading(true);

          try {
               var res = await axiosInstance.get(`${BASE_URL}/api/v1/Subject/get-by-any?param=${param}`);
               const fetchedSubjects = res.data.map((list) => ({
                    id: list.id,
                    name: list.name,
                    code: list.code,    
                    description: list.description,
                    numberOfExam: list.numberOfExam,
                    className: list.className,

               }));
               setSubjects(fetchedSubjects)
          } catch (error) {
               console.error("Error fetching list of subjects:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred make sure your server is up and running');
          } finally {
               setLoading(false);
          }
     },
     fetchSingleSubject: async (id) => {
          const { setLoading, setSingleSubject, setErrorMessage } = get().subject;
          setLoading(true);
          try {
               
               const res = await axiosInstance.get(`${BASE_URL}/api/v1/Subject/get-by-id?id=${id}`);
               var response = res.data.data;
               setSingleSubject(response);
          } catch (error) {
               console.error(`Error occured when trying to fetch single subject.`, error);
               setErrorMessage(error.request.response || 'subject not found');
          } finally {
               setLoading(false);
          }
     },
     fetchSubjectCodes: async () => {
          const { setLoading, setErrorMessage, setSubjects } = get().subject;
          setLoading(true);
          try {
               const res = await axiosInstance.get(`${BASE_URL}/api/v1/Subject/get-codes`);
               const fetchedSubjectCodes = res.data.map((list, index) => ({
                    id: index,
                    code: list,
               }));

               setSubjects(fetchedSubjectCodes);
          } catch (error) {
               console.error("Error fetching subject codes:", error);
               setErrorMessage(error.response?.data?.message);
          } finally {
               setLoading(false);
          }
     },
     deleteSubject: async (id) => {
          const { setLoading, setErrorMessage } = get().subject;
          setLoading(true);
          try {
               var res = await axiosInstance.delete(`${BASE_URL}/api/v1/Subject/delete?id=${id}`);
               var mssg = res.data.message;
               return{success: true, message: mssg}
          } catch (error) {
               console.error("Error occured when attempting to delete question")
               setErrorMessage(error.response.data.message || "An error occured, question could not be deleted");
               return{success: false, message: error.response.data.message}
          } finally {
               setLoading(false);
          }
     },
     editSubject: async (formData) => {
          const {setLoading } = get().subject;
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
               var res = await axiosInstance.patch(`${BASE_URL}/api/v1/Subject/update`, formDataToSend);
               var mssg = res.data.message;
               return {success: true, message: mssg};
          } catch (error) {
               console.error("Error occured when trying to edit question : ", error);
               return {success: false, message: error.response.data.message || "Error occured when trying to edit the question"};
          } finally {
               setLoading(false);
          }
     },
})

export const useSubject = create(Subject);
