import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";


const Exam = (set, get) => ({
     exam: {
          exams: [],
          message: "",
          errorMessage: "",
          loading: false,
          setExams: (datas) => set((state) => ({ ...state, exam: { ...state.exam, exams: datas } })),
          setMessage: (data) => set((state) => ({ ...state, exam: { ...state.exam, message: data } })),
          setErrorMessage: (data) => set((state) => ({ ...state, exam: { ...state.exam, errorMessage: data } })),
          setLoading: (value) => set((state) => ({ ...state, exam: { ...state.exam, loading: value } })),
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
               console.log(messg)
               setMessage(messg);
               setLoading(false);
          } catch (error) {
               console.error(`Error occured creating new exam.`, error);
               setErrorMessage(error.response?.data?.message || 'An error occurred: make sure form was filled appropriately');
          } finally {
               setLoading(false);
          }
     },
     fetchExamsLight: async () => {
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
     }
})

export const useExam = create(Exam);
