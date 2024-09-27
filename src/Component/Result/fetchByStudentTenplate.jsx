import { Table } from "../ReUsableComponents/table";

export default function StudentByResultTemplate({ data, loading }) {
   const termMap = {
      1: "1st_term",
      2: "2nd_term",
      3: "3rd_term",          
 }
     const columns = [
          { key: 'studentUin', header: 'Student UIN' },
          { key: 'subjectCode', header: 'Subject Code'},
          { key: 'first_CA_Score', header: 'First CA' },
          { key: 'second_CA_Score', header: 'Second CA' },
          { key: 'third_CA_Score', header: 'Third CA' },
          { key: 'exam_Score', header: 'Exam Score' },
          { key: 'total_Score', header: 'Total Score' },
          { key: 'term', header: 'Term'},
          { key: 'session', header: 'Session'},


        ];
 const alteredData = data.map(item => ({
   ...item,
   term: termMap[item.term],
 }))
//  const transformedData = data.map(item => ({
//    ...item,
//    isAvailable: item.isAvailable ? 'Yes' : 'No',
//  }));
     return (
     <Table 
           data={alteredData}
        columns={columns}
        width={`80%`}
        loading={loading}
        emptyText={`Kindly enter the student UIN and term above to check student results`}
        />
     );
 }
 