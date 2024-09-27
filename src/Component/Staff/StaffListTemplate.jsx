
import { Table } from "../ReUsableComponents/table"

import { useNavigate } from 'react-router-dom'; 



export default function StaffListTemplate({ data, loading }) {
     const navigate = useNavigate();

     const columns = [
          { key: 'profilePicture', header: 'Profile Picture' },
          { key: 'userName', header: 'User Name' },
          { key: 'gender', header: 'Gender' },
          { key: 'uin', header: 'UIN' },
          { key: 'more', header: 'more' },
     ]
     const genderMap = {
          1: "Male",
          2: "Female"
     };

     const handleMoreClick = (id) => {
          navigate(`/staff/${id}`);     
     };

     return (
          <Table
               data={data}
               loading={loading}
               columns={columns}
               genderMap={genderMap}
               onMoreClick={handleMoreClick}
               emptyText={`You have no Staff`}
               width={`75%`}
          />
     )
}