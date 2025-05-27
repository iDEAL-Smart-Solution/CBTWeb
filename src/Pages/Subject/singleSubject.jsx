import { useSubject } from "../../Zustand/subjectSlice";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleSubjectTemplate from "../../Component/Subject/singleSubjectTemplate";
import { ExamListTemplate1 } from "../../Component/Exam/examListTemplate";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../Context/notificationContext";

export default function SingleSubject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { subject, fetchSingleSubject, deleteSubject, editSubject } = useSubject();
    const { errorMessage, singleSubject, loading, message } = subject;
    const { showSuccess, showError } = useNotification();

    useEffect(() => {
        fetchSingleSubject(id);
    }, [id, fetchSingleSubject]);

    const columns = [
        { key: 'examName', header: 'Name' },
        { key: 'duration', header: 'Duration' },
        { key: 'numberOfQuestionsPerStudent', header: 'No. Of Que Per Stu' },
        { key: 'obtainableScore', header: 'Obtainable Score' },
        { key: 'available', header: 'Available' },
        { key: 'totalQuestion', header: 'Total Question' }
    ];

    const handleDelele = async (id) => {
        try {
            const res = await deleteSubject(id);
            if (res.success) {
                showSuccess(res.message);
                navigate('/subject/list');
            } else {
                showError("Request failed");
            }
        } catch (error) {
            showError(error);
        }
    };

    const handleEdit = async (formData) => {
        try {
            const res = await editSubject(formData);
            if (res.success) {
                fetchSingleSubject(id);
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Subject Details</h1>
             
                <SingleSubjectTemplate
                    loading={loading}
                    singleSubject={singleSubject}
                    message={message}
                    errorMessage={errorMessage}
                    handleDelele={handleDelele}
                    handleEdit={handleEdit}
                />
                <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Examinations</h2>
                    {singleSubject && singleSubject.exams && singleSubject.exams.length > 0 ? (
                        <ExamListTemplate1 data={singleSubject.exams} loading={loading} columns={columns} />
                    ) : (
                        <p className="text-gray-600 text-center py-4">Exam not found!</p>
                    )}
                </div>
            </div>
        </div>
    );
}