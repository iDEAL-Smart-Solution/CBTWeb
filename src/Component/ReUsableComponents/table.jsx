import React from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../Constant';
import { MdDelete } from 'react-icons/md';
import { MdMoreVert } from 'react-icons/md';

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
  linkPath,
  width,
  onClearnce,
  makeAvailable,
  handleDelete,
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
            style={{all: 'unset'}}
            onClick={() => onMoreClick(item.id || item.classId)}
          >
            <MdMoreVert size={'28px'} className='color-success' />
          </button>
        );
        break;
        case 'clear': 
        cellContent = (
          <button
          className='special-button'
          onClick={() => onClearnce(item.studentId, item.examId)}
          >
            Clear
          </button>
        );
        break;
        case 'makeAvailable':
          cellContent = (
            <button style={{width: '100%'}} className='special-button'
          onClick={() => makeAvailable(item.id)} 
          >
              flip
            </button>
          );
          break;
          case 'delete':
            cellContent = (
              <button style={{all: 'unset'}}
            onClick={() => handleDelete(item.classId || item.userId)} 
            >
                <MdDelete size={'25px'} className='color-danger' />
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
      <table className="td box-shadow-2"
        style={{
          marginTop: '20px',
          width: width,
          borderRadius: '7px',
          borderSpacing: 0,
          border: 'none'
        }}
      >
        <thead className="bg-color-prim color-light"
          style={{
            height: '3em',
            textAlign: 'left'
          }}
        >
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                className={index === 0 ? 'b-r-l' : index === columns.length - 1 ? 'b-r-r' : ''}
                style={{paddingLeft: '10px'}}
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
