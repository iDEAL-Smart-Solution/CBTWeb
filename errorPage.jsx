import logo from "./src/assets/iDEAL-logo.jpg"
const ErrorPage = () => {
     return(
          <div>
               <h1 className="text-center color-danger">404!!! Page not found!!!</h1>
               <img className="text-center" src={logo} alt="ideal-logo" />
          </div>
     )
}

export default ErrorPage;