import React from "react";
import { Link } from 'react-router-dom';

export default function ListClass({ classes, loading }) {
  return (
    <table className="all-class-table box-shadow-2">
      <thead className="bg-color-prim color-light">
        <tr>
          <th>Class Name</th>
          <th>Number of Subjects</th>
          <th>Number of Students</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="3" className="text-center">Loading...</td>
          </tr>
        ) : !classes || classes.length === 0 ? (
          <tr>
            <td colSpan="3" className="text-center">You have no classes</td>
          </tr>
        ) : (
          classes.map((item) => (
            <tr key={item.classId}>
              <td>
                <Link className="link" to={`/class/${item.classId}`}>
                  {item.className}
                </Link>
              </td>
              <td>{item.numberOfSubjects}</td>
              <td>{item.numberOfStudents}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}