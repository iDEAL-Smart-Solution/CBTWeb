import { useEffect, useState } from "react";
import SchoolListTemplate from "../../Component/School/SchoolListTemplate";
import useSchoolStore from "../../Zustand/schoolSlice";
import { SearchField } from "../../Component/ReUsableComponents/input";
import { useNotification } from "../../Context/notificationContext";

export default function SchoolList() {
    const { loading, schools, fetchSchools } = useSchoolStore();

    const {showSuccess, showError} = useNotification();

    useEffect(() => {
     fetchSchools();
    }, [fetchSchools]);

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
   console.log(schools)
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
                <SchoolListTemplate data={schools} loading={loading} handleDelete={handleDelete} />
            </div>
        </div>
    );
}
