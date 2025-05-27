import { useResult } from "../../Zustand/resultSlice";
import { Dropdown } from "../../Component/ReUsableComponents/dropDown";
import term from "../../lib/termOption";
import { InputField, Submit } from "../../Component/ReUsableComponents/input";
import StudentByResultTemplate from "../../Component/Result/fetchByStudentTenplate";
import { useState } from "react";

export default function StudentResult() {
    const { result, fetchStudentResults } = useResult();

    const [formData, setFormData] = useState({
        key: "",
        term: 0,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value;
        setFormData({
            ...formData,
            [name]: parsedValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await fetchStudentResults(formData.key, formData.term);
        } catch (_error) {
            console.log(_error);
        }
    };

    const { studentResults, loading } = result;

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 relative z-0">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Student Results</h1>
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <p className="text-sm text-gray-600 italic mb-4">
                            Note: To check all terms, select a term and vice versa.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <InputField
                                type="text"
                                name="key"
                                value={formData.key}
                                placeholder="Enter the student UIN"
                                handleChange={handleInputChange}
                                width="100%"
                            />
                            <Dropdown
                                name="term"
                                value={formData.term}
                                handleChange={handleInputChange}
                                options={term}
                                width="100%"
                                optionValue="value"
                                optionLabel="text"
                                firstOption="Select Term"
                                className="mb-4"
                            />
                            <Submit
                                className="w-full md:w-auto mt-4 md:mt-0"
                                loading={loading}
                                isNotLoading="Check Results"
                                isloading="Fetching..."
                            />
                        </div>
                    </form>
                </div>
                <div className="shadow-lg rounded-lg">
                    <StudentByResultTemplate data={studentResults} loading={loading} />
                </div>
            </div>
        </div>
    );
}