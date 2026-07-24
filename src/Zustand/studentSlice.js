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
          const { setLoading } = get().student;
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
               const res = await axiosInstance.post(`${BASE_URL}/api/v1/Student/create`, formDataToSend);
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
     updateStudentClass: async (studentKey, newClassId) => {
          const { setLoading, setErrorMessage, setMessage } = get().student;
          setLoading(true);
          try {
               const res = await axiosInstance.put(`${BASE_URL}/api/v1/Student/update-class?studentKey=${encodeURIComponent(studentKey)}&newClass=${encodeURIComponent(newClassId)}`);
               const data = res.data;
               const success = data?.success ?? (res.status === 200);
               const message = data?.message || (success ? 'Student class updated successfully' : 'Could not update student class');
               if (success) setMessage(message);
               else setErrorMessage(message);
               return { success, message };
          } catch (error) {
               console.error("Error updating student class:", error);
               const msg = error.response?.data?.message || error.message || 'An error occurred while updating student class';
               setErrorMessage(msg);
               return { success: false, message: msg };
          } finally {
               setLoading(false);
          }
     },
     bulkUpdateStudentsClass: async (fromClassId, toClassId) => {
          const { setLoading, setErrorMessage, setMessage } = get().student;
          setLoading(true);
          try {
               const res = await axiosInstance.post(`${BASE_URL}/api/v1/Student/bulk-update-class`, {
                    fromClassId,
                    toClassId,
               });
               const data = res.data;
               const success = data?.success ?? (res.status === 200);
               const message = data?.message || (success ? 'Students class updated successfully' : 'Could not update students class');
               if (success) setMessage(message);
               else setErrorMessage(message);
               return { success, message };
          } catch (error) {
               console.error("Error bulk updating students class:", error);
               const msg = error.response?.data?.message || error.response?.data || error.message || 'An error occurred while bulk updating students class';
               setErrorMessage(msg);
               return { success: false, message: msg };
          } finally {
               setLoading(false);
          }
     },
     fetchStuddentForClearance: async (examId) => {
          const { setLoading, setErrorMessage, setStudentsForClearnce } = get().student;
          setLoading(true);
          try {
               var res = await axiosInstance.get(`${BASE_URL}/api/v1/SubmittedExam/get-student-for-clearance?examId=${examId}`);
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
               var res = await axiosInstance.delete(`${BASE_URL}/api/v1/SubmittedExam/clear-single-student?studentId=${studentId}&examId=${examId}`);
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
               var res = await axiosInstance.get(`${BASE_URL}/api/v1/SubmittedExam/clear-multiple-student?subjectCode=${subjectCode}&examId=${examId}`);
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
               var res = await axiosInstance.delete(`${BASE_URL}/api/v1/Student/delete?id=${id}`);
               const messg = res.data;
               return { success: true, message: messg }
          } catch (error) {
               console.error(`Error occured deleting student.`, error); s
               return { success: false, message: error.response?.data?.message || 'An error occurred while trying to delete the student' }
          } finally {
               setLoading(false);
          }

     },
     deactivateStudent: async (id) => {
          const { setLoading } = get().student;
          setLoading(true);
          try {
               const res = await axiosInstance.post(`${BASE_URL}/api/v1/Student/deactivate-student-account?id=${encodeURIComponent(id)}`);
               return { success: res.data.success, message: res.data.message };
          } catch (error) {
               console.error('Error deactivating student:', error);
               return { success: false, message: error.response?.data?.message || 'An error occurred while deactivating the student account' };
          } finally {
               setLoading(false);
          }
     },
     reactivateStudent: async (id) => {
          const { setLoading } = get().student;
          setLoading(true);
          try {
               const res = await axiosInstance.post(`${BASE_URL}/api/v1/Student/reactivate-student-account?id=${encodeURIComponent(id)}`);
               return { success: res.data.success, message: res.data.message };
          } catch (error) {
               console.error('Error reactivating student:', error);
               return { success: false, message: error.response?.data?.message || 'An error occurred while reactivating the student account' };
          } finally {
               setLoading(false);
          }
     }
})

export const useStudent = create(Student);