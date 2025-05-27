import { InputField, Submit } from "../ReUsableComponents/input";
import { useEffect, useState } from "react";
import { useSubject } from "../../Zustand/subjectSlice";
import { useExam } from "../../Zustand/examSlice";
import { Dropdown } from "../ReUsableComponents/dropDown";
import { TextArea } from "../ReUsableComponents/textArea";
import { useQuestion } from "../../Zustand/questionSlice";
import { useNotification } from "../../Context/notificationContext";

export default function SingleQuestionUploadingForm() {
    const { question, uploadSingleQuestion } = useQuestion();
    const { subject, fetchSubjectCodes } = useSubject();
    const { exam, fetchExamNamesAndId } = useExam();
    const { loading } = question;
    const { showSuccess, showError } = useNotification();

    const [formData, setFormData] = useState({
        examId: "",
        subjectCode: "",
        questionInstruction: "",
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "",
        pointPerQuestion: 0,
        questionType: 0,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value;
        setFormData({
            ...formData,
            [name]: parsedValue
        });
    };

    useEffect(() => {
        fetchSubjectCodes();
        fetchExamNamesAndId();
    }, []);

    const { subjects } = subject;
    const { exams } = exam;

    const queType = [
        { value: 1, text: 'OBJ' },
        { value: 2, text: 'Theory' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await uploadSingleQuestion(formData);
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
            question: "",
            questionInstruction: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            answer: "",
            pointPerQuestion: 0,
            questionType: 0,
        });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 relative z-0">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                    <p className="text-sm text-gray-600 italic">
                        Note: When uploading theory questions, skip the options and answer fields.
                    </p>
                </div>

                {/* Exam and Subject Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        />
                    </div>

                {/* Question Type */}
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

                {/* Question Details */}
                <div className="grid grid-cols-1 gap-4">
                        <TextArea
                            name="question"
                            value={formData.question}
                            handleChange={handleInputChange}
                            rows={3}
                            placeholder="Enter the question..."
                            width="100%"
                        />
                </div>
                <div className="grid grid-cols-1 gap-4">
                        <InputField
                            type="text"
                            name="questionInstruction"
                            value={formData.questionInstruction}
                            placeholder="Question Instruction"
                            handleChange={handleInputChange}
                            width="100%"
                        />
                    </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            type="text"
                            name="optionA"
                            value={formData.optionA}
                            placeholder="Option A"
                            handleChange={handleInputChange}
                            width="100%"
                        />
                        <InputField
                            type="text"
                            name="optionB"
                            value={formData.optionB}
                            placeholder="Option B"
                            handleChange={handleInputChange}
                            width="100%"
                        />
                    </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            type="text"
                            name="optionC"
                            value={formData.optionC}
                            placeholder="Option C"
                            handleChange={handleInputChange}
                            width="100%"
                        />
                        <InputField
                            type="text"
                            name="optionD"
                            value={formData.optionD}
                            placeholder="Option D"
                            handleChange={handleInputChange}
                            width="100%"
                        />
                        </div>

                {/* Answer and Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            type="text"
                            name="answer"
                            value={formData.answer}
                            placeholder="Correct Answer (e.g., Option A)"
                            handleChange={handleInputChange}
                            width="100%"
                        />
                        <InputField
                            type="number"
                            name="pointPerQuestion"
                            value={formData.pointPerQuestion}
                            placeholder="Question Points"
                            handleChange={handleInputChange}
                            width="100%"
                        />
                    </div>

                {/* Buttons */}
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