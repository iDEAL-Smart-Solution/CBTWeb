import { useEffect, useState } from "react";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useSubject } from "../../Zustand/subjectSlice";
import SubjectListTemplate from "../../Component/Subject/subjectListTemplate";
import { useAuth } from '../../Zustand/auth' 
import { useNotification } from "../../Context/notificationContext";


export default function StaffSubjects() {
    const { subject, fetchStaffSubjects, filterStaffSubjecs} = useSubject();
    const { subjects, loading } = subject;
    const { auth } = useAuth();
    const { user } = auth || {};

    const id = user?.id;

    const { showError } = useNotification
    
    useEffect(async () => {
            let res = await fetchStaffSubjects(id);
            if(!res.success) {
                showError(res.message);
            }
        
    }, [fetchStaffSubjects]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleSubmit = () => {
     filterStaffSubjecs(filterKey, id);
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
