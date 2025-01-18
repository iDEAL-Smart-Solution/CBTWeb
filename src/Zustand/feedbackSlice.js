import { create } from 'zustand';
import axios from 'axios';
import { BASE_URL } from '../Constant';
import axiosInstance from '../Constant/axiosInstance';


const Feedback = create((set, get) => ({
     feedback: {
          loading: false
     },
     sendfeedback: async (formData) => {
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
               const res = await axiosInstance.post(`${BASE_URL}/api/v1/Feedback/send-feedback`, formDataToSend);
               const messg = res.data.message;
               return { success: true, message: messg };
          } catch (error) {
               console.error(`Error occured while trying to send feedback.`, error);
               return { success: false, message: error.response?.data?.message || 'An error occured when attempting to send feedback' };
          } finally {
               set({ loading: false })

          }
     },
}));

export default Feedback;