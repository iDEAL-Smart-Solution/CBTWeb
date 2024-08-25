import { useEffect, useState } from "react";
import { SearchField } from "../../Component/UI/input";
import { useStudent } from "../../Zustand/studentSlice";
import StudentListTemplate from "../../Component/student/studentListTemplate";

export default function StudentList() {
    const { student, fetchStudents } = useStudent();
    const { students, loading } = student;

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleSubmit = () => {
        fetchStudents(filterKey);
    };

    return (
        <div>
            <div style={{ width: "50%" }}>
                <SearchField
                    type="search"
                    placeholder="user name"
                    className="search register-field"
                    handleChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </div>
            <div>
                <StudentListTemplate data={students} loading={loading} />
            </div>
        </div>
    );
}
