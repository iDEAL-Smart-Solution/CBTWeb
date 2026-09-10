import { useSubject } from "../../Zustand/subjectSlice";
import { useClass } from "../../Zustand/classSlice";
import { useStaff } from "../../Zustand/staffSlice";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleSubjectTemplate from "../../Component/Subject/singleSubjectTemplate";
import { ExamListTemplate1 } from "../../Component/Exam/examListTemplate";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../Context/notificationContext";
import { useAuth } from "../../Zustand/auth";

export default function SingleSubject() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { user } = auth;
    const isSuperAdmin = user?.role === 1;
    const { subject, fetchSingleSubject, deleteSubject, editSubject, updateSubjectStaff } = useSubject();
    const { schClass, fetchClassList } = useClass();
    const { staff, fetchAllStaffsUsername } = useStaff();
    const { errorMessage, singleSubject, loading, message } = subject;
    const { allschClass } = schClass;
    const { staffsUsernames } = staff;
    const { showSuccess, showError } = useNotification();

    useEffect(() => {
        fetchSingleSubject(id);
        fetchClassList();
        fetchAllStaffsUsername();
    }, [id, fetchSingleSubject, fetchClassList, fetchAllStaffsUsername]);

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
            showError(error.message || "An error occurred");
        }
    };

    const handleStaffUpdate = async (formData) => {
        if (!isSuperAdmin) {
            showError("Only superadmins can update subject staff");
            return;
        }
        try {
            const res = await updateSubjectStaff(formData.subjectId, formData.staffId);
            if (res.success) {
                fetchSingleSubject(id);
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (error) {
            console.log(error);
            showError(error.message || "An error occurred");
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
                    handleStaffUpdate={handleStaffUpdate}
                    classList={allschClass}
                    staffList={staffsUsernames}
                    isSuperAdmin={isSuperAdmin}
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