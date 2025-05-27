import { useEffect, useState } from "react";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useStudent } from "../../Zustand/studentSlice";
import StudentListTemplate from "../../Component/student/studentListTemplate";
import { useNotification } from "../../Context/notificationContext";

export default function StudentList() {
    const { student, fetchStudents, deleteStudent } = useStudent();
    const { students, loading } = student;
    const { showError, showSuccess } = useNotification();

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            let res = await fetchStudents(filterKey);
            if (!res.success) {
                showError(res.message);
            }
        } catch (_error) {
            showError(_error);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log(id);
            let res = await deleteStudent(id);
            if (res.success) {
                showSuccess(res.message);
                fetchStudents(filterKey);
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
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Student List</h1>
                <div className="mb-6">
                    <div className="w-full bg-white p-6 rounded-lg shadow-lg max-w-5lg">
                    <h2 className="text-lg font-semibold mb-4">Search Students</h2>
                        <SearchField
                            type="search"
                            placeholder="Search by class name or subject name"
                            handleChange={handleInputChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg">
                    <StudentListTemplate data={students} loading={loading} handleDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
}