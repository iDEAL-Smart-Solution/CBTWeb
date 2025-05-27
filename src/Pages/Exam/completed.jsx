import React from 'react';
import { useAuth } from "../../Zustand/auth";
import smiley from '../../assets/smiley2.jpg';
import { useNavigate } from 'react-router-dom';

export default function ExamCompleted() {
    const { auth } = useAuth();
    const { user } = auth;
    const navigate = useNavigate(); 

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <div className="mb-6 flex justify-start">
                <button 
                    onClick={() => navigate('/my-exams')}
                    className="w-full sm:w-48 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Back to My Exams
                </button>
            </div>

            <div className="w-full max-w-lg mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md min-h-fit max-h-[calc(100vh-200px)] overflow-y-auto text-center">
                <img 
                    src={smiley} 
                    alt="smiley" 
                    className="mx-auto mb-6 w-32 sm:w-48 max-w-full max-h-48 rounded-full" 
                />
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Exam Submitted!
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mb-6">
                    Hello {user.firstName}, you have successfully submitted your exam. You can now leave the exam hall quietly.
                </p>
                <p className="text-sm text-gray-500">
                    Please remember to sign out using the button at the top right corner of the screen.
                </p>
            </div>
        </div>
    );
}