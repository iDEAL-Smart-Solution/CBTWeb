import React from "react";
import { Table } from "../ReUsableComponents/table";
import { useNavigate } from "react-router-dom";

export default function ListClass({ classes, loading, handleDelete }) {
  const navigate  = useNavigate();
  const columns = [
    { key: 'className', header: 'Class Name' },
    { key: 'numberOfSubjects', header: 'Number of Subjects' },
    { key: 'numberOfStudents', header: 'Number of Student' },
    { key: 'more', header: '' },
    { key: 'delete', header: '' },
  ];

  // const linkPath = (item) => `/class/${item.classId}`; 
  const handleMoreClick = (id) => {
    navigate(`/class/${id}`);
  };


  return (
    <div>
      <Table
        data={classes}
        columns={columns}
        width={`80%`}
        // linkPath={linkPath}
        onMoreClick={handleMoreClick}
        loading={loading}
        handleDelete={handleDelete}
        emptyText={`You have no class available use the input box above to create`}
      />
    </div>
  );
}