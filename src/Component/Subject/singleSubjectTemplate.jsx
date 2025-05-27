import React, { useState } from 'react';
import { Pencil, Trash2 } from "lucide-react";

function Modal({ isOpen, onClose, onSubmit, formData, handleInputChange }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Edit Subject</h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700 mb-1">
                            Subject Name
                        </label>
                        <input
                            type="text"
                            id="subjectName"
                            name="subjectName"
                            value={formData.subjectName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="subjectCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Subject Code
                        </label>
                        <input
                            type="text"
                            id="subjectCode"
                            name="subjectCode"
                            value={formData.subjectCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="subjectClass" className="block text-sm font-medium text-gray-700 mb-1">
                            Subject Class
                        </label>
                        <input
                            type="text"
                            id="subjectClass"
                            name="subjectClass"
                            value={formData.subjectClass}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default function SingleSubjectTemplate({ loading, singleSubject, errorMessage, handleDelele, handleEdit, message }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        subjectName: '',
        subjectCode: '',
        subjectClass: '',
        id: '',
    });

    const handleEditClick = (id) => {
        setFormData({
            subjectName: singleSubject.name || '',
            subjectCode: singleSubject.code || '',
            subjectClass: singleSubject.className || '',
            id: id,
        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleEdit(formData);
        setIsModalOpen(false);
    };

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : !singleSubject ? (
                <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                    <p className="text-gray-600 font-sans text-lg">{errorMessage}</p>
                </div>
            ) : (
                <div className="bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-xl p-6 relative border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 font-sans mb-6">{singleSubject.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Code</span>
                                <span className="font-sans text-gray-900 text-base">{singleSubject.code}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Description</span>
                                <span className="font-sans text-gray-900 text-base">{singleSubject.description}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Class</span>
                                <span className="font-sans text-gray-900 text-base">{singleSubject.className}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Tutor</span>
                                <span className="font-sans text-gray-900 text-base">{singleSubject.staffName}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Exam Aggregate</span>
                                <span className="font-sans text-gray-900 text-base">{singleSubject.totalExamScore}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Test Aggregate</span>
                                <span className="font-sans text-gray-900 text-base">{singleSubject.totalTestScore}</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-3">
                        <button
                            onClick={() => handleEditClick(singleSubject.id)}
                            className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md"
                            aria-label="Edit Subject"
                        >
                            <Pencil className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => handleDelele(singleSubject.id)}
                            className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 shadow-md"
                            aria-label="Delete Subject"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                formData={formData}
                handleInputChange={handleInputChange}
            />
        </div>
    );
}