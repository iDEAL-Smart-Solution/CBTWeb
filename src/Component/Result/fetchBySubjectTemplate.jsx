import { Table } from "../ReUsableComponents/table";

export default function SubjectResultTemplate({ data, loading }) {
     const columns = [
          { key: 'studentUin', header: 'Student UIN' },
          { key: 'studentName', header: 'Name' },
          { key: 'first_CA_Score', header: 'First CA' },
          { key: 'second_CA_Score', header: 'Second CA' },
          { key: 'third_CA_Score', header: 'Third CA' },
          { key: 'exam_Score', header: 'Exam Score' },
          { key: 'total_Score', header: 'Total Score' },


        ];
 
     return (
     <Table 
           data={data}
        columns={columns}
        width={`80%`}
        loading={loading}
        emptyText={`Kindly enter the subject code and term above to check student results`}
        />
     );
 }