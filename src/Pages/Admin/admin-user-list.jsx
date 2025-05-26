import { useEffect, useState } from "react";
import AdminUserListTemplate from "../../Component/Admin/admin-list-template";
import useAdminStore from "../../Zustand/adminslice";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useNotification } from "../../Context/notificationContext";

export default function AdminUserList() {
    const { loading, adminUsers, fetchAdminUsers } = useAdminStore();

    const {showSuccess, showError} = useNotification();

    useEffect(() => {
     fetchAdminUsers();
    }, [fetchAdminUsers]);

    const [filterKey, setFilterKey] = useState('');

    const handleInputChange = (e) => {
        setFilterKey(e.target.value);
    };

    const handleSubmit = () => {
     // fetchSchools(filterKey);
    };

    const handleDelete = async (id) => {
     //    try {
     //        console.log(id);
     //         let res = await deleteStaff(id);
     //         if(res.success)
     //         {
     //              showSuccess(res.message);
     //              fetchAllStaffs();
     //         } else {
     //              showError(res.message);
     //         }
     //    } catch (error) {
     //         console.error(error);

     //    }
   }
    return (
        <div>
            <div style={{ width: '70%' }} className="box-shadow header-crumbs">
                <div style={{ width: "90%", marginBottom: '-10px' }}>
                    <SearchField
                        type="search"
                        placeholder="enter name of the admin or school name"
                        className="search register-field"
                        handleChange={handleInputChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <div>
                <AdminUserListTemplate data={adminUsers} loading={loading} handleDelete={handleDelete} />
            </div>
        </div>
    );
}
