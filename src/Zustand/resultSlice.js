import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";
import axiosInstance from "../Constant/axiosInstance";


const Result = (set, get) => ({ 
      result: {
          errorMessage: "",
          loading: false,
          subjectResults: [],
          studentResults: [],
          staffSubjectResult: [],
          setErrorMessage: (data) => set((state) => ({ ...state, result: { ...state.result, errorMessage: data } })),
          setLoading: (value) => set((state) => ({ ...state, result: { ...state.result, loading: value } })),
          setSubjectResults: (data) => set((state) => ({...state, result: { ...state.result, subjectResults: data } })),
          setStaffSubjectResult: (data) => set((state) => ({...state, result: { ...state.result, staffSubjectResult: data } })),
          setStudentResults: (data) => set((state) => ({...state, result: { ...state.result, studentResults: data } })),
     },
     fetchSubjectResults: async (subjectCode, term) => {
          const { setErrorMessage,  setLoading, setSubjectResults } = get().result;
          setLoading(true);
          try {
               var resposne = await axiosInstance.get(`${BASE_URL}/api/v1/Result/get-subject-result?subjectCode=${subjectCode}&term=${term}`);
               const results = resposne.data.map((result) => ({
                         studentUin: result.studentUin,
                         first_CA_Score: result.first_CA_Score,
                         second_CA_Score: result.second_CA_Score,
                         third_CA_Score: result.third_CA_Score,
                         exam_Score: result.exam_Score,
                         total_Score: result.total_Score,
                         term: result.term,
                         studentName: result.studentName,
                }))
                setSubjectResults(results);
          } catch (error) {
               console.error("Error fetching subject result:", error);
               setErrorMessage(error.response?.data?.message);
          } finally {
               setLoading(false);
          }
     },
     fetchStaffSubjectResults: async (subjectCode, term, userId, showError) => {
          const { setLoading, setStaffSubjectResult } = get().result;
          setLoading(true);
          try {
               var resposne = await axiosInstance.get(`${BASE_URL}/api/v1/Result/get-staff-subject-result?subjectCode=${subjectCode}&term=${term}&userId=${userId}`);
               const results = resposne.data.map((result) => ({
                         studentUin: result.studentUin,
                         first_CA_Score: result.first_CA_Score,
                         second_CA_Score: result.second_CA_Score,
                         third_CA_Score: result.third_CA_Score,
                         exam_Score: result.exam_Score,
                         total_Score: result.total_Score,
                         term: result.term,
                         studentName: result.studentName,
                }))
                setStaffSubjectResult(results);
          } catch (error) {
               console.error("Error fetching subject result:", error);
               showError(error.response?.data)
          } finally {
               setLoading(false);
          }
     },
     fetchStudentResults: async (key, term) => {
          const { setErrorMessage,  setLoading, setStudentResults } = get().result;
          setLoading(true);
          try {
               var resposne = await axiosInstance.get(`${BASE_URL}/api/v1/Result/get-student-result?studentKey=${key}&term=${term}`);
               const results = resposne.data.map((result) => ({
                         studentUin: result.studentUin,
                         subjectCode: result.subjectCode,
                         first_CA_Score: result.first_CA_Score,
                         second_CA_Score: result.second_CA_Score,
                         third_CA_Score: result.third_CA_Score,
                         exam_Score: result.exam_Score,
                         total_Score: result.total_Score,
                         term: result.term,
                         session: result.session,
                }))
                setStudentResults(results);
          } catch (error) {
               console.error("Error fetching subject result:", error);
               setErrorMessage(error.response?.data?.message);
          } finally {
               setLoading(false);
          }
     },
     uploadTheoryScore: async (formData) => {
          const { setLoading } = get().result;
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
               
               var res = await axiosInstance.post(`${BASE_URL}/api/v1/Result/upload-theory-score`, formDataToSend);
               const messg = res.data.message
               return{success: true, message: messg}
          } catch (error) {
               console.error(`Error occured uploading bulk question.`, error);
               return{success: false, message: error.response.data.message || 'An error occurred uploading the theory result'};
          } finally {
               setLoading(false);
          }
     }

})

export const useResult = create(Result);
