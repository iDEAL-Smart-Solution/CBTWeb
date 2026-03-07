import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../Constant';
import { MdDelete, MdMoreVert } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Eye, EyeOff, Copy } from 'lucide-react';



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
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [copiedField, setCopiedField] = useState(null);


  const togglePasswordVisibility = (rowId) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const copyToClipboard = (text, fieldKey) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 1500); 
  };
  


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
            src={`${BASE_URL}/ProfilePicture/${item[column.key]}`}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
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
            onClick={() => onMoreClick(item.id || item.classId)}
            className="text-blue-600 hover:text-blue-800"
          >
            <MdMoreVert size="28px" />
          </button>
        );
        break;
      case 'clear':
        cellContent = (
          <button
            className="w-full px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            onClick={() => onClearnce(item.studentId, item.examId)}
          >
            Clear
          </button>
        );
        break;
      case 'makeAvailable':
        cellContent = (
          <button
            className="w-full px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            onClick={() => makeAvailable(item.id)}
          >
            Flip
          </button>
        );
        break;
      case 'delete':
        cellContent = (
          <button
            onClick={() => handleDelete(item.classId || item.userId || item.id)}
            className="text-red-600 hover:text-red-800"
            data-testid="delete"
          >
            <MdDelete size="25px" />
          </button>
        );
        break;
        case 'password': {
          const isVisible = visiblePasswords[item.id];
          const fieldKey = `${item.id}-password`;
        
          cellContent = (
            <div className="flex items-center gap-2 max-w-[150px]">
              <input
                type={isVisible ? 'text' : 'password'}
                value={item[column.key]}
                readOnly
                title="Click to copy"
                onClick={() => copyToClipboard(item[column.key], fieldKey)}
                className="bg-transparent outline-none w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
              />
              <button onClick={() => togglePasswordVisibility(item.id)} className="text-blue-600">
                {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <button onClick={() => copyToClipboard(item[column.key], fieldKey)} className="text-blue-600 relative">
                <Copy size={18} />
                {copiedField === fieldKey && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-0.5 rounded">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          );
          break;
        }
        case 'uin': {
          const fieldKey = `${item.id}-uin`;
        
          cellContent = (
            <div className="flex items-center gap-2 max-w-[150px]">
              <span
                onClick={() => copyToClipboard(item[column.key], fieldKey)}
                title="Click to copy"
                className="block overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
              >
                {item[column.key]}
              </span>
              <button onClick={() => copyToClipboard(item[column.key], fieldKey)} className="text-blue-600 relative">
                <Copy size={18} />
                {copiedField === fieldKey && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-0.5 rounded">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          );
          break;
        }        
      default:
        cellContent = (
          <span
            title={item[column.key]}
            className="block overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] cursor-pointer"
          >
            {item[column.key]}
          </span>
        );
    }

    if (linkPath) {
      const dynamicLink = typeof linkPath === 'function' ? linkPath(item) : '#';
      return (
        <Link to={dynamicLink} className="text-blue-600 hover:underline">
          {cellContent}
        </Link>
      );
    }

    return cellContent;
  };
  return (
    <div className="w-full overflow-hidden rounded-lg shadow border border-gray-300">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <thead className="bg-blue-600 text-white">
            <tr className="h-12">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`pl-4 text-left text-sm font-semibold ${index === 0
                    ? 'rounded-tl-lg'
                    : index === columns.length - 1
                      ? 'rounded-tr-lg'
                      : ''
                    }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">
                  <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </td>
              </tr>
            ) : !paginatedData || paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr key={item.id || item.userId || item.classId || item.studentId || item.examId || index} className="border-b border-gray-200 hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm text-gray-600">
                      {renderCell(item, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-end items-center gap-3 p-4 bg-gray-300 rounded-b-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 text-gray-700 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <FaChevronLeft />
          </button>
          <span className="text-sm text-gray-700">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-700 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <FaChevronRight />
          </button>
        </div>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="border border-gray-400 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

}