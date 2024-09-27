import { Link } from "react-router-dom";



export default function MyExamsTemplate({ name, id, index }) {
     return (
          <div>
               <Link to={`/instructions/${id}`} className="link">
                      {index+1}.   {name.toUpperCase()}
               </Link>
          </div>
     )
}