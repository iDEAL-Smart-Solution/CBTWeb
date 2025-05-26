
import { Table } from "../ReUsableComponents/table"

import { useNavigate } from 'react-router-dom';



export default function SchoolListTemplate({ data, loading, handleDelete }) {
     const navigate = useNavigate();

     const columns = [
          { key: 'schoolName', header: 'School Name' },
          { key: 'schoolLogoFilePath', header: 'School Logo' },
          { key: 'address', header: 'Address' },
          { key: 'phoneNumber', header: 'Sch. Phone' },
          { key: 'email', header: 'Sch. Email' },
          { key: 'more', header: 'more' },
          { key: 'delete', header: 'delete' },

     ]
     

     const handleMoreClick = (id) => {
          navigate(`/School/${id}`);
     };

     return (
          <Table
               data={data}
               loading={loading}
               columns={columns}
               onMoreClick={handleMoreClick}
               emptyText={`You have no schools yet`}
               width={`75%`}
               handleDelete={handleDelete}
          />
     )
}