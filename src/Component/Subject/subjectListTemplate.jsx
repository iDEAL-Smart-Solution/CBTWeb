
import { useNavigate } from 'react-router-dom'; 
import { Table } from "../ReUsableComponents/table";


export default function SubjectListTemplate({ data, loading }) {
     const navigate = useNavigate();

     const columns = [
       { key: 'name', header: 'Name' },
       { key: 'code', header: 'Code' },
       { key: 'numberOfExam', header: 'Exams' },
       { key: 'className', header: 'Class' },
       { key: 'more', header: 'More' }
     ];
   
     const handleMoreClick = (id) => {
       navigate(`/subject/${id}`);
     };
   
     return (
    <Table
      data={data}
      loading={loading}
      columns={columns}
      onMoreClick={handleMoreClick}
      emptyText={`No subject`}
      width={`80%`}

    />
  );
}
