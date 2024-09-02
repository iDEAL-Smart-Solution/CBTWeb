import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";

const Student = (set, get) => ({
     student: {
          students: [],
          message: "",
          errorMessage: "",
          loading: false,
          setStudents: (datas) => set((state)  => ({...state, student: {...state.student, students: datas } })),
          setMessage: (data) => set((state) =>  ({...state, student: {...state.student, message: data } })),
          setErrorMessage: (data) => set((state) => ({...state, student: {...state.student, errorMessage: data } })),
          setLoading: (value) => set((state) => ({ ...state, student: { ...state.student, loading: value } })),
     },
     createStudent: async (formData) => {
          const {setLoading, setMessage, setErrorMessage} = get().student;
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
               console.log(messg)
               setMessage(messg);
          } catch (error) {
               console.error(`Error occured registering new student.`, error);
               setErrorMessage(error.response?.data?.message || 'An error occurred: kindly fill out all the required spaces');
          } finally {
               setLoading(false);
          }
     },
     fetchStudents: async (param) => {
          const {setLoading, setErrorMessage, setStudents} = get().student;
          setLoading(true);
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/Student/getstudent-by-any?param=${param}`);
               const fetchedStudents = res.data.map((list) => ({
                    id: list.id,
                    className: list.className,
                    uin: list.uin,
                    studentName: list.studentName,
                    gender: list.gender,
                    profilePicture: list.imageUrl,
               }));
               setStudents(fetchedStudents);
          } catch (error) {
               console.error("Error fetching student with the search parameter:", error);
               setErrorMessage(error.response?.data?.message || 'An error occurred fetching student with that keyword');
          } finally {
               setLoading(false);
          }
     }
})

export const useStudent = create(Student);