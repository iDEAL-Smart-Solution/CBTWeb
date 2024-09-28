import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './subject.css';

function Modal({ isOpen, onClose, onSubmit, formData, handleInputChange }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content box-shadow-2 p-20">
                <h3>Edit Subject</h3>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="subjectName" className='color-mute'>Subject Name</label>
                        <input
                            type="text"
                            id="subjectName"
                            name="subjectName"
                            value={formData.subjectName}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subjectCode" className='color-mute'>Subject Code</label>
                        <input
                            type="text"
                            id="subjectCode"
                            name="subjectCode"
                            value={formData.subjectCode}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subjectClass" className='color-mute'>Subject Class</label>
                        <input
                            type="text"
                            id="subjectClass"
                            name="subjectClass"
                            value={formData.subjectClass}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn">Save Changes</button>
                        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function SingleSubjectTemplate({ loading, singleSubject, errorMessage, handleDelele, handleEdit, message }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        subjectName: '',
        subjectCode: '',
        subjectClass: '',
        id: '',
    });


        const handleEditClick = (id) => {
            setFormData({
                subjectName: singleSubject.name || '',
                subjectCode: singleSubject.code || '',
                subjectClass: singleSubject.className || '',
                id: id,
            });
            setIsModalOpen(true);
        };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleEdit(formData);
        setIsModalOpen(false);
       
    };

    return (
        <div>
            {
                loading ? (
                    <div className="loader-cell">
                        <div className="loader"></div>
                    </div>
                ) : !singleSubject ? (
                    <div className="text-center text-big-2">{errorMessage}</div>
                ) : (
                    <div className="box-shadow-2 p-20 bold" style={{ position: 'relative' }}>
                        <p>Name : {singleSubject.name}</p>
                        <p>Code : {singleSubject.code}</p>
                        <p>Description : {singleSubject.description}</p>
                        <p>Class : {singleSubject.className}</p>
                        <p>Tutor : {singleSubject.staffName}</p>
                        <p>Allocated Exam Aggregate : {singleSubject.totalExamScore}</p>
                        <p>Allocated Test Aggregate : {singleSubject.totalTestScore}</p>
                        <div style={{ position: "absolute", right: "10px", bottom: "40px" }}>
                            <FaEdit className="edit-icon" onClick={() => handleEditClick(singleSubject.id)} />
                            <MdDelete className="delete-icon" onClick={() => handleDelele(singleSubject.id)} />
                        </div>
                    </div>
                )
            }

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                formData={formData}
                handleInputChange={handleInputChange}
            />
        </div>
    );
}
