import React from 'react';
import { Table } from '../ReUsableComponents/table';

export default function PromotionTableTemplate({ data, loading, onSelectStudent }) {
  const columns = [
    { key: 'studentName', header: 'Student Name' },
    { key: 'className', header: 'Current Class' },
    { key: 'uin', header: 'UIN' },
    { key: 'select', header: 'Select' },
  ];

  const enhancedData = (data || []).map((d, idx) => ({ ...d, id: d.id || d.uin || idx }));

  const handleSelect = (id) => {
    const student = enhancedData.find((s) => String(s.id) === String(id));
    if (student && onSelectStudent) onSelectStudent(student);
  };

  const onMoreClick = (id) => handleSelect(id);

  const mappedColumns = columns.map((c) => (c.key === 'select' ? { key: 'more', header: c.header } : c));

  return (
    <div>
      <Table
        data={enhancedData}
        columns={mappedColumns}
        width={'100%'}
        loading={loading}
        onMoreClick={onMoreClick}
        emptyText={'No matching students found'}
      />
    </div>
  );
}
