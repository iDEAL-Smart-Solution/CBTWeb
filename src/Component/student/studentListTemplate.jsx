
import { Table } from "../ReUsableComponents/table";

import { useNavigate } from 'react-router-dom'; 


export default function StudentListTemplate({ data, loading }) {
     const navigate = useNavigate();

     const columns = [
          { key: 'profilePicture', header: 'Profile Picture' },
          { key: 'uin', header: 'UIN' },
          { key: 'studentName', header: 'Name' },
          { key: 'className', header: 'Class Name' },
          { key: 'gender', header: 'Gender' },
          { key: 'more', header: 'More' }
     ];

     const genderMap = {
          1: "Male",
          2: "Female"
     };

     const handleMoreClick = (id) => {
          navigate(`/student/${id}`);
     };


     return (
          <Table
               data={data}
               loading={loading}
               columns={columns}
               onMoreClick={handleMoreClick}
               genderMap={genderMap}
               emptyText="Enter valid keyword to search for student either by class name or subject"
          />
     )
}

