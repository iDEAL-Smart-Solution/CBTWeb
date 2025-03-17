import './class.css';
import React from 'react';


export default function CreateClass({handleSubmit, handleInputChange, fieldvalue, fieldName, loading}) {
     
     return (
          <>
                    <form onSubmit={handleSubmit} className="box-shadow create-class-nav">
                         <div className='box-shadow class-name'>
                              <input type="text" placeholder="class name" name={fieldName} value={fieldvalue} onChange={handleInputChange}  />
                         </div>
                         <div className='add-button bg-color-prim bold color-light'>
                              <input type="submit" value={loading ? "..." : "Add"} />
                         </div>
                    </form>
          </>
     )
}
