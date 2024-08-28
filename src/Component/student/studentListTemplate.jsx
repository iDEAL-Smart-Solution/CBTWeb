import { BASE_URL } from "../../Constant";
import { Link } from "react-router-dom";


export default function StudentListTemplate({ data, loading }) {
     const gender = {
          1: "Male",
          2: "Female"
     };
     return (
          <div>
               <table className="all-class-table box-shadow-2">
                    <thead className="bg-color-prim color-light">
                         <tr>
                              <th className="b-r-l">Profile Picture</th>
                              <th>UIN</th>
                              <th>Name</th>
                              <th>Class Name</th>
                              <th>Gender</th>
                              <th className="b-r-r">more</th>
                         </tr>
                    </thead>
                    <tbody>
                         {loading ? (
                              <tr>
                                   <td colSpan="5" style={{textAlign: "center"}}>Loading...</td>
                              </tr>
                         ) : !data || data.length === 0 ? (
                              <tr>
                                   <td colSpan="5" style={{textAlign: "center"}}>Enter a valid search keyword above</td>
                              </tr>
                         ) : (
                              data.map((item) => (
                                   <tr key={item.id}>
                                        <td>
                                             <img src={`${BASE_URL}/ProfilePictures/${item.imageUrl}`} width="50em" alt="image" />
                                        </td>
                                        <td>{item.uin}</td>
                                        <td>{item.studentName}</td>
                                        <td>{item.className}</td>
                                        <td>{gender[item.gender]}</td>
                                        <td>
                                             <Link className="link text-dec-none " to={`/student/${item.id}`}>
                                                  more
                                             </Link>
                                        </td>
                                   </tr>
                              ))
                         )}
                    </tbody>
               </table>
          </div>
     )
}