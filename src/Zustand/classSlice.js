import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";

const Class = (set, get) => ({
     schClass: {
          allschClass: [],
          singleClass: null,
          loading: false,
          message: "",
          setAllschClass: (datas) => set((state) => ({ ...state, schClass: { ...state.schClass, allschClass: datas } })),
          setLoading: (value) => set((state) => ({ ...state, schClass: { ...state.schClass, loading: value } })),
          setSingleClass: (data) => set((state) => ({ ...state, schClass: { ...state.schClass, singleClass: data } })),
          setMessage: (value) => set((state) => ({ ...state, schClass: { ...state.schClass, message: value } })),
     },
     fetchClassList: async () => {
          const { setLoading, setAllschClass } = get().schClass;
          setLoading(true);
          try {
               const res = await axios.get(`${BASE_URL}/api/v1/Class/get-all`);
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
     },
     fetchSingleClass: async (param) => {
          const { setLoading, setSingleClass } = get().schClass;
          setLoading(true);
          try {
               const res = await axios.get(`${BASE_URL}/api/v1/Class/Get?name_id=${param}`);
               const incoming = res.data.data;
               const data = {
                    name: incoming.name,
                    listOfSubjects: incoming.listOfSubjects.map((list) => ({
                         id: list.id,
                         name: list.name,
                         code: list.code,
                         description: list.description,
                    })),
                    listOfStudents: incoming.listOfStudents.map((list) => ({
                         id: list.id,
                         studentName: list.studentName,
                         uin: list.uin,
                         gender: list.gender,
                         profilePicture: list.imageUrl
                    })),
               };
               setSingleClass(data);

          } catch (error) {
               console.error("Error occured while fetching class details.", error);
          } finally {
               setLoading(false);
          }
     },
     createClass: async (name) => {
          const { setLoading } = get().schClass;
          setLoading(true);
          try {
               const res = await axios.post(`${BASE_URL}/api/v1/Class/Create?name=${name}`);
               const messg = res.data.message;
               return {success: true, message: messg};
          } catch (error) {
               console.error(`Error occured while creating class ${name}.`, error);
               return {success: true, message: error.response?.data?.message || 'An error occurred'};
          } finally {
               setLoading(false);
          }
     },
     deleteClass: async (id) => {
          const { setLoading, setMessage } = get().schClass;
          setLoading(true);
          try {
               const res = await axios.delete(`${BASE_URL}/api/v1/Class/delete?name_id=${id}`);
               const messg = res.data.message;
               setMessage(messg);
               setLoading(false);
               return {success: true, message: messg};
          } catch (error) {
               console.error(`Error occured while deleting class.`, error);
               setMessage(error.response?.data?.message || 'An error occurred, class cant be deleted');
               setLoading(false);
               return {success: false, message: error.response.data.message};
          }
     }

})

export const useClass = create(Class);