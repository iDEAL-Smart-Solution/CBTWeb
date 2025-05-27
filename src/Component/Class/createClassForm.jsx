import React from 'react';

export default function CreateClass({ handleSubmit, handleInputChange, fieldvalue, fieldName, loading }) {
    return (
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
    );
}