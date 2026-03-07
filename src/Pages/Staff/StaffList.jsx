import { useEffect, useState } from "react";
import StaffListTemplate from "../../Component/Staff/StaffListTemplate";
import { useStaff } from "../../Zustand/staffSlice";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useNotification } from "../../Context/notificationContext";
import Modal from "../../Component/ReUsableComponents/Modal";
import StaffRegistrationForm from "../../Component/Staff/staffRegistrationForm";
import { Plus } from 'lucide-react';

export default function StaffList() {
    const { staff, fetchAllStaffs, filterAllStaff, deleteStaff, createSaff } = useStaff();
    const { staffs, loading } = staff;
    const { showSuccess, showError } = useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        profilePicture: null,
        gender: 0,
    });
    const [passwordError, setPasswordError] = useState("");

    useEffect(() => {
        fetchAllStaffs();
    }, [fetchAllStaffs]);

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
        filterAllStaff(filterKey);
    };

    const handleDelete = async (id) => {
        try {
            console.log(id);
            let res = await deleteStaff(id);
            if (res.success) {
                showSuccess(res.message);
                fetchAllStaffs();
            } else {
                showError(res.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleStaffSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Password and confirm password do not match");
            return;
        }

        setPasswordError("");
        try {
            let res = await createSaff(formData);
            if (res.success) {
                showSuccess(res.message);
                setFormData({
                    firstName: "",
                    lastName: "",
                    userName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    phoneNumber: "",
                    profilePicture: null,
                    gender: 0,
                });
                setIsModalOpen(false);
                fetchAllStaffs();
            } else {
                showError(res.message);
            }
        } catch (_error) {
            showError('Request failed');
        }
    };

    const handleReset = async () => {
        setFormData({
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            profilePicture: null,
            gender: 0,
        });
    };

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
                    >
                        <Plus className="w-5 h-5" />
                        Staff
                    </button>
                </div>
                <div className="mb-6">
                    <div className="w-full bg-white rounded-lg p-6 shadow-md max-w-5lg">
                    <h2 className="text-lg font-semibold mb-4">Search Staffs</h2>
                        <SearchField
                            type="search"
                            placeholder="Search by username or subject"
                            handleChange={handleSearchChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg">
                    <StaffListTemplate data={staffs} loading={loading} handleDelete={handleDelete} />
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Register Staff"
                    size="max-w-3xl"
                >
                    <StaffRegistrationForm
                        loading={loading}
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleStaffSubmit}
                        handleReset={handleReset}
                        passwordError={passwordError}
                    />
                </Modal>
            </div>
        </div>
    );
}