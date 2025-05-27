import { useEffect, useState } from "react";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useExam } from "../../Zustand/examSlice";
import { ExamListTemplate1 } from "../../Component/Exam/examListTemplate";
import { useNotification } from "../../Context/notificationContext";


export default function ExamList() {
    const { exam, fetchExams, flipAvailability, filterList } = useExam();
    const { exams, loading } = exam;

    const { showError, showSuccess } = useNotification();

    useEffect(() => {
        fetchExams();
    }, [fetchExams]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
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

        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Examination(s) List</h1>
                <div className="mb-6">
                    <div className="w-full bg-white p-6 max-w-5lg rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Search Exams</h2>
                        <SearchField
                            type="search"
                            placeholder="any word that exist in the subject code or name and hit the enter key"
                            handleChange={handleInputChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
                <div>
                    <ExamListTemplate1 data={exams} loading={loading} columns={columns} termMap={termMap} typeMap={typeMap} handleAvailability={handleAvailability} />
                </div>
            </div>
        </div>
    );
}
