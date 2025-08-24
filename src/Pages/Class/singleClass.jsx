import SingleClassTemplate from '../../Component/Class/singleClassTemplate';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useClass } from '../../Zustand/classSlice';

export default function SingleClass() {
    const { id } = useParams();
    const { schClass, fetchSingleClass } = useClass();
    const { loading } = schClass;

    useEffect(() => {
        fetchSingleClass(id);
    }, [id, fetchSingleClass]);

    const { singleClass } = schClass;

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Class Details</h1>
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : !singleClass || singleClass.length === 0 ? (
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                        <p className="text-gray-600">Class details not found.</p>
                    </div>
                ) : (
                    <SingleClassTemplate students={singleClass} />
                )}
            </div>
        </div>
    );
}