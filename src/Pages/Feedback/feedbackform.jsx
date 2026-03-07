import Feedbacktemplate from "../../Component/Feedback/feedbacktemplate";
import { SCHOOL_NAME } from "../../Constant";
import { useNotification } from "../../Context/notificationContext";
import Feedback from "../../Zustand/feedbackSlice";
import { useState } from "react";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react";

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
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Get In Touch</h1>
                <p className="text-gray-600 mb-8">We're here to help. Send us feedback or contact us directly for urgent matters.</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Contact Cards */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Emergency Contact Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <Phone className="w-6 h-6 mr-2" />
                                <h2 className="text-xl font-bold">Urgent Support</h2>
                            </div>
                            <p className="text-blue-100 text-sm mb-4">
                                Need immediate assistance? Call our support team directly.
                            </p>
                            <div className="space-y-3">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors">
                                    <p className="text-xs text-blue-100 mb-1">Support Lead</p>
                                    <p className="font-semibold">Sherifdeen</p>
                                    <a 
                                        href="tel:+2348042965634" 
                                        className="text-sm flex items-center mt-1 hover:underline"
                                    >
                                        <Phone className="w-3 h-3 mr-1" />
                                        +234 804 296 5634
                                    </a>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors">
                                    <p className="text-xs text-blue-100 mb-1">Technical Director</p>
                                    <p className="font-semibold">Bigboss</p>
                                    <a 
                                        href="tel:+2348155850462" 
                                        className="text-sm flex items-center mt-1 hover:underline"
                                    >
                                        <Phone className="w-3 h-3 mr-1" />
                                        +234 815 585 0462
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours Card */}
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                                <h3 className="text-lg font-bold text-gray-800">Business Hours</h3>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span className="font-semibold">8:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span className="font-semibold text-red-600">Closed</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Info Card */}
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6">
                            <div className="flex items-center mb-3">
                                <MessageCircle className="w-5 h-5 mr-2 text-green-600" />
                                <h3 className="text-lg font-bold text-gray-800">Response Time</h3>
                            </div>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold text-green-600">Phone calls:</span> Immediate response during business hours
                            </p>
                            <p className="text-sm text-gray-700 mt-2">
                                <span className="font-semibold text-blue-600">Feedback form:</span> Response within 24-48 hours
                            </p>
                        </div>
                    </div>

                    {/* Feedback Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <div className="flex items-center mb-4">
                                <Mail className="w-6 h-6 mr-2 text-blue-600" />
                                <h2 className="text-2xl font-bold text-gray-800">Send Us Feedback</h2>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Fill out the form below to submit any complaints, suggestions, or feedback. We value your input!
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
            </div>
        </div>
    );
}