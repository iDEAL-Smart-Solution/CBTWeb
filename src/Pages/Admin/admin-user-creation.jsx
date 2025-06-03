// import useSchoolStore from "../../Zustand/schoolSlice";
// import { useNotification } from "../../Context/notificationContext";
// import { useState, useEffect } from 'react';
// import useAdminStore from "../../Zustand/adminslice";
// import AdminUserCreationForm from "../../Component/Admin/create-admin-user-form";

// export default function AdminUserCreation() {
//      const { fetchSchoolsLight, schools } = useSchoolStore();
//      const { CreateAdminUser, loading } = useAdminStore();

//      const { showSuccess, showError } = useNotification();

//      useEffect(() => {
//           fetchSchoolsLight();
//      }, [fetchSchoolsLight]);

//      const [formData, setFormData] = useState({
//           firstName: "",
//           lastName: "",
//           email: "",
//           phoneNumber: "",
//           profilePicture: null,
//           gender: 0,
//      });

//      const handleInputChange = (event) => {
//           const { name, value, files } = event.target;
//           let parsedValue = value;
//           if (name === "gender") {
//                parsedValue = parseInt(value);
//           }

//           if (name === "profilePicture") {
//                setFormData({
//                     ...formData,
//                     [name]: files[0]
//                });
//           } else {
//                setFormData({
//                     ...formData,
//                     [name]: parsedValue
//                });
//           }
//      };

//      const handleSubmit = async (e) => {
//           e.preventDefault();
//           try {
//                let res = await CreateAdminUser(formData);
//                if (res.success) {
//                     showSuccess(res.message);
//                } else {
//                     showError(res.message);
//                }
//           } catch (_error) {
//                showError(res.message);
//           }
//      };

//      const handleReset = async () => {
//           setFormData({
//                firstName: "",
//                lastName: "",
//                email: "",
//                phoneNumber: "",
//                profilePicture: null,
//                gender: 0,
//           })
//      }
//      return (
//           <div>
//                <h1 className="text-center color-primary">Admin User</h1>
//                <AdminUserCreationForm loading={loading} formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} handleReset={handleReset} schools={schools} />
//           </div>
//      )
// }






import useSchoolStore from "../../Zustand/schoolSlice";
import { useNotification } from "../../Context/notificationContext";
import { useState, useEffect } from 'react';
import useAdminStore from "../../Zustand/adminslice";
import AdminUserCreationForm from "../../Component/Admin/create-admin-user-form";

export default function AdminUserCreation() {
    const { fetchSchoolsLight, schools } = useSchoolStore();
    const { CreateAdminUser, loading } = useAdminStore();
    const { showSuccess, showError } = useNotification();

    useEffect(() => {
        fetchSchoolsLight();
    }, [fetchSchoolsLight]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        profilePicture: null,
        gender: 0,
    });

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        let parsedValue = value;
        if (name === "gender") {
            parsedValue = parseInt(value);
        }

        if (name === "profilePicture") {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: parsedValue
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await CreateAdminUser(formData);
            if (res.success) {
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (_error) {
            showError(res.message);
        }
    };

    const handleReset = async () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            profilePicture: null,
            gender: 0,
        });
    };

    return (
        <div className="min-h-[calc(100vh-200px)] p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto">
                <AdminUserCreationForm 
                    loading={loading} 
                    formData={formData} 
                    handleInputChange={handleInputChange} 
                    handleSubmit={handleSubmit} 
                    handleReset={handleReset} 
                    schools={schools} 
                />
            </div>
        </div>
    );
}