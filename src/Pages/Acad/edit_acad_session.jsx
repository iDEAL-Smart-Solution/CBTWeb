import React, { useState } from "react";
import { useAcad } from "../../Zustand/acad_session";
import { InputField, Submit } from "../../Component/ReUsableComponents/input";
import { ImageUploader } from "../../Component/ReUsableComponents/file";
import { useNotification } from "../../Context/notificationContext";

export default function AcademicSettings() {
    const { acad, addNameAndLogo, editAcadSession, nextTerm, nextSession } = useAcad();
    const { loading, message } = acad;
    const { showSuccess, showError } = useNotification();

    // State for Name and Logo Form
    const [nameLogoFormData, setNameLogoFormData] = useState({
        name: "",
        logo: null,
    });

    // State for Academic Session Form
    const [sessionFormData, setSessionFormData] = useState({
        newTerm: 0,
        newSession: "",
    });

    // State for Collapsible Sections
    const [isNameLogoOpen, setIsNameLogoOpen] = useState(true);
    const [isSessionOpen, setIsSessionOpen] = useState(false);

    // State for Modals
    const [showModal, setShowModal] = useState({
        nameLogo: false,
        term: false,
        session: false,
    });

    // Handlers for Name and Logo Form
    const handleNameLogoInputChange = (event) => {
        const { name, value, files } = event.target;
        let parsedValue = value;
        if (name === "logo") {
            setNameLogoFormData({
                ...nameLogoFormData,
                [name]: files[0],
            });
        } else {
            setNameLogoFormData({
                ...nameLogoFormData,
                [name]: parsedValue,
            });
        }
    };

    const handleNameLogoSubmit = (e) => {
        e.preventDefault();
        setShowModal({ ...showModal, nameLogo: true });
    };

    const confirmNameLogoSubmit = async () => {
        try {
            let res = await addNameAndLogo(nameLogoFormData);
            if (res.success) {
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (_error) {
            console.error(_error);
        }
        setShowModal({ ...showModal, nameLogo: false });
    };

    // Handlers for Academic Session Form
    const handleSessionInputChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value;
        setSessionFormData({
            ...sessionFormData,
            [name]: parsedValue,
        });
    };

    const handleSessionSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await editAcadSession(sessionFormData.newTerm, sessionFormData.newSession);
            if (res.success) {
                showSuccess(res.message);
            } else {
                showError(res.message);
            }
        } catch (_error) {
            console.log(_error);
        }
    };

    // Migration Handlers
    const handleMigrate = (type) => {
        setShowModal({ ...showModal, [type]: true });
    };

    const confirmMigrate = async (type) => {
        setShowModal({ ...showModal, [type]: false });
        try {
            if (type === 'term') {
                const res = await nextTerm();
                if (res.success) {
                    showSuccess(res.message || 'Migrated to next term successfully');
                } else {
                    showError(res.message || 'Failed to migrate to next term');
                }
            } else if (type === 'session') {
                const res = await nextSession();
                if (res.success) {
                    showSuccess(res.message || 'Migrated to next session successfully');
                } else {
                    showError(res.message || 'Failed to migrate to next session');
                }
            } else {
                showError('Unknown migration type');
            }
        } catch (error) {
            console.error('Migration error:', error);
            showError(error?.response?.data?.message || error.message || 'An error occurred during migration');
        }
    };

    const cancelMigrate = (type) => {
        setShowModal({ ...showModal, [type]: false });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Academic Settings</h1>
                {message && (
                    <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-6">
                        {message}
                    </div>
                )}
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                    {/* School Name and Logo Section */}
                    <div>
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setIsNameLogoOpen(!isNameLogoOpen)}
                        >
                            <h2 className="text-lg font-semibold text-gray-700">School Name & Logo</h2>
                            <span className="text-gray-500">{isNameLogoOpen ? "−" : "+"}</span>
                        </div>
                        {isNameLogoOpen && (
                            <div className="mt-4">
                                <form onSubmit={handleNameLogoSubmit} className="space-y-6">
                                    <InputField
                                        type="text"
                                        name="name"
                                        label="Enter the name of the school"
                                        value={nameLogoFormData.name}
                                        placeholder="School Name"
                                        handleChange={handleNameLogoInputChange}
                                        width="100%"
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Upload School Logo
                                        </label>
                                        <ImageUploader
                                            name="logo"
                                            handleChange={handleNameLogoInputChange}
                                            width="100%"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Submit
                                            className="w-full md:w-auto"
                                            loading={loading}
                                            isNotLoading="Save Name & Logo"
                                            isloading="Saving..."
                                        />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Academic Session Section */}
                    <div>
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setIsSessionOpen(!isSessionOpen)}
                        >
                            <h2 className="text-lg font-semibold text-gray-700">Academic Session</h2>
                            <span className="text-gray-500">{isSessionOpen ? "−" : "+"}</span>
                        </div>
                        {isSessionOpen && (
                            <div className="mt-4 space-y-8">
                                {/* Update Session Subsection */}
                                <div>
                                    <h3 className="text-base font-semibold text-gray-600 mb-4">
                                        Update Academic Session
                                    </h3>
                                    <form onSubmit={handleSessionSubmit} className="space-y-6">
                                        <InputField
                                            type="number"
                                            name="newTerm"
                                            label="Enter term in digits"
                                            value={sessionFormData.newTerm}
                                            placeholder="New Term"
                                            handleChange={handleSessionInputChange}
                                            width="100%"
                                        />
                                        <InputField
                                            type="text"
                                            name="newSession"
                                            value={sessionFormData.newSession}
                                            placeholder="New Session"
                                            handleChange={handleSessionInputChange}
                                            width="100%"
                                        />
                                        <div className="flex justify-end">
                                            <Submit
                                                className="w-full md:w-auto"
                                                loading={loading}
                                                isNotLoading="Update Session"
                                                isloading="Updating..."
                                            />
                                        </div>
                                    </form>
                                </div>

                                {/* Migration Subsection */}
                                <div>
                                    <h3 className="text-base font-semibold text-gray-600 mb-4">
                                        Migrate to New Term or Session
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Click the buttons below to migrate to the next term or session. Note:
                                        Migrating to a new session will automatically promote all students to the
                                        next class.
                                    </p>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <button
                                            onClick={() => handleMigrate("term")}
                                            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                                        >
                                            Next Term
                                        </button>
                                        <button
                                            onClick={() => handleMigrate("session")}
                                            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                                        >
                                            Next Session
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Confirmation Modals */}
                {showModal.nameLogo && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Changes</h3>
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to update the school name and logo?
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowModal({ ...showModal, nameLogo: false })}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmNameLogoSubmit}
                                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showModal.term && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Migration</h3>
                            <p className="text-gray-600 mb-4">Are you sure you want to migrate to the next term?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => cancelMigrate("term")}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => confirmMigrate("term")}
                                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showModal.session && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Migration</h3>
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to migrate to the next session? This will promote all students
                                to the next class.
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => cancelMigrate("session")}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => confirmMigrate("session")}
                                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}