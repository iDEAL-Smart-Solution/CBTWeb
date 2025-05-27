import SingleExamTemplate from "../../Component/Exam/singleExamTemplate";
import { useParams } from 'react-router-dom';
import { useExam } from "../../Zustand/examSlice";
import { useEffect, useState } from "react";
import QuestionCard from "../../Component/Question/questionCardTemplate";
import { useQuestion } from "../../Zustand/questionSlice";
import { useNotification } from "../../Context/notificationContext";
import { useNavigate } from "react-router-dom";

export default function SingleExam() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { exam, fetchSingleExam, deleteExam, editExam } = useExam();
    const { editQuestion, deleteQuestion, uploadImageForQuestion } = useQuestion();
    const { loading, errorMessage, singleExam } = exam;
    const { showSuccess, showError } = useNotification();
    const [showObjQuestions, setShowObjQuestions] = useState(true);

    useEffect(() => {
        fetchSingleExam(id);
    }, [id, fetchSingleExam]);

    const handleQuestionDelele = async (iden) => {
        try {
            let res = await deleteQuestion(iden);
            if (res.success) {
                fetchSingleExam(id);
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (error) {
            showError(error);
        }
    };

    const handleQuestionEdit = async (formData) => {
        try {
            let res = await editQuestion(formData);
            if (res.success) {
                fetchSingleExam(id);
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (error) {
            showError(error);
        }
    };

    const handleExamEdit = async (formData) => {
        try {
            let res = await editExam(formData);
            if (res.success) {
                fetchSingleExam(id);
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (error) {
            showError(error);
        }
    };

    const handleExamDelete = async (id) => {
        try {
            let res = await deleteExam(id);
            if (res.success) {
                showSuccess(res.message);
                navigate('/exam/list');
            } else {
                showError("request failed");
            }
        } catch (error) {
            showError(error);
        }
    };

    const handleUploadImageForQuestion = async (formData) => {
        try {
            let res = await uploadImageForQuestion(formData);
            if (res.success) {
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (error) {
            showError(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 font-sans mb-6">
                    Exam Details
                </h1>
             
                <SingleExamTemplate
                    data={singleExam}
                    loading={loading}
                    errorMessage={errorMessage}
                    handleDelele={handleExamDelete}
                    handleEdit={handleExamEdit}
                />
                <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 font-sans">
                            Questions
                        </h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowObjQuestions(true)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                                    showObjQuestions
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Objective Questions
                            </button>
                            <button
                                onClick={() => setShowObjQuestions(false)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                                    !showObjQuestions
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Theory Questions
                            </button>
                        </div>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : showObjQuestions ? (
                        singleExam?.objQuestions && singleExam.objQuestions.length > 0 ? (
                            <div className="space-y-4">
                                {singleExam.objQuestions.map((question, index) => (
                                    <QuestionCard
                                        data={question}
                                        loading={loading}
                                        index={index}
                                        key={`obj-${index}`}
                                        handleDelele={handleQuestionDelele}
                                        handleEdit={handleQuestionEdit}
                                        handleUpload={handleUploadImageForQuestion}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center py-4 font-sans text-lg">
                                Objective Questions not Found
                            </p>
                        )
                    ) : singleExam?.theoryQuestions && singleExam.theoryQuestions.length > 0 ? (
                        <div className="space-y-4">
                            {singleExam.theoryQuestions.map((question, index) => (
                                <QuestionCard
                                    data={question}
                                    loading={loading}
                                    index={index}
                                    key={`theory-${index}`}
                                    handleDelele={handleQuestionDelele}
                                    handleEdit={handleQuestionEdit}
                                    handleUpload={handleUploadImageForQuestion}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center py-4 font-sans text-lg">
                            Theory Questions not Found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}