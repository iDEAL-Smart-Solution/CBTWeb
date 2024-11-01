import { useEffect, useState } from "react";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useExam } from "../../Zustand/examSlice";
import { ExamListTemplate1 } from "../../Component/Exam/examListTemplate";
import { useNotification } from "../../Context/notificationContext";


export default function ExamList() {
    const { exam, fetchExams, flipAvailability, filterList } = useExam();
    const { exams, loading } = exam;

    const { showError, showSuccess } = useNotification();

    useEffect(() => {
        fetchExams();
    }, [fetchExams]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleAvailability = async (examId) => {
        try {
            var res = await flipAvailability(examId);
            if (res.success) {
                showSuccess(res.message);
                fetchExams();
            } else {
                showError(res.message)
            }
        } catch (error) {
            showError(error);
        }
    };
    const handleSubmit = () => {
        filterList(filterKey);
    };
    const columns = [
        { key: 'examName', header: 'Name' },
        { key: 'subjectCode', header: 'Subject Code' },
        { key: 'session', header: 'Session' },
        { key: 'term', header: 'Term' },
        { key: 'isAvailable', header: 'Available' },
        { key: 'examType', header: 'Type' },
        { key: 'more', header: '' },
        { key: 'makeAvailable', header: '' }
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

            <div style={{width: '70%'}} className="box-shadow header-crumbs">
                <div style={{ width: "90%", marginBottom: '-10px' }}>
                    <SearchField
                        type="search"
                        placeholder="any word or letter that exist in the subject code or name and hit  enter"
                        className="search register-field"
                        handleChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <div>
                <ExamListTemplate1 data={exams} loading={loading} columns={columns} termMap={termMap} typeMap={typeMap} handleAvailability={handleAvailability} />
            </div>
        </div>
    );
}
