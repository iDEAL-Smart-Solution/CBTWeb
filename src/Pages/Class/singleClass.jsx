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


     return (
          <div>
               {loading ? (
                    <div colSpan="6" className="loader-cell">
                         <div className="loader"></div>
                    </div>
               ) : !singleClass || singleClass.length == 0 ? (<p className='text-center'>CLass details not found</p>) : (
                    <SingleClassTemplate students={singleClass} />
               )}
          </div>
     )
}