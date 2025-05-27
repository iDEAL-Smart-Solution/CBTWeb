import React from "react";

export function ImageUploader({ className, name, value, handleChange, width }) {
    return (
        <input
            type="file"
            className={`w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-gray-600 hover:border-blue-500 transition-colors duration-200 cursor-pointer bg-gray-100 ${className}`}
            name={name}
            value={value}
            onChange={handleChange}
            data-testid="image-uploader"
            style={{ width: width }}
        />
    );
}

export function FileUploader({ className, name, value, handleChange, width }) {
    return (
        <input
            type="file"
            className={`w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-gray-600 hover:border-blue-500 transition-colors duration-200 cursor-pointer bg-gray-100 ${className}`}
            name={name}
            value={value}
            onChange={handleChange}
            style={{ width: width, height: '20vh' }}
        />
    );
}