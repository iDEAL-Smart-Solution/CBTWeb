import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../Constant';

export function Table({ 
  data, 
  loading, 
  columns, 
  onMoreClick, 
  genderMap, 
  emptyText, 
  termMap, 
  availability, 
  typeMap,
  linkPath
}) {
  const renderCell = (item, column) => {
    let cellContent;

    switch (column.key) {
      case 'profilePicture':
        cellContent = (
          <img 
            src={`${BASE_URL}/ProfilePictures/${item[column.key]}`} 
            alt="Profile" 
            style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
          />
        );
        break;
      case 'gender':
        cellContent = genderMap ? genderMap[item[column.key]] : item[column.key];
        break;
      case 'term':
        cellContent = termMap ? termMap[item[column.key]] : item[column.key];
        break;
      case 'isAvailable':
        cellContent = availability ? availability[item[column.key]] : item[column.key];
        break;
      case 'examType':
        cellContent = typeMap ? typeMap[item[column.key]] : item[column.key];
        break;
      case 'more':
        cellContent = (
          <button
            className="link text-dec-none"
            onClick={() => onMoreClick(item.id)}
          >
            more
          </button>
        );
        break;
      default:
        cellContent = item[column.key];
    }

    if (linkPath) {
      const dynamicLink = typeof linkPath === 'function' ? linkPath(item) : '#';
      return (
        <Link to={dynamicLink} className="link text-dec-none">
          {cellContent}
        </Link>
      );
    }

    return cellContent;
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
}
