import React from "react";
import { Table } from "../ReUsableComponents/table";

export default function ListClass({ classes, loading }) {
  const columns = [
    { key: 'className', header: 'Class Name' },
    { key: 'numberOfSubjects', header: 'Number of Subjects' },
    { key: 'numberOfStudents', header: 'Number of Student' },
  ];

  const linkPath = (item) => `/class/${item.classId}`; 

  return (
    <div>
      <Table
        data={classes}
        columns={columns}
        width={`80%`}
        linkPath={linkPath}
        loading={loading}
       />
    </div>
  );
}