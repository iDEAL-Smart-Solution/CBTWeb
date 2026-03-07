import { useEffect, useState } from "react";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useStudent } from "../../Zustand/studentSlice";
import StudentListTemplate from "../../Component/student/studentListTemplate";
import { useNotification } from "../../Context/notificationContext";
import Modal from "../../Component/ReUsableComponents/Modal";
import StudentRegistrationForm from "../../Component/student/studentRegistrationForm";
import { useClass } from "../../Zustand/classSlice";
import { Plus } from 'lucide-react';

export default function StudentList() {
    const { student, fetchStudents, deleteStudent, createStudent } = useStudent();
    const { students, loading } = student;
    const { showError, showSuccess } = useNotification();
    const { schClass, fetchClassList } = useClass();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        registrationNumber: "",
        className: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        profilePicture: null,
        gender: 0,
    });

    useEffect(() => {
        fetchStudents();
        fetchClassList();
    }, [fetchStudents]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
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

    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await createStudent(formData);
            if (res.success) {
                showSuccess(res.message);
                setFormData({
                    registrationNumber: "",
                    className: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    profilePicture: null,
                    gender: 0,
                });
                setIsModalOpen(false);
                fetchStudents(filterKey);
            } else {
                showError(res.message);
            }
        } catch (_error) {
            showError(_error);
        }
    };

    const { allschClass } = schClass;

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Student Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
                    >
                        <Plus className="w-5 h-5" />
                        Student
                    </button>
                </div>
                <div className="mb-6">
                    <div className="w-full bg-white p-6 rounded-lg shadow-lg max-w-5lg">
                    <h2 className="text-lg font-semibold mb-4">Search Students</h2>
                        <SearchField
                            type="search"
                            placeholder="Search by class name or subject name"
                            handleChange={handleSearchChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg">
                    <StudentListTemplate data={students} loading={loading} handleDelete={handleDelete} />
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Register Student"
                    size="max-w-3xl"
                >
                    <StudentRegistrationForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSubmit={handleStudentSubmit}
                        loading={loading}
                        allschClass={allschClass}
                    />
                </Modal>
            </div>
        </div>
    );
}