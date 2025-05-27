import React, { useState } from 'react';
import { BASE_URL } from '../../Constant';
import { FaChevronDown } from 'react-icons/fa';

export function Dropdown({ name, value, handleChange, options, width, firstOption, optionKey, optionValue, optionLabel, optionImage, mb }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const selectedOption = options.find(option => option[optionValue] === value);

    const handleSelect = (optionValue) => {
        handleChange({ target: { name, value: optionValue } });
        setIsOpen(false);
        setSearchTerm('');
    };

    const filteredOptions = options.filter(option =>
        option[optionLabel].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`relative ${isOpen ? 'z-100' : 'z-10'}`} style={{ width: width, marginBottom: mb }}>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md cursor-pointer bg-white hover:border-blue-500 transition-colors duration-200"
            >
                <span className="text-gray-700">
                    {selectedOption ? selectedOption[optionLabel] : firstOption}
                </span>
                <FaChevronDown className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <ul
                    className="absolute top-full left-0 w-full mt-1 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-40 bg-white"
                >
                    <li className="p-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            onClick={(e) => e.stopPropagation()}
                            className="w-full px-3 py-1 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-700"
                        />
                    </li>
                    <li
                        onClick={() => handleSelect('')}
                        className="px-4 py-2 text-blue-600 font-semibold cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                    >
                        {firstOption}
                    </li>
                    {filteredOptions.map(option => (
                        <li
                            key={option[optionKey]}
                            onClick={() => handleSelect(option[optionValue])}
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                        >
                            {option[optionImage] && (
                                <img
                                    src={`${BASE_URL}/ProfilePictures/${option[optionImage]}`}
                                    alt=""
                                    className="w-6 h-6 rounded-full mr-2"
                                />
                            )}
                            <span className="text-gray-700">{option[optionLabel]}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}