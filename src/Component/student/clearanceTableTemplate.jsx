import { Table } from "../ReUsableComponents/table"


export default function ClearanceTableTemplate({data, loading, handleClearance}) {
     const columns = [
          { key: 'studentName', header: 'Student Name' },
          { key: 'className', header: 'Class' },
          { key: 'uin', header: 'UIN' },
          { key: 'clear', header: ''}


     ];
    
     return (
          <div>
               <Table
                    data={data}
                    columns={columns}
                    width={`80%`}
                    loading={loading}
                    onClearnce={handleClearance}
                    emptyText={`Select Exam above to fetch student for clearance`}
               />
          </div>
     )
}