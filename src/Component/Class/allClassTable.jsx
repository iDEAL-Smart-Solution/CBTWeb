import React from "react";
import { Link } from 'react-router-dom';

export default function ListClass({ classes, loading }) {
  return (
    <table className="all-class-table box-shadow-2">
      <thead className="bg-color-prim color-light">
        <tr>
          <th className="b-r-l">Class Name</th>
          <th>Number of Subjects</th>
          <th className="b-r-r">Number of Students</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="6" className="loader-cell">
              <div className="loader"></div>
            </td>
          </tr>
        ) : !classes || classes.length === 0 ? (
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>You have no class</td>
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