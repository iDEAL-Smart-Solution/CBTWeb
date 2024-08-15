import React, { useState } from 'react';
import './layout.css';
export default function ColorPicker() {
    const [color, setColor] = useState('#76b1f7'); 

    const handleColorChange = (event) => {
        const selectedColor = event.target.value;
        setColor(selectedColor);
        document.documentElement.style.setProperty('--primary-color', selectedColor);
    };

    return (
        <div className="color-picker-container">
            <input 
                type="color" 
                id="primaryColorPicker" 
                value={color} 
                onChange={handleColorChange} 
                className="color-picker-input"
            />
        </div>
    );
}
