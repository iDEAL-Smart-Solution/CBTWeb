import { useResult } from "../../Zustand/resultSlice";
import { useEffect, useState } from "react";
import { Dropdown } from "../../Component/ReUsableComponents/dropDown";
import { useSubject } from "../../Zustand/subjectSlice";
import term from "../../lib/termOption";
import { Submit } from "../../Component/ReUsableComponents/input";
import SubjectResultTemplate from "../../Component/Result/fetchBySubjectTemplate";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useAuth } from "../../Zustand/auth";
import { useNotification } from "../../Context/notificationContext";

export default function SubjectResult() {
    const { result, fetchSubjectResults, fetchStaffSubjectResults } = useResult();
    const { subject, fetchSubjectCodes } = useSubject();
    const { showSuccess, showError } = useNotification();
    const { auth } = useAuth();
    const { user } = auth;

    const role = user?.role;
    const userId = user.id;

    useEffect(() => {
        fetchSubjectCodes();
    }, []);

    const { subjects } = subject;

    const [formData, setFormData] = useState({
        subjectCode: 0,
        term: 0,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value;
        setFormData({
            ...formData,
            [name]: parsedValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (role === 1 || role === 4) {
                await fetchSubjectResults(formData.subjectCode, formData.term, showError);
            } else if (role === 2) {
                await fetchStaffSubjectResults(formData.subjectCode, formData.term, userId, showError);
            }
        } catch (_error) {
            console.log(_error);
        }
    };

    const { subjectResults, loading, staffSubjectResult } = result;

    const resultsToDisplay = (role === 1 || role === 4) 
        ? subjectResults 
        : (role === 2 ? staffSubjectResult : []);

    const downloadPdf = () => {
        const doc = new jsPDF();

        doc.text(`${formData.subjectCode}`, 14, 10);
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

        doc.save(`${formData.subjectCode}.pdf`);
    };

    const hasAccess = role === 1 || 
                     role === 4 || 
                     role === 2;

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
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Subject Results</h1>
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <p className="text-sm text-gray-600 italic mb-4">
                            Note: To check all terms, select a term and vice versa.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Dropdown
                                name="subjectCode"
                                value={formData.subjectCode}
                                handleChange={handleInputChange}
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
                                value={formData.term}
                                handleChange={handleInputChange}
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
            </div>
        </div>
    );
}