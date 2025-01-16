import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";
import axiosInstance from "../Constant/axiosInstance";

const Student = (set, get) => ({
     student: {
          students: [],
          studentsForClearnce: [],
          message: "",
          errorMessage: "",
          loading: false,
          setStudents: (datas) => set((state) => ({ ...state, student: { ...state.student, students: datas } })),
          setStudentsForClearnce: (datas) => set((state) => ({ ...state, student: { ...state.student, studentsForClearnce: datas } })),
          setMessage: (data) => set((state) => ({ ...state, student: { ...state.student, message: data } })),
          setErrorMessage: (data) => set((state) => ({ ...state, student: { ...state.student, errorMessage: data } })),
          setLoading: (value) => set((state) => ({ ...state, student: { ...state.student, loading: value } })),
     },
     createStudent: async (formData) => {
          const { setLoading, setMessage, setErrorMessage } = get().student;
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
               const res = await axios.post(`${BASE_URL}/api/v1/Student/create`, formDataToSend);
               const messg = res.data.message;
               return { success: true, message: messg };
          } catch (error) {
               console.error(`Error occured registering new student.`, error);
               return { success: false, message: error.response?.data?.message || 'An error occurred: kindly fill out all the required spaces' };
          } finally {
               setLoading(false);
          }
     },
     fetchStudents: async (param) => {
          const { setLoading, setErrorMessage, setStudents } = get().student;
          setLoading(true);
          try {
               var res = await axiosInstance.get(`${BASE_URL}/api/v1/Student/getstudent-by-any?param=${param}`);
               const fetchedStudents = res.data.map((list) => ({
                    id: list.id,
                    className: list.className,
                    uin: list.uin,
                    studentName: list.studentName,
                    gender: list.gender,
                    profilePicture: list.imageUrl,
               }));
               setStudents(fetchedStudents);
               return {success: true, message: " "}
          } catch (error) {
               console.error("Error fetching student with the search parameter:", error);
               setErrorMessage(error.message || 'An error occurred fetching student with that keyword');
               return {success: false, message: `${error.response?.status} ${error.response?.statusText}` || error.message}
          } finally {
               setLoading(false);
          }
     },
     fetchStuddentForClearance: async (examId) => {
          const { setLoading, setErrorMessage, setStudentsForClearnce } = get().student;
          setLoading(true);
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/SubmittedExam/get-student-for-clearance?examId=${examId}`);
               const fetchedStudents = res.data.map((list) => ({
                    className: list.className,
                    uin: list.uin,
                    studentName: list.studentName,
                    studentId: list.studentId,
                    examId: list.examId,
               }));
               setStudentsForClearnce(fetchedStudents);
          } catch (error) {
               console.error("Error fetching student by class:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred fetching student by class');
          } finally {
               setLoading(false);
          }
     },
     clearSingleStudents: async (studentId, examId) => {
          const { setLoading, setErrorMessage, setMessage } = get().student;
          setLoading(true);
          try {
               var res = await axios.delete(`${BASE_URL}/api/v1/SubmittedExam/clear-single-student?studentId=${studentId}&examId=${examId}`);
               var mssg = res.data.message;
               setMessage(mssg);
               return true;
          } catch (error) {
               console.error("Eror clearing student:", error);
               setErrorMessage(error.response?.data?.message || 'An error while trying to fetch student');
          } finally {
               setLoading(false);
          }
     },
     clearMultipleStudents: async (subjectCode, examId) => {
          const { setLoading, setErrorMessage, setMessage } = get().student;
          setLoading(true);
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/SubmittedExam/clear-multiple-student?subjectCode=${subjectCode}&examId=${examId}`);
               var mssg = res.data.message;
               setMessage(mssg);
          } catch (error) {
               console.error("Eror clearing student:", error);
               setErrorMessage(error.response?.data?.message || 'An error while trying to fetch student');
          } finally {
               setLoading(false);
          }
     },
     deleteStudent: async (id) => {
          const { setLoading } = get().student;
          setLoading(true);
          try {
               var res = await axios.delete(`${BASE_URL}/api/v1/Student/delete?id=${id}`);
               const messg = res.data;
               return { success: true, message: messg }
          } catch (error) {
               console.error(`Error occured deleting student.`, error); s
               return { success: false, message: error.response?.data?.message || 'An error occurred while trying to delete the student' }
          } finally {
               setLoading(false);
          }

     }
})

export const useStudent = create(Student);