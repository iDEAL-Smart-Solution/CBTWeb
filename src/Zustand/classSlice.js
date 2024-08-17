import axios from "axios";
import { BASE_URL } from '../Constant/index';
import { create } from "zustand";
import SingleClass from "../Component/Class/singleClassTemplate";

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
     },
     fetchSingleClass: async (param) => {
          const { setLoading, setSingleClass } = get().schClass;
          setLoading(true);
          try {
               const res = await axios.get(`${BASE_URL}/Class/Get?name_id=${param}`);
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
                         imageUrl: list.imageUrl
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
          const { setLoading, setMessage } = get().schClass;
          setLoading(true);
          try {
               const res = await axios.post(`${BASE_URL}/Class/Create?name=${name}`);
               const messg = res.data.message;
               setMessage(messg);
               setLoading(false);
               return true;
          } catch (error) {
               console.error(`Error occured while creating class ${name}.`, error);
               setMessage(error.response?.data?.message || 'An error occurred');
               setLoading(false);
               return false;
          }
     }

})

export const useClass = create(Class);