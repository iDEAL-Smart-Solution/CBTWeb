import { useEffect, useState } from "react";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useSubject } from "../../Zustand/subjectSlice";
import SubjectListTemplate from "../../Component/Subject/subjectListTemplate";
import Modal from "../../Component/ReUsableComponents/Modal";
import SubjectCreationForm from "../../Component/Subject/subjectCreationForm";
import { useClass } from "../../Zustand/classSlice";
import { useStaff } from "../../Zustand/staffSlice";
import { useNotification } from "../../Context/notificationContext";
import { Plus } from 'lucide-react';

export default function SubjectList() {
    const { subject, fetchSubjectsLight, filterList, createSubject } = useSubject();
    const { subjects, loading } = subject;
    const { schClass, fetchClassList } = useClass();
    const { staff, fetchAllStaffsUsername } = useStaff();
    const { showSuccess, showError } = useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        description: "",
        className: "",
        userName: "",
        testTotalScore: 0,
        examTotalScore: 0,
    });

    useEffect(() => {
        fetchSubjectsLight();
        fetchClassList();
        fetchAllStaffsUsername();
    }, [fetchSubjectsLight]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value;
        setFormData({
            ...formData,
            [name]: parsedValue
        });
    };

    const handleSearchChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleSubmit = () => {
        filterList(filterKey);
    };

    const handleSubjectSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await createSubject(formData);
            if (res.success) {
                showSuccess(res.message);
                setFormData({
                    name: "",
                    code: "",
                    description: "",
                    className: "",
                    userName: "",
                    testTotalScore: 0,
                    examTotalScore: 0,
                });
                setIsModalOpen(false);
                fetchSubjectsLight();
            } else {
                showError(res.message);
            }
        } catch (_error) {
            showError(_error);
        }
    };

    const handleReset = async () => {
        setFormData({
            name: "",
            code: "",
            description: "",
            className: "",
            userName: "",
            totalTestScore: 0,
            totalExamScore: 0,
        });
    };

    const { allschClass } = schClass;
    const { staffsUsernames } = staff;
    
    console.log(subjects);

    return (
            <div className="w-full">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Subject Management</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
                        >
                            <Plus className="w-5 h-5" />
                            Subject
                        </button>
                    </div>
                    <div className="mb-6">
                        <div className="w-full bg-white p-6 rounded-lg shadow-lg max-w-5lg">
                        <h2 className="text-lg font-semibold mb-4">Search Subjects</h2>
                            <SearchField
                                type="search"
                                placeholder="name"
                                handleChange={handleSearchChange}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                    <div>
                        <SubjectListTemplate data={subjects} loading={loading} />
                    </div>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Create Subject"
                        size="max-w-3xl"
                    >
                        <SubjectCreationForm
                            handleReset={handleReset}
                            handleSubmit={handleSubjectSubmit}
                            staffsUsernames={staffsUsernames}
                            allschClass={allschClass}
                            handleInputChange={handleInputChange}
                            formData={formData}
                            loading={loading}
                        />
                    </Modal>
                </div>
            </div>
    );
}
