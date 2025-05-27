import PassageUpload from "./passageUpload";
import PassageQuestion from "./passageQuestion";
import { useState } from "react";

export default function Passage() {
    const [uploadType, setUploadType] = useState('passage');

    const handleUploadTypeChange = (event) => {
        setUploadType(event.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Passage Upload</h1>
                <div className="mb-8">
                    <div className="flex justify-center space-x-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="passage"
                                checked={uploadType === 'passage'}
                                onChange={handleUploadTypeChange}
                                className="hidden"
                            />
                            <span
                                className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                                    uploadType === 'passage'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Upload Passage
                            </span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="passage-question"
                                checked={uploadType === 'passage-question'}
                                onChange={handleUploadTypeChange}
                                className="hidden"
                            />
                            <span
                                className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                                    uploadType === 'passage-question'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Upload Passage Questions
                            </span>
                        </label>
                    </div>
                </div>
                {uploadType === 'passage' && <PassageUpload />}
                {uploadType === 'passage-question' && <PassageQuestion />}
            </div>
        </div>
    );
}