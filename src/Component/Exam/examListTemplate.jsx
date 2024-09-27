import React from 'react';
import { Table } from "../ReUsableComponents/table";
import { useNavigate } from 'react-router-dom'; 


export function ExamListTemplate1({ data, loading, columns, termMap, typeMap, handleAvailability }) {
  const navigate = useNavigate();


  const transformedData = data.map(item => ({
    ...item,
    isAvailable: item.isAvailable ? 'Yes' : 'No',
  }));
  
  // const linkPath = (item) => `/exam/${item.id}`; 
  const handleMoreClick = (id) => {
    navigate(`/exam/${id}`);     
};

  return (
    <Table
      data={transformedData}
      loading={loading}
      columns={columns}
      termMap={termMap}
      typeMap={typeMap}
      // linkPath={linkPath} 
      onMoreClick={handleMoreClick}
      emptyText={`No Exam `}
      width={`100%`}
      makeAvailable={handleAvailability}
    />
  );
}
