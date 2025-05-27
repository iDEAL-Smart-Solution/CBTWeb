import BulkQuestionUploadingForm from "../../Component/Question/bulkQuestionUploadingForm";
import SingleQuestionUploadingForm from "../../Component/Question/singleQuestionUploadingForm";
import { useState } from "react";

export default function QuestionUpload() {
    const [uploadType, setUploadType] = useState('single');

    const handleUploadTypeChange = (event) => {
        setUploadType(event.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Questions</h1>
                <div className="mb-8">
                    <div className="flex justify-center space-x-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="single"
                                checked={uploadType === 'single'}
                                onChange={handleUploadTypeChange}
                                className="hidden"
                            />
                            <span
                                className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                                    uploadType === 'single'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Single Question
                            </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="bulk"
                                checked={uploadType === 'bulk'}
                                onChange={handleUploadTypeChange}
                                className="hidden"
                            />
                            <span
                                className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                                    uploadType === 'bulk'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Bulk Upload
                            </span>
                        </label>
                    </div>
                </div>
                {uploadType === 'single' && <SingleQuestionUploadingForm />}
                {uploadType === 'bulk' && <BulkQuestionUploadingForm />}
            </div>
        </div>
    );
}