import React from "react";

export default function ListClass({ classes }) {
  // if (!classes || classes.length === 0) {
  //   return <p className="">No classes available</p>;
  // }

  return (
    <table className="all-class-table box-shadow-2">
    {!classes || classes.length === 0 ? (
      <p>You have no classes</p>
    ) : (

      <thead className="bg-color-prim color-light">
        <tr>
          <th>Class Name</th>
          <th>Number of Subjects</th>
          <th>Number of Students</th>
        </tr>
      </thead>
    )}
      <tbody>
        {classes.map((item) => (
          <tr key={item.classId}>
            <td>{item.className}</td>
            <td>{item.numberOfSubjects}</td>
            <td>{item.numberOfStudents}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
