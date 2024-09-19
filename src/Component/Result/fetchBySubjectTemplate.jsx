import { Table } from "../ReUsableComponents/table";

export default function SubjectResultTemplate({ data, loading }) {
     const columns = [
          { key: 'studentUin', header: 'Student UIN' },
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
 


 
 // const columns = ['Student UIN', 'First CA', 'Second CA', 'Third CA', 'Exam Score', 'Total Score'];
  //     <table className="td box-shadow-2"  
     //     style={{
     //      marginTop: '20px',
     //      width: '70%',
     //      borderRadius: '7px',
     //      borderSpacing: 0,
     //      border: 'none'
     //    }}>
     //         <thead className="bg-color-prim color-light"
     //      style={{
     //        height: '3em',
     //      }}>
     //             <tr>
     //                 {columns.map((col, idx) => (
     //                     <th key={idx}  className={idx === 0 ? 'b-r-l' : idx === columns.length - 1 ? 'b-r-r' : ''}>{col}</th>
     //                 ))}
     //             </tr>
     //         </thead>
     //         <tbody>
     //             {loading ? (
     //                 <tr>
     //                     <td colSpan={columns.length} className="loader-cell">
     //                         <div className="loader"></div>
     //                     </td>
     //                 </tr>
     //             ) : !data || data.length === 0 ? (
     //                 <tr>
     //                     <td colSpan={columns.length} style={{ textAlign: 'center' }}>
     //                         No result!!!
     //                     </td>
     //                 </tr>
     //             ) : (
     //                 data.map((result, index) => (
     //                     <tr key={index}>
     //                         <td>{result.studentUin}</td>
     //                         <td>{result.first_CA_Score}</td>
     //                         <td>{result.second_CA_Score}</td>
     //                         <td>{result.third_CA_Score}</td>
     //                         <td>{result.exam_Score}</td>
     //                         <td>{result.total_Score}</td>
     //                     </tr>
     //                 ))
     //             )}
     //         </tbody>
     //     </table>