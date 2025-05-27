import React from "react";
import { Table } from "../ReUsableComponents/table";
import { useNavigate } from "react-router-dom";

export default function ListClass({ classes, loading, handleDelete }) {
    const navigate = useNavigate();
    const columns = [
        { key: 'className', header: 'Class Name' },
        { key: 'numberOfSubjects', header: 'Number of Subjects' },
        { key: 'numberOfStudents', header: 'Number of Students' },
        { key: 'more', header: 'More' },
        { key: 'delete', header: 'Delete' },
    ];

    const handleMoreClick = (id) => {
        navigate(`/class/${id}`);
    };

    return (
        <div className="bg-white shadow-md rounded-lg">
            <Table
                data={classes}
                columns={columns}
                width="100%"
                onMoreClick={handleMoreClick}
                loading={loading}
                handleDelete={handleDelete}
                emptyText="You have no classes available. Use the input box above to create one."
            />
        </div>
    );
}