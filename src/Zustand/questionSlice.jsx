import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";


const Question = (set, get) => ({
     question: {
          message: "",
          errorMessage: "",
          loading: false,
          questionsToDo: [],
          setMessage: (data) => set((state) => ({ ...state, question: { ...state.question, message: data } })),
          setErrorMessage: (data) => set((state) => ({ ...state, question: { ...state.question, errorMessage: data } })),
          setLoading: (value) => set((state) => ({ ...state, question: { ...state.question, loading: value } })),
          setQuestionsToDo: (data) => set((state) => ({...state, question: { ...state.question, questionsToDo: data } })),
     },
     uploadSingleQuestion: async (formData) => {
          const { setLoading, setMessage, setErrorMessage } = get().question;
          setLoading(true);
          try {
               var res = await axios.post(`${BASE_URL}/api/v1/Question/upload-single`, formData);
               const messg = res.data.message;
               console.log(messg)
               setMessage(messg);
               setLoading(false);
          } catch (error) {
               console.error(`Error occured uploading single question.`, error);
               setErrorMessage(error.response?.data?.message || 'An error occurred: make sure form was filled appropriately');
          } finally {
               setLoading(false);
          }
          
     },
     uploadBulkQuestion: async (formData) => {
          const { setLoading, setMessage, setErrorMessage } = get().question;
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
               var res = await axios.post(`${BASE_URL}/api/v1/Question/upload-bulk`, formDataToSend);
               const messg = res.data.message;
               console.log(messg)
               setMessage(messg);
               setLoading(false);
          } catch (error) {
               console.error(`Error occured uploading bulk question.`, error);
               setErrorMessage(error.response.data.message || 'An error occurred uploading the questions');
          } finally {
               setLoading(false);
          }
     },
})

export const useQuestion = create(Question);
