import { useEffect, useState } from "react";
import SchoolListTemplate from "../../Component/School/SchoolListTemplate";
import useSchoolStore from "../../Zustand/schoolSlice";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useNotification } from "../../Context/notificationContext";

export default function SchoolList() {
    const { loading, schools, fetchSchools } = useSchoolStore();
    const { showSuccess, showError } = useNotification();

    useEffect(() => {
        fetchSchools();
    }, [fetchSchools]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
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

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">School List</h1>
                <div className="mb-6">
                    <div className="w-full bg-white rounded-lg p-6 shadow-md max-w-5lg">
                    <h2 className="text-lg font-semibold mb-4">Search School</h2>
                    <SearchField
                        type="search"
                        placeholder="Search by school name or subject"
                        className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        handleChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <div className="w-full max-w-7xl mx-auto">
                <SchoolListTemplate data={schools} loading={loading} handleDelete={handleDelete} />
            </div>
        </div>
        </div>
    );
}