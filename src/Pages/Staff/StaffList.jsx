import { useEffect, useState } from "react";
import StaffListTemplate from "../../Component/Staff/StaffListTemplate";
import { useStaff } from "../../Zustand/staffSlice";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useNotification } from "../../Context/notificationContext";

export default function StaffList() {
    const { staff, fetchAllStaffs, filterAllStaff, deleteStaff } = useStaff();
    const { staffs, loading } = staff;
    const { showSuccess, showError } = useNotification();

    useEffect(() => {
        fetchAllStaffs();
    }, [fetchAllStaffs]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
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

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Staff List</h1>
                <div className="mb-6">
                    <div className="w-full bg-white rounded-lg p-6 shadow-md max-w-5lg">
                    <h2 className="text-lg font-semibold mb-4">Search Staffs</h2>
                        <SearchField
                            type="search"
                            placeholder="Search by username or subject"
                            handleChange={handleInputChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg">
                    <StaffListTemplate data={staffs} loading={loading} handleDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
}