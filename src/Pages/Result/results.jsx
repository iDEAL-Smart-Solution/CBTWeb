import { useResult } from "../../Zustand/resultSlice";
import { useEffect, useState } from "react";
import { Dropdown } from "../../Component/ReUsableComponents/dropDown";
import { useSubject } from "../../Zustand/subjectSlice";
import term from "../../lib/termOption";
import { InputField, Submit } from "../../Component/ReUsableComponents/input";
import SubjectResultTemplate from "../../Component/Result/fetchBySubjectTemplate";
import StudentByResultTemplate from "../../Component/Result/fetchByStudentTenplate";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useAuth } from "../../Zustand/auth";
import { useNotification } from "../../Context/notificationContext";

export default function Results() {
    const { result, fetchSubjectResults, fetchStaffSubjectResults, fetchStudentResults } = useResult();
    const { subject, fetchSubjectCodes } = useSubject();
    const { showSuccess, showError } = useNotification();
    const { auth } = useAuth();
    const { user } = auth;

    const role = user?.role;
    const userId = user.id;

    const [activeTab, setActiveTab] = useState('subject'); // 'subject' or 'student'

    const [subjectFormData, setSubjectFormData] = useState({
        subjectCode: 0,
        term: 0,
    });

    const [studentFormData, setStudentFormData] = useState({
        key: "",
        term: 0,
    });

    useEffect(() => {
        fetchSubjectCodes();
    }, []);

    const { subjects } = subject;

    const handleSubjectInputChange = (event) => {
        const { name, value } = event.target;
        setSubjectFormData({
            ...subjectFormData,
            [name]: value
        });
    };

    const handleStudentInputChange = (event) => {
        const { name, value } = event.target;
        setStudentFormData({
            ...studentFormData,
            [name]: value
        });
    };

    const handleSubjectSubmit = async (e) => {
        e.preventDefault();

        try {
            if (role === 1 || role === 4) {
                await fetchSubjectResults(subjectFormData.subjectCode, subjectFormData.term, showError);
            } else if (role === 2) {
                await fetchStaffSubjectResults(subjectFormData.subjectCode, subjectFormData.term, userId, showError);
            }
        } catch (_error) {
            console.log(_error);
        }
    };

    const handleStudentSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetchStudentResults(studentFormData.key, studentFormData.term);
        } catch (_error) {
            console.log(_error);
        }
    };

    const { subjectResults, loading, staffSubjectResult, studentResults } = result;

    const resultsToDisplay = (role === 1 || role === 4) 
        ? subjectResults 
        : (role === 2 ? staffSubjectResult : []);

    const downloadPdf = () => {
        const doc = new jsPDF();

        doc.text(`${subjectFormData.subjectCode}`, 14, 10);
        doc.autoTable({
            head: [
                ['Student UIN', 'Name', 'First CA', 'Second CA', 'Third CA', 'Exam Score', 'Total Score']
            ],
            body: resultsToDisplay.map((result) => [
                result.studentUin,
                result.studentName,
                result.first_CA_Score,
                result.second_CA_Score,
                result.third_CA_Score,
                result.exam_Score,
                result.total_Score,
            ]),
            startY: 20,
        });

        doc.save(`${subjectFormData.subjectCode}.pdf`);
    };

    const hasAccess = role === 1 || role === 4 || role === 2;

    if (!hasAccess) {
        return (
            <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Access Denied</h2>
                    <p className="text-gray-600">Sorry, students are not authorized to view this page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Results</h1>

                {/* Tab Navigation */}
                <div className="bg-white shadow-md rounded-t-lg border-b border-gray-200">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('subject')}
                            className={`flex-1 px-6 py-3 text-sm font-semibold transition-colors duration-200 ${
                                activeTab === 'subject'
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                            By Subject
                        </button>
                        <button
                            onClick={() => setActiveTab('student')}
                            className={`flex-1 px-6 py-3 text-sm font-semibold transition-colors duration-200 ${
                                activeTab === 'student'
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                        >
                            By Student
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'subject' ? (
                    <>
                        <div className="bg-white shadow-lg rounded-b-lg p-6 mb-6">
                            <form onSubmit={handleSubjectSubmit} className="space-y-6">
                                <p className="text-sm text-gray-600 italic mb-4">
                                    Note: To check all terms, select a term and vice versa.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Dropdown
                                        name="subjectCode"
                                        value={subjectFormData.subjectCode}
                                        handleChange={handleSubjectInputChange}
                                        width="100%"
                                        firstOption="Select subject code"
                                        options={subjects}
                                        optionKey="id"
                                        optionValue="code"
                                        optionLabel="code"
                                        className="mb-4"
                                    />
                                    <Dropdown
                                        name="term"
                                        value={subjectFormData.term}
                                        handleChange={handleSubjectInputChange}
                                        options={term}
                                        width="100%"
                                        optionValue="value"
                                        optionLabel="text"
                                        firstOption="Select Term"
                                        className="mb-4"
                                    />
                                    <Submit 
                                        className="w-full md:w-auto mt-4 md:mt-0"
                                        loading={loading} 
                                        isNotLoading="Check Results" 
                                        isloading="Fetching..." 
                                    />
                                </div>
                            </form>
                        </div>
                        {resultsToDisplay && resultsToDisplay.length > 0 && (
                            <div className="flex justify-end mb-6">
                                <button
                                    onClick={downloadPdf}
                                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                                >
                                    Download PDF
                                </button>
                            </div>
                        )}
                        <div className="bg-white shadow-lg rounded-lg">
                            <SubjectResultTemplate data={resultsToDisplay} loading={loading} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white shadow-lg rounded-b-lg p-6 mb-6">
                            <form onSubmit={handleStudentSubmit} className="space-y-6">
                                <p className="text-sm text-gray-600 italic mb-4">
                                    Note: To check all terms, select a term and vice versa.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputField
                                        type="text"
                                        name="key"
                                        value={studentFormData.key}
                                        placeholder="Enter the student UIN"
                                        handleChange={handleStudentInputChange}
                                        width="100%"
                                    />
                                    <Dropdown
                                        name="term"
                                        value={studentFormData.term}
                                        handleChange={handleStudentInputChange}
                                        options={term}
                                        width="100%"
                                        optionValue="value"
                                        optionLabel="text"
                                        firstOption="Select Term"
                                        className="mb-4"
                                    />
                                    <Submit
                                        className="w-full md:w-auto mt-4 md:mt-0"
                                        loading={loading}
                                        isNotLoading="Check Results"
                                        isloading="Fetching..."
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="shadow-lg rounded-lg">
                            <StudentByResultTemplate data={studentResults} loading={loading} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
