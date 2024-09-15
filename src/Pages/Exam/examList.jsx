import { useEffect, useState } from "react";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useExam } from "../../Zustand/examSlice";
import { ExamListTemplate1 } from "../../Component/Exam/examListTemplate";


export default function ExamList() {
    const { exam, fetchExamsLight} = useExam();
    const { exams, loading } = exam;

    useEffect(() => {
     fetchExamsLight();
    }, [fetchExamsLight]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
        setFilterKey(e.target.value);
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
                    placeholder="user name"
                    className="search register-field"
                    handleChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </div>
            <div>
                <ExamListTemplate1 data={exams} loading={loading} columns={columns}  termMap={termMap} typeMap={typeMap}/>
            </div>
        </div>
    );
}
