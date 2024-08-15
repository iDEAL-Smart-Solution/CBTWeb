import { useEffect } from "react";
import ListClass from "../../Component/Class/allClassTable";
import CreateClass from "../../Component/Class/createClassForm";
import { useClass } from "../../Zustand/class";

export default function Class() {
     const { fetchClassList, schClass } = useClass();

     useEffect(() => {
          fetchClassList();
     }, [fetchClassList]);

     const allschClass = schClass?.allschClass || [];

     return (
          <div className="">
               <CreateClass />
               <ListClass classes={allschClass} />
          </div>
     );
}
