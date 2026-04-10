import { useEffect, useState } from "react";
import { useSubject } from "../../Zustand/subjectSlice";
import { useExam } from "../../Zustand/examSlice";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { Submit } from "../ReUsableComponents/input";
import { useQuestion } from "../../Zustand/questionSlice";
import { FileUploader } from "../ReUsableComponents/file";
import { useNotification } from "../../Context/notificationContext";
import { renderQuestionText } from "./questionTextFormatter";

const PreviewModal = ({ isOpen, questions, onClose, onConfirm, isLoading }) => {
    if (!isOpen) return null;

    const getQuestionField = (question, fieldName) =>
        question?.[fieldName] ?? question?.[fieldName.charAt(0).toUpperCase() + fieldName.slice(1)] ?? "";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-auto">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Question Preview</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {questions.length === 0 ? (
                        <p className="text-gray-600 text-center">No questions found in the file.</p>
                    ) : (
                        questions.map((q, idx) => (
                            <div key={idx} className="border rounded-lg p-4 bg-gray-50">
                                <div className="mb-3">
                                    <span className="font-semibold text-sm text-gray-600">Question {idx + 1}</span>
                                </div>

                                {getQuestionField(q, "questionInstruction") && getQuestionField(q, "questionInstruction") !== "_" && getQuestionField(q, "questionInstruction") !== "--" && (
                                    <div className="mb-3">
                                        <p className="text-sm text-gray-600 font-semibold">Instruction:</p>
                                        <p className="text-sm text-gray-700" dangerouslySetInnerHTML={renderQuestionText(getQuestionField(q, "questionInstruction"))} />
                                    </div>
                                )}

                                <div className="mb-3">
                                    <p className="text-sm text-gray-600 font-semibold">Question:</p>
                                    <p className="text-sm text-gray-700 font-medium" dangerouslySetInnerHTML={renderQuestionText(getQuestionField(q, "question"))} />
                                </div>

                                <div className="mb-3">
                                    <p className="text-sm text-gray-600 font-semibold">Options:</p>
                                    <div className="space-y-2 ml-2">
                                        <div>
                                            <span className="font-semibold text-sm">A:</span>
                                            <span className="text-sm ml-2" dangerouslySetInnerHTML={renderQuestionText(getQuestionField(q, "optionA"))} />
                                        </div>
                                        <div>
                                            <span className="font-semibold text-sm">B:</span>
                                            <span className="text-sm ml-2" dangerouslySetInnerHTML={renderQuestionText(getQuestionField(q, "optionB"))} />
                                        </div>
                                        <div>
                                            <span className="font-semibold text-sm">C:</span>
                                            <span className="text-sm ml-2" dangerouslySetInnerHTML={renderQuestionText(getQuestionField(q, "optionC"))} />
                                        </div>
                                        <div>
                                            <span className="font-semibold text-sm">D:</span>
                                            <span className="text-sm ml-2" dangerouslySetInnerHTML={renderQuestionText(getQuestionField(q, "optionD"))} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <p className="text-sm text-gray-600 font-semibold">Correct Answer: <span className="font-bold text-blue-600" dangerouslySetInnerHTML={renderQuestionText(getQuestionField(q, "answer"))} /></p>
                                </div>

                                {getQuestionField(q, "pointPerQuestion") !== "" && getQuestionField(q, "pointPerQuestion") !== null && getQuestionField(q, "pointPerQuestion") !== undefined && (
                                    <div>
                                        <p className="text-sm text-gray-600 font-semibold">Points: <span className="font-bold">{getQuestionField(q, "pointPerQuestion")}</span></p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="flex gap-4 justify-end px-6 py-4 border-t bg-gray-100">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors"
                    >
                        Back & Edit
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                    >
                        {isLoading ? "Uploading..." : "Confirm & Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function BulkQuestionUploadingForm() {
    const { question, uploadBulkQuestion, previewBulkQuestion } = useQuestion();
    const { subject, fetchSubjectCodes } = useSubject();
    const { exam, fetchExamNamesAndId } = useExam();
    const { loading } = question;

    const { showSuccess, showError } = useNotification();

    const [formData, setFormData] = useState({
        examId: "",
        subjectCode: "",
        question: null,
        questionType: 0,
    });

    const [showPreview, setShowPreview] = useState(false);
    const [previewQuestions, setPreviewQuestions] = useState([]);
    const [previewLoading, setPreviewLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        let parsedValue = value;
        if (name === "question") {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: parsedValue
            });
        }
    };

    const handlePreview = async (e) => {
        e.preventDefault();

        if (!formData.examId || !formData.subjectCode || !formData.question) {
            showError("Please fill in all required fields before previewing");
            return;
        }

        setPreviewLoading(true);
        try {
            const res = await previewBulkQuestion(formData);

            if (res.success) {
                setPreviewQuestions(res.questions || []);
                setShowPreview(true);
            } else {
                showError(res.message || "Failed to generate preview");
            }
        } catch (error) {
            showError(error.response?.data?.message || "Error generating preview");
            console.error("Preview error:", error);
        } finally {
            setPreviewLoading(false);
        }
    };

    const handleConfirmUpload = async () => {
        try {
            let res = await uploadBulkQuestion(formData);
            if (res.success) {
                showSuccess(res.message);
                setShowPreview(false);
                handleReset();
            } else {
                showError(res.message);
            }
        } catch (_error) {
            showError(_error);
        }
    };

    useEffect(() => {
        fetchSubjectCodes();
        fetchExamNamesAndId();
    }, []);

    const { subjects } = subject;
    const { exams } = exam;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handlePreview(e);
    };

    const handleReset = async () => {
        setFormData({
            examId: "",
            subjectCode: "",
            question: null,
            questionType: 0,
        });
    };

    const queType = [
        { value: 1, text: 'OBJ' },
        { value: 2, text: 'Theory' },
    ];

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 relative z-0">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                        <Dropdown
                            name="subjectCode"
                            value={formData.subjectCode}
                            handleChange={handleInputChange}
                            width="100%"
                            firstOption="Select subject code"
                            options={subjects}
                            optionKey="id"
                            optionValue="code"
                            optionLabel="code"
                            className="mb-4"
                        />
                    </div>
                <div className="grid grid-cols-1 gap-4">
                        <Dropdown
                            name="examId"
                            value={formData.examId}
                            handleChange={handleInputChange}
                            width="100%"
                            options={exams}
                            optionKey="id"
                            optionValue="id"
                            firstOption="Select Exam"
                            optionLabel="examName"
                            className="mb-4"
                        />
                    </div>
                <div className="grid grid-cols-1 gap-4">
                        <Dropdown
                            name="questionType"
                            value={formData.questionType}
                            handleChange={handleInputChange}
                            width="100%"
                            options={queType}
                            optionKey="value"
                            optionValue="value"
                            firstOption="Select Question type"
                            optionLabel="text"
                            className="mb-4"
                        />
                    </div>
                <div className="grid grid-cols-1 gap-4">
                        <FileUploader
                            name="question"
                            handleChange={handleInputChange}
                            width="100%"
                        />
                    </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <button
                        type="reset"
                        onClick={handleReset}
                        className="w-full md:w-auto px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors duration-200 shadow-sm"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={handlePreview}
                        disabled={previewLoading || loading}
                        className="w-full md:w-auto px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-200 shadow-sm disabled:bg-green-400"
                    >
                        {previewLoading ? "Loading Preview..." : "Preview"}
                    </button>
                    <Submit
                        className="w-full md:w-auto hidden"
                        loading={loading}
                        isNotLoading="Submit"
                        isloading="Please wait..."
                    />
                </div>

                <PreviewModal
                    isOpen={showPreview}
                    questions={previewQuestions}
                    onClose={() => setShowPreview(false)}
                    onConfirm={handleConfirmUpload}
                    isLoading={loading}
                />
            </form>
        </div>
    );
}