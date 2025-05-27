import React from 'react';

export default function ListOfSubjectForClass({ data, index }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
                <tbody>
                    <tr className="hover:bg-gray-50 transition-colors">
                        <td className="border border-gray-200 px-4 py-2 text-gray-800">
                            {index + 1}. {data.name}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-800">
                            {data.code}
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-gray-800">
                            {data.description}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}