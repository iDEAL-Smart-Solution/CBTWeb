import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";


const Question = (set, get) => ({
     question: {
          message: "",
          errorMessage: "",
          loading: false,
          setMessage: (data) => set((state) => ({ ...state, exam: { ...state.exam, message: data } })),
          setErrorMessage: (data) => set((state) => ({ ...state, exam: { ...state.exam, errorMessage: data } })),
          setLoading: (value) => set((state) => ({ ...state, exam: { ...state.exam, loading: value } })),
     },
     uploadSingleQuestion: async (formData) => {
          const { setLoading, setMessage, setErrorMessage } = get().exam;
          setLoading(true);
          try {
               const formDataToSend = new FormData();
               Object.entries(formData).forEach(([key, value]) => {
                    formDataToSend.append(key, value);
               });
               var res = await axios.post(`${BASE_URL}/api/v1/question/singleUpload`, formDataToSend);
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
          
     }
})

export const useQuestion = create(Question);
