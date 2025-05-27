import { Pencil, Trash2, Upload } from "lucide-react";
import { InputField } from "../ReUsableComponents/input";
import { useState, useRef } from "react";
import { BASE_URL } from "../../Constant";

function ModalEdit({ isOpen, onClose, onSubmit, formData, handleInputChange }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-800 font-sans mb-4">
                    Edit Question
                </h3>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <InputField
                            type="text"
                            label="Question"
                            name="question"
                            placeholder="Question"
                            value={formData.question}
                            handleChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                        />
                    </div>
                    <div>
                        <InputField
                            type="text"
                            label="Question Instruction"
                            name="questionInstruction"
                            placeholder="Question Instruction"
                            value={formData.questionInstruction}
                            handleChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                        />
                    </div>
                    <div>
                        <InputField
                            type="text"
                            label="Option A"
                            name="optionA"
                            placeholder="Option A"
                            value={formData.optionA}
                            handleChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                        />
                    </div>
                    <div>
                        <InputField
                            type="text"
                            label="Option B"
                            name="optionB"
                            placeholder="Option B"
                            value={formData.optionB}
                            handleChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                        />
                    </div>
                    <div>
                        <InputField
                            type="text"
                            label="Option C"
                            name="optionC"
                            placeholder="Option C"
                            value={formData.optionC}
                            handleChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                        />
                    </div>
                    <div>
                        <InputField
                            type="text"
                            label="Option D"
                            name="optionD"
                            placeholder="Option D"
                            value={formData.optionD}
                            handleChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                        />
                    </div>
                    <div>
                        <InputField
                            type="text"
                            label="Answer"
                            name="answer"
                            placeholder="Answer"
                            value={formData.answer}
                            handleChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors duration-200 font-sans"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 font-sans"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function QuestionCard({ data, index, loading, handleDelele, handleEdit, handleUpload }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        questionInstruction: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: '',
        id: '',
    });
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null);

    const handleEditClick = (id) => {
        setFormData({
            question: data.question || '',
            questionInstruction: data.questionInstruction || '',
            optionA: data.optionA || '',
            optionB: data.optionB || '',
            optionC: data.optionC || '',
            optionD: data.optionD || '',
            answer: data.answer || '',
            id: data.questionId || '',
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const uploadData = new FormData();
            uploadData.append("questionImage", file);
            uploadData.append("questionId", data.questionId);
            handleUpload(uploadData);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-xl">
            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-100 transition-colors duration-200"
                    >
                        <span className="font-sans font-semibold text-gray-800 text-lg">
                            {index + 1}. {data.question}
                        </span>
                        <svg
                            className={`w-6 h-6 transform transition-transform duration-300 ${
                                isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {isOpen && (
                        <div className="p-4 border-t border-gray-200">
                            {data.questionInstruction?.trim() && (
                                <p className="font-sans text-gray-700 italic mb-3">
                                    <span className="font-medium">Instruction:</span> {data.questionInstruction}
                                </p>
                            )}
                            {data.questionImage && (
                                <img
                                    src={`${BASE_URL}/ProfilePictures/${data.questionImage}`}
                                    alt="Question Image"
                                    className="w-full max-w-xs rounded-lg shadow-md mb-3"
                                    onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
                                />
                            )}
                            <div className="space-y-2 mb-3">
                                {data.optionA?.trim() && (
                                    <p className="font-sans text-gray-900">
                                        <span className="font-medium">A.</span> {data.optionA}
                                    </p>
                                )}
                                {data.optionB?.trim() && (
                                    <p className="font-sans text-gray-900">
                                        <span className="font-medium">B.</span> {data.optionB}
                                    </p>
                                )}
                                {data.optionC?.trim() && (
                                    <p className="font-sans text-gray-900">
                                        <span className="font-medium">C.</span> {data.optionC}
                                    </p>
                                )}
                                {data.optionD?.trim() && (
                                    <p className="font-sans text-gray-900">
                                        <span className="font-medium">D.</span> {data.optionD}
                                    </p>
                                )}
                            </div>
                            <p className="font-sans text-gray-900">
                                <span className="font-medium">Question Point:</span> {data.pointPerQuestion}
                            </p>
                            {data.answer?.trim() && (
                                <p className="font-sans text-green-600">
                                    <span className="font-medium">Correct Answer:</span> {data.answer}
                                </p>
                            )}
                            <div className="flex space-x-3 mt-4">
                                <button
                                    onClick={() => handleEditClick(data.questionId)}
                                    className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 shadow-md"
                                    aria-label="Edit Question"
                                >
                                    <Pencil className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelele(data.questionId)}
                                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 shadow-md"
                                    aria-label="Delete Question"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={triggerFileInput}
                                    className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 shadow-md"
                                    aria-label="Upload Image"
                                >
                                    <Upload className="w-5 h-5" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    )}
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