import { BASE_URL } from "../../Constant";
import { Link } from "react-router-dom";


export default function StaffListTemplate({ data, loading }) {
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
                              <th>User Name</th>
                              <th>Gender</th>
                              <th className="b-r-r">more</th>
                         </tr>
                    </thead>
                    <tbody>
                         {loading ? (
                              <tr>
                                   <td colSpan="3" className="text-center">Loading...</td>
                              </tr>
                         ) : !data || data.length === 0 ? (
                              <tr>
                                   <td colSpan="3" className="text-center">You have no Staff</td>
                              </tr>
                         ) : (
                              data.map((item) => (
                                   <tr key={item.classId}>
                                        <td>
                                             <img src={`${BASE_URL}/ProfilePictures/${item.profilePicture}`} width="50em" alt="image" />
                                        </td>
                                        <td>{item.userName}</td>
                                        <td>{gender[item.gender]}</td>
                                        <td>
                                             <Link className="link text-dec-none " to={`/class/${item.classId}`}>
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