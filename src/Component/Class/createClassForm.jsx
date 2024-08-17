import './class.css';



export default function CreateClass({handleSubmit, handleInputChange, fieldvalue, fieldName, loading}) {
     
     return (
          <>
                    <form onSubmit={handleSubmit} className="box-shadow-3 create-class-nav">
                         <div className='box-shadow-3 class-name'>
                              <input type="text" placeholder="name" name={fieldName} value={fieldvalue} onChange={handleInputChange}  />
                         </div>
                         <div className='add-button bg-color-prim bold color-light'>
                              <input type="submit" value={loading ? "..." : "Add"} />
                         </div>
                    </form>
          </>
     )
}
