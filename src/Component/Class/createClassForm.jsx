import React from 'react';

export default function CreateClass({ handleSubmit, handleInputChange, fieldvalue, fieldName, loading }) {
    return (
        <div className="space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-amber-800">
                            <strong>Important:</strong> For seamless student promotion, create classes with the following names: <strong>JSS 1, JSS 2, JSS 3, SSS 1, SSS 2, SSS 3</strong>. Failure to use this format will prevent automatic student promotion during session migration.
                        </p>
                    </div>
                </div>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-row md:flex-row md:items-center gap-4 bg-white shadow-md rounded-lg p-4 md:p-6"
            >
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Class name"
                        name={fieldName}
                        value={fieldvalue}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                </div>
            <div>
                <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                    disabled={loading}
                >
                    {loading ? "..." : "Add"}
                </button>
            </div>
        </form>
        </div>
    );
}