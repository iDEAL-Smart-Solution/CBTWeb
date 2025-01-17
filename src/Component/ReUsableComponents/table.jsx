// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BASE_URL } from '../../Constant';
// import { MdDelete } from 'react-icons/md';
// import { MdMoreVert } from 'react-icons/md';

// export function Table({
//   data,
//   loading,
//   columns,
//   onMoreClick,
//   genderMap,
//   emptyText,
//   termMap,
//   availability,
//   typeMap,
//   linkPath,
//   width,
//   onClearnce,
//   makeAvailable,
//   handleDelete,
// }) {
//   const renderCell = (item, column) => {
//     let cellContent;

//     switch (column.key) {
//       case 'profilePicture':
//         cellContent = (
//           <img
//             src={`${BASE_URL}/ProfilePictures/${item[column.key]}`}
//             alt="Profile"
//             style={{ width: '50px', height: '50px', borderRadius: '50%' }}
//           />
//         );
//         break;
//       case 'gender':
//         cellContent = genderMap ? genderMap[item[column.key]] : item[column.key];
//         break;
//       case 'term':
//         cellContent = termMap ? termMap[item[column.key]] : item[column.key];
//         break;
//       case 'isAvailable':
//         cellContent = availability ? availability[item[column.key]] : item[column.key];
//         break;
//       case 'examType':
//         cellContent = typeMap ? typeMap[item[column.key]] : item[column.key];
//         break;
//       case 'more':
//         cellContent = (
//           <button
//             style={{all: 'unset'}}
//             onClick={() => onMoreClick(item.id || item.classId)}
//           >
//             <MdMoreVert size={'28px'} className='color-success' />
//           </button>
//         );
//         break;
//         case 'clear': 
//         cellContent = (
//           <button
//           className='special-button'
//           onClick={() => onClearnce(item.studentId, item.examId)}
//           >
//             Clear
//           </button>
//         );
//         break;
//         case 'makeAvailable':
//           cellContent = (
//             <button style={{width: '100%'}} className='special-button'
//           onClick={() => makeAvailable(item.id)} 
//           >
//               flip
//             </button>
//           );
//           break;
//           case 'delete':
//             cellContent = (
//               <button style={{all: 'unset'}}
//             onClick={() => handleDelete(item.classId || item.userId || item.id)} 
//             >
//                 <MdDelete size={'25px'} className='color-danger' />
//               </button>
//             );
//             break;
//       default:
//         cellContent = item[column.key];
//     }

//     if (linkPath) {
//       const dynamicLink = typeof linkPath === 'function' ? linkPath(item) : '#';
//       return (
//         <Link to={dynamicLink} className="link text-dec-none">
//           {cellContent}
//         </Link>
//       );
//     }

//     return cellContent;
//   };

//   return (
//     <div>
//       <table className="td box-shadow-2"
//         style={{
//           marginTop: '20px',
//           width: width,
//           borderRadius: '7px',
//           borderSpacing: 0,
//           border: 'none'
//         }}
//       >
//         <thead className="bg-color-prim color-light"
//           style={{
//             height: '3em',
//             textAlign: 'left'
//           }}
//         >
//           <tr>
//             {columns.map((column, index) => (
//               <th
//                 key={column.key}
//                 className={index === 0 ? 'b-r-l' : index === columns.length - 1 ? 'b-r-r' : ''}
//                 style={{paddingLeft: '10px'}}
//               >
//                 {column.header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {loading ? (
//             <tr>
//               <td colSpan={columns.length} className="loader-cell">
//                 <div className="loader"></div>
//               </td>
//             </tr>
//           ) : !data || data.length === 0 ? (
//             <tr>
//               <td colSpan={columns.length} style={{ textAlign: 'center' }}>
//                 {emptyText}
//               </td>
//             </tr>
//           ) : (
//             data.map((item) => (
//               <tr key={item.id}>
//                 {columns.map((column) => (
//                   <td key={column.key}>
//                     {renderCell(item, column)}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }






























































import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../Constant';
import { MdDelete, MdMoreVert } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


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
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const paginatedData = data?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil((data?.length || 0) / rowsPerPage);

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
            style={{ all: 'unset' }}
            onClick={() => onMoreClick(item.id || item.classId)}
          >
            <MdMoreVert size="28px" className="color-success" />
          </button>
        );
        break;
      case 'clear':
        cellContent = (
          <button
            className="special-button"
            onClick={() => onClearnce(item.studentId, item.examId)}
          >
            Clear
          </button>
        );
        break;
      case 'makeAvailable':
        cellContent = (
          <button
            style={{ width: '100%' }}
            className="special-button"
            onClick={() => makeAvailable(item.id)}
          >
            flip
          </button>
        );
        break;
      case 'delete':
        cellContent = (
          <button
            style={{ all: 'unset' }}
            onClick={() => handleDelete(item.classId || item.userId || item.id)}
          >
            <MdDelete size="25px" className="color-danger" />
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
      <table
        className="td box-shadow-2"
        style={{
          marginTop: '20px',
          width: width,
          borderRadius: '7px',
          borderSpacing: 0,
          border: 'none',
        }}
      >
        <thead
          className="bg-color-prim color-light"
          style={{
            height: '3em',
            textAlign: 'left',
          }}
        >
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key}
                className={
                  index === 0
                    ? 'b-r-l'
                    : index === columns.length - 1
                      ? 'b-r-r'
                      : ''
                }
                style={{ paddingLeft: '10px' }}
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
          ) : !paginatedData || paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                {emptyText}
              </td>
            </tr>
          ) : (
            paginatedData.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column.key}>{renderCell(item, column)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
        <div style={{ display: 'flex', width: '190%', maxWidth:'190%', justifyContent: 'end', alignItems: 'center'}}>
          <div className="pagination-controls" style={{ marginTop: '10px', marginBottom: '10px', display: 'flex', gap: '10px' }}>
            <button style={{all: 'unset', height: '5px'}}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <FaChevronLeft />
            </button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <button style={{all: 'unset'}}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <FaChevronRight />
            </button>
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              {[5, 10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </table>

    </div>
  );
}
