// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
// import { Table } from "../UI/table";
import { InputField, Submit } from "../ReUsableComponents/input";


export default function SubjectListTemplate({ data, loading }) {
     const navigate = useNavigate();

     const columns = [
       { key: 'name', header: 'Name' },
       { key: 'code', header: 'Code' },
       { key: 'numberOfExam', header: 'Exams' },
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
    />
  );
}
