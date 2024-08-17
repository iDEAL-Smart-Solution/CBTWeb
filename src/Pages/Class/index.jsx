import { useEffect, useState } from "react";
import ListClass from "../../Component/Class/allClassTable";
import CreateClass from "../../Component/Class/createClassForm";
import { useClass } from "../../Zustand/classSlice";

export default function Class() {
     const { fetchClassList, schClass, createClass } = useClass();

     const [name, setName] = useState('');

     const { loading } = schClass;

     const handleInputChange = (e) => {
          setName(e.target.value);
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          const success = await createClass(name);
          if (success) {
               setName(''); 
               fetchClassList(); 
          }
     };

     useEffect(() => {
          fetchClassList();
     }, [fetchClassList]);

     const allschClass = schClass?.allschClass || [];

     return (
          <div className="">
               <CreateClass 
                    handleSubmit={handleSubmit} 
                    fieldName={name} 
                    fieldvalue={name} 
                    handleInputChange={handleInputChange} 
                    loading={loading} 
               />
               <ListClass classes={allschClass} loading={loading} />
          </div>
     );
}