import './class.css';



export default function CreateClass() {
     return (
          <>
                    <form className="box-shadow-3 create-class-nav">
                         <div className='box-shadow-3 class-name'>
                              <input type="text" placeholder="name" />
                         </div>
                         <div className='add-button bg-color-prim bold color-light'>
                              <input type="submit" value="Add" />
                         </div>
                    </form>
          </>
     )
}
