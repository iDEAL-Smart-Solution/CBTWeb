import MyExamsTemplate from "../../Component/Exam/myExamsTemplate";
import { useAuth } from '../../Zustand/auth';
import { useExam } from "../../Zustand/examSlice";
import { useEffect } from "react";
import { useDoExam } from "../../Zustand/doExamSlice";

export default function MyExams() {
    const { auth } = useAuth();
    const { message } = useDoExam();
    const { exam, fetchMyExams } = useExam();
    const { user, academicSession } = auth;
    const id = user?.id;
    const { current_Session, current_Term } = academicSession;

    const termMap = {
        1: "First Term",
        2: "Second Term",
        3: "Third Term",
    };

    useEffect(() => {
        fetchMyExams(id);
    }, [id, fetchMyExams]); 

    const { exams, loading } = exam || {};

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
                    {termMap[current_Term]} Examination - {current_Session} Academic Session
                </h1>
                <p className="text-lg text-gray-600 text-center mb-6">
                    Click on a subject card below to start your exam.
                </p>
                {message && (
                    <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 text-center">
                        {message}
                    </div>
                )}
                <div className="bg-white shadow-lg rounded-lg p-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : !exams || exams.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">
                            You have no exam availability for you to do.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {exams.map((exam, index) => (
                                <div
                                    key={exam.examId}
                                    className="bg-blue-50 p-4 rounded-lg shadow-md hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                                >
                                    <MyExamsTemplate
                                        name={exam.examName}
                                        id={exam.examId}
                                        index={index}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}