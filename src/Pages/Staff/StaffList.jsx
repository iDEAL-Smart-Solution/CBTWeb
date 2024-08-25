import { useEffect, useState } from "react";
import StaffListTemplate from "../../Component/Staff/StaffListTemplate";
import { useStaff } from "../../Zustand/staffSlice";
import { SearchField } from "../../Component/UI/input";

export default function StaffList() {
    const { staff, fetchAllStaffs, filterAllStaff } = useStaff();
    const { staffs, loading } = staff;

    useEffect(() => {
        fetchAllStaffs();
    }, [fetchAllStaffs]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleSubmit = () => {
        filterAllStaff(filterKey);
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
                <StaffListTemplate data={staffs} loading={loading} />
            </div>
        </div>
    );
}
