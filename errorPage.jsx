import logo from "./src/assets/iDEAL-logo.jpg"
const ErrorPage = () => {
     return (
          <div style={{ width: '70vw', height: '60vh' }}>
               <h1 className="text-center color-primary">Coming soon!!!</h1>
               <div style={{ display: 'flex', placeContent: 'center', placeContent: 'center' }}>
                    <img className="text-center" src={logo} alt="ideal-logo" width={`400em`} />
               </div>
          </div>
     )
}

export default ErrorPage;