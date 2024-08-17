import { BASE_URL } from "../../Constant";



export default function ListOFStudentForClass({ data, index }) {
     const gender = {
          1: "Male",
          2: "Female"
     };
     return (
          <div>
               <table className="list-in-single-class-box">
                    <tbody>
                         <tr key={data.id} className="list-in-single-class">
                              <td>
                                   {index + 1}. {data.studentName}
                              </td>
                              <td>{data.uin}</td>
                              <td>{gender[data.gender]}</td>
                              <td>
                                   <img src={`${BASE_URL}/ProfilePictures/${data.imageUrl}`} width="50em" alt="image" />
                              </td>
                         </tr>
                    </tbody>
               </table>
          </div>
     )
}