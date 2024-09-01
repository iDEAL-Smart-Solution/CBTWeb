import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Table } from "../ReUsableComponents/table";


export function ExamListTemplate1({ data, loading }) {
//   const navigate = useNavigate();

  const columns = [
    { key: 'examName', header: 'Name' },
    { key: 'subjectCode', header: 'Subject Code' },
    { key: 'session', header: 'Session' },
    { key: 'term', header: 'Term' },
    { key: 'isAvailable', header: 'Available' },
    { key: 'examType', header: 'Type' },
  ];
  
  const termMap = {
    1: "1st_term",
    2: "2nd_term",
    3: "3rd_term",
  };
  
  const typeMap = {
    1: "1st_CA",
    2: "2nd_CA",
    3: "3rd_CA",
    4: "Exam"
  };



  const transformedData = data.map(item => ({
    ...item,
    isAvailable: item.isAvailable ? 'Yes' : 'No',
  }));
  
  const linkPath = (item) => `/exam/${item.id}`; 

  return (
    <Table
      data={transformedData}
      loading={loading}
      columns={columns}
      termMap={termMap}
      typeMap={typeMap}
      linkPath={linkPath} 
    />
  );
}
