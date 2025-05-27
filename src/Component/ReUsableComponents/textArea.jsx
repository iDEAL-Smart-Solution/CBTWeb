import React from "react";

export function TextArea({ name, value, handleChange, rows, className, placeholder, width, mb, ml }) {
    return (
        <textarea
            name={name}
            value={value}
            onChange={handleChange}
            rows={rows}
            placeholder={placeholder}
            className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 ${className}`}
            style={{ width: width, marginBottom: mb, marginLeft: ml }}
        />
    );
}
