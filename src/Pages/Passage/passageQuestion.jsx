import { useExam } from "../../Zustand/examSlice";
import { useState, useEffect } from "react";
import { useNotification } from "../../Context/notificationContext";
import Passage from "../../Zustand/passageSlice";
import PassageQuestionForm from "../../Component/Passage/passageQuestionForm";

export default function PassageQuestion() {
    const { exam, fetchExamNamesAndId } = useExam();
    const { passageTitleAndIds, loading, uploadPassageQuestions, fetchPassageTitleAndId } = Passage();
    const { showSuccess, showError } = useNotification();

    const [formData, setFormData] = useState({
        examId: "",
        passageId: "",
        question: null,
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
        fetchExamNamesAndId();
        fetchPassageTitleAndId();
    }, []);

    const { exams } = exam;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            let res = await uploadPassageQuestions(formData);
            if (res.success) {
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (_error) {
            console.log(_error);
        }
    };

    const handleReset = async () => {
        setFormData({
            examId: "",
            passageId: "",
            question: null,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Passage Questions</h1>
                <PassageQuestionForm
                    handleInputChange={handleInputChange}
                    handleReset={handleReset}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    passageTitlesAndIds={passageTitleAndIds}
                    exams={exams}
                    loading={loading}
                />
            </div>
        </div>
    );
}