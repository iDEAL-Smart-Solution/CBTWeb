
import { Table } from "../ReUsableComponents/table"

import { useNavigate } from 'react-router-dom';



export default function AdminUserListTemplate({ data, loading, handleDelete }) {
     const navigate = useNavigate();

     const columns = [
          { key: 'name', header: 'Name' },
          { key: 'schoolName', header: 'School Name' },
          { key: 'uin', header: 'UIN' },
          { key: 'phoneNumber', header: 'Phone Number' },
          { key: 'email', header: 'Email' },
          { key: 'password', header: 'Password'},
          { key: 'more', header: 'More' },
          { key: 'delete', header: 'Delete' },

     ]
   
     const handleMoreClick = (id) => {
          navigate(`/admin/user/${id}`);
     };

     return (
          <Table
               data={data}
               loading={loading}
               columns={columns}
               onMoreClick={handleMoreClick}
               emptyText={`You have no admin user yet`}
               width={`75%`}
               handleDelete={handleDelete}
          />
     )
}