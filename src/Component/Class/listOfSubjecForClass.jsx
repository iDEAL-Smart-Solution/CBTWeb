import React from 'react';

export default function ListOfSubjectForClass({ data, index }) {
    return (
        <div className="table-container">
            <table className="styled-table">
                <tbody>
                    <tr key={data.id}>
                        <td>{index + 1}. {data.name}</td>
                        <td>{data.code}</td>
                        <td>{data.description}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
