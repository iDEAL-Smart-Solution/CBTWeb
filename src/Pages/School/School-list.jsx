import { useEffect, useState } from "react";
import SchoolListTemplate from "../../Component/School/SchoolListTemplate";
import useSchoolStore from "../../Zustand/schoolSlice";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useNotification } from "../../Context/notificationContext";
import Modal from "../../Component/ReUsableComponents/Modal";
import SchoolCreateForm from "../../Component/School/createSchoolForm";
import { Plus } from 'lucide-react';

export default function SchoolList() {
    const { loading, schools, fetchSchools, createSchool } = useSchoolStore();
    const { showSuccess, showError } = useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        schoolName: "",
        address: "",
        phoneNumber: "",
        email: "",
        planType: "",
        subscriptionType: "",
    });

    const PlanType = [
        { value: 1, label: 'Local' },
        { value: 2, label: 'Remote' },
    ];

    const SubscriptionType = [
        { value: 1, label: 'OneTime' },
        { value: 2, label: 'PerTerm' },
        { value: 3, label: 'Demo' },
    ];

    useEffect(() => {
        fetchSchools();
    }, [fetchSchools]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value;
        if (name === "planType" || name === "subscriptionType") {
            parsedValue = parseInt(value);
        }
    
        setFormData({
            ...formData,
            [name]: parsedValue
        });
    };

    const handleSearchChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleSubmit = () => {
        // fetchSchools(filterKey);
    };

    const handleDelete = async (id) => {
        // try {
        //     console.log(id);
        //     let res = await deleteStaff(id);
        //     if(res.success)
        //     {
        //         showSuccess(res.message);
        //         fetchAllStaffs();
        //     } else {
        //         showError(res.message);
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    };

    const handleSchoolSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await createSchool(formData);
            if (res.success) {
                showSuccess(res.message);
                setFormData({
                    schoolName: "",
                    address: "",
                    phoneNumber: "",
                    email: "",
                    planType: 0,
                    subscriptionType: 0,
                });
                setIsModalOpen(false);
                fetchSchools();
            } else {
                showError(res.message);
            }
        } catch (_error) {
            showError(res.message);
        }
    };

    const handleReset = async () => {
        setFormData({
            schoolName: "",
            address: "",
            phoneNumber: "",
            email: "",
            planType: 0,
            subscriptionType: 0,
        });
    };

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Schools</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
                    >
                        <Plus className="w-5 h-5" />
                        School
                    </button>
                </div>
                <div className="mb-6">
                    <div className="w-full bg-white rounded-lg p-6 shadow-md max-w-5lg">
                    <h2 className="text-lg font-semibold mb-4">Search School</h2>
                    <SearchField
                        type="search"
                        placeholder="Search by school name or subject"
                        className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        handleChange={handleSearchChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <div className="w-full max-w-7xl mx-auto">
                <SchoolListTemplate data={schools} loading={loading} handleDelete={handleDelete} />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create School"
                size="max-w-3xl"
            >
                <SchoolCreateForm
                    loading={loading}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSchoolSubmit}
                    handleReset={handleReset}
                    planType={PlanType}
                    subscriptionType={SubscriptionType}
                />
            </Modal>
        </div>
        </div>
    );
}