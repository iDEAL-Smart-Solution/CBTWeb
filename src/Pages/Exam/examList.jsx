import { useEffect, useState } from "react";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useExam } from "../../Zustand/examSlice";
import { ExamListTemplate1 } from "../../Component/Exam/examListTemplate";
import { useNotification } from "../../Context/notificationContext";
import Modal from "../../Component/ReUsableComponents/Modal";
import ExamCreationForm from "../../Component/Exam/examCreationForm";
import { useSubject } from "../../Zustand/subjectSlice";
import { Plus } from 'lucide-react';


export default function ExamList() {
    const { exam, fetchExams, flipAvailability, filterList, createExam } = useExam();
    const { exams, loading } = exam;
    const { subject, fetchSubjectsLight } = useSubject();
    const { showError, showSuccess } = useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        subjectCode: "",
        examType: 0,
        examName: "",
        NumberOfQuestionsPerStudent: 0,
        NumberOfPassageQuestionsPerStudent: 0,
        durationHours: 0,
        durationMinutes: 0,
        obtainableScore: 0,
        oBJScore: 0,
        theoryScore: 0,
        HasPassage: false,
    });

    useEffect(() => {
        fetchExams();
        const fetchData = async () => {
            let res = await fetchSubjectsLight();
            if (!res.success) {
                showError(res.message); 
            }
        };
        fetchData();
    }, [fetchExams]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const parsedValue = name === "HasPassage" ? value === "true" : value;
        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };

    const handleSearchChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleAvailability = async (examId) => {
        try {
            var res = await flipAvailability(examId);
            if (res.success) {
                showSuccess(res.message);
                fetchExams();
            } else {
                showError(res.message)
            }
        } catch (error) {
            showError(error);
        }
    };
    const handleSubmit = () => {
        filterList(filterKey);
    };

    const handleExamSubmit = async (e) => {
        e.preventDefault();

        const duration = `${String(formData.durationHours).padStart(2, '0')}:${String(formData.durationMinutes).padStart(2, '0')}:00`;

        const dataToSubmit = {
            ...formData,
            duration
        };

        try {
            let res = await createExam(dataToSubmit);
            if (res.success) {
                showSuccess(res.message);
                setFormData({
                    subjectCode: "",
                    examType: 0,
                    examName: "",
                    NumberOfQuestionsPerStudent: 0,
                    NumberOfPassageQuestionsPerStudent: 0,
                    durationHours: 0,
                    durationMinutes: 0,
                    obtainableScore: 0,
                    oBJScore: 0,
                    theoryScore: 0,
                    HasPassage: false,
                });
                setIsModalOpen(false);
                fetchExams();
            } else {
                showError(res.message);
            }
        } catch (_error) {
            console.log(_error);
        }
    };

    const handleReset = () => {
        setFormData({
            subjectCode: "",
            examType: 0,
            examName: "",
            NumberOfQuestionsPerStudent: 0,
            NumberOfPassageQuestionsPerStudent: 0,
            durationHours: 0,
            durationMinutes: 0,
            obtainableScore: 0,
            oBJScore: 0,
            theoryScore: 0,
            HasPassage: false,
        });
    };

    const { subjects } = subject;

    const columns = [
        { key: 'examName', header: 'Name' },
        { key: 'subjectCode', header: 'Subject Code' },
        { key: 'session', header: 'Session' },
        { key: 'term', header: 'Term' },
        { key: 'isAvailable', header: 'Available' },
        { key: 'examType', header: 'Type' },
        { key: 'more', header: '' },
        { key: 'makeAvailable', header: 'Availability' }
    ];
    const termMap = {
        1: "1st_term",
        2: "2nd_term",
        3: "3rd_term",
    };

    const typeMap = {
        1: "1st_CA",
        2: "2nd_CA",
        3: "3rd_CA",
        4: "Exam"
    };


    return (

        <div className="w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Examinations</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
                    >
                        <Plus className="w-5 h-5" />
                        Exam
                    </button>
                </div>
                <div className="mb-6">
                    <div className="w-full bg-white p-6 max-w-5lg rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Search Exams</h2>
                        <SearchField
                            type="search"
                            placeholder="any word that exist in the subject code or name and hit the enter key"
                            handleChange={handleSearchChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
                <div>
                    <ExamListTemplate1 data={exams} loading={loading} columns={columns} termMap={termMap} typeMap={typeMap} handleAvailability={handleAvailability} />
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Create Exam"
                    size="max-w-3xl"
                >
                    <ExamCreationForm
                        handleInputChange={handleInputChange}
                        handleReset={handleReset}
                        handleSubmit={handleExamSubmit}
                        formData={formData}
                        subjects={subjects}
                        loading={loading}
                    />
                </Modal>
            </div>
        </div>
    );
}
