import ExamCreationForm from "../../Component/Exam/examCreationForm";
import { useExam } from "../../Zustand/examSlice";
import { useState, useEffect } from "react";
import { useSubject } from "../../Zustand/subjectSlice";
import { useNotification } from "../../Context/notificationContext";

export default function ExamCreation() {
    const { exam, createExam } = useExam();
    const { subject, fetchSubjectsLight } = useSubject();
    const { loading } = exam;
    const { showSuccess, showError } = useNotification();

    const [formData, setFormData] = useState({
        subjectCode: "",
        examType: 0,
        examName: "",
        NumberOfQuestionsPerStudent: 0,
        NumberOfPassageQuestionsPerStudent: 0,
        durationHours: 0,
        durationMinutes: 0,
        obtainableScore: 0,
        oBJScore: 0,
        theoryScore: 0,
        HasPassage: false,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const parsedValue = name === "HasPassage" ? value === "true" : value;
        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            let res = await fetchSubjectsLight();
            if (!res.success) {
                showError(res.message); 
            }
        };

        fetchData();
    }, []); 

    const { subjects } = subject;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const duration = `${String(formData.durationHours).padStart(2, '0')}:${String(formData.durationMinutes).padStart(2, '0')}:00`;

        const dataToSubmit = {
            ...formData,
            duration
        };

        try {
            let res = await createExam(dataToSubmit);
            if (res.success) {
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (_error) {
            console.log(_error);
        }
    };

    const handleReset = () => {
        setFormData({
            subjectCode: "",
            examType: 0,
            examName: "",
            NumberOfQuestionsPerStudent: 0,
            NumberOfPassageQuestionsPerStudent: 0,
            durationHours: 0,
            durationMinutes: 0,
            obtainableScore: 0,
            oBJScore: 0,
            theoryScore: 0,
            HasPassage: false,
        });
    };

    return (
        <div>
            <h1 className="text-center color-primary" style={{ marginBottom: "8%" }}>Exam</h1>
            <ExamCreationForm 
                handleInputChange={handleInputChange} 
                handleReset={handleReset} 
                handleSubmit={handleSubmit} 
                formData={formData} 
                subjects={subjects} 
                loading={loading} 
            />
        </div>
    );
}
