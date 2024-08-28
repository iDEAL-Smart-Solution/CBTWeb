import React from 'react';
import { BASE_URL } from '../../Constant';


export function Table({ data, loading, columns, onMoreClick, genderMap, emptyText })  {
  const renderCell = (item, column) => {
    switch (column.key) {
      case 'profilePicture':
        return (
          <img 
            src={`${BASE_URL}/ProfilePictures/${item[column.key]}`} 
            alt="Profile" 
            style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
          />
        );
      case 'gender':
        return genderMap ? genderMap[item[column.key]] : item[column.key];
      case 'more':
        return (
          <button
            className="link text-dec-none"
            onClick={() => onMoreClick(item.id)}
          >
            more
          </button>
        );
      default:
        return item[column.key];
    }
  };

  return (
    <div>
      <table className="all-class-table box-shadow-2">
        <thead className="bg-color-prim color-light">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                className={index === 0 ? 'b-r-l' : index === columns.length - 1 ? 'b-r-r' : ''}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="loader-cell">
                <div className="loader"></div>
              </td>
            </tr>
          ) : !data || data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {renderCell(item, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
