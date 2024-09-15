import React from 'react';
import { Table } from "../ReUsableComponents/table";


export function ExamListTemplate1({ data, loading, columns, termMap, typeMap }) {


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
      emptyText={`No Exam `}
      width={`90%`}
    />
  );
}
