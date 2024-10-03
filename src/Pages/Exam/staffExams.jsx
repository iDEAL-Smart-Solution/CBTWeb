import { useEffect, useState } from "react";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useExam } from "../../Zustand/examSlice";
import { ExamListTemplate1 } from "../../Component/Exam/examListTemplate";
import { useAuth } from "../../Zustand/auth";
import { useNotification } from "../../Context/notificationContext";


export default function StaffExams() {
    const { exam, filterStaffExams, fetchStaffExams, flipAvailability} = useExam();
    const { exams, loading } = exam;
    const { auth } = useAuth();
    const { user } = auth || {};
    const { showSuccess, showError } = useNotification();

    const id = user?.id;

    useEffect(() => {
     fetchStaffExams(id);
    }, [fetchStaffExams]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleAvailability = async (examId) => {
        try {
            var res = await flipAvailability(examId);
            if(res.success)
            {
               showSuccess(res.message);
                fetchExams();
            } else {
               showError(res.message)
            }
        } catch (error) {
            showError(error);
        }
    }
    const handleSubmit = () => {
     filterStaffExams(filterKey, id);
    };
    const columns = [
        { key: 'examName', header: 'Name' },
        { key: 'subjectCode', header: 'Subject Code' },
        { key: 'session', header: 'Session' },
        { key: 'term', header: 'Term' },
        { key: 'isAvailable', header: 'Available' },
        { key: 'examType', header: 'Type' },
        { key: 'more', header: ''},
        { key: 'makeAvailable', header: ''}
      ];
      const termMap = {
        1: "1st_term",
        2: "2nd_term",
        3: "3rd_term",
      };
      
      const typeMap = {
        1: "1st_CA",
        2: "2nd_CA",
        3: "3rd_CA",
        4: "Exam"
      };
    

    return (
        <div>

            <div style={{ width: "50%" }}>
                <SearchField
                    type="search"
                    placeholder="parameter"
                    className="search register-field"
                    handleChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </div>
            <div>
                <ExamListTemplate1 data={exams} loading={loading} columns={columns}  termMap={termMap} typeMap={typeMap} handleAvailability={handleAvailability}/>
            </div>
        </div>
    );
}
