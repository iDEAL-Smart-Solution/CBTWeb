import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";

const Class = (set, get) => ({
     schClass: {
          allschClass: [],
          loading: false,
          setAllschClass: (value) => set((state) => ({ ...state, schClass: { ...state.schClass, allschClass: value } })),
          setLoading: (value) => set((state) => ({ ...state, auth: { ...state.auth, loading: value } })),
     },
     fetchClassList: async () => {
          const { setLoading, setAllschClass } = get().schClass;
          setLoading(true);
          try {
               const res = await axios.get(`${BASE_URL}/Class/GetAll`);
               const schClassList = res.data.map((list) => ({
                    className: list.cLassName,
                    classId: list.classId,
                    numberOfSubjects: list.numberOfSubjects,
                    numberOfStudents: list.numberOfStudents,
               }));
               setAllschClass(schClassList);
          } catch (error) {
               console.error("Error fetching schClass list:", error);
          } finally {
               setLoading(false);
          }
     }

})

export const useClass = create(Class);