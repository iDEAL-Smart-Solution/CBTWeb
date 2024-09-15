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
     }
})

export const useExam = create(Exam);
