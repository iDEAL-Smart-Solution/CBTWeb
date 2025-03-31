import React from "react";
import { useState } from 'react';
import { BASE_URL } from '../../Constant';

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
        <div style={{ width: width, position: 'relative', marginBottom: mb }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    height: '30px',
                    border: '1px solid var(--muted-color)',
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    outline: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {selectedOption ? (
                    <>
                        <span>{selectedOption[optionLabel]}</span>
                    </>
                ) : (
                    <span>{firstOption}</span>
                )}
            </div>

            {isOpen && (
                <ul
                    className="custom-scrollbar"
                    style={{
                        all: 'unset',
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: 'fit-content',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        zIndex: 1,
                        backgroundColor: '#eee',
                    }}
                >
                    <li style={{ padding: '10px' }}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </li>

                    <li
                        onClick={() => handleSelect('')}
                        style={{ padding: '10px', cursor: 'pointer', backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' }}
                        className='bold'
                    >
                        {firstOption}
                    </li>

                    {filteredOptions.map(option => (
                        <li
                            key={option[optionKey]}
                            onClick={() => handleSelect(option[optionValue])}
                            style={{ display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer' }}
                        >
                            {option[optionImage] && (
                                <img
                                    src={`${BASE_URL}/ProfilePictures/${option[optionImage]}`}     
                                    alt=""
                                    style={{ width: '24px', height: '24px', marginRight: '8px', borderRadius: '50%' }}
                                />
                            )}
                            <span>{option[optionLabel]}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}