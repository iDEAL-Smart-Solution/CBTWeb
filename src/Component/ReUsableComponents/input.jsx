import React from "react";

export function InputField({ type, placeholder, className, handleChange, value, name, label, width }) {
    return (
        <div className="flex flex-col">
            {label && (
                <label className="text-sm font-medium text-gray-600 mb-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 ${className}`}
                onChange={handleChange}
                value={value}
                name={name}
                style={{ width: width }}
            />
        </div>
    );
}

export function RadioButtonGroup({ label, name, options, selectedValue, handleChange }) {
    return (
        <div className="flex flex-col">
            {label && (
                <label className="text-sm font-medium text-gray-600 mb-1">
                    {label}
                </label>
            )}
            <div className="flex flex-wrap gap-4">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={(e) => handleChange(e)}
                            className="h-4 w-4 text-blue-600 focus:outline-none focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export function Submit({ name, loading, isloading, isNotLoading, className }) {
    return (
        <input
            type="submit"
            value={loading ? isloading : isNotLoading}
            name={name}
            loading={loading.toString()}
            className={`px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
    );
}

export function SearchField({ type, placeholder, className, handleChange, handleSubmit }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 ${className}`}
            onChange={handleChange}
            style={{ width: '100%' }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSubmit();
                }
            }}
        />
    );
}