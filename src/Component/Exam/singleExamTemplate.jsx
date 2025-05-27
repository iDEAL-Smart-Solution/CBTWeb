import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { InputField } from "../ReUsableComponents/input";

function ModalEdit({ isOpen, onClose, onSubmit, formData, handleInputChange }) {
     if (!isOpen) return null;
 
     return (
         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 px-4">
             <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] flex flex-col">
                 <div className="p-6">
                     <h3 className="text-lg font-semibold text-gray-800 font-sans mb-4">Edit Exam</h3>
                 </div>
                 <div className="flex-1 overflow-y-auto px-6">
                     <form onSubmit={onSubmit} className="space-y-4">
                         <div>
                             <InputField
                                 type="text"
                                 label="New Session"
                                 name="newSession"
                                 placeholder="New Session in the format 2023/2024"
                                 value={formData.newSession}
                                 handleChange={handleInputChange}
                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                             />
                         </div>
                         <div>
                             <InputField
                                 type="number"
                                 label="New Term"
                                 name="newTerm"
                                 placeholder="New Term"
                                 value={formData.newTerm}
                                 handleChange={handleInputChange}
                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                             />
                         </div>
                         <div>
                             <InputField
                                 type="text"
                                 label="New Duration"
                                 name="newDuration"
                                 placeholder="New Duration"
                                 value={formData.newDuration}
                                 handleChange={handleInputChange}
                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                             />
                         </div>
                         <div>
                             <InputField
                                 type="text"
                                 label="Exam Name"
                                 name="name"
                                 placeholder="Exam Name"
                                 value={formData.name}
                                 handleChange={handleInputChange}
                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                             />
                         </div>
                         <div>
                             <InputField
                                 type="number"
                                 label="Exam Type"
                                 name="examType"
                                 placeholder="Exam Type"
                                 value={formData.examType}
                                 handleChange={handleInputChange}
                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                             />
                         </div>
                         <div>
                             <InputField
                                 type="number"
                                 label="Number of Questions per Student"
                                 name="numberOfQuestionsPerStudent"
                                 placeholder="Number of Questions per Student"
                                 value={formData.numberOfQuestionsPerStudent}
                                 handleChange={handleInputChange}
                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                             />
                         </div>
                         <div>
                             <InputField
                                 type="number"
                                 label="Obtainable Score"
                                 name="obtainableScore"
                                 placeholder="Obtainable Score"
                                 value={formData.obtainableScore}
                                 handleChange={handleInputChange}
                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                             />
                         </div>
                     </form>
                 </div>
                 <div className="p-6 flex justify-end gap-4">
                     <button
                         type="button"
                         onClick={onClose}
                         className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors duration-200 font-sans"
                     >
                         Cancel
                     </button>
                     <button
                         type="submit"
                         onClick={onSubmit}
                         className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 font-sans"
                     >
                         Save Changes
                     </button>
                 </div>
             </div>
         </div>
     );
 }
export default function SingleExamTemplate({ loading, data, errorMessage, handleEdit, handleDelele }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        key: '',
        newSession: '',
        newTerm: 0,
        newDuration: '',
        name: '',
        examType: 0,
        numberOfQuestionsPerStudent: 0,
        obtainableScore: 0,
    });

    const handleEditClick = (id) => {
        setFormData({
            key: id,
            newSession: data.session || '',
            newTerm: data.term || 0,
            newDuration: data.duration || '',
            name: data.examName || '',
            examType: data.examType || 0,
            numberOfQuestionsPerStudent: data.numberOfQuestionsPerStudent || 0,
            obtainableScore: data.obtainableScore || 0,
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

    const termMap = {
        1: "1st Term",
        2: "2nd Term",
        3: "3rd Term",
    };

    const typeMap = {
        1: "1st CA",
        2: "2nd CA",
        3: "3rd CA",
        4: "Exam"
    };

    return (
        <div>
            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : !data ? (
                <div className="bg-white shadow-lg rounded-xl p-6 text-center">
                    <p className="text-gray-600 font-sans text-lg">{errorMessage}</p>
                </div>
            ) : (
                <div className="bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-xl p-6 relative border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 font-sans mb-6">{data.examName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Subject Code</span>
                                <span className="font-sans text-gray-900 text-base">{data.subjectCode}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Term</span>
                                <span className="font-sans text-gray-900 text-base">{termMap[data.term]}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Session</span>
                                <span className="font-sans text-gray-900 text-base">{data.session}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Availability</span>
                                <span className="font-sans text-gray-900 text-base">{data.isAvailable ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Type</span>
                                <span className="font-sans text-gray-900 text-base">{typeMap[data.examType]}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Duration</span>
                                <span className="font-sans text-gray-900 text-base">{data.duration}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Questions per Student</span>
                                <span className="font-sans text-gray-900 text-base">{data.numberOfQuestionsPerStudent}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Objective Score</span>
                                <span className="font-sans text-gray-900 text-base">{data.objScore}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Theory Score</span>
                                <span className="font-sans text-gray-900 text-base">{data.theoryScore}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-sans font-medium text-gray-700 text-sm w-40">Obtainable Score</span>
                                <span className="font-sans text-gray-900 text-base">{data.obtainableScore}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <div className="flex space-x-3">
                            <button
                                onClick={() => handleEditClick(data.id)}
                                className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md"
                                aria-label="Edit Exam"
                            >
                                <Pencil className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDelele(data.id)}
                                className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 shadow-md"
                                aria-label="Delete Exam"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ModalEdit
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                formData={formData}
                handleInputChange={handleInputChange}
            />
        </div>
    );
}