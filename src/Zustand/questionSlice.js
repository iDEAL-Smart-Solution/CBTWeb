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
          const { setLoading } = get().question;
          setLoading(true);
          try {
               let res;
               if(formData.questionType == "1")
               {
                    res = await axios.post(`${BASE_URL}/api/v1/Question/upload-single`, formData);
               } else {
                    res = await axios.post(`${BASE_URL}/api/v1/Question/upload-single-theory`, formData)
               }
               const messg = res.data.message;
               return{success: true, message: messg}

          } catch (error) {
               console.error(`Error occured uploading single question.`, error);
               return{success: false, message: error.response?.data?.message || 'An error occurred: make sure form was filled appropriately'}
          } finally {
               setLoading(false);
          }
          
     },
     uploadBulkQuestion: async (formData) => {
          const { setLoading } = get().question;
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
               let res;
               if(formData.questionType == "1")
               {
                    res = await axios.post(`${BASE_URL}/api/v1/Question/upload-bulk`, formDataToSend);
               } else {
                    res = await axios.post(`${BASE_URL}/api/v1/Question/upload-bulk-theory`, formDataToSend)
               }
               const messg = res.data.message;
               return{success: true, message: messg}
          } catch (error) {
               console.error(`Error occured uploading bulk question.`, error);
               return{success: false, message: error.response.data.message || 'An error occurred uploading the questions'};
          } finally {
               setLoading(false);
          }
     },
     deleteQuestion: async (id) => {
          const { setLoading, setMessage, setErrorMessage } = get().question;
          setLoading(true);
          try {
               var res = await axios.delete(`${BASE_URL}/api/v1/Question/delete?id=${id}`);
               var mssg = res.data.message;
               setMessage(mssg);
               return true;
          } catch (error) {
               console.error("Error occured when attempting to delete question")
               setErrorMessage(error.response.data.message || "An error occured, question could not be deleted");
               return false;
          } finally {
               setLoading(false);
          }
     },
     editQuestion: async (formData) => {
          const {setLoading, setMessage, setErrorMessage } = get().question;
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
               var res = await axios.patch(`${BASE_URL}/api/v1/Question/update-question`, formDataToSend);
               var mssg = res.data.message;
               setMessage(mssg);
               return {success: true, message: mssg};
          } catch (error) {
               console.error("Error occured when trying to edit question : ", error);
               setErrorMessage(error.response.data.message || "Error occured when trying to edit the question");
               let mssg = error.response.data.errors.QuestionInstruction[0];
               return {sucess: false, message: mssg };
          } finally {
               setLoading(false);
          }
     },
     uploadImageForQuestion: async (formData) => {
          const { setLoading } = get().question;
          setLoading(true);
          try {
               var res = await axios.patch(`${BASE_URL}/api/v1/Question/update-question-image`, formData);
               var mssg = res.data.message;
               return{success: true, message: mssg}
          } catch (error) {
               console.error("An error occured whne uploading image for a question", error);
               return {success: false, message: error.response.data.message || "An error ocuured whne trying to upload the image please check again"};
          } finally {
               setLoading(false);
          }
     }
})

export const useQuestion = create(Question);