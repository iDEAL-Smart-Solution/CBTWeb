import ExamInstructionTemplate from "../../Component/Exam/examInstructionTemplate";
import { useExam } from "../../Zustand/examSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../Zustand/auth";

export default function ExamInstruction() {
    const { exam, fetchExamInstruction } = useExam();
    const { auth } = useAuth();
    const { user } = auth;
    const { instruction } = exam;
    const { id } = useParams();
    const examKey = id;

    useEffect(() => {
        fetchExamInstruction(examKey, user.id);
    }, [examKey, user.id, fetchExamInstruction]); 

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 font-sans text-center mb-6">
                    Exam Instructions
                </h1>
                <div className="bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-xl p-6">
                    <ExamInstructionTemplate data={instruction} />
                </div>
            </div>
        </div>
    );
}