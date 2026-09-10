import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSchoolStore from "../../Zustand/schoolSlice";

export default function SchoolProfileScreen() {
    const { loading, schoolDetails, error, fetchSchoolDetails, updateSubscription, generateUpdateToken } = useSchoolStore();
    const { id } = useParams();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tokenRecipientEmail, setTokenRecipientEmail] = useState("");
    const [formData, setFormData] = useState({
        id: "",
        allowedStudentCount: "",
        amountPaid: "",
        createdAt: "",
        token: "",
        subscriptionType: "",
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (id) fetchSchoolDetails(id);
    }, [fetchSchoolDetails, id]);

    const openModal = () => {
        if (schoolDetails?.schoolSubscription) {
            const createdAt = new Date(schoolDetails.schoolSubscription.createdAt);
            setFormData({
                id: schoolDetails.schoolSubscription.id,
                allowedStudentCount: schoolDetails.schoolSubscription.allowedStudentCount.toString(),
                amountPaid: schoolDetails.schoolSubscription.amountPaid.toString(),
                createdAt: createdAt.toISOString().split("T")[0], 
                subscriptionType: schoolDetails.schoolSubscription.subscriptionType?.toString() || "",
            });
            setErrors({});
            setSuccessMessage("");
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ id: "", allowedStudentCount: "", amountPaid: "", createdAt: "", token: "", subscriptionType: "" });
        setErrors({});
        setSuccessMessage("");
    };

    const handleGenerateToken = async () => {
        if (!tokenRecipientEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tokenRecipientEmail)) {
            setErrors((prev) => ({ ...prev, tokenRecipientEmail: "Enter a valid email address to receive the token." }));
            return;
        }
        setErrors((prev) => ({ ...prev, tokenRecipientEmail: "" }));
        try {
            const response = await generateUpdateToken(schoolDetails.schoolName, tokenRecipientEmail);
            if (response.success) {
                setSuccessMessage(response.message);
            } else {
                setErrors((prev) => ({ ...prev, general: response.message }));
            }
        } catch (error) {
            setErrors((prev) => ({ ...prev, general: "Error generating token. Please try again." }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.allowedStudentCount || isNaN(formData.allowedStudentCount) || Number(formData.allowedStudentCount) <= 0) {
            newErrors.allowedStudentCount = "Allowed student count must be a positive number";
        }
        if (!formData.amountPaid || isNaN(formData.amountPaid) || Number(formData.amountPaid) < 0) {
            newErrors.amountPaid = "Amount paid must be a non-negative number";
        }
        if (!formData.createdAt) {
            newErrors.createdAt = "Created date is required";
        } else {
            const selectedDate = new Date(formData.createdAt);
            const today = new Date(); 
            if (selectedDate > today) {
                newErrors.createdAt = "Created date cannot be in the future";
            }
        }
        if (!formData.token || formData.token.trim() === "") {
            newErrors.token = "Token is required";
        }
        if (!formData.subscriptionType) {
            newErrors.subscriptionType = "Subscription type is required";
        }
        return newErrors;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const subscriptionData = {
                id: formData.id,
                allowedStudentCount: Number(formData.allowedStudentCount),
                amountPaid: Number(formData.amountPaid),
                createdAt: new Date(formData.createdAt).toISOString(),
                token: formData.token,
                subscriptionType: Number(formData.subscriptionType),
            };
            const response = await updateSubscription(subscriptionData);

            if (response.success) {
                setSuccessMessage(response.message);
                closeModal();
                fetchSchoolDetails(id); // Refetch to sync with server
            } else {
                setErrors({ general: response.message });
            }
        } catch (error) {
            setErrors({ general: "Unexpected error occurred. Please try again." });
        }
    };

    const formatNaira = (amount) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <p className="text-xl text-red-600">{error}</p>
            </div>
        );
    }

    if (!schoolDetails) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
                <p className="text-xl text-gray-700">No school details available</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                    {schoolDetails.schoolName}
                </h1>
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md mb-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                        {schoolDetails.schoolLogoFilePath && (
                            <div className="flex-shrink-0">
                                <img
                                    src={schoolDetails.schoolLogoFilePath}
                                    alt={`${schoolDetails.schoolName} Logo`}
                                    className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full mx-auto"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                                School Details
                            </h2>
                            <div className="space-y-3">
                                <p className="text-base text-gray-700">
                                    <span className="font-medium">Address:</span> {schoolDetails.address}
                                </p>
                                <p className="text-base text-gray-700">
                                    <span className="font-medium">Phone:</span> {schoolDetails.phoneNumber}
                                </p>
                                <p className="text-base text-gray-700">
                                    <span className="font-medium">Email:</span> {schoolDetails.email}
                                </p>
                                <p className="text-base text-gray-700">
                                    <span className="font-medium">Plan Type:</span> {schoolDetails.planType}
                                </p>
                                <p className="text-base text-gray-700">
                                    <span className="font-medium">Subscription Status:</span>{" "}
                                    <span className={`inline-block px-2 py-1 rounded-full text-sm ${schoolDetails.isSubscrptionActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {schoolDetails.isSubscrptionActive ? 'Active' : 'Inactive'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                            Subscription Details
                        </h2>
                        {schoolDetails.schoolSubscription && (
                            <svg
                                onClick={openModal}
                                className="w-5 h-5 text-blue-600 hover:text-blue-700 cursor-pointer"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                title="Edit Subscription"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        )}
                    </div>
                    {schoolDetails.schoolSubscription ? (
                        <div className="space-y-3">
                            <p className="text-base text-gray-700">
                                <span className="font-medium">Subscription ID:</span> {schoolDetails.schoolSubscription.id}
                            </p>
                            <p className="text-base text-gray-700">
                                <span className="font-medium">Allowed Students:</span> {schoolDetails.schoolSubscription.allowedStudentCount}
                            </p>
                            <p className="text-base text-gray-700">
                                <span className="font-medium">Registered Students:</span> {schoolDetails.schoolSubscription.registeredStudentCount}
                            </p>
                            <p className="text-base text-gray-700">
                                <span className="font-medium">Amount Paid:</span> {formatNaira(schoolDetails.schoolSubscription.amountPaid)}
                            </p>
                            <p className="text-base text-gray-700">
                                <span className="font-medium">Created At:</span>{" "}
                                {new Date(schoolDetails.schoolSubscription.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ) : (
                        <p className="text-base text-gray-500">No subscription details available</p>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                            Edit Subscription
                        </h3>
                        {successMessage && (
                            <p className="text-sm text-green-600 mb-4">{successMessage}</p>
                        )}
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Allowed Student Count
                                </label>
                                <input
                                    type="number"
                                    name="allowedStudentCount"
                                    value={formData.allowedStudentCount}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter allowed student count"
                                    min="1"
                                />
                                {errors.allowedStudentCount && (
                                    <p className="text-sm text-red-600 mt-1">{errors.allowedStudentCount}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Amount Paid (₦)
                                </label>
                                <input
                                    type="number"
                                    name="amountPaid"
                                    value={formData.amountPaid}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter amount in Naira"
                                    min="0"
                                    step="0.01"
                                />
                                {errors.amountPaid && (
                                    <p className="text-sm text-red-600 mt-1">{errors.amountPaid}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Created At
                                </label>
                                <input
                                    type="date"
                                    name="createdAt"
                                    value={formData.createdAt}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    max={new Date().toISOString().split("T")[0]} // <-- sets max to today
                                />
                                {errors.createdAt && (
                                    <p className="text-sm text-red-600 mt-1">{errors.createdAt}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subscription Type
                                </label>
                                <select
                                    name="subscriptionType"
                                    value={formData.subscriptionType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select subscription type</option>
                                    <option value="1">OneTime</option>
                                    <option value="2">PerTerm</option>
                                    <option value="3">Demo</option>
                                </select>
                                {errors.subscriptionType && (
                                    <p className="text-sm text-red-600 mt-1">{errors.subscriptionType}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Token
                                </label>
                                <div className="mb-2">
                                    <input
                                        type="email"
                                        value={tokenRecipientEmail}
                                        onChange={(e) => {
                                            setTokenRecipientEmail(e.target.value);
                                            setErrors((prev) => ({ ...prev, tokenRecipientEmail: "" }));
                                        }}
                                        className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter the email address to receive the token"
                                    />
                                    {errors.tokenRecipientEmail && (
                                        <p className="text-sm text-red-600 mt-1">{errors.tokenRecipientEmail}</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        name="token"
                                        value={formData.token}
                                        onChange={handleInputChange}
                                        className="flex-1 px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter update token"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleGenerateToken}
                                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors whitespace-nowrap"
                                    >
                                        Generate Token
                                    </button>
                                </div>
                                {errors.token && (
                                    <p className="text-sm text-red-600 mt-1">{errors.token}</p>
                                )}
                            </div>
                            {errors.general && (
                                <p className="text-sm text-red-600">{errors.general}</p>
                            )}
                            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="w-full sm:w-auto py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}