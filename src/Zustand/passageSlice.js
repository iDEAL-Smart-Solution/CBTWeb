import { create } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../Constant';



const Passage = create((set, get) => ({
          loading: false,
          passageTitleAndIds: [],

     uploadPassage: async (formData) => {
          set({ loading: true })
          try {
               const formDataToSend = new FormData();
               Object.entries(formData).forEach(([key, value]) => {
                    formDataToSend.append(key, value);
               });
               const res = await axios.post(`${BASE_URL}/api/v1/Question/upload-passage`, formDataToSend);
               const messg = res.data.message;
               return { success: true, message: messg };
          } catch (error) {
               console.error(`Error occured while trying to upload passage.`, error);
               return { success: false, message: error.response?.data?.message || 'An error occured when attempting to upload passage' };
          } finally {
               set({ loading: false })

          }
     },
     uploadPassageQuestions: async (formData) => {
          set({ loading: true })
          try {
               const formDataToSend = new FormData();
               Object.entries(formData).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                         formDataToSend.append(key, value[0]);
                    } else {
                         formDataToSend.append(key, value);
                    }
               });
               const res = await axios.post(`${BASE_URL}/api/v1/Question/upload-passage-questions`, formDataToSend);
               const messg = res.data.message;
               return { success: true, message: messg };
          } catch (error) {
               console.error(`Error occured while trying to upload passage question.`, error);
               return { success: false, message: error.response?.data?.message || 'An error occured when attempting to upload passage questions' };
          } finally {
               set({ loading: false })

          }
     },
     fetchPassageTitleAndId: async () => {
          set({ loading: true })
          try {
               var res = await axios.get(`${BASE_URL}/api/v1/Question/get-passage-light`);
               const passageTitleAndIds = res.data.map((list) => ({
                    id: list.id,
                    title: list.title,
               }));
               set({ passageTitleAndIds });
          } catch (error) {
               console.error("Error fetching passage title and id:", error);
               return { success: false, message: error.response?.data?.message || 'An error occured when attempting to fetch passageId and title' };
          } finally {
               set({ loading: false })

          }
     }
}));

export default Passage;