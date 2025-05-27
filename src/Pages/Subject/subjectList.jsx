import { useEffect, useState } from "react";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useSubject } from "../../Zustand/subjectSlice";
import SubjectListTemplate from "../../Component/Subject/subjectListTemplate";
export default function SubjectList() {
    const { subject, fetchSubjectsLight, filterList } = useSubject();
    const { subjects, loading } = subject;

    useEffect(() => {
        fetchSubjectsLight();
    }, [fetchSubjectsLight]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleSubmit = () => {
        filterList(filterKey);
    };
    console.log(subjects);

    return (
            <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Subject List</h1>
                    <div className="mb-6">
                        <div className="w-full bg-white p-6 rounded-lg shadow-lg max-w-5lg">
                        <h2 className="text-lg font-semibold mb-4">Search Subjects</h2>
                            <SearchField
                                type="search"
                                placeholder="name"
                                handleChange={handleInputChange}
                                handleSubmit={handleSubmit}
                            />
                        </div>
                    </div>
                    <div>
                        <SubjectListTemplate data={subjects} loading={loading} />
                    </div>
                </div>
            </div>
    );
}
