import SingleExamTemplate from "../../Component/Exam/singleExamTemplate";
import { useParams } from 'react-router-dom';
import { useExam } from "../../Zustand/examSlice";
import { useEffect, useState } from "react";
import QuestionCard from "../../Component/Question/questionCardTemplate";
import { useQuestion } from "../../Zustand/questionSlice";
import { useNotification } from "../../Context/notificationContext";
import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';

export default function SingleExam() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { exam, fetchSingleExam, deleteExam, editExam } = useExam();
    const { editQuestion, deleteQuestion, uploadImageForQuestion } = useQuestion();
    const { loading, errorMessage, singleExam } = exam;
    const { showSuccess, showError } = useNotification();
    const [showObjQuestions, setShowObjQuestions] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 10;

    useEffect(() => {
        fetchSingleExam(id);
    }, [id, fetchSingleExam]);

    useEffect(() => {
        setCurrentPage(1);
        setSearchQuery('');
    }, [showObjQuestions]);

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

    // Filter and paginate questions
    const getFilteredQuestions = () => {
        const questions = showObjQuestions ? singleExam?.objQuestions : singleExam?.theoryQuestions;
        if (!questions) return [];
        
        if (!searchQuery.trim()) return questions;
        
        return questions.filter(q => 
            q.question?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredQuestions = getFilteredQuestions();
    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
    const paginatedQuestions = filteredQuestions.slice(
        (currentPage - 1) * questionsPerPage,
        currentPage * questionsPerPage
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
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

                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search questions..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {searchQuery && (
                            <p className="text-sm text-gray-600 mt-2">
                                Found {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : paginatedQuestions.length > 0 ? (
                        <>
                            <div className="space-y-4">
                                {paginatedQuestions.map((question, index) => (
                                    <QuestionCard
                                        data={question}
                                        loading={loading}
                                        index={(currentPage - 1) * questionsPerPage + index}
                                        key={`${showObjQuestions ? 'obj' : 'theory'}-${index}`}
                                        handleDelele={handleQuestionDelele}
                                        handleEdit={handleQuestionEdit}
                                        handleUpload={handleUploadImageForQuestion}
                                    />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-6">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        Previous
                                    </button>
                                    
                                    <div className="flex gap-1">
                                        {[...Array(totalPages)].map((_, i) => {
                                            const page = i + 1;
                                            if (
                                                page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 1 && page <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                                                            currentPage === page
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            } else if (
                                                (page === currentPage - 2 && page > 1) ||
                                                (page === currentPage + 2 && page < totalPages)
                                            ) {
                                                return <span key={page} className="px-2">...</span>;
                                            }
                                            return null;
                                        })}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}

                            {/* Results info */}
                            <p className="text-sm text-gray-600 text-center mt-4">
                                Showing {(currentPage - 1) * questionsPerPage + 1} to{' '}
                                {Math.min(currentPage * questionsPerPage, filteredQuestions.length)} of{' '}
                                {filteredQuestions.length} questions
                            </p>
                        </>
                    ) : (
                        <p className="text-gray-600 text-center py-4 font-sans text-lg">
                            {searchQuery 
                                ? 'No questions found matching your search'
                                : `${showObjQuestions ? 'Objective' : 'Theory'} Questions not Found`
                            }
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}