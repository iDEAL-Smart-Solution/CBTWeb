import { useEffect, useState } from "react";
// import { SearchField } from "../../Component/UI/input";
// import { InputField, Submit } from "../../Component/ReUsableComponents/input";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useSubject } from "../../Zustand/subjectSlice";
import SubjectListTemplate from "../../Component/Subject/subjectListTemplate";
export default function SubjectList() {
    const { subject, fetchSubjectsLight, filterList} = useSubject();
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

    return (
        <div>

            <div style={{ width: "50%" }}>
                <SearchField
                    type="search"
                    placeholder="name"
                    className="search register-field"
                    handleChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            </div>
            <div>
                <SubjectListTemplate data={subjects} loading={loading} />
            </div>
        </div>
    );
}
