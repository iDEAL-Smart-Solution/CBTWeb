import { useEffect, useState } from "react";
import { useSubject } from "../../Zustand/subjectSlice";
import { useExam } from "../../Zustand/examSlice";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { Submit } from "../ReUsableComponents/input";
import { useQuestion } from "../../Zustand/questionSlice";
import { FileUploader } from "../ReUsableComponents/file";
import { useNotification } from "../../Context/notificationContext";

export default function BulkQuestionUploadingForm() {
    const { question, uploadBulkQuestion } = useQuestion();
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

    useEffect(() => {
        fetchSubjectCodes();
        fetchExamNamesAndId();
    }, []);

    const { subjects } = subject;
    const { exams } = exam;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await uploadBulkQuestion(formData);
            if (res.success) {
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (_error) {
            showError(_error);
        }
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
                    <Submit
                        className="w-full md:w-auto"
                        loading={loading}
                        isNotLoading="Submit"
                        isloading="Please wait..."
                    />
                </div>
            </form>
        </div>
    );
}