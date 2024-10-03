import { BASE_URL } from "../../Constant";



export default function ListOFStudentForClass({ data, index }) {
     const gender = {
          1: "Male",
          2: "Female"
     };
     return (
          <div className="table-container">
               <table className="styled-table">
                    <tbody>
                         <tr key={data.id}>
                              <td>
                                   {index + 1}. {data.studentName}
                              </td>
                              <td>{data.uin}</td>
                              <td>{gender[data.gender]}</td>
                              <td>
                                   <img src={`${BASE_URL}/ProfilePictures/${data.profilePicture}`} width="50px" height="50px" style={{borderRadius: '50%'}} alt="image" />
                              </td>
                         </tr>
                    </tbody>
               </table>
          </div>
     )
}

