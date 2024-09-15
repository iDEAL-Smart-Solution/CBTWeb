


export default function ListOfSubjectForClass({ data, index}) {
     return(
          <div>
               <table className="td list-in-single-class-box">
                    <tbody>
                         <tr key={data.id} className="list-in-single-class">
                              <td>
                                   {index + 1}. {data.name}
                              </td>
                              <td>{data.code}</td>
                              <td>{data.description}</td>
                         </tr>
                    </tbody>
               </table>
          </div>
     )
}