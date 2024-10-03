import { useEffect, useState } from "react";
import StaffListTemplate from "../../Component/Staff/StaffListTemplate";
import { useStaff } from "../../Zustand/staffSlice";
import { SearchField } from "../../Component/ReUsableComponents/input";

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
            <div style={{ width: '70%' }} className="box-shadow header-crumbs">
                <div style={{ width: "90%", marginBottom: '-10px' }}>
                    <SearchField
                        type="search"
                        placeholder="search key (username, subject)"
                        className="search register-field"
                        handleChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <div>
                <StaffListTemplate data={staffs} loading={loading} />
            </div>
        </div>
    );
}
