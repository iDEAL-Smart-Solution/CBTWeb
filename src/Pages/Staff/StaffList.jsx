import { useEffect, useState } from "react";
import StaffListTemplate from "../../Component/Staff/StaffListTemplate";
import { useStaff } from "../../Zustand/staffSlice";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useNotification } from "../../Context/notificationContext";

export default function StaffList() {
    const { staff, fetchAllStaffs, filterAllStaff, deleteStaff } = useStaff();
    const { staffs, loading } = staff;

    const {showSuccess, showError} = useNotification();

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

    const handleDelete = async (id) => {
        try {
            console.log(id);
             let res = await deleteStaff(id);
             if(res.success)
             {
                  showSuccess(res.message);
                  fetchAllStaffs();
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
                        placeholder="search key (username, subject)"
                        className="search register-field"
                        handleChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <div>
                <StaffListTemplate data={staffs} loading={loading} handleDelete={handleDelete} />
            </div>
        </div>
    );
}
