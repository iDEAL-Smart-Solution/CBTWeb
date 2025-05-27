import Feedbacktemplate from "../../Component/Feedback/feedbacktemplate";
import { SCHOOL_NAME } from "../../Constant";
import { useNotification } from "../../Context/notificationContext";
import Feedback from "../../Zustand/feedbackSlice";
import { useState } from "react";

export default function FeedbackForm() {
    const { sendfeedback, feedback } = Feedback();
    const { loading } = feedback;
    const [formData, setFormData] = useState({
        SCHOOL_NAME,
        email: "",
        header: "",
        message: "",
        file: 0,
        productName: "CBTSofware",
    });
    const { showSuccess, showError } = useNotification();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value;
        setFormData({
            ...formData,
            [name]: parsedValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await sendfeedback(formData);
            if (res.success) {
                showSuccess(res.message);
                handleReset();
            } else {
                showError(res.message);
                handleReset();
            }
        } catch (_error) {
            showError(_error);
        }
        console.log(formData);
    };

    const handleReset = () => {
        setFormData({
            SCHOOL_NAME,
            email: "",
            header: "",
            message: "",
            file: 0,
            productName: "CBTSofware",
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Feedback Form</h1>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <p className="text-lg text-gray-700 mb-4">
                        Kindly fill in the form below to submit any type of complaint or feedback you have.
                    </p>
                    <Feedbacktemplate
                        handleInputChange={handleInputChange}
                        formData={formData}
                        handleReset={handleReset}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}