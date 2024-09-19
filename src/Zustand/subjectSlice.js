import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";

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
          const { setLoading, setMessage, setErrorMessage } = get().subject;
          setLoading(true);
          try {
               const formDataToSend = new FormData();
               Object.entries(formData).forEach(([key, value]) => {
                    formDataToSend.append(key, value);
               });
               var res = await axios.post(`${BASE_URL}/api/v1/Subject/create`, formDataToSend);
               const messg = res.data.message;
               console.log(messg)
               setMessage(messg);
               setLoading(false);
          } catch (error) {
               console.error(`Error occured creating new subject.`, error);
               setErrorMessage(error.response?.data?.message || 'An error occurred: make sure form was filled appropriately');
          } finally {
               setLoading(false);
          }
     },
     fetchSubjectsLight: async () => {
          const { setLoading, setErrorMessage, setSubjects } = get().subject;
          setLoading(true);
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/Subject/get-all`);
               const fetchedSubjects = res.data.map((list) => ({
                    id: list.id,
                    name: list.name,
                    code: list.code,
                    description: list.description,
                    numberOfExam: list.numberOfExam,
                    className: list.className,
               }));
               // console.log(fetchedSubjects);
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
               var res = await axios.get(`${BASE_URL}/api/v1/Subject/get-by-any?param=${param}`);
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
               
               const res = await axios.get(`${BASE_URL}/api/v1/Subject/get-by-id?id=${id}`);
               var response = res.data.data;
               console.log(response);
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
               const res = await axios.get(`${BASE_URL}/api/v1/Subject/get-codes`);
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
     }
})

export const useSubject = create(Subject);
