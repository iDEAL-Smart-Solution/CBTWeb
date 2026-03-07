import { useEffect, useState } from "react";
import AdminUserListTemplate from "../../Component/Admin/admin-list-template";
import useAdminStore from "../../Zustand/adminslice";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useNotification } from "../../Context/notificationContext";
import Modal from "../../Component/ReUsableComponents/Modal";
import AdminUserCreationForm from "../../Component/Admin/create-admin-user-form";
import useSchoolStore from "../../Zustand/schoolSlice";
import { Plus } from 'lucide-react';

export default function AdminUserList() {
    const { loading, adminUsers, fetchAdminUsers, CreateAdminUser } = useAdminStore();
    const { fetchSchoolsLight, schools } = useSchoolStore();
    const { showSuccess, showError } = useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        profilePicture: null,
        gender: 0,
    });

    useEffect(() => {
     fetchAdminUsers();
     fetchSchoolsLight();
    }, [fetchAdminUsers, fetchSchoolsLight]);

    const [filterKey, setFilterKey] = useState('');

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

    const handleSearchChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleSubmit = () => {
     // fetchSchools(filterKey);
    };

    const handleDelete = async (id) => {
     //    try {
     //        console.log(id);
     //         let res = await deleteStaff(id);
     //         if(res.success)
     //         {
     //              showSuccess(res.message);
     //              fetchAllStaffs();
     //         } else {
     //              showError(res.message);
     //         }
     //    } catch (error) {
     //         console.error(error);

     //    }
   };

   const handleAdminSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await CreateAdminUser(formData);
            if (res.success) {
                showSuccess(res.message);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    profilePicture: null,
                    gender: 0,
                });
                setIsModalOpen(false);
                fetchAdminUsers();
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
          <div className="w-full">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">Admin Users</h1>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
                            >
                                <Plus className="w-5 h-5" />
                                Admin
                            </button>
                        </div>
                        <div className="mb-6">
                            <div className="w-full bg-white rounded-lg p-6 shadow-md max-w-5lg">
                            <h2 className="text-lg font-semibold mb-4">Search Admin Users</h2>
                            <SearchField
                                type="search"
                                placeholder="Search by school name or admin name"
                                className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                handleChange={handleSearchChange}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                    <div className="w-full max-w-7xl mx-auto">
                    <AdminUserListTemplate data={adminUsers} loading={loading} handleDelete={handleDelete} />
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Create Admin User"
                        size="max-w-3xl"
                    >
                        <AdminUserCreationForm
                            loading={loading}
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleAdminSubmit}
                            handleReset={handleReset}
                            schools={schools}
                        />
                    </Modal>
                </div>
                </div>
    );
}
