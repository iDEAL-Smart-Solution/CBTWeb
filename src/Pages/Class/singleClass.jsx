import SingleClassTemplate from '../../Component/Class/singleClassTemplate';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useClass } from '../../Zustand/classSlice';

export default function SingleClass() {
     const { id } = useParams();
     const { schClass, fetchSingleClass } = useClass();

     const { loading } = schClass;

     useEffect(() => {
          fetchSingleClass(id);
     }, [id, fetchSingleClass])

     const { singleClass } = schClass;
     
     if(singleClass == null) {
          return <p>class not found!!!</p>
     }

     return (
          <div>
          {loading ? (
               <p>loading...</p>
          ) : (
               <SingleClassTemplate students={singleClass} />
          )}
          </div>
     )
}