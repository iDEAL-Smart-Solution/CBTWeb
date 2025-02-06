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
        <div>

            <div style={{ width: '70%' }} className="box-shadow header-crumbs">
                <div style={{ width: "90%", marginBottom: '-10px' }}>
                    <SearchField
                        type="search"
                        placeholder="name"
                        className="search register-field"
                        handleChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <div>
                <SubjectListTemplate data={subjects} loading={loading} />
            </div>
        </div>
    );
}
