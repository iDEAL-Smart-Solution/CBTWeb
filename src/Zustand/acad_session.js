import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";

const Acad = (set, get) =>  ({
     acad: {
          loading: false,
          message: "",
          setLoading: (value) => set((state) => ({...state, acad: { ...state.acad, loading: value } })),
          setMessage: (value) => set((state) => ({...state, acad: { ...state.acad, message: value } })),
     },
     editAcadSession: async (term, session) => {
          const { setLoading, setMessage } = get().acad;
          setLoading(true);
          try {
               var res = await axios.post(`${BASE_URL}/api/v1/Academic_Session/adjust-calendar?newTerm=${term}&newSession=${session}`);
               const messg = res.data.message;
               setMessage(`${messg}, \n Kindly log out and login again to reflect your changes`);
          } catch (error) {
                console.error(`Error occured while deleting class.`, error);
               setMessage(error.response?.data?.message || 'An error occurred, class cant be deleted');
          } finally {
               setLoading(false);
          }
     }
});


export const useAcad = create(Acad);
