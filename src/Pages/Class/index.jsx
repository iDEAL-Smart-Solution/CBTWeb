// import React, { useEffect, useState } from "react";
// import ListClass from "../../Component/Class/allClassTable";
// import CreateClass from "../../Component/Class/createClassForm";
// import { useClass } from "../../Zustand/classSlice";
// import { useNotification } from "../../Context/notificationContext";

// export default function Class() {
//      const { fetchClassList, schClass, createClass, deleteClass } = useClass();

//      const {showSuccess, showError } = useNotification();

//      const [name, setName] = useState('');

//      const { loading } = schClass;

//      const handleInputChange = (e) => {
//           setName(e.target.value);
//      };

//      const handleSubmit = async (e) => {
//           e.preventDefault();
//           try {
//                let res = await createClass(name);
//                if(res.success)
//                {
//                     setName("");
//                     showSuccess(res.message);
//                     fetchClassList();
//                } else {
//                     showError(res.message);
//                }
//           } catch (error) {
//                console.error(error);
//           }
//      };

//      const handleDelete = async (id) => {
//           try {
//                let res = await deleteClass(id);
//                if(res.success)
//                {
//                     showSuccess(res.message);
//                     fetchClassList();
//                } else {
//                     showError(res.message);
//                }
//           } catch (error) {
//                console.error(error);

//           }
//      }

//      useEffect(() => {
//           fetchClassList();
//      }, [fetchClassList]);

//      const allschClass = schClass?.allschClass || [];

//      return (
//           <div className="">
//                <CreateClass 
//                     handleSubmit={handleSubmit} 
//                     fieldName={name} 
//                     fieldvalue={name} 
//                     handleInputChange={handleInputChange} 
//                     loading={loading} 
//                />
//                <ListClass classes={allschClass} loading={loading} handleDelete={handleDelete} />
//           </div>
//      );
// }












import React, { useEffect, useState } from "react";
import ListClass from "../../Component/Class/allClassTable";
import CreateClass from "../../Component/Class/createClassForm";
import { useClass } from "../../Zustand/classSlice";
import { useNotification } from "../../Context/notificationContext";

export default function Class() {
    const { fetchClassList, schClass, createClass, deleteClass } = useClass();
    const { showSuccess, showError } = useNotification();
    const [name, setName] = useState('');
    const { loading } = schClass;

    const handleInputChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await createClass(name);
            if (res.success) {
                setName("");
                showSuccess(res.message);
                fetchClassList();
            } else {
                showError(res.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            let res = await deleteClass(id);
            if (res.success) {
                showSuccess(res.message);
                fetchClassList();
            } else {
                showError(res.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchClassList();
    }, [fetchClassList]);

    const allschClass = schClass?.allschClass || [];

    return (
        <div className="container mx-auto py-6 px-4 md:px-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Classes</h1>
            <div className="space-y-8">
                <CreateClass
                    handleSubmit={handleSubmit}
                    fieldName="name"
                    fieldvalue={name}
                    handleInputChange={handleInputChange}
                    loading={loading}
                />
                <ListClass classes={allschClass} loading={loading} handleDelete={handleDelete} />
            </div>
        </div>
    );
}