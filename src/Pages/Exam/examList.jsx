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

//     const [filterKey, setFilterKey] = useState('');

//     const handleInputChange = (e) => {
//         setFilterKey(e.target.value);
//     };

//     const handleSubmit = () => {
//           filterList(filterKey);
//     };

    return (
        <div>

            <div style={{ width: "50%" }}>
                <SearchField
                    type="search"
                    placeholder="user name"
                    className="search register-field"
                    // handleChange={handleInputChange}
                    // handleSubmit={handleSubmit}
                />
            </div>
            <div>
                <ExamListTemplate1 data={exams} loading={loading} />
            </div>
        </div>
    );
}
