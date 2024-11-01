import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";


const Exam = (set, get) => ({
     exam: {
          exams: [],
          message: "",
          errorMessage: "",
          instruction: {},
          loading: false,
          singleExam: null,
          setExams: (datas) => set((state) => ({ ...state, exam: { ...state.exam, exams: datas } })),
          setMessage: (data) => set((state) => ({ ...state, exam: { ...state.exam, message: data } })),
          setErrorMessage: (data) => set((state) => ({ ...state, exam: { ...state.exam, errorMessage: data } })),
          setInstruction: (data) => set((state) => ({ ...state, exam: { ...state.exam, instruction: data } })),
          setLoading: (value) => set((state) => ({ ...state, exam: { ...state.exam, loading: value } })),
          setSingleExam: (data) => set((state) => ({ ...state, exam: { ...state.exam, singleExam: data } })),
     },
     createExam: async (formData) => {
          const { setLoading, setMessage, setErrorMessage } = get().exam;
          setLoading(true);
          try {
               const formDataToSend = new FormData();
               Object.entries(formData).forEach(([key, value]) => {
                    formDataToSend.append(key, value);
               });
               var res = await axios.post(`${BASE_URL}/api/v1/Exam/create`, formDataToSend);
               const messg = res.data.message;
               return{success: true, message: messg}
          } catch (error) {
               console.error(`Error occured creating new exam.`, error);
               setErrorMessage(error.response?.data?.message || 'An error occurred: make sure form was filled appropriately');
               return{success: false, message: error.response?.data?.message || 'An error occurred: make sure form was filled appropriately'}

          } finally {
               setLoading(false);
          }
     },
     fetchExams: async () => {
          const { setLoading, setErrorMessage, setExams } = get().exam;
          setLoading(true);
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/Exam/get-all`);
               const fetchedexams = res.data.map((list) => ({
                    id: list.id,
                    examName: list.examName,
                    subjectCode: list.subjectCode,
                    isAvailable: list.isAvailable,
                    term: list.term,
                    session: list.session,
                    examType: list.examType,
               }));
               setExams(fetchedexams);
          } catch (error) {
               console.error("Error fetching list of exams:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred make sure your server is up and running');
          } finally {
               setLoading(false);
          }
     },
     fetchStaffExams: async (id) => {
          const { setLoading, setErrorMessage, setExams } = get().exam;
          setLoading(true);
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/Exam/staff-exams?id=${id}`);
               const fetchedexams = res.data.map((list) => ({
                    id: list.id,
                    examName: list.examName,
                    subjectCode: list.subjectCode,
                    isAvailable: list.isAvailable,
                    term: list.term,
                    session: list.session,
                    examType: list.examType,
               }));
               setExams(fetchedexams);
          } catch (error) {
               console.error("Error fetching list of exams:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred make sure your server is up and running');
          } finally {
               setLoading(false);
          }
     },
     filterStaffExams: async (param, id) => {
          const { setLoading, setErrorMessage, setExams } = get().exam;
          setLoading(true);
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/Exam/filter-staff-exams?param=${param}&id=${id}`);
               const fetchedexams = res.data.map((list) => ({
                    id: list.id,
                    examName: list.examName,
                    subjectCode: list.subjectCode,
                    isAvailable: list.isAvailable,
                    term: list.term,
                    session: list.session,
                    examType: list.examType,
               }));
               setExams(fetchedexams);
          } catch (error) {
               console.error("Error fetching list of exams:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred make sure your server is up and running');
          } finally {
               setLoading(false);
          }
     },
     fetchMyExams: async (id) => {
          const { setLoading, setErrorMessage, setExams } = get().exam;
          setLoading(true);
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/Exam/get-student-available?id=${id}`);
               const fetchedexams = res.data;
               setExams(fetchedexams);
          } catch (error) {
               console.error("Error fetching student available exams:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred');
          } finally {
               setLoading(false);
          }
     },
     fetchExamInstruction: async (examKey, id) => {
          const { setLoading, setInstruction, setErrorMessage } = get().exam;
          setLoading(true);
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/Exam/get-instructions?examKey=${examKey}&studentId=${id}`);
               const fetchedIntruction = res.data.data;
               setInstruction(fetchedIntruction);
          } catch (error) {
               console.error("Error fetching student available exams:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred');
          } finally {
               setLoading(false);
          }
     },
     filterList: async (param) => {
          const { setLoading, setErrorMessage, setExams } = get().exam;
          setLoading(true);
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/Exam/filter-exams?param=${param}`);
               const fetchedexams = res.data.map((list) => ({
                    id: list.id,
                    examName: list.examName,
                    subjectCode: list.subjectCode,
                    isAvailable: list.isAvailable,
                    term: list.term,
                    session: list.session,
                    examType: list.examType,
               }));
               setExams(fetchedexams);
          } catch (error) {
               console.error("Error fetching list of exams:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred make sure your server is up and running');
          } finally {
               setLoading(false);
          }
     },
     fetchSingleExam: async (examKey) => {
          const { setLoading, setSingleExam, setErrorMessage } = get().exam;
          setLoading(true);
          try {
               
               const res = await axios.get(`${BASE_URL}/api/v1/Exam/get-single-with-questions?examKey=${examKey}`);
               var response = res.data.data;
               setSingleExam(response);
          } catch (error) {
               console.error(`Error occured when trying to fetch single subject.`, error);
               setErrorMessage(error.request.response || 'Exam not found');
          } finally {
               setLoading(false);
          }
     },
     fetchExamNamesAndId: async () => {
          const { setLoading, setErrorMessage, setExams } = get().exam;
          setLoading(true);
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/Exam/get-all-light`);
               const fetchedexams = res.data.map((list) => ({
                    id: list.id,
                    examName: list.examName,
               }));
               setExams(fetchedexams);
          } catch (error) {
               console.error("Error fetching exam names and id:", error);
               setErrorMessage(error.response?.data?.message || 'check you connection and call attention');
          } finally {
               setLoading(false);
          }
     },
     flipAvailability: async (id) => {
          const { setLoading, setErrorMessage } = get().exam;
          setLoading(true);
          try {
               var res = await axios.post(`${BASE_URL}/api/v1/Exam/flip-availability?key=${id}`);
               const messg = res.data.message;
               return { success: true, message: messg};
          } catch (error) {
               console.error(`Error occured updating availabilty.`, error);
               return { success: false, message: error.response?.data?.message || 'An error occurred when updating the availability'}
          } finally {
               setLoading(false);
          }
     },
     deleteExam: async (id) => {
          const { setLoading, setErrorMessage } = get().exam;
          setLoading(true);
          try {
               var res = await axios.delete(`${BASE_URL}/api/v1/Exam/delete?id=${id}`);
               var mssg = res.data.message;
               return{success: true, message: mssg}
          } catch (error) {
               console.error("Error occured when attempting to delete question")
               setErrorMessage(error.response.data.message || "An error occured, question could not be deleted");
          } finally {
               setLoading(false);
          }
     },
     editExam: async (formData) => {
          const {setLoading, setErrorMessage } = get().exam;
          setLoading(true);
          try {
               const formDataToSend = new FormData();
               Object.entries(formData).forEach(([key, value]) => {
                         formDataToSend.append(key, value);
               });
               var res = await axios.patch(`${BASE_URL}/api/v1/Exam/update`, formDataToSend);
               var mssg = res.data.message;
               return {success: true, message: mssg};
          } catch (error) {
               console.error("Error occured when trying to edit Exam : ", error);
               setErrorMessage(error.response.data.message || "Error occured when trying to edit exam");
               return {success: false, message: error.response.data};
          } finally {
               setLoading(false);
          }
     },
})

export const useExam = create(Exam);
