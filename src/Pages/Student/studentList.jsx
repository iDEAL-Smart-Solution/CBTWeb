import { useEffect, useState } from "react";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useStudent } from "../../Zustand/studentSlice";
import StudentListTemplate from "../../Component/student/studentListTemplate";
import { useNotification } from "../../Context/notificationContext";

export default function StudentList() {
    const { student, fetchStudents, deleteStudent } = useStudent();
    const { students, loading } = student;

    const {showError, showSuccess } = useNotification();

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
    const handleDelete = async (id) => {
        try {
            console.log(id);
             let res = await deleteStudent(id);
             if(res.success)
             {
                  showSuccess(res.message);
                  fetchStudents(filterKey);
             } else {
                  showError(res.message);
             }
        } catch (error) {
             console.error(error);

        }
   }

    return (
        <div>
            <div style={{ width: '70%' }} className="box-shadow header-crumbs">
                <div style={{ width: "90%", marginBottom: '-10px' }}>
                    <SearchField
                        type="search"
                        placeholder="class name | subject name"
                        className="search register-field"
                        handleChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <div>
                <StudentListTemplate data={students} loading={loading} handleDelete={handleDelete} />
            </div>
        </div>
    );
}
